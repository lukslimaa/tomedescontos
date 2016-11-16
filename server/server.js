/** defining all constant variables */
const express = require('express'),
      bodyParser = require('body-parser'),
      app = express(),
      mongoose = require('mongoose'),
      request = require('request-promise'),
      cheerio = require('cheerio'),
      iconv = require('iconv-lite'),
      fs = require('fs'),
      c = require('./controller/app.js'),
      db = require('./model/db.js'),
      generalParams = require('./config/generalParams.js'),
      cors = require('cors');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors({origin: 'http://localhost:8887'}));
mongoose.connect(generalParams.mongoAddr);
require('./app/routes.js')(app, db);

/** calling service to update database with new promotions */
// setInterval(function(){
//   console.log('processo iniciado!')
//   c.ctrl(generalParams.urls);
// }, 120000);

console.log('processo finalizado com sucesso!')

/** starting application */
app.listen('8081');
console.log('Magic happens on port 8081.');

exports = module.exports = app;