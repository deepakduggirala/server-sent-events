(function(){
    if (!!window.EventSource) {
        sse_text();
        sse_json();
    } else {
        console.log("Result to xhr polling :(");
    }

    function sse_text(){
        var source = new EventSource('/stream');
        let count = 1;
        source.addEventListener('message', e => {
            console.log(e.data);
            count = count + 1;
            if(count === 3){
                source.close();
            }
        }, false);
        source.addEventListener('open', function(e) {
            // Connection was opened.
        }, false);

        source.addEventListener('error', function(e) {
            if (e.readyState == EventSource.CLOSED) {
                console.log("Connection was closed.")
            }
        }, false);

    }

    function sse_json(){
        var source = new EventSource('/stream/json');
        source.addEventListener('message', e => {
            let response = JSON.parse(e.data);
            console.log(response.a, response.b);
            source.close();
        }, false);
        source.addEventListener('open', function(e) {
            // Connection was opened.
        }, false);

        source.addEventListener('error', function(e) {
            if (e.readyState == EventSource.CLOSED) {
            // Connection was closed.
            }
        }, false);
    }
})();