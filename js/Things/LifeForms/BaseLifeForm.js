var LM = LM || {};
LM.Things = LM.Things || {};
LM.Things.LifeForms = LM.Things.LifeForms || {};

LM.Things.LifeForms.Base = function(xLocation, yLocation, xSize, ySize, speed) {
    this.IsSolid = true;
    LM.Things.Base.call(this, xLocation, yLocation, xSize, ySize, speed);
}
LM.Things.LifeForms.Base.prototype = Object.create(LM.Things.Base.prototype);
LM.Things.LifeForms.Base.prototype.Walk = function() {
    this.Action = 'walk';
    this.StartMoving();
}
LM.Things.LifeForms.Base.prototype.Stop = function() {
    this.Action = 'stand';
    this.StopMoving();
}
LM.Things.LifeForms.Base.prototype.Attack = function() {
    this.Action = 'attack';
}
