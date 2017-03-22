let Player = (function () {


    let allowMove = true;
    let followMousePointer = false;
    let keyPressed = false;
    let direction = 'up';
    let capturedMouseX = 0;
    let capturedMouseY = 0;
    let makeitfalse = true;
    let ctrlNextMove = false;
    let disableClick = false;


    class Player {

        constructor(rpg) {
            this.game = rpg;
            this.char = this.game.add.sprite(120, 100, 'char-start');
            this.game.physics.enable(this.char, Phaser.Physics.ARCADE);
            this.char.body.collideWorldBounds = true;
            this.loadAnimations();
            this.char.body.bounce.setTo(1, 1);
            this.char.body.velocity.x = 0;
            this.char.body.velocity.y = 0;

            

        }

        update() {
            this.keyboardCtrl();
            this.mouseCtrl();
        }

        loadAnimations() {
            this.char.animations.add('walk-up', this.generateSpriteFramesArray(106, 113), 12, true);
            this.char.animations.add('walk-right', this.generateSpriteFramesArray(145, 152), 12, true);
            this.char.animations.add('walk-down', this.generateSpriteFramesArray(132, 139), 12, true);
            this.char.animations.add('walk-left', this.generateSpriteFramesArray(117, 124), 12, true);
            this.char.animations.add('atack-mele-up', this.generateSpriteFramesArray(156, 162), 12, false);
            this.char.animations.add('atack-mele-left', this.generateSpriteFramesArray(169, 175), 12, false);
            this.char.animations.add('atack-mele-down', this.generateSpriteFramesArray(182, 188), 12, false);
            this.char.animations.add('atack-mele-right', this.generateSpriteFramesArray(195, 201), 12, false);
        }

        generateSpriteFramesArray(from, to) {
            var x = 0;
            var arr = new Array();
            for (var i = from; i < to; i++) {
                // var xxx = game.add.sprite(x, 50, 'char-start');
                // xxx.frame = i;
                arr.push(i);

                x += 50;
            }
            // Debug.writeln(arr);
            return arr;
        }



        keyboardCtrl() {
            if (allowMove) {
                if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
                    this.char.x -= 3.5;
                    this.char.animations.play('walk-left');
                    direction = 'left';
                }
                else if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
                    this.char.x += 3.5;
                    this.char.animations.play('walk-right');
                    direction = 'right';
                }

                if (game.input.keyboard.isDown(Phaser.Keyboard.W)) {
                    this.char.y -= 3.5;
                    this.char.animations.play('walk-up');

                    direction = 'up';

                }
                else if (game.input.keyboard.isDown(Phaser.Keyboard.S)) {
                    this.char.y += 3.5;
                    this.char.animations.play('walk-down');
                    direction = 'down';
                }

            }

            if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && !keyPressed) {
                allowMove = false;
               
                var anim = {};

                if (direction === 'up') {
                    anim = this.char.animations.play('atack-mele-up');
                }

                if (direction === 'down') {
                    anim = this.char.animations.play('atack-mele-down');
                }

                if (direction === 'left') {
                    anim = this.char.animations.play('atack-mele-left');
                }

                if (direction === 'right') {
                    anim = this.char.animations.play('atack-mele-right');
                }

                anim.onComplete.add(function () {
                    allowMove = true;
                }, this.char);

            }
        }

        mouseCtrl() {
            if (game.input.activePointer.isDown && !disableClick) {
                capturedMouseX = game.input.mousePointer.x;
                capturedMouseY = game.input.mousePointer.y;
                followMousePointer = true;
            }

            if (followMousePointer) {
                var centerCharSprite = 32;
                var relToPointX = this.char.x + centerCharSprite - capturedMouseX;
                var relToPointY = this.char.y + centerCharSprite - capturedMouseY;
                var shortestRoad = (relToPointX > relToPointY);

             //   Debug.writeln(relToPointX);
              //  Debug.writeln(relToPointY);

                if ((shortestRoad && makeitfalse) || ctrlNextMove) {

                    if (relToPointX > 0) {
                        this.char.animations.play('walk-left');
                        this.char.x -= 3.5;
                    } else {
                        this.char.animations.play('walk-right');
                        this.char.x += 3.5;
                    }

                    if (relToPointX <= 3 && relToPointX >= -1.5) {
                        ctrlNextMove = false;
                        makeitfalse = false;
                    }


                } else {

                    if (relToPointY > 0) {
                        this.char.y -= 3.5;
                        this.char.animations.play('walk-up');
                    } else {
                        this.char.y += 3.5;
                        this.char.animations.play('walk-down');
                    }

                    if (relToPointY <= 3 && relToPointY >= -1.5) {
                        ctrlNextMove = true;
                    }
                }

                if (relToPointY <= 3.5 && relToPointY >= -3 && relToPointX <= 3.5 && relToPointX >= -3) {
                    followMousePointer = false;
                    this.char.animations.stop(null, true);
                }

            }
        }
    }

    return Player;
}());











