let LoadSprites = (function () {

    class LoadSprites {
        constructor(game) {
            this.game = game;
            this.game.load.spritesheet('char-start', '../images/character-start.png', 64, 64);
            this.game.load.spritesheet('bandit', '../images/dark-elf-bandit.png', 64, 64);

            this.game.stage.backgroundColor = 0xbada55;
        }
    }

    return LoadSprites;

}());

