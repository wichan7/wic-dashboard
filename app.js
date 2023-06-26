let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
// logger
let morgan = require('morgan');
let logger = require('./utils/logger');
let stream = { write: (message) => { logger.http(message) } };

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('combined', { stream }));

/* public 폴더 지정 */
app.use(express.static(path.join(__dirname, 'public')));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

module.exports = app;