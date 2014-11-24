
LM.LifeForm = function(xLocation, yLocation, speed) {
    this.Location = {
        X : xLocation,
        Y : yLocation
    }
    
    this.Health = 100;
    this.Speed = speed;
    this.Damage = 5;
    this.APS = 1;   // Attacks per Second

    this.Direction = {
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
    }

    this.TurnLeft = function() { this.Direction.Turn(1); }
    this.TurnRight = function() { this.Direction.Turn(-1); }

    this.RandomChange = function() { return Math.floor((Math.random() * 3) + 1) - 2; }

    this.TurnRandomly = function() {
        this.Direction.Turn(this.RandomChange());
    }

    this.MoveRandomly = function() {
        this.Move(this.RandomChange());
    }
    
    this.TurnLeft = function() { this.Direction.Turn(1); },
    this.TurnRight = function() { this.Direction.Turn(-1); },

    this.TurnRandomly = function() {
        this.Direction.Turn(Math.floor((Math.random() * 3) + 1) - 2);
    }

    this.StepForward = function() {
        this.Move(1);
    }

    this.StepBackward = function() {
        this.Move(-1);
    }

    this.Move = function(direction) {
        this.Location.X += direction * this.Direction.WE() * this.Speed;
        this.Location.Y += direction * this.Direction.NS() * this.Speed;
    }
}
