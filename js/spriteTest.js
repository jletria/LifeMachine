LM.CreateSprite = function(X, Y) {

     data = {
         // DEFINING FRAMERATE:
         // this specifies the framerate that will be set on the SpriteSheet. See framerate
         // for more information.
         framerate: 20,

         // DEFINING IMAGES:
         // list of images or image URIs to use. SpriteSheet can handle preloading.
         // the order dictates their index value for frame definition.
         images: ["res/chars/Sprite-0001.png"],

         // DEFINING FRAMES:
            // the simple way to define frames, only requires frame size because frames are consecutive:
            // define frame width/height, and optionally the frame count and registration point x/y.
            // if count is omitted, it will be calculated automatically based on image dimensions.
           // frames: {width:64, height:64, count:20, regX: 32, regY:64},

            // OR, the complex way that defines individual rects for frames.
            // The 5th value is the image index per the list defined in "images" (defaults to 0).
            frames: [
                // x, y, width, height, imageIndex, regX, regY
                [0,0,12,21,0,0,0],
                [12,0,12,21,0,0,0],
                [24,0,12,21,0,0,0],
            ],

         // DEFINING ANIMATIONS:

            // simple animation definitions. Define a consecutive range of frames (begin to end inclusive).
            // optionally define a "next" animation to sequence to (or false to stop) and a playback "speed".
            animations: {
                // start, end, next, speed
                run: [0,1],
                stand: [2]
            }

         // the complex approach which specifies every frame in the animation by index.
         /*animations: {
             run: {
                 frames: [1,2]
             },
             stand: { frames: [3] }
         }*/

     }

    var spriteSheet = new createjs.SpriteSheet(data);
    var animation = new createjs.Sprite(spriteSheet, "run");
    animation.setTransform(X, Y, 2, 2);

    //LM.Engine.Stage.addChild(animation);
    return animation;
}