var LM = LM || {};

LM.GenerateHorizontalSpriteMatrix = function(width, height, numberOfFrames) {
    frames = [];
    for(var i=0 ; i < numberOfFrames; i++) 
        frames.push([width * i, 0, width, height, 0, 0, 0]);
    return frames;
}

LM.CreateSprite = function(bitmap, locationX, locationY, sizeX, sizeY) {

     data = {
        framerate: 20,
        images: [ bitmap ],

        frames: LM.GenerateHorizontalSpriteMatrix(sizeX,sizeY,8),

        animations: {
            // frames, start, end, next, speed
            attack: { frames: [0,1,2,3,4,3,2,3,4,3,2,3,4,3,2,1,] , next: "stand" },
            run: [5,6],
            stand: [7]
        }
     }

    var spriteSheet = new createjs.SpriteSheet(data);
    var animation = new createjs.Sprite(spriteSheet, "stand");
    animation.x = locationX;
    animation.y = locationY;
    
    animation.setTransform(locationX, locationY, 2, 2);
    return animation;
}