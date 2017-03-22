var game = new Phaser.Game(1024, 760, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var player;
var wolf;

function preload() {
     new LoadSprites(this);
}

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    player = new Player(game);
    wolf = new Wolf(game);


}

function update() {

    player.update();

   // game.physics.arcade.overlap(char, wolf, collision);

}

function collision(char, wolf) {
    followMousePointer = false;
}






