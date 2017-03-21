var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb').MongoClient;
var db;


var app = express();
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json());

app.route('/api/todos')
    .get(function (req,res) {
        db.collection('todos').find().toArray(function(err, todos) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.send(todos);
            }
        });
    })
    .post(function(req, res) {
        req.body.due = new Date(req.body.due);
        db.collection('todos').insertOne(req.body, function(err, result) {
            if (err) {
                console.log(err);
                res.sendStatus(500)
            } else {
                res.status(201).send(result.insertedId);
            }
        })
    })

mongo.connect('mongodb://localhost:27017/mongoExample', function (err, database) {
    if (err) {
        console.log(err);
    } else {
        db = database;
        app.listen(3000);
            console.log('Server listening on port 3000');
    }
});



