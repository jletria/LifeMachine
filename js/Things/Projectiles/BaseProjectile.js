var LM = LM || {};
LM.Things = LM.Things || {};
LM.Things.Projectiles = LM.Things.Projectiles || {};


LM.Things.Projectiles.Base = function(shooter, xSize, ySize, speed) {
    this.Shooter = shooter;
    this.World = shooter.World;
    this.Direction.directionindex = shooter.Direction.directionindex;

    LM.Things.Base.call(this, world, shooter.Location.X, shooter.Location.Y, xSize, ySize, speed);
}
LM.Things.Projectiles.Base.prototype = Object.create(LM.Things.Base.prototype);
