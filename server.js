const express = require('express'),
      app = express(),
      PORT = 8000;

app.locals.visits = 0;

app
.use((req, res, next) => {
	if (process.env.NODE_ENV != 'test') {
        console.log(`Visits: ${++res.app.locals.visits}`);
    }
    next();
})

.get('/:operation/:x/:y', (req, res) => {
    let operation = req.params.operation;
    let x = Number(req.params.x);
    let y = Number(req.params.y);
    let symbol = '';
    let result = 0;

    switch (operation) {
        case 'add':
            symbol = '+';
            result = x + y;
            break;
        case 'subtract':
            symbol = '-';
            result = x - y;
            break;
        case 'multiply':
            symbol = '*';
            result = x * y;
            break;
        case 'divide':
            symbol = '/';
            result = x / y;
            break;
        case 'pow':
            symbol = '**';
            result = x ** y;
            break;
    }
    
    res.end(`${x} ${symbol} ${y} = ${result}`);
})

.get('/kramer/:a1/:b1/:c1/:a2/:b2/:c2', (req, res) => {
    let delta = Number(req.params.a1) * Number(req.params.b2) - Number(req.params.b1) * Number(req.params.a2);
    let delta1 = Number(req.params.c1) * Number(req.params.b2) - Number(req.params.b1) * Number(req.params.c2);
    let delta2 = Number(req.params.c1) * Number(req.params.a2) - Number(req.params.a1) * Number(req.params.c2);
    res.end(`x = ${delta1 / delta}, y = ${delta2 / delta}`);
})

// index route
.get('/*', (req, res) => {
    res.end('Yo, dude! Use API');
})
.listen(PORT || process.env.port);

module.exports = app;