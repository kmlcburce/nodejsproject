const express = require('express');
const app = express();
const Joi = require('joi');
const port = process.env.PORT || 3888;
var bodyParser = require('body-parser');
const path = require('path');
//api
app.use(express.json());
const items = [
    {id: 1, name:"items1"},
    {id: 2, name:"items2"},
    {id: 3, name:"items3"}
];

//get 
app.get('/', function(req, res){
    console.log('main');
    res.sendFile(path.join(__dirname+'/public/index.html'));
});
app.get('/api/items', function(req, res){
    console.log('get items');
    res.send(items);
});
app.get('/api/items/:id', function (req, res){
    console.log('get spc');
    const item = items.find(i => i.id === parseInt(req.params.id));
    if(!items){
        return res.status(404).send('item not found');
    }
    res.send(item);
});
//post
app.post('/api/newitems', function(req, res){

    console.log('post');
    const { error } = validateItems(req.body.name);

    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const data = {
        id: items.length + 1,
        name: req.body.itemname
    };

    items.push(data);
    res.send(items); 
});
//del
app.delete('/api/items/:id', function(req, res){
    // Look up course id
    const item = items.find(i => i.id === parseInt(req.params.id));
    if(!items) {
        res.status(404).send('items id not found');
        return;
    }

    // Delete
    const index = items.indexOf(items);
    items.splice(index, 1);

    // Return the same course
    res.send(item);
});
//put
app.put('/api/items/:id', urlencodedParser, function(req,res){
    // Look up the courses
    // if not existing, return 404
    const item = items.find(i => i.id === parseInt(req.params.id));
    if(!item){
        return res.status(404).send('Course id not found');
    }

    // Validate
    // If invalid, return 400

    // Redunduncy in validation
    // const schema = {
    //     name: Joi.string().min(3).required() 
    // };

    // const result = Joi.validate(req.body, schema);

    // Making use of validateCourse() 

    // const result = validateCourse(req.body);
    const { error } = validateItems(req.body); // result.error --- object destructuring

    // result.error --- not using object destructuring
    if(error){ // Making use of  object destructuring /const { error } = validateCourse(req.body);/
        // res.status(400).send(result.error.details[0].message); --  not using object destructuring
        res.status(400).send(error.details[0].message);
        return;
    }
    
    // Update course
    item.name = req.body.itemname;

    // Return updated course
    res.send(item);
});
//validate
function validateItems(items){
    console.log('val');
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(items, schema);
}
//listen
app.listen(port);
//body parser ??
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post('/api/add', urlencodedParser, function (req, res) {
    console.log('add');
    const { error } = validateItems(req.body.name);

    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const data = {
        id: items.length + 1,
        name: req.body.itemname
    };

    items.push(data);
    res.send(items); 
  })