let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
/* public 폴더 지정 */
app.use(express.static(path.join(__dirname, 'public')));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

module.exports = app;