LM = LM || {};
LM.Things = LM.Things || {};
LM.Things.Projectiles = LM.Things.Projectiles || {};

LM.Things.Projectiles.MagicMissile = function(shooter) {
    this.Sprite = new LM.Sprites.MagicMissile();
    LM.Things.Projectiles.Base.call(this, shooter, 8, 8, 5);    
} 
LM.Things.Projectiles.Base.prototype = Object.create(LM.Things.Projectiles.Base.prototype)