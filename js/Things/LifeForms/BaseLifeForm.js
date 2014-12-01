var LM = LM || {};
LM.Things = LM.Things || {};
LM.Things.LifeForms = LM.Things.LifeForms || {};

LM.Things.LifeForms.Base = function(world, xLocation, yLocation, xSize, ySize, speed) {
    LM.Things.Base.call(this, world, xLocation, yLocation, xSize, ySize, speed);
}
LM.Things.LifeForms.Base .prototype = Object.create(LM.Things.Base.prototype);

