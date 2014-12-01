LM = LM || {};

LM.Wizard = function(world, xLocation, yLocation, xSize, ySize, speed) {
    LM.LifeForm.call(this, world, xLocation, yLocation, xSize, ySize, speed);    
} 
LM.Wizard.prototype = Object.create(LM.LifeForm.prototype)



LM.BlueWizard = function(world, xLocation, yLocation, xSize, ySize, speed) {
    this.Sprite = new LM.Sprites.BlueWizard();
    LM.Wizard.call(this, world, xLocation, yLocation, xSize, ySize, speed);
}
LM.BlueWizard.prototype = Object.create(LM.Wizard.prototype)



LM.DarkWizard = function(world, xLocation, yLocation, xSize, ySize, speed) {
    this.Sprite = new LM.Sprites.DarkWizard();
    LM.Wizard.call(this, world, xLocation, yLocation, xSize, ySize, speed);
}
LM.DarkWizard.prototype = Object.create(LM.Wizard.prototype)