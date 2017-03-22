let Wolf = (function () {

    class Wolf {
        constructor(game) {
            this.game = game;
            this.wolf = this.game.add.sprite(200, 100, 'wolf-side-howl');
            game.physics.enable(this.wolf, Phaser.Physics.ARCADE);
            this.wolf.body.collideWorldBounds = true;
            this.wolf.animations.add('wolf-side-howl-right', [3, 4, 5, 6, 7], 12, false);
            this.wolf.animations.add('wolf-side-howl-right-down', [7, 6, 5, 4, 3], 12, false);



            this.wolf.inputEnabled = true;
            this.wolf.events.onInputOver.add(function () {


            }, this.game);

            this.wolf.events.onInputOut.add(function () {



            }, this.game);
        }

        wolfHowlAnim() {
            var up = wolf.animations.getAnimation('wolf-side-howl-right');
            var down = wolf.animations.getAnimation('wolf-side-howl-right-down');
            up.onComplete.add(function () {
                setTimeout(function () {
                    down.play();
                }, 600);
            });
            up.play();
        }
    }


    return Wolf;
}());
