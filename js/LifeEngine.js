var LM = LM || {};

LM.Engine = {
    
    LifeForms: {
        Player: null,
        NPC: null
    },
    
    Stage: null,
    
    InitStage: function() {
        this.Stage = new createjs.Stage("lmStage");
        var shape = new createjs.Shape();
        this.Stage.addChild(shape);
        var img = new Image();
        img.src = "res/floors/floor_tile_1.png";
        shape.graphics.clear()
        .beginBitmapFill(img, "repeat")
        .drawRect(0, 0, 1024, 1024);
    },
    
    InitLifeForms: function() {
        this.LifeForms.Player = new LM.LifeForm(250, 100, 5);
        this.LifeForms.Player.Sprite = LM.CreateSprite(250, 100);
        this.LifeForms.Player.Sprite.Update = function(X, Y) {
            this.setTransform(X, Y, 2, 2);
        }
        
        this.LifeForms.NPC = new LM.LifeForm(350, 350, 5);
        this.LifeForms.NPC.Sprite = this.CreateCircle(350, 350, "red");
        this.LifeForms.NPC.OnTick = function() {
            this.TurnRandomly();
            this.StepForward();
        }
        
        this.Stage.addChild(this.LifeForms.Player.Sprite);
        this.Stage.addChild(this.LifeForms.NPC.Sprite);
    },
    
    ActOnInput: function(keyCode, keydown) {
        if (keydown) {
            if (keyCode == 69)
                this.LifeForms.Player.Sprite.gotoAndPlay("attack");
            if (keyCode == 83)
                this.LifeForms.Player.SetDirectionUp();
            else if (keyCode == 87)
                this.LifeForms.Player.SetDirectionDown();
            else if (keyCode == 65)
                this.LifeForms.Player.SetDirectionLeft();
            else if (keyCode == 68)
                this.LifeForms.Player.SetDirectionRight();
            
            if (((keyCode == 87) || 
            (keyCode == 83) || 
            (keyCode == 65) || 
            (keyCode == 68)) 
            && (!this.LifeForms.Player.Running)) {
                this.LifeForms.Player.Running = true;
                this.LifeForms.Player.Sprite.gotoAndPlay("run");
                this.LifeForms.Player.StartMoving();
            }
        } 
        else {
            if (((keyCode == 87) || 
            (keyCode == 83) || 
            (keyCode == 65) || 
            (keyCode == 68)) 
            && (LM.Engine.LifeForms.Player.Running)) {
                LM.Engine.LifeForms.Player.Running = false;
                LM.Engine.LifeForms.Player.StopMoving();
                LM.Engine.LifeForms.Player.Sprite.gotoAndPlay("stand");
            }
        }
    },
    
    OnTick: function(event) {
        //console.log(createjs.Ticker.getTicks());
        
        for (var property in this.LifeForms) {
            if (this.LifeForms.hasOwnProperty(property)) {
                this.LifeForms[property].OnTick();
                this.LifeForms[property].UpdateSprite();
            }
        }
        this.Stage.update();
    },
    
    InitTicker: function() {
        createjs.Ticker.setInterval(60);
        createjs.Ticker.addEventListener("tick", function(event) {
            LM.Engine.OnTick(event);
        });
    },
    
    InitEvents: function() {
        window.onkeyup = function(event) {
            //console.log(event.keyCode)
            LM.Engine.ActOnInput(event.keyCode, false);
        }
        
        window.onkeydown = function(event) {
            //console.log(event.keyCode)
            LM.Engine.ActOnInput(event.keyCode, true);
        }
    },
    
    Start: function() {
        this.InitStage();
        this.InitLifeForms();
        this.InitTicker();
        this.InitEvents();
    },
    
    
    
    
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
    }
}
