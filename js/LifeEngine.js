var LM = LM || {};

LM.Engine = {

	Loaded: false,

	Player : {},

	NPC: [],
	Projectiles: [],

    Things: [], 

    GetCollisions: function(thing) {
		var ret = [];
		for (var o in this.Things) 
			if (this.Things.hasOwnProperty(o) && this.Things[o] !== thing)
				if (this.Collides(thing,this.Things[o])) 
					ret.push(this.Things[o]);
		return ret;
    },


    Preload: function(onDone) { LM.Assets.Load(onDone); },

    InitWorld: function() {
        this.Stage = new createjs.Stage("lmStage");

        var floorImg = LM.Assets.Get('Floor');
        var shape = new createjs.Shape();

        var bgbm = new createjs.Bitmap(floorImg);

        this.Stage.addChild(shape);
        shape.x = 0;
        shape.y = 0;

        shape.graphics.beginBitmapFill(floorImg, "repeat").drawRect(0, 0, 800, 600);
    },

    InitLifeForms: function() {

        this.Player = new LM.Things.LifeForms.BlueWizard(200, 220, 60, 60, 5);
        this.Player.Direction.directionindex = 5;
        this.Things.push(this.Player)

        var npc = new LM.Things.LifeForms.DarkWizard(550, 220, 60, 60, 5);
       	this.NPC.push(npc);
        this.Things.push(npc);


		this.NPC[0].OnTick.push(function() {
           // this.TurnRandomly();
           // this.StepForward();
        });
    },

    ActOnInput: function(keyCode, keydown) {
        if (keydown) {
            switch(keyCode) {
                case 69: { 
                	this.Player.Sprite.gotoAndPlay("attack"); 
					var projectile = this.Player.Shoot();
					this.Projectiles.push(projectile);
					this.Things.push(projectile);
					projectile.Fire();

                	break;
                }

                case 83: this.Player.SetDirectionUp();    break; case 87: this.Player.SetDirectionDown();  break;
                case 65: this.Player.SetDirectionLeft();  break; case 68: this.Player.SetDirectionRight(); break;
            }
            if (((keyCode == 87) ||
                 (keyCode == 83) ||
                 (keyCode == 65) ||
                 (keyCode == 68))
            && !this.Player.Running) {
                this.Player.Running = true;
                this.Player.Sprite.gotoAndPlay("run");
                this.Player.StartMoving();
            }
        }
        else {
            if (((keyCode == 87) ||
                 (keyCode == 83) ||
                 (keyCode == 65) ||
                 (keyCode == 68))
            && this.Player.Running) {
                this.Player.Running = false;
                this.Player.StopMoving();
                this.Player.Sprite.gotoAndPlay("stand");
            }
        }
    },

    Collides: function(objectA, objectB) {
		return (
			objectA.Location.X < objectB.Location.X + objectB.Size.X  &&
            objectA.Location.X + objectA.Size.X  > objectB.Location.X &&
		    objectA.Location.Y < objectB.Location.Y + objectB.Size.Y &&
		    objectA.Location.Y + objectA.Size.Y > objectB.Location.Y
		);
    },

    OnTick: function(event) {
        //console.log(createjs.Ticker.getTicks());

        for (var i in this.Things) if (this.Things.hasOwnProperty(i)) {
			if(this.Things[i].Visible && !this.Stage.contains(this.Things[i].Sprite)) this.Stage.addChild(this.Things[i].Sprite);
			else if((!this.Things[i].Visible ||  this.Things[i].Destroyed) && this.Stage.contains(this.Things[i].Sprite)) this.Stage.removeChild(this.Things[i].Sprite);
        	if(!this.Things[i].Destroyed) this.Things[i].RunTickEvents();

			for (var o in this.Things) if (this.Things.hasOwnProperty(o) && o != i) {
				if (this.Collides(this.Things[i],this.Things[o])) {
					//npc.Sprite.gotoAndPlay("attack");
					this.Things[i].Collision = true;
					this.Things[o].Collision = true;
				}
				else {
					this.Things[i].Collision = false;
					this.Things[o].Collision = false;
				}
			}
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
