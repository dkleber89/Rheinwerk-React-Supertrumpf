const express = require('express');
const bodyParser = require('body-parser');
const fccTesting = require('./freeCodeCamp/fcctesting.js');
const session = require('express-session');
const passport = require('passport');
const { ObjectID, MongoClient } = require('mongodb');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

fccTesting(app); // For FCC testing purposes

app.use('/public', express.static(`${process.cwd()}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const client = new MongoClient(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  if (err) {
    console.log(`Database error: ${err}`);
  } else {
    console.log('Successful database connection');

    passport.serializeUser((user, done) => {
      done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
      client
        .db('test')
        .collection('users')
        .findOne({ _id: new ObjectID(id) }, (error, doc) => {
          done(null, doc);
        });
    });

    passport.use(
      new LocalStrategy((username, password, done) => {
        client
          .db('test')
          .collection('users')
          .findOne({ username }, (error, user) => {
            console.log(`User ${username} attempted to log in.`);

            if (error) {
              return done(error);
            }

            if (!user) {
              return done(null, false);
            }

            if (password !== user.password) {
              return done(null, false);
            }

            return done(null, user);
          });
      })
    );

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Listening on port ${process.env.PORT}`);
    });
  }
});

app.get('/', (req, res) => {
  res.render(`${process.cwd()}/views/pug/index.pug`, { title: 'Home Page', message: 'Please login', showLogin: true, showRegistration: true });
});

app.post('/login', passport.authenticate('local', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/profile');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

app.get('/profile', ensureAuthenticated, (req, res) => {
  res.render(`${process.cwd()}/views/pug/profile.pug`, { username: req.user.username });
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.post(
  '/register',
  (req, res, next) => {
    client
      .db('test')
      .collection('users')
      .findOne({ username: req.body.username }, (err, user) => {
        if (err) {
          next(err);
        } else if (user) {
          res.redirect('/');
        } else {
          client
            .db('test')
            .collection('users')
            .insertOne(
              {
                username: req.body.username,
                password: req.body.password,
              },
              error => {
                if (error) {
                  res.redirect('/');
                } else {
                  next(null, user);
                }
              }
            );
        }
      });
  },
  passport.authenticate('local', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/profile');
  }
);

app.use((req, res) => {
  res
    .status(404)
    .type('text')
    .send('Not Found');
});
