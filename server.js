var exp = require('express');
var bodyparser = require('body-parser');
var cors = require('cors');

var app = exp();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

app.use(cors());

var fetch = require('./fetchdata/fetch');
app.use('/fetch',fetch);

var insert = require('./insert/insert');
app.use('/insert',insert);

var update = require('./updatedb/update');
app.use('/update',update);

var deleteRouter = require('./delete/delete');
app.use('/delete',deleteRouter);

app.listen(8080);
console.log('Server listening on port Number 8080');
