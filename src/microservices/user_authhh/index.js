const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose
  .connect(
    'mongodb://mongo:27017/docker-node-mongo',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const Item = require('./models/Item');


app.get('/', function (req, res) {
  res.send('Waiting for you...');
});








app.get('/items', function (req, res) {
  console.log("Aquì tienes tus resultados");
  var str = "";
  Item.find()
    .then(function (items) {

      for (var i = 0; i < items.length; i++) {
        str += " " + items[i].name;

      }

      res.send(str);


    }

    );
});


app.get('/item/add', function (req, res) {
  /*const newItem = new Item({
    name: req.body.name
  });*/
  console.log("Esto deberìa ser " + req.query.name);

  const newItem = new Item({
    name: req.query.name
  });

  newItem.save().then(item => res.redirect('/'));
});

const port = 3000;

app.listen(port, () => console.log('Server running...'));
