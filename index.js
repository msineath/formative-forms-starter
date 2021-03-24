const express = require("express");
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const csurfProtection = csurf({cookie: true});
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

let errors = [];

app.set("view engine", "pug");


app.get("/", (req, res) => {
  res.render('index', {users});
});

const users = [
  {
    id: 1,
    firstName: "Jill",
    lastName: "Jack",
    email: "jill.jack@gmail.com"
  }
];

app.get('/create', csurfProtection, (req, res) => {
  res.render('create', {csrfToken: req.csrfToken(), errors});
});

app.post('/create', csurfProtection, (req, res) => {
  errors = [];
  const {firstName, lastName, email, password, confirmedPassword} = req.body;
  if(!firstName) {
    errors.push("Please provide a first name.");
  }
  if(!lastName) {
    errors.push("Please provide a last name.");
  }
  if(!email) {
    errors.push("Please provide an email.");
  }
  if(!password) {
    errors.push("Please provide a password.");
  }
  if (password!==confirmedPassword) {
    errors.push("The provided values for the password and password confirmation fields did not match.")
  }
  if(errors.length > 0) {
    res.render('create', {errors, firstName, lastName, email});
    return;  
}
  let newUser = {
    id: users.length + 1,
    firstName,
    lastName,
    email
  };
  users.push(newUser);
  res.redirect('/');
})

app.get('/create-interesting', csurfProtection, (req, res) => {
  res.render('create-interesting', {csrfToken: req.csrfToken(), errors});
});

app.post('/create-interesting', csurfProtection, (req, res) => {
  errors = [];
  const {firstName, lastName, email, age, favoriteBeatle, password, confirmedPassword} = req.body;
  if(!firstName) {
    errors.push("Please provide a first name.");
  }
  if(!lastName) {
    errors.push("Please provide a last name.");
  }
  if(!email) {
    errors.push("Please provide an email.");
  }
  if(!age) {
    errors.push("Please provide an age.");
  }
  if(!favoriteBeatle) {
    errors.push("Please provide a favorite Beatle.")
  }
  if(!password) {
    errors.push("Please provide a password.");
  }
  if (password !== confirmedPassword) {
    errors.push("The provided values for the password and password confirmation fields did not match.")
  }
  if(age < 0 || age > 120) {
    errors.push("Please provide a valid age.")
  }
  if(errors.length > 0) {
    res.render('create', {errors, firstName, lastName, email, age, favoriteBeatle});
    return;  
  }
  let newUser = {
    id: users.length + 1,
    firstName,
    lastName,
    email,
    age,
    favoriteBeatle
  };
  users.push(newUser);
  res.redirect('/');
})

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
  
module.exports = app;
