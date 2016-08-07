const request = require('request-promise'),
      cheerio = require('cheerio'),
      iconv = require('iconv-lite'),
      db = require('.././model/db.js');
    

module.exports = {
    getExtraInfo:(title, callback)=>{
        var options = {
            uri: 'http://buscape.com.br/' + title,
            encoding: null,
            headers: {
                "Accept": "text, text/plain, text/xml",
                "Accept-Encoding": "UTF-8",
                'Content-Type': "text/plain; charset=utf-8;",
                'user-agent': 'Request-Promise'
            }
        };
        
        request(options).then(function(html){
            var a = iconv.decode(new Buffer(html), 'utf8');
            var $ = cheerio.load(a);
            var image;
            $('img#main-product-image').filter(function(){
                image = $(this)[0].attribs.src;
            })
            
            if(image){
                return callback(image);
            } else {
                return callback(null);
            }
            
        }).catch(function(e){
            console.log('erro: '+ e);
            return callback(null);
        });  
    }
}