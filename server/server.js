/** defining all constant variables */
const express = require('express'),
      app = express(),
      mongoose = require('mongoose'),
      request = require('request-promise'),
      cheerio = require('cheerio'),
      iconv = require('iconv-lite'),
      fs = require('fs'),
      c = require('./controller/app.js'),
      db = require('./model/db.js'),
      generalParams = require('./config/generalParams.js');

require('./app/routes.js')(app, db);
mongoose.connect(generalParams.mongoAddr);

/** calling service to update database with new promotions */
setInterval(function(){
  console.log('processo iniciado!')
  c.ctrl(generalParams.urls);
  console.log('processo finalizado!')
}, 300000);

/** starting application */
app.listen('8081');
console.log('Magic happens on port 8081.');

exports = module.exports = app;