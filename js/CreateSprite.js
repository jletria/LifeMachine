LM.CreateSprite = function(X, Y) {

     data = {
        framerate: 20,
        images: ["res/chars/Wizard.png"],

     // frames: {width:64, height:64, count:20, regX: 32, regY:64},
        frames: [
            // x, y, width, height, imageIndex, regX, regY

            [0, 0,36,37,0,0,0],
            [36,0,36,37,0,0,0],
            [72,0,36,37,0,0,0],
            [108,0,36,37,0,0,0],
            [144, 0,36,37,0,0,0],
            [180,0,36,37,0,0,0],
            [216,0,36,37,0,0,0],
            [252,0,36,37,0,0,0]
        ],

        animations: {
            // frames, start, end, next, speed
            attack: { frames: [0,1,2,3,4,3,2,3,4,3,2,3,4,3,2,1,] , next: "stand" },
            run: [5,6],
            stand: [7]
        }
     }

    var spriteSheet = new createjs.SpriteSheet(data);
    var animation = new createjs.Sprite(spriteSheet, "stand");
    animation.setTransform(X, Y, 2, 2);
    return animation;
}