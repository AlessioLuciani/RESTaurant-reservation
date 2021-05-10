import express from "express";
import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';
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


// Status check
app.get('/', function (req: any, res: any) {
  res.send('Running!');
});


// Registration POST interface
app.post('/register', async (req: express.Request, res: express.Response) => {

  let name = req.body.name;
  let surname = req.body.surname;
  let email = req.body.email;
  let password = req.body.password;

  // Checking if a user with this email already exists
  let query = await User.find({ "email": email }).exec();

  if (query.length > 0) {
    res.send({ "error": "A user with this email address already exists." });
    return;
  }

  // Generating first session token
  let tokens = [uuid()];

  // Creating new user
  const user = new User({
    name: name,
    surname: surname,
    email: email,
    password: password,
    tokens: tokens
  });

  // Saving user data
  await user.save();

  res.send({ "token": tokens[0] });
});

// Login POST interface
app.post('/login', async (req: express.Request, res: express.Response) => {

  let email = req.body.email;
  let password = req.body.password;
  let token = req.body.token;

  // Querying user information
  let query = await User.find({ "email": email }).exec();

  // Checking if the user is registered
  if (query.length == 0) {
    res.send({ "error": "There is no user registered with this email address." });
    return;
  }

  // Getting user data
  let user = query[0];

  // Checking token
  if (token != null && user.tokens.includes(token)) {
    res.send({ "token": token });
    return;
  }

  // Checking password
  if (password != user.password) {
    res.send({ "error": "The email address or the password are incorrect." });
    return;
  }

  // Generating new session token
  token = uuid();
  user.tokens.push(token);

  // Updating user data
  await user.save();

  res.send({ "token": token });
});

// Logout POST interface
app.post('/logout', async (req: express.Request, res: express.Response) => {

  let email = req.body.email;
  let token = req.body.token;

  // Querying user information
  let query = await User.find({ "email": email }).exec();

  // Checking if the user is registered
  if (query.length == 0) {
    res.send({ "error": "There is no user registered with this email address." });
    return;
  }

  // Getting user data
  let user = query[0];

  // Deleting token
  user.tokens.forEach((current: String, index: Number) => {
    if (token === current) { user.tokens.splice(index, 1); }
  });

  // Updating user data
  await user.save();

  res.send({});
});



// Validation GET interface
app.get('/validate', async (req: express.Request, res: express.Response) => {

  let email = req.body.email;
  let token = req.body.token;

  // Querying user information
  let query = await User.find({ "email": email }).exec();

  // Checking if the user is registered
  if (query.length == 0) {
    res.send({ "error": "There is no user registered with this email address." });
    return;
  }

  // Getting user data
  let user = query[0];

  // Checking token
  if (token != null && user.tokens.includes(token)) {
    res.send({ "token": token });
  } else {
    res.send({ "error": "Invalid token." });
  }
});




// TODO: remove this (only for debug)
app.get('/users', (req, res) => {
  User.find().exec().then((users: any) => { res.send(users) });
})


app.listen(3000, () => console.log('Server running...'));
