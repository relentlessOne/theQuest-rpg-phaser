




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

    let block = false;


    class Player {

        constructor(game) {
            this.game = game;
            this.char = this.game.add.sprite(32, 32, 'char-start');
            this.game.physics.enable(this.char, Phaser.Physics.ARCADE);
            this.char.body.collideWorldBounds = true;
            this.loadAnimations();
            this.char.body.bounce.setTo(1, 1);
            this.char.body.velocity.x = 0;
            this.char.body.velocity.y = 0;
            this.followMousePointer = false;
            this.direction = '';
            this.disableClick = false;
            key_W = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
            key_S = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
            key_A = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
            key_D = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
            this.game.input.keyboard.addCallbacks(this.game, this.chuj, null, null);
            this.allowMove = true;
            this.stats = new PlayerStats();
        }


        testForMultipleKeyboardStroke() {
            var count = 0;
            if (key_W.isDown) count++;
            if (key_S.isDown) count++;
            if (key_A.isDown) count++;
            if (key_D.isDown) count++;
           // Debug.writeln(count);

            if (count == 1) {
                return true;
            } else {
                return false;
            }


        }

        update() {

            this.keyboardCtrl();
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
        

            if (key_W.isDown ) {
                this.char.body.velocity.y = -200;
                this.char.body.velocity.x = 0;
                    this.char.animations.play('walk-up');
                    this.direction = 'up';
                       
            } else if (key_S.isDown && this.testForMultipleKeyboardStroke()) {
                this.char.body.velocity.y = 200;
                this.char.body.velocity.x = 0;
                    this.char.animations.play('walk-down');
                    this.direction = 'down';
             
            } else if (key_A.isDown && this.testForMultipleKeyboardStroke()) {
                this.char.body.velocity.x = -200;
                this.char.body.velocity.y = 0;
                    this.char.animations.play('walk-left');
                    this.direction = 'left';
   
            } else if (key_D.isDown && this.testForMultipleKeyboardStroke()) {
                this.char.body.velocity.x = 200;
                this.char.body.velocity.y = 0;
                    this.char.animations.play('walk-right');
                    this.direction = 'right';
        
                } else {
                    this.char.animations.stop();
                    this.char.body.velocity.x = 0;
                    this.char.body.velocity.y = 0;
                   
                }
         
          
               

        }

    }

    return Player;
}());











