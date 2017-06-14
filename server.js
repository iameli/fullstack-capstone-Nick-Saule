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


    fetch(url).then(response => {

        if (!response.ok) {
            Promise.reject(response.statusText);
        }
        return response.json();
    }).then(data => {
        


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

app.put('/shows/:id',(req, res) => {

    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
        res.status(400).json({
          error: 'Request path id and request body id values must match'
      });
    }

    const updated = {};
    const updateableFields = ['returns'];
    updateableFields.forEach(field => {
        if (field in req.body) {
          updated[field] = req.body[field];
      }
    });

    Show
    .findByIdAndUpdate(req.params.id, {$set: updated}, {new: true})
    .exec()
    .then(updatedShow=> res.status(201).json(updatedShow.apiRepr()))
    .catch(err => res.status(500).json({message: 'Something went wrong'}));
});


app.delete('/shows/:id',(req, res) => {
    Show
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => {
        console.log(`Deleted Show with id \`${req.params.ID}\``);
        res.status(204).end();
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

function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

if (require.main === module) {
    runServer().catch(err => console.error(err));
}




module.exports = {app, runServer, closeServer};