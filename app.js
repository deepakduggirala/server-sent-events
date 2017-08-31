const express = require('express');
const app = express();

const port = 8001;

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));

app.get('/stream', (req, res)=>{
    if(req.get('accept') === 'text/event-stream'){
        res.set('content-type', 'text/event-stream');

        setInterval(()=>{
            let id = (new Date()).getTime();
            res.write(`id: ${id}\n`);
            res.write('data: My message\ndata: My second Message\n\n');
            res.write('data: My third Message\n\n')
        }, 5000);
    }
    else{
        res.sendStatus(406);
    }
});

app.get('/stream/json', (req, res) => {
    let id = (new Date()).getTime();
    res.set('content-type', 'text/event-stream');
    let x = {
        'a': 1,
        'b': 2
    };
    res.write(`id: ${id}\n`);
    res.write(sse_json_cons(x));
    res.end();
});

app.get('/stream/mixed', (req, res) => {
    let id = (new Date()).getTime();
    res.set('content-type', 'text/event-stream');
    let x = {
        'a': 1,
        'b': 2
    };
    res.write(`id: ${id}\n`);
    res.write("data: Hello\n\n");
    res.write(sse_json_cons(x));
    res.write("event: close\ndata: \n\n");
    res.end();
});

app.listen(port, ()=>{
    console.log(`Server started on ${port}`);
});

function sse_json_cons(json){
    return `data: ${JSON.stringify(json)}\n\n`;
}