'use strict';

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var express = require('express');
var app = express();

const {DATABASE_URL, PORT} = require('./config');
const {BlogPost,User} = require('./models');

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






module.exports = {app};