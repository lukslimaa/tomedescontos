var express = require('express');
var fs = require('fs');
var request = require('request-promise');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var app     = express();
const scrap = require('./controller/app.js');

app.get('/', function(req, res){
  var urls = ["http://hardmob.com.br/promocoes", 
            "http://www.hardmob.com.br/promocoes/index2.html", 
            "http://www.promoforum.com.br/forums/promocoes/", 
            "http://www.promoforum.com.br/forums/promocoes/page-2"];
  
  scrap.test(urls, function(err, result){
      res.send(result);
  })
})

app.listen('8081');
console.log('Magic happens on port 8081.');

exports = module.exports = app;