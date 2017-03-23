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

    game.physics.arcade.collide(player.char, bandit.bandit, collision);
    
   // bandit.bandit.kill();
    
    //game.physics.arcade.overlap(player.char, bandit.bandit, collision);


    //if (player.char.x < bandit.bandit.x) {
    //    Debug.writeln(bandit.lookStay.left);
    //    bandit.bandit.frame = bandit.lookStay.left;
    //} else if (player.char.x > bandit.bandit.x) {
    //    bandit.bandit.frame = bandit.lookStay.right;
    //} 

   

    var betweenBelow = (player.char.y > bandit.bandit.y) && (player.char.x >= bandit.bandit.x) && (player.char.x <= bandit.bandit.x + bandit.bandit.width);
    var betweenUp = (player.char.y < bandit.bandit.y) && (player.char.x >= bandit.bandit.x) && (player.char.x <= bandit.bandit.x + bandit.bandit.width);
    var right = (player.char.x > bandit.bandit.x + bandit.bandit.width);
    var left = (player.char.x < bandit.bandit.x );
    if (betweenBelow) {
        bandit.bandit.frame = bandit.lookStay.down;
    } else if (betweenUp) {
        bandit.bandit.frame = bandit.lookStay.up;
    } else if (left) {
        bandit.bandit.frame = bandit.lookStay.left;
    } else if (right) {
        bandit.bandit.frame = bandit.lookStay.right;
    }

 

    // graphics.lineStyle(2, 0xffd900, 1);

    //graphics.beginFill(0xFF0000, 1);
    //graphics.drawCircle(bandit.bandit.x, bandit.bandit.y + (bandit.bandit.height/2), 1);
}

function collision(s1,s2) {

    Debug.writeln(player.direction);


    player.allowMove = false;
    player.followMousePointer = false;
    player.disableClick = true;
    s1.animations.stop();


    if (player.direction === 'up') {
        s2.body.velocity.y = -200;
    } else if (player.direction === 'down') {
        s2.body.velocity.y = 200;
    } else if (player.direction === 'left') {
        s2.body.velocity.x = -200;
    } else if (player.direction === 'right') {
        s2.body.velocity.x = 200;
    }


 

    s1.body.velocity.x = 0;
    s1.body.velocity.y = 0;
    setTimeout(function () {
        s2.body.velocity.x = 0;
        s2.body.velocity.y = 0;
        player.disableClick = false;
    }, 100);
   


}

function render() {
    game.debug.body(player.char);
    game.debug.body(bandit.bandit);
}






