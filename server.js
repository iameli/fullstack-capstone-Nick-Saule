'use strict';

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var express = require('express');
var app = express();

const {DATABASE_URL, PORT} = require('./config');
const {Show} = require('./models');

mongoose.Promise = global.Promise;

app.use(express.static('public'));
app.listen(process.env.PORT || 8080);


app.get('/shows', (req, res) => {
    Show
    .find()
    .exec()
    .then(posts => {
        res.json(posts.map(post => post.apiRepr()));
    })
     .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });

});


// https://www.programmableweb.com/api/movie-database-tmdb



let server;

function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }

      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

// `closeServer` function is here in original code

if (require.main === module) {
  runServer().catch(err => console.error(err));
};




module.exports = {app};