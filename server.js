const express = require('express');
// const path = require("path");
const app = express();
const connectToDb = require('./db');

// to access envroment variable
require('dotenv').config();

// convert request body to json other wise you will recive undefined
app.use(express.json());

// Connect to the mongodb server
connectToDb();
// #############################################################################
// This configures static hosting for files in /public that have the extensions
// listed in the array.
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html', 'css', 'js', 'ico', 'jpg', 'jpeg', 'png', 'svg'],
  index: ['index.html'],
  maxAge: '1m',
  redirect: false,
};
app.use(express.static('build', options));

app.use('/auth', require('./routes/Auth'));
app.use("/post", require("./routes/Posts"))

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`React app Backend listening at http://localhost:${port}`);
});
