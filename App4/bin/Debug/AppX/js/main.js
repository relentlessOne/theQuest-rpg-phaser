var game = new Phaser.Game(1024, 760, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

var player;
var bandit;

function preload() {
     new LoadSprites(this);
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
  
    player = new Player(game);
 
    bandit = new Bandit(game);


}

function update() {

    player.update();
    //game.physics.arcade.overlap(player, bandit, null, this);

     game.physics.arcade.collide(player.char, bandit.bandit);
    
   // bandit.bandit.kill();
    
   // game.physics.arcade.overlap(player.char, bandit.bandit, collision);

}

function collision() {
    Debug.writeln("x");
}

function render() {
    game.debug.body(player.char);
    game.debug.body(bandit.bandit);
}






