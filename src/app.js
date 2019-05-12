const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const authRouter = require('./routers/authRouter');
const classRouter = require('./routers/classRouter');

mongoose.connect(config.mongoURL, {
  useFindAndModify: false,
  useCreateIndex: true,
  useNewUrlParser: true,
  socketTimeoutMS: 20000
});

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());

require('./services/passport');
authRouter(app);
classRouter(app);

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send({
    error: 'something broken'
  })
})

module.exports = app;
