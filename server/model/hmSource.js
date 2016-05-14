var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var request = require('request-promise');



module.exports = {
    hmSource: (url, callback) => {
        var result = [];
        var options = {
            uri: url,
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
            $('.threads li .title').filter(function(){
                result.push({title: $(this).text(), href: $(this)[0].attribs.href});
            })
            return callback(result);
        })
        .catch(function(err){
            return err;
        })
    }
}