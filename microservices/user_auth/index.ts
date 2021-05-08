import express from "express";
import mongoose from 'mongoose';
import { Item } from './models/Item';



const app = express();

// Connect to MongoDB
mongoose
  .connect(
    'mongodb://mongo:27017/docker-node-mongo',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch((err: any) => console.log(err));



app.get('/', function (req: any, res: any) {
  res.send('Waiting for you...');
});

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});



app.get('/items', function (req: any, res: any) {
  console.log("Aquì tienes tus resultados");
  var str = "";
  Item.find()
    .then(function (items: string | any[]) {

      for (var i = 0; i < items.length; i++) {
        str += " " + items[i].name;

      }

      res.send(str);


    }

    );
});


app.get('/item/add', function (req: any, res: any) {
  /*const newItem = new Item({
    name: req.body.name
  });*/
  console.log("Esto deberìa ser " + req.query.name);

  const newItem = new Item({
    name: req.query.name
  });

  newItem.save().then(() => res.redirect('/'));
});

const port = 3000;

app.listen(port, () => console.log('Server running...'));
