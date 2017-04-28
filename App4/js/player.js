﻿




let Player = (function () {




    let key_W;
    let key_S;
    let key_A;
    let key_D;

    

    let allowMoveTo = false;

    let moveYDone;
    let moveXDone;

    let numOfPressedKeyes = 0;




    let pressed = false;


    let allowMove = true;

    let keyPressed = false;
    let direction = 'up';
    let capturedMouseX = 0;
    let capturedMouseY = 0;
    let makeitfalse = true;
    let ctrlNextMove = false;
    let rpgGame;
    let go = false;

    let playerX = 1;
    let playerY = 1;



    class Player {

        constructor(rpg, easyStar) {
            this.game = rpg;
            this.easyStar = easyStar;
            this.char = this.game.add.sprite(32, 32, 'char-start');
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
         
            if (game.input.activePointer.isDown || go) {

                var x = game.input.activePointer.worldX;
                var y = game.input.activePointer.worldY;

                moveYDone = false;
                moveXDone = false;
      
                capturedMouseX = game.input.activePointer.worldX;
                capturedMouseY = game.input.activePointer.worldY;

                allowMoveTo = true;
               // Debug.writeln(capturedMouseX);
             //   Debug.writeln(capturedMouseY);
      


                //game.physics.arcade.moveToPointer(this.char, 600);
                this.followMousePointer = false;

                var playerPositionX = this.char.worldPosition.x;
                var playerPositionY = this.char.worldPosition.y;
              
                this.easyStar.findPath(playerX, playerY, 4, 1, (path) => {

                  
                   


                    if (path === null) {
                        Debug.writeln("The path to the destination point was not found.");
                    } else {
                       
                        for (var i = 0; i < path.length; i++)
                        {
                            Debug.writeln("P: " + i + ", X: " + path[i].x + ", Y: " + path[i].y);

                            if (playerX < path[i].x) {

                                this.char.worldPosition.x = 32;
                            
                          
                               
                            }
                        }
                        this.followMousePointer = false;
                    }
                });

                //this.easyStar.calculate();

            }

            if (this.followMousePointer) {
                var centerCharSprite = 32;

                var playerPositionX = (32 * Math.trunc(this.char.worldPosition.x / 32)) + 16;
                var playerPositionY = (32 * Math.trunc(this.char.worldPosition.y / 32)) + 16;

                var relToPointX = (playerPositionX ) - capturedMouseX;
                var relToPointY = (playerPositionY + centerCharSprite) - capturedMouseY;
                var shortestRoad = (relToPointX > relToPointY);


                if (!moveYDone) {
                    if (this.char.position.y < capturedMouseY) {
                        this.char.body.velocity.y = 200;
                        this.char.animations.play('walk-down');
                        this.direction = 'down';

                

                     
                    } else {
                        this.char.body.velocity.y = -200;
                        this.char.animations.play('walk-up');
                        this.direction = 'up';

                   
                       
                    }



                    if (Math.abs(Math.trunc(this.char.position.y) - capturedMouseY) <= 2) {
                        moveYDone = true;
                        this.char.body.velocity.y = 0;
                    }
               


                    
                } else {


                    if (this.char.position.x < capturedMouseX) {
                        this.char.body.velocity.x = 200;
                        this.char.animations.play('walk-right');
                        this.direction = 'right';




                    } else {
                        this.char.body.velocity.x = -200;
                        this.char.animations.play('walk-left');
                        this.direction = 'left';



                    }


                    if (Math.abs(Math.trunc(this.char.position.x) - capturedMouseX) <= 2) {

                        this.followMousePointer = false;

                 
                    }

                }

            }


            if (false) {
      
                this.game.physics.arcade.moveToXY(this.char, capturedMouseX, capturedMouseY, 200);
                //var playerPositionX = (32 * Math.trunc(this.char.worldPosition.x / 32)) + 16;
                //var playerPositionY = (32 * Math.trunc(this.char.worldPosition.y / 32)) + 16;

                if (this.char.worldPosition.x >= capturedMouseX || this.char.worldPosition.y >= capturedMouseY) {
                    allowMoveTo = false;
                }
            }

        }
    }

    return Player;
}());











