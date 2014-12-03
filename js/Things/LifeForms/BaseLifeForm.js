var LM = LM || {};
LM.Things = LM.Things || {};
LM.Things.LifeForms = LM.Things.LifeForms || {};

LM.Things.LifeForms.Base = function(xLocation, yLocation, xSize, ySize, speed) {
    this.IsSolid = true;
    LM.Things.Base.call(this, xLocation, yLocation, xSize, ySize, speed);
}
LM.Things.LifeForms.Base.prototype = Object.create(LM.Things.Base.prototype);

