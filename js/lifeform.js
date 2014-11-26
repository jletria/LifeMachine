
LM.LifeForm = function(xLocation, yLocation, speed) { 
    this.Location = {
        X : xLocation,
        Y : yLocation
    };

    this.Health = 100;
    this.Speed = speed;
    this.Damage = 5;
    this.APS = 1;
}

LM.LifeForm.prototype = {
    // Attacks per Second

    Direction: {
        directionindex: 0,
        nsa: [-1, 0, 1, 1, 1, 0,-1,-1],
        wea: [-1,-1,-1, 0, 1, 1, 1, 0],

        NS: function() { return this.nsa[this.directionindex]; },
        WE: function() { return this.wea[this.directionindex]; },

        Turn: function(direction) {
            this.directionindex += direction;
            if(this.directionindex == 8) this.directionindex = 0;
            if(this.directionindex == -1) this.directionindex = 7;
        }
    },

    TurnLeft: function() { this.Direction.Turn(1); },
    TurnRight: function() { this.Direction.Turn(-1); },

    SetDirectionLeft: function()  { this.Direction.directionindex = 1; },
    SetDirectionRight: function()  { this.Direction.directionindex = 5; },
    SetDirectionUp: function()  { this.Direction.directionindex = 3; },
    SetDirectionDown: function() { this.Direction.directionindex = 7; },

    RandomChange: function() { return Math.floor((Math.random() * 3) + 1) - 2; },

    TurnRandomly: function() {
        this.Direction.Turn(this.RandomChange());
    },

    MoveRandomly: function() {
        this.Move(this.RandomChange());
    },

    TurnLeft: function() { this.Direction.Turn(1); },
    TurnRight: function() { this.Direction.Turn(-1); },

    TurnRandomly: function() {
        this.Direction.Turn(Math.floor((Math.random() * 3) + 1) - 2);
    },

    StepForward: function() {
        this.Move(1);
    },

    StepBackward: function() {
        this.Move(-1);
    },

    Moving: null,

    StartMoving: function() {
        if(this.Moving == null) this.Moving = setInterval(function () { LM.Engine.LifeForms.Player.StepForward() }, 60);
    },

    StopMoving: function() {
        clearInterval(this.Moving);
        this.Moving = null;
    },

    Move: function(direction) {
        this.Location.X += direction * this.Direction.WE() * this.Speed;
        this.Location.Y += direction * this.Direction.NS() * this.Speed;
    },

    UpdateSprite: function() {
        if(this.Sprite == null) return;
        this.Sprite.Update(this.Location.X, this.Location.Y);
    },

    OnTick: function() {

    }
}
