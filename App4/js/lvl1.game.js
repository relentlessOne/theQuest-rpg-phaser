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
    let healthBarPrecent = 100;
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

    class Lvl1 {
        constructor() {
            game = new Phaser.Game(w, h, Phaser.AUTO, 'phaser-view', { preload: this.preload, create: this.create, update: this.update });
        }

        preload() {
            game.load.tilemap('world1', 'level_info/worldMap.json', null, Phaser.Tilemap.TILED_JSON);
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

            //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
            //  The second parameter maps this name to the Phaser.Cache key 'tiles'
            map.addTilesetImage('base_out_atlas', 'tile1');
            map.addTilesetImage('terrain_atlas', 'tile4');
            map.addTilesetImage('build_atlas', 'tile2');
            map.addTilesetImage('obj_misk_atlas', 'tile3');

            //  Creates a layer from the World1 layer in the map data.
            //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
            layer = map.createLayer('Trawa-drogi');
            layer = map.createLayer('kanion');
            // layer = map.createLayer('Warstwa Kafelków 3');
            player = new Player(game);

            bandit = new Bandit(game);

            // game.physics.arcade.collide(player.char, 'kanion');
            map.setCollisionBetween(1, 10000, true, 'kanion');
            //  This resizes the game world to match the layer dimensions
            layer.resizeWorld();

            game.camera.follow(player.char, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
//bug
            //marker = game.add.graphics();
            //marker.lineStyle(2, 0xffffff, 1);
            //marker.drawRect(0, 0, 32, 32);

            //game.input.addMoveCallback(this.updateMarker, game);



            bullets = game.add.group();
            bullets.enableBody = true;
            bullets.physicsBodyType = Phaser.Physics.ARCADE;

            bullets.createMultiple(20, 'bullet');
            bullets.setAll('checkWorldBounds', true);
            bullets.setAll('outOfBoundsKill', true);

            myHealthBar = new HealthBar(game, { x: 80, y: 50, width: 120 });
            myHealthBar.setFixedToCamera(true);

            manaBar = new HealthBar(game, { x: 850, y: 50, width: 120 });
            manaBar.setFixedToCamera(true);

            expBar = new HealthBar(game, { x: 450, y: 50, width: 120 });
            expBar.setFixedToCamera(true);
            expBar.setPercent(0);




            // Create a label to use as a button
            pause_label = game.add.text(w - 100, 20, 'Pause', { font: '24px Arial', fill: '#fff' });
            pause_label.inputEnabled = true;

            pause_label.events.onInputUp.add( () => {
             
            });

          

        }

        pauseGame() {
            game.paused = true;
        }

        unpauseGame() {
            game.paused = false;
        }

        updateMarker() {

            //marker.x = layer.getTileX(game.input.activePointer.worldX) * 32;
            //marker.y = layer.getTileY(game.input.activePointer.worldY) * 32;

        }
        update() {

            player.update();

            if (banditAlive)
                game.physics.arcade.moveToXY(bandit.bandit, player.char.x, player.char.y, 150);

            game.physics.arcade.collide(player.char, bandit.bandit, this.collision);

            game.physics.arcade.collide(player.char, layer);

            game.physics.arcade.collide(bullets, bandit.bandit, this.enemyKill);


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

            var betweenBelow = (player.char.y > bandit.bandit.y) && (player.char.x >= bandit.bandit.x) && (player.char.x <= bandit.bandit.x + bandit.bandit.width);
            var betweenUp = (player.char.y < bandit.bandit.y) && (player.char.x >= bandit.bandit.x) && (player.char.x <= bandit.bandit.x + bandit.bandit.width);
            var right = (player.char.x > bandit.bandit.x + bandit.bandit.width);
            var left = (player.char.x < bandit.bandit.x);
            if (betweenBelow) {
                bandit.bandit.frame = bandit.lookStay.down;
            } else if (betweenUp) {
                bandit.bandit.frame = bandit.lookStay.up;
            } else if (left) {
                bandit.bandit.frame = bandit.lookStay.left;
            } else if (right) {
                bandit.bandit.frame = bandit.lookStay.right;
            }

            if (manaBarPrecent < 100 && allow) {
                allow = false;
                somethingtimeCheck = game.time.now;

                manaBarPrecent += 5;
                manaBar.setPercent(manaBarPrecent);
                bullets.createMultiple(1, 'bullet');
                setTimeout(function () {
                    allow = true;
                }, 1000);

            }




            if (healthBarPrecent <= 0) {
                player.char.kill();
            }
        }

        enemyKill(s1, s2) {
            banditAlive = false;
            setTimeout(function () {
                s1.destroy();
                expBar.setPercent(30);
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
                s2.body.velocity.x = 0;
                s2.body.velocity.y = 0;
                player.disableClick = false;
            }, 100);



        }
    }

    return Lvl1;
}());
