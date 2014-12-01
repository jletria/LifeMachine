var LM = LM || {};

LM.Assets = {

    queue : null,

    Get: function(id) { 
        if(this.queue == null) throw 'Asset manager not initialized yet';
        return this.queue.getResult(id); 
    },

     /*{
         //createjs.Sound.play("sound");
         //var image = queue.getResult("myImage");
         //document.body.appendChild(image);

     }*/

    Load: function (onDone) {
        this.queue = new createjs.LoadQueue();
        this.queue.setUseXHR(false);
        //this.queue.installPlugin(createjs.Sound);
        this.queue.on("complete", onDone, this);
        //this.queue.loadFile({id:"sound", src:"http://path/to/sound.mp3"});
        this.queue.loadManifest([
             {id: "Floor", src:"res/floors/floor_tile_1_small.png"},
             {id: "BlueWizard", src:"res/chars/BlueWizard.png"},
             {id: "DarkWizard", src:"res/chars/DarkRedWizard.png"},
             {id: "MagicMissile", src:"res/projectiles/magicmissile.png"},
             {id: "Fireball", src:"res/projectiles/fireball.png"}
         ]);
    }
}