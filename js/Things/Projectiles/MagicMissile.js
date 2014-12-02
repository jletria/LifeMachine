LM = LM || {};
LM.Things = LM.Things || {};
LM.Things.Projectiles = LM.Things.Projectiles || {};

LM.Things.Projectiles.MagicMissile = function(shooter) {
    this.Sprite = new LM.Sprites.MagicMissile(shooter.Location.X, shooter.Location.Y);
    LM.Things.Projectiles.Base.call(this, shooter, 8, 8, 60);    
} 
LM.Things.Projectiles.MagicMissile.prototype = Object.create(LM.Things.Projectiles.Base.prototype)