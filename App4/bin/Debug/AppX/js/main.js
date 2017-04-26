var game = new Phaser.Game(1024, 760, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

var player;
var bandit;
var mapArr;
var arrayForAStar;

function preload() {


    var csvArr = new csvToArr();

    game.load.tilemap('world1', 'level_info/worldMap.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tile1', 'level_info/base_out_atlas.png');
    game.load.image('tile2', 'level_info/build_atlas.png');
    game.load.image('tile3', 'level_info/obj_misk_atlas.png');
    game.load.image('tile4', 'level_info/terrain_atlas.png');
    new LoadSprites(this);

    setTimeout(() => {
   
        arrayForAStar = csvArr.returnParsedData();
        for (var i = 0; i < 100 ; i++) {
            for (var j = 0; j < 100 ; j++) {
                Debug.write(arrayForAStar[i][j] + ",");
            }
            Debug.writeln();
        }
    }, 1000);


  



    //for (var i = 0; i < 100 ; i++) {
    //    for (var j = 0; j < 100 ; j++) {
    //        Debug.write(arrayForAStar.data[i][j] + ",");
    //    }
    //    Debug.writeln();
    //}


}

var map;
var layer;
var marker;


function create() {
    game.physics.startSystem(Phaser.Physics.P2JS);


    map = game.add.tilemap('world1');

    //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
    //  The second parameter maps this name to the Phaser.Cache key 'tiles'
    map.addTilesetImage('base_out_atlas', 'tile1');
    map.addTilesetImage('terrain_atlas', 'tile4');
    map.addTilesetImage('build_atlas', 'tile2');
    map.addTilesetImage('obj_misk_atlas', 'tile3');

    //  Creates a layer from the World1 layer in the map data.
    //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.

  


    layer = map.createLayer('Trawa-drogi');
    layer = map.createLayer('kanion');
   // layer = map.createLayer('Warstwa Kafelków 3');

    player = new Player(game);

    bandit = new Bandit(game);

   // game.physics.arcade.collide(player.char, 'kanion');
    map.setCollisionBetween(1, 10000, true, 'kanion');
    //  This resizes the game world to match the layer dimensions
    layer.resizeWorld();

    game.camera.follow(player.char, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

    marker = game.add.graphics();
    marker.lineStyle(2, 0xffffff, 1);
    marker.drawRect(0, 0, 32, 32);

    game.input.addMoveCallback(updateMarker, this);

 
 


}

function updateMarker() {

    marker.x = layer.getTileX(game.input.activePointer.worldX) * 32;
    marker.y = layer.getTileY(game.input.activePointer.worldY) * 32;

}

function update() {

    player.update();


    game.physics.arcade.collide(player.char, bandit.bandit, collision);

    game.physics.arcade.collide(player.char, layer);
    

   

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
  //  game.debug.body(player.char);
    game.debug.body(bandit.bandit);
}






