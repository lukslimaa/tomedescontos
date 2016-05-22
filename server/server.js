var express = require('express'),
  fs = require('fs'),
  request = require('request-promise'),
  cheerio = require('cheerio'),
  iconv = require('iconv-lite'),
  app = express(),
  c = require('./controller/app.js'),
  db = require('./model/db.js');


app.get('/promos', function(req, res){
  var signal = 0;
  var urls = [//"http://hardmob.com.br/promocoes", 
              //"http://www.hardmob.com.br/promocoes/index2.html", 
              //"http://www.promoforum.com.br/forums/promocoes/", 
              //"http://www.promoforum.com.br/forums/promocoes/page-2",
              "https://gatry.com/home/mais_promocoes?qtde=0&onlyPromocao=true",
              "https://gatry.com/home/mais_promocoes?qtde=9&onlyPromocao=true"];
              
  //calling methods responsibles to scrap all information and add it to database
  c.ctrl(urls);
  
  //recovering data from database to make it available to be consumed
  db.find(function(promos){
    res.json(promos);
  });
})

app.listen('8081');
console.log('Magic happens on port 8081.');

exports = module.exports = app;