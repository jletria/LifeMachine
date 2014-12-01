var LM = LM || {};
LM.InitSprites = function () {
    LM.Sprites = {};

    LM.Sprites.BaseSprite = function(locationX, locationY) {
        this.Location = {
            X : locationX,
            Y : locationY
        };
        this.frames = this.GenerateHorizontalSpriteMatrix();
    }

    LM.Sprites.BaseSprite.prototype.GenerateHorizontalSpriteMatrix = function() {
        frames = [];
        for(var i=0 ; i < this.NumberOfFrames; i++) 
            frames.push([this.Size.X * i, 0, this.Size.X, this.Size.Y, 0, 0, 0]);
        return frames;
    }

    LM.Sprites.BaseSprite.prototype.Get = function() {
        var spriteSheet = new createjs.SpriteSheet(this);
        var animation = new createjs.Sprite(spriteSheet, "stand");
        animation.x = this.Location.X; animation.y = this.Location.Y;
        animation.setTransform(this.Location.X, this.Location.Y, 2, 2);
        return animation;
    }

    /// WIZARD ABSTRACT ///

    LM.Sprites.Wizard = function(locationX, locationY) {
        this.Size = {
            X : 36,
            Y : 37
        },

        this.NumberOfFrames = 8,
        this.framerate = 20,
        this.animations = {
            // frames, start, end, next, speed
            attack: { frames: [0,1,2,3,4,3,2,3,4,3,2,3,4,3,2,1] , next: "stand" },
            run: [5,6],
            stand: [7]
        }
        LM.Sprites.BaseSprite.call(this, locationX, locationY);
    };
    LM.Sprites.Wizard.prototype = Object.create(LM.Sprites.BaseSprite.prototype);

    /// BLUE WIZARD ///

    LM.Sprites.BlueWizard = function(locationX, locationY) {
        LM.Sprites.Wizard.call(this, locationX, locationY);
        this.images = [ LM.Assets.Get('BlueWizard') ];
        return this.Get();
    }
    LM.Sprites.BlueWizard.prototype = Object.create(LM.Sprites.Wizard.prototype)


    /// DARK WIZARD ///

    LM.Sprites.DarkWizard = function(locationX, locationY) {
        LM.Sprites.Wizard.call(this, locationX, locationY);
        this.images = [ LM.Assets.Get('DarkWizard') ];
        return this.Get();
    }
    LM.Sprites.DarkWizard.prototype = Object.create(LM.Sprites.Wizard.prototype)


    /// MagicMissile ///
    
    LM.Sprites.MagicMissile = function(locationX, locationY) {
        LM.Sprites.BaseSprite.call(this, locationX, locationY);
        this.images = [ LM.Assets.Get('MagicMissile') ];
        return this.Get();
    }
    LM.Sprites.MagicMissile.prototype = Object.create(LM.Sprites.BaseSprite.prototype)

}