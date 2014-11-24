var LM = LM || {};

LM.Engine = {

    CreateCircle: function(positionX, positionY, color) {
        var circle = new createjs.Shape();
       
        circle.Update = function(X, Y) {
            this.x = X;
            this.y = Y;
            LM.Engine.Stage.update();
        }
        
        circle.graphics.beginFill(color).drawCircle(0, 0, 30);
        circle.x = positionX;
        circle.y = positionY;
        return circle;
    },

    Player: null,
    NPC: null,

    CharCircle: null,
    NPCCircle: null,

    Stage: null,
    Start: function() {
        this.Stage = new createjs.Stage("lmStage");
        
        this.Player = new LM.LifeForm(250, 100, 5);
        this.NPC = new LM.LifeForm(350, 350, 5);

        this.CharCircle = LM.CreateSprite(250, 100); //= this.CreateCircle(250, 100, "blue", 2);
        
        this.CharCircle.Update = function(X, Y) {
            this.regX = X;
            this.regY = Y;
            LM.Engine.Stage.update();
        }

        this.Stage.addChild(this.CharCircle);

        this.NPCCircle = this.CreateCircle(350, 350, "red");
        this.Stage.addChild(this.NPCCircle);
        
        createjs.Ticker.setInterval(60);

        createjs.Ticker.addEventListener("tick", function(event) {
            //console.log(createjs.Ticker.getTicks());
            LM.Engine.NPC.TurnRandomly();
            LM.Engine.NPC.StepForward();
            LM.Engine.NPCCircle.Update(LM.Engine.NPC.Location.X, LM.Engine.NPC.Location.Y);
        });

        window.onkeypress = function(event) {
            if(event.keyCode == 119 || event.keyCode == 115) {
                if(event.keyCode == 119) LM.Engine.Player.StepForward();
                if(event.keyCode == 115) LM.Engine.Player.StepBackward();
                LM.Engine.CharCircle.Update(LM.Engine.Player.Location.X, LM.Engine.Player.Location.Y) 
            }
            if(event.keyCode == 97) LM.Engine.Player.TurnLeft();
            if(event.keyCode == 100) LM.Engine.Player.TurnRight();
        };



        this.Stage.update();

    }
}