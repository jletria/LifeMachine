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
        this.LifeForms.Player = new LM.LifeForm(this.World, 200, 260, 36, 37, 5);
        this.LifeForms.Player.Sprite = LM.CreateSprite("res/chars/BlueWizard.png", 200, 260,36,37);
        /*this.LifeForms.Player.Sprite.Update = function(X, Y) { 
            //this.setTransform(X, Y, 1, 1);
        }*/
        
        this.LifeForms.NPC = new LM.LifeForm(this.World, 200, 200, 50, 50, 5);
        //this.LifeForms.NPC.Sprite = this.CreateSquare(200, 200, 50, 50, "blue");
        this.LifeForms.NPC.Sprite = LM.CreateSprite("res/chars/DarkRedWizard.png", 200, 200,36,37);
        
        this.LifeForms.NPC.OnTick.push(function() {
           // this.TurnRandomly();
           // this.StepForward();

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
        
        var player = this.LifeForms.Player;
        var npc = this.LifeForms.NPC;

        if (
            player.Location.X < npc.Location.X + npc.Size.X  && 
            player.Location.X + player.Size.X  > npc.Location.X &&
		    player.Location.Y < npc.Location.Y + npc.Size.Y && 
		    player.Location.Y + player.Size.Y > npc.Location.Y
		    ) {
		        npc.Sprite.gotoAndPlay("attack");
		        player.Collision = true;
		        npc.Collision = true;
		    }
		    else {
                player.Collision = false;
		        npc.Collision = false;
		    }
        this.Stage.update();
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
        square.Size = { X : sizeX , Y : sizeY };
        square.Update = function(X, Y) { this.x = X; this.y = Y; }
        square.graphics.beginFill(color).drawRect(positionX, positionY, sizeX, sizeY);

		square.ChangeColor = function(c) {
            try {
                this.graphics.clear();
                this.graphics.beginFill(c).drawRect(
                    this.x, this.y, 
                    this.Size.X, this.Size.Y);         
            }
           	catch(e) { console.log('error')} 
            
        }
        return square;
    }
}
