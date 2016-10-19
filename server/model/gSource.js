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
                img = $(this).find($('.imagem img')).attr('src');
                title = $(this).find($('.informacoes h3[itemprop=name] a')).text();
                url = $(this).find($('.informacoes a')).attr('href');
                currency = $(this).find($('.informacoes .preco span[itemprop=priceCurrency]')).text();
                price = $(this).find($('.informacoes .preco span[itemprop=price]')).text();

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