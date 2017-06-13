'use strict';

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var express = require('express');
var app = express();
require('isomorphic-fetch');

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

    const requiredFields = ['title', 'returns'];
    console.log(req.body);
    for (let i=0; i<requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`;
        console.error(message);
        return res.status(400).send(message);
    }
  }

    let searched = req.body.title;
    const url = `https://api.themoviedb.org/3/search/tv?api_key=40c781f4f82334b037fc6d9c33cc1c58&query=${searched}`;
    console.log(url);

    fetch(url).then(response => {
        console.log(response);
        if (!response.ok) {
            Promise.reject(response.statusText);
        }
        return response.json();
    }).then(data => {
        
        console.log(data);

        return Show
        .create({   
            title: req.body.title,
            returns: req.body.returns,
            overview: data.results[0].overview,
            image: `https://image.tmdb.org/t/p/w500${data.results[0].poster_path}`
        })
    })
    .then(Show => res.status(201).json(Show.apiRepr()))
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
}




module.exports = {app};