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

    LM.Sprites.BaseSprite.prototype.Get = function(defaultAnimation) {
        var spriteSheet = new createjs.SpriteSheet(this);
        var animation = new createjs.Sprite(spriteSheet, defaultAnimation);
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
            walk: [5,6],
            stand: [7],
            default: ["stand"]
        }
        LM.Sprites.BaseSprite.call(this, locationX, locationY);
    };
    LM.Sprites.Wizard.prototype = Object.create(LM.Sprites.BaseSprite.prototype);

    /// BLUE WIZARD ///

    LM.Sprites.BlueWizard = function(locationX, locationY) {
        LM.Sprites.Wizard.call(this, locationX, locationY);
        this.images = [ LM.Assets.Get('BlueWizard') ];
        return this.Get('stand');
    }
    LM.Sprites.BlueWizard.prototype = Object.create(LM.Sprites.Wizard.prototype)


    /// DARK WIZARD ///

    LM.Sprites.DarkWizard = function(locationX, locationY) {
        LM.Sprites.Wizard.call(this, locationX, locationY);
        this.images = [ LM.Assets.Get('DarkWizard') ];
        return this.Get('stand');
    }
    LM.Sprites.DarkWizard.prototype = Object.create(LM.Sprites.Wizard.prototype)


    /// MagicMissile ///
    
    LM.Sprites.MagicMissile = function(locationX, locationY) {
        this.Size = {
            X : 8,
            Y : 8
        },

        this.NumberOfFrames = 256,
        this.framerate = 20,
        this.animations = {
           burn: [0,255],
           default: ["burn"]
        }
        this.images = [ LM.Assets.Get('MagicMissile') ];
        LM.Sprites.BaseSprite.call(this, locationX, locationY);
        return this.Get('burn');
    }
    LM.Sprites.MagicMissile.prototype = Object.create(LM.Sprites.BaseSprite.prototype)

}