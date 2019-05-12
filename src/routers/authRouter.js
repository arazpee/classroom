const passport = require('passport');
const User = require('../models/User');
const createToken = require('../helper/createToken');
const authMiddleware = require('../middlewares/authMiddleware');

const signinMiddleware = passport.authenticate('local', { session: false });

const router = function(app) {
  app.get('/secret', authMiddleware, function(req, res) {
    res.send({ hi: 'there' });
  });

  app.post('/signin', signinMiddleware, async function(req, res, next) {
    const token = createToken(req.user.id);
    req.user.tokens.push(token);
    const data = await req.user.save();
    res.status(200).send({ token: token });
  });

  app.post('/signup', function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const positions = req.body.positions;
    const name = req.body.name;

    if (!email || !password) {
      return res.status(400).send({ error: 'You must provide email and password'});
    }

    User.findOne({ email: email }, function(err, existingUser) {
      if (err) { return next(err); }

      if (existingUser) {
        return res.status(409).send({ error: 'Email is in use' });
      }

      const user = new User({
        email,
        password,
        positions,
        name
      });
      user.tokens.push(createToken(user.id));

      user.save(function(err, result) {
        if (err) { return next(err); }

        res.status(201).send({ user: user });
      });
    });
  });
}

module.exports = router;
