var express = require('express');
var todoController = require('./controllers/todoController')

var app = express();

//set up template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//fire controllers
todoController(app);

//listen on port
app.listen(8080);
console.log('listening on port 8080');
