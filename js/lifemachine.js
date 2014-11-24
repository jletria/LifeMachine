var LM = LM || {}

LM.LoadScript = function(file) { $.ajax({ async: false, url: file, dataType: "script" }); },

LM.Init = function() {
    console.info('Starting LifeMachine...');
    try {
       LM.Engine.Start();
    }
    catch(ex) {
        console.error('FATAL ERROR - LifeMachine terminated');
        throw ex;
    }
    console.info('LifeMachine running.');
}
