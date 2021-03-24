const express = require("express");
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const csurfProtection = csurf({cookie: true});
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

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
  res.render('create', {csrfToken: req.csrfToken()});
});

app.post('/create', csurfProtection, (req, res) => {
  const {firstName, lastName, email, password} = req.body;
  let errors = [];
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

if(errors.length > 0) {
  res.render('create', {title: 'The following errors were found:', errors});
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

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
  
module.exports = app;
