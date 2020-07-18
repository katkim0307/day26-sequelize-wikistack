/*
const express = require('express');
const app = express();

console.log(__dirname);

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();  // MOVE ON 
});

// route / end-point
app.get('/', (req, res) => {
    res.send('hello world');
});

app.get('/puppies', (req, res) => {
    res.send('puppies page');
});

app.listen(3000);
*/