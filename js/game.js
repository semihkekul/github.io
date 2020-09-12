/* global layer */
/// <reference path="phaser.js" />




// using canvas here just because it runs faster for the body debug stuff
var game = new Phaser.Game(800, 800, Phaser.AUTO, 'game', null, false, false);

var BasicGame = function (game) { };

var swipeCoordX, swipeCoordY, swipeCoordX2, swipeCoordY2, swipeMinDistance = 100; 
var clicked = false;
BasicGame.Boot = function (game) {
    // nothing here
};

var  player;

var blueLock, orangeLock, greenLock;

var firstLayer = [
    [41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41,0, 41, 41, 41],
    [41, -1, -1, -1, 151, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, -1,0, -1, -1, 41],
    [41, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0,0, 0,0,0,0,0,0,0, -1, -1, 41],
    [41, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, 0, -1, -1, -1, -1, -1, 0, -1, -1, 41],
    [41, -1, -1, -1, -1, -1, 62, 62, 62, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, 41],
    [41, -1, -1, -1, -1, 62, -1, 62, 62, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 131, -1, -1, 0, -1, -1, 41],
    [41, -1, -1, 62, 62, 62, -1, 62, 62, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, 41],
    [41, -1, -1, 62, -1, -1, -1, 62, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, 41],
    [41, -1, -1, 62, 62, 62, 62, 62, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, -1, -1, 0, -1, -1, 41],
    [41, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, -1, -1, -1, -1, 0, 0, -1, -1, -1, 41],
    [41, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, -1, -1, 0, -1, -1, -1, -1, -1, 41],
    [41, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 0, 0, -1, -1, -1, -1, -1, -1, 41],
    [41, -1,  -1, 152, -1, 62, -1, -1, -1, 62, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 41],
    [41, -1, -1, -1, -1, 62, -1, -1, -1, 62, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 41],
    [41, 62, 62, 62, 62, 62, 62, 62, 62, 62, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 41],
    [41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41]


];


var playerGroup, firstGroup;

var scale = 0.4;

function DrawLayer() {


    var width = 16, height = 32;

    var tilesizeX = 70 * scale;
    var tilesizeY = 70 * scale;
    var tile;



    for (var i = 0; i < width ; ++i) {
        for (var j = 0; j < height; ++j) {
            if (firstLayer[i][j] != -1) {
                var tileId = firstLayer[i][j].toString();
                
                tile = game.add.isoSprite((j ) * tilesizeX, (i ) * tilesizeY, 32 , 'tileset', tileId, firstGroup);
                tile.scale.x = scale;
                tile.scale.y = scale;
                game.physics.isoArcade.enable(tile);
                tile.body.collideWorldBounds = true

                tile.smoothed = false;
                tile.body.moves = false;
                if(tileId === "152") // blueLock
                {
                    blueLock = tile;
                }
                else if(tileId === "131")
                {
                    greenLock = tile;
                }
                else if(tileId === "151")
                {
                    orangeLock = tile;
                }


                //tile.body.bounce.set(0.2, 0.2, 0.2);

            }
        }
    }
}


function processCallback (obj1, obj2)
{

    return true;

}

function fireClickEvent(element) {
    var evt = new window.MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
    });

    element.dispatchEvent(evt);
}

// this function will setup a virtual anchor element
// and fire click handler to open new URL in the same room
// it works better than location.href=something or location.reload()
function openNewURLInTheSameWindow(targetURL) {
    var a = document.createElement('a');
    a.href = targetURL;
    fireClickEvent(a);
}

function collisionCallback (obj1, obj2) {

   if(obj1 === blueLock || obj2 === blueLock)
   {
       game.stage.backgroundColor = '#0000aa';
       game.paused = true;
       openNewURLInTheSameWindow("https://www.facebook.com/semih.kekul.1");
   }
   else if(obj1 === greenLock || obj2 === greenLock)
   {
        game.stage.backgroundColor = '#00aa00';
        game.paused = true;
        openNewURLInTheSameWindow("https://github.com/semihkekul/");

    }
   else if(obj1 === orangeLock || obj2 === orangeLock)
   {
       game.stage.backgroundColor = '#ff6600';
       game.paused = true;
       openNewURLInTheSameWindow("https://tr.linkedin.com/in/semihkekul");

   }

}



BasicGame.Boot.prototype =
{
    preload: function () {

        game.time.advancedTiming = true;
        game.debug.renderShadow = false;
        game.stage.disableVisibilityChange = true;

        game.plugins.add(new Phaser.Plugin.Isometric(game));

        game.load.atlasJSONHash('tileset', 'assets/Tilesheet/tiles.png', 'assets/tiles.json');

        game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
        game.iso.anchor.setTo(0.5, 0.1);

        game.load.spritesheet('characterAnim', 'assets/characterAnim.png', 70, 74);

        game.world.setBounds(0, 0, 2800, 1000);

       
    },


    create: function () {
        game.stage.backgroundColor = '#000000';


        firstGroup = game.add.group();



      // we won't really be using IsoArcade physics, but I've enabled it anyway so the debug bodies can be seen
        firstGroup.enableBody = true;
        firstGroup.physicsBodyType = Phaser.Plugin.Isometric.ISOARCADE;




        //DrawLayer(1);



        // Set the global gravity for IsoArcade.
        game.physics.isoArcade.gravity.setTo(0, 0, -500);
           


         // Create another cube as our 'player', and set it up just like the cubes above.
        player = game.add.isoSprite(400, 200 , 200, 'characterAnim', 0, firstGroup);


       
        //player.anchor.set(0.5);
        game.physics.isoArcade.enable(player);
        player.body.collideWorldBounds = true
        
         player.scale.x = scale + 0.3 ;
         player.scale.y = scale + 0.3;
        player.alpha = 0.7;
        game.camera.follow(player);


        // add the animations from the spritesheet
        player.animations.add('S', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
        player.animations.add('SW', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);
        player.animations.add('W', [16, 17, 18, 19, 20, 21, 22, 23], 10, true);
        player.animations.add('NW', [24, 25, 26, 27, 28, 29, 30, 31], 10, true);
        player.animations.add('N', [32, 33, 34, 35, 36, 37, 38, 39], 10, true);
        player.animations.add('NE', [40, 41, 42, 43, 44, 45, 46, 47], 10, true);
        player.animations.add('E', [62, 49, 50, 51, 52, 53, 54, 55], 10, true);
        player.animations.add('SE', [56, 57, 58, 59, 60, 61, 62, 63], 10, true);
        // Set up our controls.
        this.cursors = game.input.keyboard.createCursorKeys();

        this.game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN
        ]);

        DrawLayer();

        // game.input.onDown.add(function (pointer)
        // {
        //      swipeCoordX = pointer.clientX; 
        //      swipeCoordY = pointer.clientY; 
        //      clicked = true;
        // }, this);
        // game.input.onUp.add(function (pointer) {
        //     swipeCoordX2 = pointer.clientX; 
        //     swipeCoordY2 = pointer.clientY;
            
        // }, this);      


    },
    update: function () {
     
        //game.physics.isoArcade.collide(firstGroup);
        game.physics.isoArcade.collideGroupVsSelf(firstGroup, collisionCallback, processCallback, this, false);

        game.iso.simpleSort(firstGroup);

        // Move the player at this speed.
        var speed = 100;

        if (clicked == false && this.game.input.activePointer.isDown) 
        {
             swipeCoordX = this.game.input.mousePointer.x; 
             swipeCoordY = this.game.input.mousePointer.y;
             console.log("mouse down");
             clicked = true;
        }
        else if(clicked == true &&  this.game.input.activePointer.isUp)
        {
            speed *= 10;
            swipeCoordX2 = this.game.input.mousePointer.x; 
            swipeCoordY2 = this.game.input.mousePointer.y;
            console.log("mouse up");
            //this.game.input.activePointer.reset();
            console.log(swipeCoordX + " "+swipeCoordX2);
            console.log(swipeCoordY + " "+swipeCoordY2);
            clicked = false;
            if (swipeCoordX2 < swipeCoordX - swipeMinDistance) {
            player.body.velocity.x = -speed;
            player.body.velocity.y = speed;
            player.animations.play('W');  
                console.log("W");
            }
            else if (swipeCoordX2 > swipeCoordX + swipeMinDistance) {
                
                            player.body.velocity.x = speed;
            player.body.velocity.y = -speed;
            player.animations.play('E');
            console.log("E");
            }
            else if (swipeCoordY2 < swipeCoordY - swipeMinDistance) {
                
                player.body.velocity.y = -speed ;
                player.body.velocity.x = -speed;
                player.animations.play('N');
                console.log("N");
                
            }
            else if (swipeCoordY2 > swipeCoordY + swipeMinDistance) {
                player.body.velocity.y = speed;
                player.body.velocity.x = speed;
                player.animations.play('S');
                console.log("S");
                
            }
        }
       else  if (this.cursors.up.isDown) {
            player.body.velocity.y = -speed;
            player.body.velocity.x = -speed;
            player.animations.play('N');
            
        }
        else if (this.cursors.down.isDown) {
            player.body.velocity.y = speed;
            player.body.velocity.x = speed;
            player.animations.play('S');
        }
     

        else if (this.cursors.left.isDown) {
            player.body.velocity.x = -speed;
            player.body.velocity.y = speed;
            player.animations.play('W');
        }
        else if (this.cursors.right.isDown) {
            player.body.velocity.x = speed;
            player.body.velocity.y = -speed;
            player.animations.play('E');
        }
        else {
            player.body.velocity.y = 0;
            player.body.velocity.x = 0;
        }

        

    },
    render: function () {
        //  bottomGroup.forEach(function (tile) {
        //     game.debug.body(tile, 'rgba(189, 221, 235, 0.6)', false);
        // });
       
        game.debug.text("FPS:" + game.time.fps || '--', 2, 14, "#a7aebe");
        game.debug.text(Phaser.VERSION, 2, game.world.height - 2, "#ffff00");
    }
};

game.state.add('Boot', BasicGame.Boot);
game.state.start('Boot');
