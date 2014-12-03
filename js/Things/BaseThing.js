var LM = LM || {};
LM.Things = LM.Things || {};

LM.Things.ProtoThing = function(xLocation, yLocation, xSize, ySize) {
    this.Location = {
        X : xLocation,
        Y : yLocation
    };

    this.Size = {
        X: xSize,
        Y: ySize
    }
}

LM.Things.Base = function(xLocation, yLocation, xSize, ySize, speed) {
    LM.Things.ProtoThing.call(this, xLocation, yLocation, xSize, ySize);

    this.Moving = false;

    this.Visible = true;
    this.Destroyed = false;

    this.Health = 100;
    this.Speed = speed;
    this.Damage = 5;
    this.APS = 1;

    this.OnTick = [
        function() { if(this.Moving) this.StepForward(); },
        function() { this.UpdateSprite(); }
    ];

    this.Direction = {
        nsa: [-1, 0, 1, 1, 1, 0,-1,-1],
        wea: [-1,-1,-1, 0, 1, 1, 1, 0],

        Invert: function() {
          if(this.directionindex > 3) this.directionindex = this.directionindex - 4;
          else this.directionindex = this.directionindex + 4;
        },

        directionindex: 0,

        NS: function() { return this.nsa[this.directionindex]; },
        WE: function() { return this.wea[this.directionindex]; },

        Turn: function(direction) {
            this.directionindex += direction;
            if(this.directionindex == 8) this.directionindex = 0;
            if(this.directionindex == -1) this.directionindex = 7;
        },
    };
    
    this.CollidedWith = function(thing) {};
}

LM.Things.Base.prototype = {
    RunTickEvents: function() { for(var f in this.OnTick) { 
        this.OnTick[f].call(this); 
    }},

    SetDirectionLeft: function()  { this.Direction.directionindex = 1; },
    SetDirectionRight: function()  { this.Direction.directionindex = 5; },
    SetDirectionUp: function()  { this.Direction.directionindex = 3; },
    SetDirectionDown: function() { this.Direction.directionindex = 7; },

    RandomChange: function() { return Math.floor((Math.random() * 3) + 1) - 2; },
    TurnRandomly: function() { this.Direction.Turn(this.RandomChange()); },
    MoveRandomly: function() { this.Move(this.RandomChange()); },

    TurnLeft: function() { this.Direction.Turn(1); },
    TurnRight: function() { this.Direction.Turn(-1); },

    StepForward: function() { this.Move(1); },
    StepBackward: function() { this.Move(-1); },
    StartMoving: function() { this.Moving = true; },
    StopMoving: function() { this.Moving = false; },

    Move: function(direction) {
        if(this.MovingLock) return;
        this.MovingLock = true;


        var futureState = new LM.Things.ProtoThing(this.Location.X, this.Location.Y, this.Size.X, this.Size.Y);
        futureState.Location.X += direction * this.Direction.WE() * this.Speed;
        futureState.Location.Y += direction * this.Direction.NS() * this.Speed;
        var collisions = LM.Engine.GetCollisions(futureState);
        if(collisions.length == 1) {
            this.Location.X = futureState.Location.X;
            this.Location.Y = futureState.Location.Y;
        }
        else this.CollidedWith(collisions);

        this.MovingLock = false;
    },

    UpdateSprite: function() {
        if(this.Sprite == null) return;
        this.Sprite.x = this.Location.X;
        this.Sprite.y = this.Location.Y;
    }
}