﻿let Lvl = (function () {
    let game;
    let player;
    let bandit;
    let mapArr;
    let w = 1024;
    let h = 600;
    let fx;
    let map;
    let layer;
    let marker = {};
    let blocked = false;
    let myHealthBar;
    let manaBar;
    let healthBarPrecent;
    let manaBarPrecent;
    let banditAlive = true;
    let expBar;
    let expBarPrecent = 0;
    let bullets;
    let fireRate = 150;
    let nextFire = 0;
    let allow = true;
    let somethingtimeCheck = 0;
    let pause_label;
    let menu;
    let choiseLabel;
    let enemies;
    let vm;
    let evt;
    let evt1;
    let evLvlUp;
    let numToKill;
    let numOfEnemiesKilled;
    let manaRefreshTimeout = null;




    let playerInfo;


    let lvlID;

    class Lvl {
        constructor(_lvlID, _playerInfo) {

            let musicLoadEvt = document.createEvent("CustomEvent");
            musicLoadEvt.initCustomEvent("musicEvt", true, true, _lvlID);
            window.dispatchEvent(musicLoadEvt);

            playerInfo = _playerInfo;
            lvlID = _lvlID;
            game = new Phaser.Game(w, h, Phaser.AUTO, 'phaser-view', { preload: this.preload, create: this.create, update: this.update });
            vm = this;
            enemies = [];
            evt = new CustomEvent('playerDead');
            evt1 = document.createEvent("CustomEvent");
            evt1.initCustomEvent("levelCompleted", true, true, _lvlID);
            evLvlUp = new CustomEvent('levelUp');
            healthBarPrecent = playerInfo.maxHp;
            manaBarPrecent = playerInfo.maxMana;
            manaRefreshTimeout = null;
            allow = true;
            numOfEnemiesKilled = 0;

        }

        preload() {
            if (lvlID === 1) {
                game.load.tilemap('world1', 'level_info/lvl1.json', null, Phaser.Tilemap.TILED_JSON);
            }

            if (lvlID === 2) {
                game.load.tilemap('world1', 'level_info/lvl2.json', null, Phaser.Tilemap.TILED_JSON);
            }

            if (lvlID === 3) {
                game.load.tilemap('world1', 'level_info/lvl3.json', null, Phaser.Tilemap.TILED_JSON);
            }

            game.load.image('tile1', 'level_info/base_out_atlas.png');
            game.load.image('tile2', 'level_info/build_atlas.png');
            game.load.image('tile3', 'level_info/obj_misk_atlas.png');
            game.load.image('tile4', 'level_info/terrain_atlas.png');

            new LoadSprites(this);

            game.load.audio('sfx', ['sounds/fx_mixdown.mp3']);
        }

        endLevel() {
            clearTimeout(manaRefreshTimeout);
            game.destroy();
        }

        create() {
            game.physics.startSystem(Phaser.Physics.P2JS);
            map = game.add.tilemap('world1');
            map.addTilesetImage('base_out_atlas', 'tile1');
            map.addTilesetImage('terrain_atlas', 'tile4');
            map.addTilesetImage('build_atlas', 'tile2');
            map.addTilesetImage('obj_misk_atlas', 'tile3');
            layer = map.createLayer('lay1');
            layer = map.createLayer('lay2');
            fx = game.add.audio('sfx');
            fx.allowMultiple = true;
            fx.addMarker('death', 1, 1.0);

            player = new Player(game);

            if (lvlID === 1) {
                for (let i = 0; i < 80 ; i++) {
                    enemies.push(new Bandit(game, Math.floor((Math.random() * 1600) + 400), Math.floor((Math.random() * 1600) + 200)));
                }
                numToKill = 80;
            }

            if (lvlID === 2 ){
                for (let i = 0; i < 60 ; i++) {
                    enemies.push(new Orc(game, Math.floor((Math.random() * 1600) + 400), Math.floor((Math.random() * 1600) + 200)));
                }
                numToKill = 60;
            }

            if (lvlID === 3) {
                for (let i = 0; i < 40 ; i++) {
                    enemies.push(new Skeleton(game, Math.floor((Math.random() * 1600) + 400), Math.floor((Math.random() * 1600) + 200)));
                }
                numToKill = 40;
            }


  

            layer.resizeWorld();

            game.camera.follow(player.char, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

            bullets = game.add.group();
            bullets.enableBody = true;
            bullets.physicsBodyType = Phaser.Physics.ARCADE;

            bullets.createMultiple(20, 'fireball');
            bullets.setAll('checkWorldBounds', true);
            bullets.setAll('outOfBoundsKill', true);

            myHealthBar = new HealthBar(game, {
                x: 80, y: 50, width: 120, bar: {
                    color: '#ff0000'
                },
                animationDuration: 1
            });
            myHealthBar.setFixedToCamera(true);


            game.add.text(60, 32, "HP", { font: "32px Arial", fill: "#ffffff", align: "center" }).fixedToCamera = true;



            manaBar = new HealthBar(game, {
                x: 950, y: 50, width: 120, bar: {
                    color: '#0000ff'
                },
                bg: {
                    color: '#000099'
                }
            });
            manaBar.setFixedToCamera(true);
            game.add.text(925, 32, "MP", { font: "32px Arial", fill: "#ffffff", align: "center" }).fixedToCamera = true;


            expBar = new HealthBar(game, { x: 500, y: 50, width: 120 });
            expBar.setFixedToCamera(true);
            expBar.setPercent((playerInfo.exp * 100) / playerInfo.expToNextLvl);
            game.add.text(470, 32, "EXP", { font: "32px Arial", fill: "#ffffff", align: "center" }).fixedToCamera = true;

        }

        pauseGame() {
            game.paused = true;
        }

        unpauseGame() {
            game.paused = false;
        }


        update() {

            numOfEnemiesKilled = 0;
            enemies.forEach(
                (e) => {
                    if (!e.bandit.alive) numOfEnemiesKilled++;
                });



            if (numToKill === numOfEnemiesKilled) {
                window.dispatchEvent(evt1);
                game.paused = true;
            }

            player.update();
            game.physics.arcade.collide(player.char, layer);

            if (game.input.activePointer.isDown) {
                if (game.time.now > nextFire && bullets.countDead() > 0) {

                    manaBarPrecent -= 20;
                    if (manaBarPrecent < 0) {
                        manaBarPrecent = 0;
                    } else {
                        nextFire = game.time.now + fireRate;

                        let bullet = bullets.getFirstDead();

                        bullet.reset(player.char.x + 28, player.char.y + 28);

                        game.physics.arcade.moveToPointer(bullet, playerInfo.bulletSpeed);
                    }
                    manaBar.setPercent((manaBarPrecent * 100) / playerInfo.maxMana);

                }
            }






            for (let i = 0, len = bullets.children.length; i < len; i++) {
                if (game.physics.arcade.distanceBetween(player.char, bullets.children[i]) >= playerInfo.maxBulletDistance) {
                    bullets.children[i].kill();
                }
            }

   

            vm.sortedCollide(game, enemies);
            


            for(let en of enemies) {
                if (en.bandit.alive) {
                    

                    game.physics.enable(en.bandit, Phaser.Physics.ARCADE);
                    en.bandit.body.collideWorldBounds = true;
                    en.bandit.body.bounce.setTo(1, 1);
               
         
                    en.lookAtPlayer(player);
                    game.physics.arcade.collide(player.char, en.bandit, vm.collision);
                    game.physics.arcade.collide(bullets, en.bandit, vm.enemyKill);
                    if (game.physics.arcade.distanceBetween(en.bandit, player.char) <= 500) {

                        
                        if (lvlID === 1) {
                            game.physics.arcade.moveToXY(en.bandit, player.char.x, player.char.y, 150);
                        }

                        if (lvlID === 2) {
                            game.physics.arcade.moveToXY(en.bandit, player.char.x, player.char.y, 300);
                        }

                        if (lvlID === 3) {
                            game.physics.arcade.moveToXY(en.bandit, player.char.x, player.char.y, 450);
                        }

                      
                    }

                }
            }


            if (manaBarPrecent < playerInfo.maxMana && allow) {
                allow = false;
                manaRefreshTimeout = setTimeout(function () {
                    manaBarPrecent += 20;
                    bullets.createMultiple(1, 'fireball');
                    manaBar.setPercent((manaBarPrecent * 100) / playerInfo.maxMana);
                    allow = true;
                }, playerInfo.manaRefreshRate);

            }


            if (healthBarPrecent <= 0) {
                myHealthBar.setPercent(0);
                player.char.kill();
                window.dispatchEvent(evt);
            }
        }

         leftOfBody(b) {
            return b.x - b.halfWidth
        }
         rightOfBody(b) {
            return b.x + b.halfWidth
        }
         sortedCollide(game, arr) {
            arr.sort(function (a, b) {
                return vm.leftOfBody(a.bandit.body) - vm.leftOfBody(b.bandit.body);
            })
            for (var i = 0; i < arr.length; ++i) {
                var elem_i = arr[i].bandit

                for (var j = i + 1; j < arr.length; ++j) {
                    var elem_j = arr[j].bandit
                    if (vm.rightOfBody(elem_i.body) < vm.leftOfBody(elem_j.body)) {
                        break;
                    }
                    game.physics.arcade.collide(elem_i, elem_j)
                }
            }
        }


        enemyKill(s1, s2) {
            setTimeout(function () {
                s1.kill();
                if (lvlID === 1) {
                    playerInfo.exp += 50 * playerInfo.lvl;
                }

                if (lvlID === 2) {
                    playerInfo.exp += 150 * playerInfo.lvl * 1.25;
                }

                if (lvlID === 3) {
                    playerInfo.exp += 300 * playerInfo.lvl * 1.25;
                }

                if (playerInfo.exp >= playerInfo.expToNextLvl) {
                    player.stats.lvlUp(playerInfo);
                    window.dispatchEvent(evLvlUp);
                    healthBarPrecent = playerInfo.maxHp;
                    manaBarPrecent = playerInfo.maxMana;
                    myHealthBar.setPercent((healthBarPrecent * 100) / playerInfo.maxHp);
                    manaBar.setPercent((manaBarPrecent * 100) / playerInfo.maxMana);

                }

                expBar.setPercent((playerInfo.exp * 100) / playerInfo.expToNextLvl);


               
            }, 100);

            s2.kill();
         
            fx.play('death');
        }

        getLvlID() {
            return lvlID;
        }

        collision(s1, s2) {
            //Debug.writeln(player.direction);

            if (lvlID === 1) {
                healthBarPrecent -= 5;
            }

            if (lvlID === 2) {
                healthBarPrecent -= 20;
            }

            if (lvlID === 3) {
                healthBarPrecent -= 50;
            }

            healthBarPrecent -= 1;
            myHealthBar.setPercent((healthBarPrecent * 100) / playerInfo.maxHp);
            player.allowMove = false;
            player.followMousePointer = false;
            player.disableClick = true;
            s1.animations.stop();
            if (player.direction === 'up') {
                s2.body.velocity.y = -200;
            } else if (player.direction === 'down') {
                s2.body.velocity.y = 200;
            } else if (player.direction === 'left') {
                s2.body.velocity.x = -200;
            } else if (player.direction === 'right') {
                s2.body.velocity.x = 200;
            }

            s1.body.velocity.x = 0;
            s1.body.velocity.y = 0;
            setTimeout(function () {
                if (s2.alive) {
                    s2.body.velocity.x = 0;
                    s2.body.velocity.y = 0;
                    player.disableClick = false;
                }
            }, 300);
        }
    }

    return Lvl;
}());
