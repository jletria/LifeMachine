var LM = LM || {};

LM.Engine = {

	TickCount: 0,

	Player : {},
    Things: [],

    Collides: function(objectA, objectB) {
    	if(objectA.Destroyed || objectB.Destroyed) return false;
		return (
			objectA.Location.X < objectB.Location.X + objectB.Size.X  &&
            objectA.Location.X + objectA.Size.X  > objectB.Location.X &&
		    objectA.Location.Y < objectB.Location.Y + objectB.Size.Y &&
		    objectA.Location.Y + objectA.Size.Y > objectB.Location.Y
		);
    },

	GetCollisions: function(thing) {
		var ret = [];
		for (var o in this.Things) 
			if (this.Things.hasOwnProperty(o) && this.Things[o].UID != thing.UID)
				if (this.Collides(thing,this.Things[o])) 
					ret.push(this.Things[o]);
		return ret;
    },

    RemoveSprite: function(thing) {
		if(this.Stage.contains(thing.Sprite)) this.Stage.removeChild(thing.Sprite);
    },

    AddSprite: function(thing) {
		if(!this.Stage.contains(thing.Sprite)) this.Stage.addChild(thing.Sprite);    	
    },

    OnTick: function(event) {
        //console.log(createjs.Ticker.getTicks());
		this.TickCount++;
        for (var i in this.Things) if (this.Things.hasOwnProperty(i)) {
        	if(this.Things[i].Visible && !this.Things[i].Destroyed) this.AddSprite(this.Things[i]);
			else if(!this.Things[i].Visible ||  this.Things[i].Destroyed) this.RemoveSprite(this.Things[i]);
        	if(!this.Things[i].Destroyed && this.Things[i].RunTickEvents) this.Things[i].RunTickEvents();
        }
        this.Stage.update();
        if(this.TickCount > 250) this.Maintenance();
    },

    Maintenance: function() {
    	console.log('Doing maintenance...');
		this.TickCount = 0;
		var activeThings = [];
		for(var i in this.Things) {
			if(!this.Things[i].Destroyed) activeThings.push(this.Things[i]);
			else this.RemoveSprite(this.Things[i]);
		}
		var todelete = this.Things;
		this.Things = activeThings;
		delete todelete;
    },

    ActOnInput: function(keyCode, keydown) {
        if (keydown) {
            switch(keyCode) {
                case 69: { 
                	this.Player.Attack(); 
					var projectile = this.Player.Shoot();
					this.Things.push(projectile);
					projectile.Fire();
                	break;
                }

                case 83: this.Player.SetDirectionUp();    break; case 87: this.Player.SetDirectionDown();  break;
                case 65: this.Player.SetDirectionLeft();  break; case 68: this.Player.SetDirectionRight(); break;
            }
            if ((keyCode == 87) || (keyCode == 83) || (keyCode == 65) || (keyCode == 68)) 
            	this.Player.Walk();
        }
        else {
            if ((keyCode == 87) || (keyCode == 83) || (keyCode == 65) || (keyCode == 68)) {
                this.Player.Stop();
            }
        }
    },

	Preload: function(onDone) { LM.Assets.Load(onDone); },

    InitWorld: function() {
    	this.Stage = new createjs.Stage("lmStage");
    	this.Zone = new LM.Zone(800,600);

        var floorImg = LM.Assets.Get('Floor');
        var shape = new createjs.Shape();

        var bgbm = new createjs.Bitmap(floorImg);
        this.Stage.addChild(shape);
		
		var walls = this.Zone.GenerateBoundaryObjects();
        for(var w in walls) this.Things.push(walls[w]);
        
        shape.graphics.beginBitmapFill(floorImg, "repeat").drawRect(0, 0, 800, 600);
    },

    InitThings: function() {

        this.Player = new LM.Things.LifeForms.BlueWizard(200, 220, 60, 60, 5);
        this.Player.IsPlayer = true;
        this.Player.Direction.directionindex = 5;
        this.Things.push(this.Player)

        var npc = new LM.Things.LifeForms.DarkWizard(550, 220, 60, 60, 5);
        this.Things.push(npc);


		npc.OnTick.push(function() {});
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
			LM.Engine.InitThings();
			LM.Engine.InitTime();
			LM.Engine.InitEvents();
    	});
    }
}
