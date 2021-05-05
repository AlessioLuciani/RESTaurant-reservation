const express = require('express');
const mongoose = require('mongoose');

const app = express();

//app.set('view engine', 'ejs');

//app.use(express.urlencoded({ extended: false }));

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


app.post('/item/add', function (req, res) {
  //const newItem = new Item({
  // name: req.body.name
  //});

  const newItem = new Item({
    name: req.query.name
  });

  newItem.save().then(item => res.redirect('/'));
});

const port = 3000;

app.listen(port, () => console.log('Server running...'));
