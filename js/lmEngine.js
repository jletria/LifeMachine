var LM = LM || {};

LM.Engine = {

    CreateCircle: function(positionX, positionY, color) {
        var circle = new createjs.Shape();

        circle.Update = function(X, Y) {
            this.x = X;
            this.y = Y;
        }

        circle.graphics.beginFill(color).drawCircle(0, 0, 30);
        circle.x = positionX;
        circle.y = positionY;
        return circle;
    },

    Player: null,
    NPC: null,

    PlayerSprite: null,
    NPCSprite: null,

    Stage: null,

    Start: function() {
        this.Stage = new createjs.Stage("lmStage");
        var shape = new createjs.Shape();
        this.Stage.addChild(shape);
        var img = new Image();
        img.src = "res/floors/floor_tile_1.png";
        shape.graphics.clear()
                .beginBitmapFill(img, "repeat")
                .drawRect(0,0,1024,1024);
  
        this.Stage.update();

        this.Player = new LM.LifeForm(250, 100, 5);
        this.NPC = new LM.LifeForm(350, 350, 5);

        this.PlayerSprite = LM.CreateSprite(250, 100); //= this.CreateCircle(250, 100, "blue", 2);

        this.PlayerSprite.Update = function(X, Y) {
            this.setTransform(X, Y, 2, 2);
        }

        this.Stage.addChild(this.PlayerSprite);

        this.NPCSprite = this.CreateCircle(350, 350, "red");
        this.Stage.addChild(this.NPCSprite);

        createjs.Ticker.setInterval(60);

        createjs.Ticker.addEventListener("tick", function(event) {
            //console.log(createjs.Ticker.getTicks());
            LM.Engine.NPC.TurnRandomly();
            LM.Engine.NPC.StepForward();
            LM.Engine.NPCSprite.Update(LM.Engine.NPC.Location.X, LM.Engine.NPC.Location.Y);
            LM.Engine.Stage.update();
        });

        window.onkeyup = function(event) {
            if(LM.Engine.PlayerSprite.running) {
                LM.Engine.PlayerSprite.gotoAndPlay("stand");
                LM.Engine.PlayerSprite.running = false;
            }
        }

        window.onkeypress = function(event) {
            //console.log(event.keyCode);
            if(event.keyCode == 101) LM.Engine.PlayerSprite.gotoAndPlay("attack");
            if(event.keyCode == 115) LM.Engine.Player.SetDirectionUp();
            else if(event.keyCode == 119) LM.Engine.Player.SetDirectionDown();
            else if(event.keyCode == 97) LM.Engine.Player.SetDirectionLeft();
            else if(event.keyCode == 100) LM.Engine.Player.SetDirectionRight();
            if((event.keyCode == 115) || (event.keyCode == 119) || (event.keyCode == 97) || (event.keyCode == 100)) { 
                if(!LM.Engine.PlayerSprite.running) {
                    LM.Engine.PlayerSprite.gotoAndPlay("run");
                    LM.Engine.PlayerSprite.running = true;
                }
                LM.Engine.Player.StepForward();
                LM.Engine.PlayerSprite.Update(LM.Engine.Player.Location.X, LM.Engine.Player.Location.Y)
            }

        };
        this.Stage.update();
    }
}