import express from "express";
import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';
import { Restaurant } from './models';


const app = express();
app.use(express.json());
app.use(function (req: any, res: any, next: any) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Connect to MongoDB
mongoose
  .connect(
    'mongodb://restaurant_auth_mongo:27017',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch((err: any) => console.log(err));


// Status check
app.get('/', function (req: any, res: any) {
  res.send('Running!');
});


// Registration POST interface
app.post('/register', async (req: express.Request, res: express.Response) => {

  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;

  // Checking if a restaurant with this email already exists
  let query = await Restaurant.find({ "email": email }).exec();

  if (query.length > 0) {
    res.send({ "error": "A restaurant with this email address already exists." });
    return;
  }

  // Generating first session token
  let tokens = [uuid()];

  // Creating new restaurant
  const restaurant = new Restaurant({
    name: name,
    email: email,
    password: password,
    tokens: tokens
  });

  // Saving restaurant data
  await restaurant.save();

  res.send({ "token": tokens[0] });
});

// Login POST interface
app.post('/login', async (req: express.Request, res: express.Response) => {

  let email = req.body.email;
  let password = req.body.password;
  let token = req.body.token;

  // Querying restaurant information
  let query = await Restaurant.find({ "email": email }).exec();

  // Checking if the restaurant is registered
  if (query.length == 0) {
    res.send({ "error": "There is no restaurant registered with this email address." });
    return;
  }

  // Getting restaurant data
  let restaurant = query[0];

  // Checking token
  if (token != null && restaurant.tokens.includes(token)) {
    res.send({ "token": token });
    return;
  }

  // Checking password
  if (password != restaurant.password) {
    res.send({ "error": "The email address or the password are incorrect." });
    return;
  }

  // Generating new session token
  token = uuid();
  restaurant.tokens.push(token);

  // Updating restaurant data
  await restaurant.save();

  res.send({ "token": token });
});

// Logout POST interface
app.post('/logout', async (req: express.Request, res: express.Response) => {

  let email = req.body.email;
  let token = req.body.token;

  // Querying restaurant information
  let query = await Restaurant.find({ "email": email }).exec();

  // Checking if the restaurant is registered
  if (query.length == 0) {
    res.send({ "error": "There is no restaurant registered with this email address." });
    return;
  }

  // Getting restaurant data
  let restaurant = query[0];

  // Deleting token
  restaurant.tokens.forEach((current: String, index: Number) => {
    if (token === current) { restaurant.tokens.splice(index, 1); }
  });

  // Updating restaurant data
  await restaurant.save();

  res.send({});
});



// Validation GET interface
app.get('/validate', async (req: express.Request, res: express.Response) => {

  let email = req.query.email;
  let token = req.query.token;

  // Querying restaurant information
  let query = await Restaurant.find({ "email": email }).exec();

  // Checking if the restaurant is registered
  if (query.length == 0) {
    res.send({ "error": "There is no restaurant registered with this email address." });
    return;
  }

  // Getting restaurant data
  let restaurant = query[0];

  // Checking token
  if (token != null && restaurant.tokens.includes(token)) {
    res.send({ "token": token });
  } else {
    res.send({ "error": "Invalid token." });
  }
});




// TODO: remove this (only for debug)
app.get('/restaurants', (req, res) => {
  Restaurant.find().exec().then((restaurants: any) => { res.send(restaurants) });
})


app.listen(3000, () => console.log('Server running...'));
