const express = require('express');
const app = express();

const port = 8001;

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));

app.get('/stream', (req, res)=>{
    if(req.get('accept') === 'text/event-stream'){
        res.set('content-type', 'text/event-stream');

        setTimeout(()=>{
            //let id = (new Date()).getTime();
            //res.write(`id: ${id}\n`);
            res.write('event: message-1\n');
            res.write('data: My message\ndata: My second Message\n\n');
            res.write('data: My third Message\n\n');
            setInterval(()=>{
                //let id = (new Date()).getTime();
                //res.write(`id: ${id}\n`);
                res.write('event: message-2\n');
                res.write('data: wubba wubba\ndata: lub dub\n\n');
                res.write('data: Let\'s go Morty!\n\n');
                //res.write("event: close\ndata: \n\n");
                //res.end();
            }, 3000);
        }, 3000);
        
        
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

app.get('/stream/status/:code', (req,res) => {
    res.set('content-type', 'text/event-stream');
    const errCode = parseInt(req.params.code) || 200;
    res.sendStatus(errCode);
});

app.get('/stream/redirect', (req,res) => {
    const url = '/test.html';
    res.set('content-type', 'text/event-stream');
    res.write("event: redirect\n");
    res.write(`data: ${url}\n\n`);
    res.end();
});

app.get('/stream/bad-redirect', (req,res) => {
    res.redirect('http://www.imdb.com');
});

app.listen(port, ()=>{
    console.log(`Server started on ${port}`);
});

function sse_json_cons(json){
    return `data: ${JSON.stringify(json)}\n\n`;
}