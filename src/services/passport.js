const passport = require('passport');
const User = require('../models/User');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, async function(email, password, done) {
  try {
    const user = await User.findOne({ email });
    if(!user) {
      done(null, false);
    }

    user.comparePassword(password, (err, isMatch) => {
      if(err) {
        done(err, null);
      }
      if(isMatch) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
  } catch(e) {
    done(e, null);
  }
});

passport.use(localLogin);
