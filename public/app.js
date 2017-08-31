(function(){
    if (!!window.EventSource) {
        sse('/stream', function(e){
            console.log(e.data);
            e.target.close();
        });
        sse('/stream/json', function(e){
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
        }, false);
        
    } else {
        console.log("Result to xhr polling :(");
    }

    function sse(url, message, open, error){
        var source = new EventSource(url);
        source.addEventListener('message', message, false);
        source.addEventListener('open', open, false);
        source.addEventListener('error', error, false);
        /*source.addEventListener('error', function(e) {    //TODO: catch various errors
            if (e.readyState == EventSource.CLOSED) {
            // Connection was closed.
            }
        }, false);*/
    }
})();