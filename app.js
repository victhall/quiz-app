const express = require('express');
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const engine = require('ejs-mate');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/users');


mongoose.connect('mongodb://localhost:27017/quiz-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

const sessionConfig = {
  secret: 'boogalooshrimp',
  resave: false,
  saveUninitialized: true,
  cookie: {
      //prevents cookie from being accessed through client side script. 
      //prevents cookie from being revealed to a third party.
      httpOnly: true,
      //cookie expires a week from now
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7, //ms, s, m, hrs, days in a week
      maxAge: 1000 * 60 * 60 * 24 * 7
  }
}



app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

const triviaRouter = require('./routes/triviaRoutes');
const usersRouter = require('./routes/userRoutes');


app.use('/trivia', triviaRouter);
app.use('/users', usersRouter);


const PORT = 3000;

app.get('/', (req, res) => {
  res.render('home')
});

app.listen(PORT, () => {
  console.log('Serving on port 3000')
});