let Skeleton = (function () {

    class Skeleton {

        constructor(game, x, y) {
            this.game = game;
            this.bandit = this.game.add.sprite(x, y, 'skeleton');
            this.loadAnimations();
            this.game.physics.enable(this.bandit, Phaser.Physics.ARCADE);
            this.bandit.body.collideWorldBounds = true;
            this.bandit.body.bounce.set(1);

            this.bandit.body.velocity.x = 0;
            this.bandit.body.velocity.y = 0;
            this.playerInRange = false;

            this.lookStay = {
                "down": 131,
                "up": 105,
                "left": 118,
                "right": 143,
            }


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
            let x = 0;
            let arr = new Array();
            for (let i = from; i < to; i++) {
                arr.push(i);

                x += 50;
            }
            return arr;
        }

        lookAtPlayer(player) {
            let betweenBelow = (player.char.y > this.bandit.y) && (player.char.x >= this.bandit.x) && (player.char.x <= this.bandit.x + this.bandit.width);
            let betweenUp = (player.char.y < this.bandit.y) && (player.char.x >= this.bandit.x) && (player.char.x <= this.bandit.x + this.bandit.width);
            let right = (player.char.x > this.bandit.x + this.bandit.width);
            let left = (player.char.x < this.bandit.x);
            if (betweenBelow) {
                this.bandit.frame = this.lookStay.down;
            } else if (betweenUp) {
                this.bandit.frame = this.lookStay.up;
            } else if (left) {
                this.bandit.frame = this.lookStay.left;
            } else if (right) {
                this.bandit.frame = this.lookStay.right;
            }
        }

    }

    return Skeleton;
}());











