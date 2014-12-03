var LM = LM || {};

LM.Zone = function(sizeX, sizeY) {
    this.Size = {
        X: sizeX,
        Y: sizeY
    }

    this.GenerateBoundaryObjects = function() {
        var walls = {
            Left: new LM.Things.ProtoThing(0, 0, 5, this.Size.Y),
            Top: new LM.Things.ProtoThing(0, 0, this.Size.X, 5),
            Right: new LM.Things.ProtoThing(this.Size.X - 5, 0, 5, this.Size.Y),
            Bottom: new LM.Things.ProtoThing(0, this.Size.Y - 20, this.Size.X, 5)
        }
		walls.Left.IsSolid = true;
        walls.Top.IsSolid = true;
        walls.Right.IsSolid = true;
		walls.Bottom.IsSolid = true;
        
        return walls;
    }

    this.Grid = [];

    this.CheckPosition = function() {

    }

}