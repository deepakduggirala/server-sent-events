(function(){
    if (!!window.EventSource) {
        (function(){
            var source = new EventSource('/stream');
            source.addEventListener('message-1', function(e){
                console.log('message-1 event');
                console.log(e.data);
            }, false);
            
            source.addEventListener('message-2', function(e){
                console.log('message-2 event');
                console.log(e.data);
            }, false);
            source.addEventListener('close', function(e){
                console.log('close event');
                e.target.close();
            }, false);
            source.addEventListener('error', function(e){
                console.log('error event');
                e.target.close();
            }, false)
        })();
        /*sse('/stream/json', function(e){
            let response = JSON.parse(e.data);
            console.log(response.a, response.b);
            e.target.close();
        });

        var source = new EventSource('/stream/mixed');
        source.addEventListener('message', function(e){
            console.log('message', e.data);
        }, false);

        source.addEventListener('close', function(e){
            console.log('close event');
            e.target.close();
        }, false);*/
        
    } else {
        console.log("Result to xhr polling :(");
    }

    function sse(url, message, open, error){
        var source = new EventSource(url);
        source.addEventListener('message', message, false);
        source.addEventListener('open', open, false);
        source.addEventListener('error', error, false);
    }
})();