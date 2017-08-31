const express = require('express');
const app = express();

const port = 8001;

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));

app.get('/test', (req, res)=>{
    res.send('Hello');
});

app.listen(port, ()=>{
    console.log(`Server started on ${port}`);
});