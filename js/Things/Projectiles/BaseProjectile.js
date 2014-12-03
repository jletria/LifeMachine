var LM = LM || {};
LM.Things = LM.Things || {};
LM.Things.Projectiles = LM.Things.Projectiles || {};


LM.Things.Projectiles.Base = function(shooter, xSize, ySize, speed) {
    LM.Things.Base.call(this, shooter.Location.X, shooter.Location.Y + 30, xSize, ySize, speed);
    this.Shooter = shooter;
    this.Direction.directionindex = shooter.Direction.directionindex;

    
}
LM.Things.Projectiles.Base.prototype = Object.create(LM.Things.Base.prototype);
LM.Things.Projectiles.Base.prototype.Fire = function() {
    this.StartMoving();
}
