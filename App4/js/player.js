




let Player = (function () {




    let key_W;
    let key_S;
    let key_A;
    let key_D;

    



    let numOfPressedKeyes = 0;




    let pressed = false;


    let allowMove = true;

    let keyPressed = false;
    let direction = 'up';
    let capturedMouseX = 0;
    let capturedMouseY = 0;
    let makeitfalse = true;
    let ctrlNextMove = false;



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
            this.followMousePointer = false;
            this.direction = 'up';
            this.disableClick = false;
            key_W = game.input.keyboard.addKey(Phaser.Keyboard.W);
            key_S = game.input.keyboard.addKey(Phaser.Keyboard.S);
            key_A = game.input.keyboard.addKey(Phaser.Keyboard.A);
            key_D = game.input.keyboard.addKey(Phaser.Keyboard.D);

            this.game.input.keyboard.addCallbacks(this.game, this.chuj, null, null);

            this.allowMove = true;
        }


        test() {
            var count = 0;
            if (key_W.isDown) count++;
            if (key_S.isDown) count++;
            if (key_A.isDown) count++;
            if (key_D.isDown) count++;

            if (count > 1) {


                return false;

            } else {
                return true;
            }


        }

        update() {
            this.allowMove = true;
            this.keyboardCtrl();

            if(this.allowMove)
                this.mouseCtrl();

           // Debug.writeln(this.char.body.velocity.x);
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
         



           
                if (this.test()) {
                    if (key_W.isDown) {
                        this.char.body.velocity.y = -200;
                        this.char.animations.play('walk-up');
                        this.direction = 'up';


                    } else if (key_S.isDown) {
                        this.char.body.velocity.y = 200;
                        this.char.animations.play('walk-down');
                        this.direction = 'down';
               


                    } else if (key_A.isDown) {
                        this.char.body.velocity.x = -200;
                        this.char.animations.play('walk-left');
                        this.direction = 'left';


                    } else if (key_D.isDown) {
                        this.char.body.velocity.x = 200;
                        this.char.animations.play('walk-right');
                        this.direction = 'right';

                    } else {
                       // this.char.animations.stop();
                        this.char.body.velocity.x = 0;
                        this.char.body.velocity.y = 0;
                    }


                }

               // Debug.writeln(pressed);
                  

              





           

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
            if (game.input.activePointer.isDown && !this.disableClick) {
                capturedMouseX = game.input.activePointer.x;
                capturedMouseY =game.input.activePointer.y;

                game.physics.arcade.moveToPointer(this.char, 600);
                this.followMousePointer = false;
            }

            if (this.followMousePointer) {
                var centerCharSprite = 32;

                var relToPointX = this.char.x + centerCharSprite - capturedMouseX;
                var relToPointY = this.char.y + centerCharSprite - capturedMouseY;
                var shortestRoad = (relToPointX > relToPointY);

                Debug.writeln(game.input.activePointer.x);
                Debug.writeln(capturedMouseX);

                if ((shortestRoad && makeitfalse) || ctrlNextMove) {

                    if (relToPointX > 0) {
                        this.char.animations.play('walk-left');
                        //this.char.x -= 3.5;
                        this.char.body.velocity.x = -600;
                        this.direction = 'left';
                    } else {
                        this.char.animations.play('walk-right');
                        //this.char.x += 3.5;
                        this.char.body.velocity.x = 600;
                        this.direction = 'right';

                    }

                    if (relToPointX <= 3 && relToPointX >= -1.5) {
                        ctrlNextMove = false;
                        makeitfalse = false;
                    }


                } else {

                    if (relToPointY > 0) {
                        // this.char.y -= 3.5;
                       
                        this.char.body.velocity.y = -600;
                        this.char.animations.play('walk-up');
                        this.direction = 'up';
                    } else {
                        //this.char.y += 3.5;
                        this.char.body.velocity.y = 600;
                        this.char.animations.play('walk-down');
                        this.direction = 'down';
                    }

                    if (relToPointY <= 3 && relToPointY >= -1.5) {
                        ctrlNextMove = true;
                    }
                }

                if (relToPointY <= 3.5 && relToPointY >= -3 && relToPointX <= 3.5 && relToPointX >= -3) {
                    this.followMousePointer = false;
                    this.char.animations.stop(null, true);
                }

            } 
        }
    }

    return Player;
}());











