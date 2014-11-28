var LM = LM || {};

LM.Engine = {
    
    LifeForms: {
        Player: null,
        NPC: null
    },
    
    InitWorld: function() {
        this.World = new LM.World(1024, 1024);

        this.Stage = new createjs.Stage("lmStage");
        var shape = new createjs.Shape();
        this.Stage.addChild(shape);
        var img = new Image();
        img.src = "res/floors/floor_tile_1.png";
        shape.graphics.clear().beginBitmapFill(img, "repeat").drawRect(0, 0, 1024, 1024);
    },
    
    InitLifeForms: function() {
        this.LifeForms.Player = new LM.LifeForm(this.World, 250, 100, 250, 100, 5);
        this.LifeForms.Player.Sprite = LM.CreateSprite(250, 100);
        this.LifeForms.Player.Sprite.Update = function(X, Y) { 
            this.setTransform(X, Y, 2, 2); 
        }
        
        this.LifeForms.NPC = new LM.LifeForm(this.World, 350, 350, 50, 50, 5);
        this.LifeForms.NPC.Sprite = this.CreateSquare(250, 100, 50, 50, "red");
        this.LifeForms.NPC.OnTick.push(function() {
            this.TurnRandomly();
            this.StepForward();
        });
        
        for(var i in this.LifeForms) this.Stage.addChild(this.LifeForms[i].Sprite);
    },
    
    ActOnInput: function(keyCode, keydown) {
        if (keydown) {
            switch(keyCode) {
                case 69: this.LifeForms.Player.Sprite.gotoAndPlay("attack"); break;

                case 83: this.LifeForms.Player.SetDirectionUp();    break;
                case 87: this.LifeForms.Player.SetDirectionDown();  break;
                case 65: this.LifeForms.Player.SetDirectionLeft();  break;
                case 68: this.LifeForms.Player.SetDirectionRight(); break;
            }
            if (((keyCode == 87) || 
                 (keyCode == 83) || 
                 (keyCode == 65) || 
                 (keyCode == 68)) 
            && !this.LifeForms.Player.Running) {
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
            && this.LifeForms.Player.Running) {
                this.LifeForms.Player.Running = false;
                this.LifeForms.Player.StopMoving();
                this.LifeForms.Player.Sprite.gotoAndPlay("stand");
            }
        }
    },
    
    OnTick: function(event) {
        //console.log(createjs.Ticker.getTicks());
        for (var i in this.LifeForms) if (this.LifeForms.hasOwnProperty(i)) this.LifeForms[i].RunTickEvents();
        this.Stage.update();

        var player = this.LifeForms.Player;
        var npc = this.LifeForms.NPC;

        if (player.Location.X < npc.Location.X + npc.Size.X  && player.Location.X + player.Size.X  > npc.Location.X &&
		player.Location.Y < npc.Location.Y + npc.Size.Y && player.Location.Y + player.Location.Y > npc.Location.Y) {
            console.log('TOUCHY!')
        }
        else console.log('NO TOUCHY!')
    },
    
    InitTime: function() {
        createjs.Ticker.setInterval(60);
        createjs.Ticker.addEventListener("tick", function(event) { LM.Engine.OnTick(event); });
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
        this.InitWorld();
        this.InitLifeForms();
        this.InitTime();
        this.InitEvents();
    },
    
    CreateCircle: function(positionX, positionY, color) {
        var circle = new createjs.Shape();
        circle.Update = function(X, Y) { this.x = X; this.y = Y; }
        circle.graphics.beginFill(color).drawCircle(0, 0, 30);
        circle.x = positionX;
        circle.y = positionY;
        return circle;
    },

    CreateSquare: function(positionX, positionY, sizeX, sizeY, color) {
        var square = new createjs.Shape();
        square.Update = function(X, Y) { this.x = X; this.y = Y; }
        square.graphics.beginFill(color).drawRect(positionX, positionY, sizeX, sizeY);
        return square;
    }
}
