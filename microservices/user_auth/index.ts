import express from "express";
import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';
import { Item } from './models/Item';
import { User } from './models';



const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(
    'mongodb://user_auth_mongo:27017',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch((err: any) => console.log(err));



app.get('/', function (req: any, res: any) {
  res.send('Waiting for you...');
});



app.post('/register', async (req: express.Request, res: express.Response) => {

  let name = req.body.name;
  let surname = req.body.surname;
  let email = req.body.email;
  let password = req.body.password;

  // Checking if a user with this email already exists
  let query = await User.find({ "email": email }).exec();

  if (query.length > 0) {
    res.send({ "error": "A user with this email already exists." });
    return;
  }

  // Generating first session token
  let tokens = [uuid()]

  const user = new User({
    name: name,
    surname: surname,
    email: email,
    password: password,
    tokens
  });

  await user.save();

  res.send({ "token": tokens[0] });
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
