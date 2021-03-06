var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var request = require('request-promise');



module.exports = {
    getProductImage: (title, callback) => {
        
        var options = {
            uri: 'http://buscape.com.br/'+title,
            encoding: null,
            headers: {
                "Accept": "text, text/plain, text/xml",
                "Accept-Encoding": "UTF-8",
                'Content-Type': "text/plain; charset=utf-8;",
                'user-agent': 'Request-Promise'
            }
        }
            
        request(options).then(function(html){
            var a = iconv.decode(new Buffer(html), 'iso-8859-1');
            var $ = cheerio.load(a);
            $('img#main-product-image').filter(function(){
              if($(this).attr('src')){
                 return callback($(this).attr('src')); 
              } else {
                  return null;
              }  
            })       
        })
        .catch(function(err){
            return err;
        })   
    }
}