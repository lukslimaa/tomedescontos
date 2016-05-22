var cheerio = require('cheerio'),
    iconv = require('iconv-lite'),
    request = require('request-promise'),
    utils = require('./utils.js');



module.exports = {
    gSource: (url, callback) => {
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
            var a = iconv.decode(new Buffer(html), 'utf8');
            var $ = cheerio.load(a);
            var img, title, url, currency, price, result = [];
            $('.promocao').filter(function(){
                
                //extracting data to save on database
                img = $(this)[0].children[0].next.children[2].prev.children[0].attribs.src;
                title = $(this)[0].children[2].next.children[0].next.children[0].next.children[0].data;
                url = $(this)[0].children[2].next.children[0].next.children[0].next.attribs.href;
                currency = $(this)[0].children[2].next.children[4].next.children[0].next.children[0].data;
                price = $(this)[0].children[2].next.children[4].next.children[0].next.next.next.children[0].data;
                
                //adding all data to array that will be returned
                result.push({title: title + ' - ' + currency+price, href: url, img: img, date: utils.today()});
            })
            
            return callback(result);
        })
        .catch(function(err){
            return err;
        })
    }
}