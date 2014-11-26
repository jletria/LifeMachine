var LM = LM || {};

LM.LifeForm = function(world, xLocation, yLocation, speed) { 
    this.World = world;

    this.Location = {
        X : xLocation,
        Y : yLocation
    };

    this.Moving = false;

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

        directionindex: 0,

        NS: function() { return this.nsa[this.directionindex]; },
        WE: function() { return this.wea[this.directionindex]; },

        Turn: function(direction) {
            this.directionindex += direction;
            if(this.directionindex == 8) this.directionindex = 0;
            if(this.directionindex == -1) this.directionindex = 7;
        }
    };

}

LM.LifeForm.prototype = {
    RunTickEvents: function() { for(var f in this.OnTick) { this.OnTick[f].call(this); } },

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
        this.Location.X += direction * this.Direction.WE() * this.Speed;
        this.Location.Y += direction * this.Direction.NS() * this.Speed;
    },

    UpdateSprite: function() {
        if(this.Sprite == null) return;
        this.Sprite.Update(this.Location.X, this.Location.Y);
    }
}
