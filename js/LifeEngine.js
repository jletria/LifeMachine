var LM = LM || {};

LM.Engine = {

	Loaded: false,

    LifeForms: {
        Player: null,
        NPC: null
//        Projectile: null
    },

    Projectiles: [],

    Preload: function(onDone) { LM.Assets.Load(onDone); },

    InitWorld: function() {
        this.World = new LM.World(800, 600);
        this.Stage = new createjs.Stage("lmStage");

        var floorImg = LM.Assets.Get('Floor');
        var shape = new createjs.Shape();

        var bgbm = new createjs.Bitmap(floorImg);

        this.Stage.addChild(shape);
        shape.x = 0;
        shape.y = 0;

        //shape.graphics.clear();
        shape.graphics.beginBitmapFill(floorImg, "repeat").drawRect(0, 0, 800, 600);
    },

    InitLifeForms: function() {

        this.LifeForms.Player = new LM.Things.LifeForms.BlueWizard(this.World, 200, 220, 60, 60, 5);
        this.LifeForms.Player.Direction.directionindex = 5;
        this.LifeForms.NPC = new LM.Things.LifeForms.DarkWizard(this.World, 550, 220, 60, 60, 5);

		//this.LifeForms.Projectile = new LM.LifeForm(this.World, 350, 220, 8, 8, 5);
		//this.LifeForms.Projectile.Sprite = LM.CreateSprite(LM.Assets.Get('MagicMissile'), 350, 220,8,8);

        this.LifeForms.NPC.OnTick.push(function() {
           // this.TurnRandomly();
           // this.StepForward();
        });

        for(var i in this.LifeForms) this.Stage.addChild(this.LifeForms[i].Sprite);
    },

    ActOnInput: function(keyCode, keydown) {
        if (keydown) {
            switch(keyCode) {
                case 69: { 
                	this.LifeForms.Player.Sprite.gotoAndPlay("attack"); 
					var projectile = this.LifeForms.Player.Shoot();
					
					this.Stage.addChild(projectile.Sprite);
					this.Projectiles.push(projectile);
					projectile.Fire();
                	
                	break;
                }

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

    Collides: function(objectA, objectB) {
		return 
    	    (
    	    objectA.Location.X < objectB.Location.X + objectB.Size.X  &&
            objectA.Location.X + objectA.Size.X  > objectB.Location.X &&
		    objectA.Location.Y < objectB.Location.Y + objectB.Size.Y &&
		    objectA.Location.Y + objectA.Size.Y > objectB.Location.Y
		    )
    },

    OnTick: function(event) {
        //console.log(createjs.Ticker.getTicks());
        for (var i in this.LifeForms) if (this.LifeForms.hasOwnProperty(i)) this.LifeForms[i].RunTickEvents();
		for (var i in this.Projectiles) if (this.Projectiles.hasOwnProperty(i)) this.Projectiles[i].RunTickEvents();

        var player = this.LifeForms.Player;
        var npc = this.LifeForms.NPC;

        if (
            player.Location.X < npc.Location.X + npc.Size.X  &&
            player.Location.X + player.Size.X  > npc.Location.X &&
		    player.Location.Y < npc.Location.Y + npc.Size.Y &&
		    player.Location.Y + player.Size.Y > npc.Location.Y
		    ) 
			//if(this.Collides(player, npc))
		    {
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
    	this.Preload(function() {
    		LM.InitSprites();
			LM.Engine.InitWorld();
			LM.Engine.InitLifeForms();
			LM.Engine.InitTime();
			LM.Engine.InitEvents();
    	});
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
