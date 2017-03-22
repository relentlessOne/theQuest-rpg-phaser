let Bandit = (function () {





    class Bandit {

        constructor(game) {
            this.game = game;
            this.bandit = this.game.add.sprite(200, 100, 'bandit');
            this.loadAnimations();
            this.game.physics.enable(this.bandit, Phaser.Physics.ARCADE);
            this.bandit.body.collideWorldBounds = true;
            this.bandit.body.bounce.setTo(1, 1);
            this.bandit.body.velocity.x = 0;
            this.bandit.body.velocity.y = 0;
        }

        loadAnimations() {
            this.bandit.animations.add('walk-up', this.generateSpriteFramesArray(106, 113), 12, true);
            this.bandit.animations.add('walk-right', this.generateSpriteFramesArray(145, 152), 12, true);
            this.bandit.animations.add('walk-down', this.generateSpriteFramesArray(132, 139), 12, true);
            this.bandit.animations.add('walk-left', this.generateSpriteFramesArray(117, 124), 12, true);
            this.bandit.animations.add('atack-mele-up', this.generateSpriteFramesArray(156, 162), 12, false);
            this.bandit.animations.add('atack-mele-left', this.generateSpriteFramesArray(169, 175), 12, false);
            this.bandit.animations.add('atack-mele-down', this.generateSpriteFramesArray(182, 188), 12, false);
            this.bandit.animations.add('atack-mele-right', this.generateSpriteFramesArray(195, 201), 12, false);
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

    }

    return Bandit;
}());











