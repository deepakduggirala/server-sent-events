(function(){
    if (!!window.EventSource) {
        sse('/stream', e => {
            console.log(e.data);
            e.target.close();
        });
        sse('/stream/json', e => {
            let response = JSON.parse(e.data);
            console.log(response.a, response.b);
            e.target.close();
        });
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