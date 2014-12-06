LM = LM || {};
LM.Things = LM.Things || {};
LM.Things.LifeForms = LM.Things.LifeForms || {};

LM.Things.LifeForms.Wizard = function(xLocation, yLocation, xSize, ySize, speed) {
    LM.Things.LifeForms.Base.call(this, xLocation, yLocation, xSize, ySize, speed);    
    
    this.Shoot = function() {
        var magicMissile = new LM.Things.Projectiles.MagicMissile(this);
        return magicMissile;
    }

} 
LM.Things.LifeForms.Wizard.prototype = Object.create(LM.Things.LifeForms.Base.prototype)

/// BlueWizard ///

LM.Things.LifeForms.BlueWizard = function(xLocation, yLocation, xSize, ySize, speed) {
    this.TypeDescriptor = 'Blue Wizard';
    this.Sprite = new LM.Sprites.BlueWizard();
    LM.Things.LifeForms.Wizard.call(this, xLocation, yLocation, xSize, ySize, speed);
}
LM.Things.LifeForms.BlueWizard.prototype = Object.create(LM.Things.LifeForms.Wizard.prototype)

/// DarkWizard ///

LM.Things.LifeForms.DarkWizard = function(xLocation, yLocation, xSize, ySize, speed) {
    this.TypeDescriptor = 'Dark Wizard';
    this.Sprite = new LM.Sprites.DarkWizard();
    LM.Things.LifeForms.Wizard.call(this, xLocation, yLocation, xSize, ySize, speed);
}
LM.Things.LifeForms.DarkWizard.prototype = Object.create(LM.Things.LifeForms.Wizard.prototype)