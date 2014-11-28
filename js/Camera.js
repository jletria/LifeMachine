var LM = LM || {}

LM.Camera = function(world, sizeX, sizeY, locationX, locationY) {
    
    if(locationX + sizeX > world.Size.X || locationY + sizeY > world.Size.Y 
               || sizeX < 0 || sizeY < 0 
           || locationX < 0 || location Y < 0) 
        throw 'Invalid size or location';

    this.World = world;
    
    this.Size {
        X: sizeX,
        Y: sizeY
    }

    this.Location {
        X: locationX,
        Y: locationY
    }

    this.SetLocation = function(x, y) {
        this.Location.X = x;
        this.Location.Y = y;
        this.ValidityCheck();    
    }

    this.GetWorldLocation = function() {
        return 
    }

    this.ValidityCheck = function() {
        if(this.Location.X + this.Size.X > this.World.Size.X)
            this.Location.X = this.World.Size.X - this.Size.X
        if(this.Location.Y + this.Size.Y > this.World.Size.Y)
            this.Location.Y = this.World.Size.Y - this.Size.Y
    }
}