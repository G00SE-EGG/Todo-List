var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to the database password removeds
mongoose.connect('mongodb://test:test@ds139277.mlab.com:39277/heroku_8002f23z');

//Create schema - blueprint for data
var todoSchema = new mongoose.Schema({
  item : String
});

//Create a todo model that takes two parameters ('Name', 'Schema')
var Todo = mongoose.model('Todo', todoSchema);

//create an item of type Todo
/*var itemOne = Todo({item: "Clean the gutters"}).save(function(err){
  if(err){
    throw err;
  }
  console.log('item saved');
});*/

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];

module.exports = function(app){
  app.get('/todo', function(req, res){
    //get data from mongodb and pass it to the view
    //find finds specific objects in a collection and returns it
    Todo.find({}, function(err, data) {//empty objects means get all
      if(err) throw err;
      res.render('todo', {todos : data}); //displays view to the page
    });
  });

  app.post('/todo', urlencodedParser, function(req, res){
    //get data from the view and add it to mongodb
    var newTodo = Todo(req.body).save(function(err, data){
      if(err) throw err;
      res.json(data);
    });
  });

  app.delete('/todo/:item', function(req, res){
    //delete the requested item from the database
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
      if(err)throw err;
      res.json(data);
    });
  });
};
