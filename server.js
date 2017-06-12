var express = require('express');
var app = express();
app.use(express.static('public'));
app.listen(process.env.PORT || 8080);



// https://www.programmableweb.com/api/movie-database-tmdb






module.exports = {app};