// set env
require('dotenv').config();
// import
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
//api
const login = require('./routes/login');
const join = require('./routes/join');
// define routes
let viewRoutes = require('./routes/view');
// logger
app.use(morgan('dev'));
// express extentions
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

/* public 폴더 지정 */
app.use(express.static(path.join(__dirname, 'public')));

/* health check */
app.use('/healthz', (req, res, next) => {
  res.status(200).send("dashboard ok");
});

/* route 설정 */
app.use('/api/login', login);
app.use('/api/join', join);
app.use('/*', viewRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).send("404");
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  logger.error(err);
  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info("Successfully connected to mongodb"))
  .catch(e => logger.error(e));

module.exports = app;