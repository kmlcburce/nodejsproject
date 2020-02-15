const express = require('express');
const app = express();
const Joi = require('joi');
const port = process.env.PORT || 3888;
var bodyParser = require('body-parser');
const path = require('path');
//api
app.use(express.json());
const item = [
    {id: 1, name:"item1"},
    {id: 2, name:"item2"},
    {id: 3, name:"item3"}
];

//get 
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/public/index.html'));
});
app.get('/api/item ', function(req, res){
    console.log('DASD');
    res.send(item);
});
app.get('/api/item/:id', function (req, res){
    const item = item.find(i => i.id === parseInt(req.params.id));
    if(!item){
        return res.status(404).send('Item not found');
    }
    res.send(item);
});
//post
app.post('/api/additem', function(req, res){

    const { error } = validateItem(req.body); // result.error --- object destructuring
    if(error){ // Making use of  object destructuring /const { error } = validateCourse(req.body);/
    // res.status(400).send(result.error.details[0].message); --  not using object destructuring
    res.status(400).send(error.details[0].message);
    return;
    item.item = req.body.item;
    res.send(item);
}   
});
//del
app.delete('/api/item/:id', function(req, res){
    // Look up course id
    const item = item.find(i => i.id === parseInt(req.params.id));
    if(!item) {
        res.status(404).send('Item id not found');
        return;
    }

    // Delete
    const index = item.indexOf(item);
    courses.splice(index, 1);

    // Return the same course
    res.send(item);
});
function validateItem(item){
    const schema = {
        name: Joi.string().min(3).required() 
    };

    return Joi.validate(item, schema);
}
app.listen(port);
//body parser ??
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post('/api/add', urlencodedParser, function (req, res) {
    res.send('Added item: ' + req.body.item)
  })