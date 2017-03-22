let LoadSprites = (function () {

    class LoadSprites {
        constructor(game) {
            this.game = game;
            this.game.load.spritesheet('char-start', '../images/character-start.png', 64, 64);
            this.game.load.spritesheet('wolf-side-howl', '../images/wolf-side-howl.png', 65, 45);
            this.game.stage.backgroundColor = 0xbada55;
        }
    }

    return LoadSprites;

}());

