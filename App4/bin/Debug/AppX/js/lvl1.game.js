let Lvl1 = (function () {
    let game;
    let player;
    let bandit;
    let mapArr;
    let w = 1024;
    let h = 600;
    let map;
    let layer;
    let marker = {};
    let blocked = false;
    let myHealthBar;
    let manaBar;
    let healthBarPrecent;
    let manaBarPrecent = 100;
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
    let numOfEnemiesKilled;

    class Lvl1 {
        constructor() {
            game = new Phaser.Game(w, h, Phaser.AUTO, 'phaser-view', { preload: this.preload, create: this.create, update: this.update });
            vm = this;
            enemies = [];
            evt = new CustomEvent('playerDead');
            evt1 = new CustomEvent('levelCompleted');
            healthBarPrecent = 100;
            numOfEnemiesKilled = 0;
      
        }

        preload() {
            game.load.tilemap('world1', 'level_info/lvl1.json', null, Phaser.Tilemap.TILED_JSON);
            game.load.image('tile1', 'level_info/base_out_atlas.png');
            game.load.image('tile2', 'level_info/build_atlas.png');
            game.load.image('tile3', 'level_info/obj_misk_atlas.png');
            game.load.image('tile4', 'level_info/terrain_atlas.png');
            new LoadSprites(this);
        }

        endLevel() {
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
  
            player = new Player(game);

            bandit = new Bandit(game, 0, 0);


            for (let i = 0; i < 60 ; i++) {
                enemies.push(new Bandit(game, Math.floor((Math.random() * 1600) + 200), Math.floor((Math.random() * 1600) + 200)));
            }


            //for (let i = 0; i < 30 ; i++) {
            //    enemies.push(new Bandit(game, Math.floor((Math.random() * 2650) + 1000), Math.floor((Math.random() * 2550) + 600)));
            //}


           // map.setCollisionBetween(1, 10000, true, 'kanion');

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
            expBar.setPercent(0);
            game.add.text(470, 32, "EXP", { font: "32px Arial", fill: "#ffffff", align: "center" }).fixedToCamera = true;

        }

        pauseGame() {
            game.paused = true;
        }

        unpauseGame() {
            game.paused = false;
        }

   
        update() {

            Debug.writeln(numOfEnemiesKilled);
            if (numOfEnemiesKilled === 500) {
                window.dispatchEvent(evt1);
            }


            player.update();         
            game.physics.arcade.collide(player.char, layer);

            if (game.input.activePointer.isDown) {
                if (game.time.now > nextFire && bullets.countDead() > 0) {

                    manaBarPrecent -= 5;

                    if (manaBarPrecent <= 0) manaBarPrecent = 0;
                    manaBar.setPercent(manaBarPrecent);

                    nextFire = game.time.now + fireRate;

                    let bullet = bullets.getFirstDead();

                    bullet.reset(player.char.x - 8, player.char.y - 8);

                    game.physics.arcade.moveToPointer(bullet, 300);
                }
            }

            for(let en of enemies) {
                if (en.bandit.alive) {
                    en.lookAtPlayer(player);
                    game.physics.arcade.collide(player.char, en.bandit, vm.collision);
                    game.physics.arcade.collide(bullets, en.bandit, vm.enemyKill);
                    if (game.physics.arcade.distanceBetween(en.bandit, player.char) <= 500) {
                       game.physics.arcade.moveToXY(en.bandit, player.char.x, player.char.y, 250);
                    }

                }
            }

            bandit.lookAtPlayer(player);
            if (manaBarPrecent < 100 && allow) {
                allow = false;
                somethingtimeCheck = game.time.now;

                manaBarPrecent += 5;
                manaBar.setPercent(manaBarPrecent);
                bullets.createMultiple(1, 'fireball');
                setTimeout(function () {
                    allow = true;
                }, 1000);

            }
            if (healthBarPrecent <= 0) {
                myHealthBar.setPercent(0);
                player.char.kill();
                window.dispatchEvent(evt);
            }
        }

        enemyKill(s1, s2){
            setTimeout(function () {
                s1.destroy();
                expBar.setPercent(30);
                numOfEnemiesKilled++;
            }, 100);

            s2.destroy();
        }

        collision(s1, s2) {
            Debug.writeln(player.direction);
            healthBarPrecent -= 1;
            myHealthBar.setPercent(healthBarPrecent);
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

    return Lvl1;
}());
