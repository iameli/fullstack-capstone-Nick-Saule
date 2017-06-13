'use strict';

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var express = require('express');
var app = express();

const {DATABASE_URL, PORT} = require('./config');
const {Show} = require('./models');

mongoose.Promise = global.Promise;

app.use(express.static('public'));
app.use(bodyParser.json());
//app.listen(process.env.PORT || 8080);


app.get('/shows', (req, res) => {
    Show
    .find()
    .exec()
    .then(shows => {
        res.json(shows.map(Show => Show.apiRepr()));
    })
     .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });

});


app.post('/shows', (req, res) => {

  const requiredFields = ['title', 'date'];
  console.log(req.body);
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }

  Show
    .create({
      title: req.body.title,
      date: req.body.date})
    .then(
      Show => res.status(201).json(Show.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
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