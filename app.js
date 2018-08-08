const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const redis = require('redis');
const redisConfig = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379
};
const redisClient  = redis.createClient({ host: redisConfig.host, port: redisConfig.port });
if (process.env.NODE_ENV === 'development') {
  const dotenv = require('dotenv');
  dotenv.config();
  const FileStore = require('session-file-store')(session);
};
if (process.env.NODE_ENV === 'production') {
  const RedisStore = require('connect-redis')(session);
};

const app = express();

// setup view engine
app.set('view engine', 'ejs');

// mongodb connection
mongoose.connect(process.env.MONOGO_URL, { useNewUrlParser: true })
.then(() => {
  console.log('Connected to Mongodb');
})
.catch(error => {
  console.log(error);
});

// REDIS connection
redisClient.on('connect', () => {
    console.log('Connected to REDIS');
});
redisClient.on('error', (err) => {
    console.log('REDIS Error: ' + err);
});

// session
let sess = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
};
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
  sess.store = new RedisStore({ host: redisConfig.host, port: redisConfig.port, client: redisClient, ttl: 260 })
};
if (process.env.NODE_ENV === 'development') {
  sess.store = new FileStore;
};

app.use(session(sess));

// init passport
app.use(passport.initialize());
app.use(passport.session());

// authentication check - check if user is logged in
const authCheck = (req, res, next) => {
  if (!req.user) {
    // no user found redirect to login
    res.redirect('/auth/authentiq');
  } else {
      // logged in
      next();
  }
};

// set up routes
app.use('/auth', authRoutes);

// home page
app.get('/', (req, res) => {
  res.render('home', { user: req.user });
});

// secure page
app.get('/profile', authCheck, (req, res) => {
  res.render('profile', { user: req.user });
});

// login page
app.get('/login', (req, res) => {
  res.render('login', { user: req.user });
});

app.listen(5000, () => {
  console.log('Server running on port: 5000');
});
