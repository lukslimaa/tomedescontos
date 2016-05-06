var request = require('request-promise');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');


module.exports = {
    test: (urls, callback) => {
        var result = [], signal = 0;
        console.log(urls);
        for(i=0;i<urls.length;i++){
            console.log(urls[i]);
            var options = {
                uri: urls[i],
                encoding: null,
                headers: {
                    "Accept": "text, text/plain, text/xml",
                    "Accept-Encoding": "UTF-8",
                    'Content-Type': "text/plain; charset=utf-8;",
                    'user-agent': 'Request-Promise'
                }
            }
            request(options)
                .then(function(html) {
                    var a = iconv.decode(new Buffer(html), 'iso-8859-1');
                    var $ = cheerio.load(a);
                    
                    $('.threads li .title').filter(function(){
                        result.push({title: $(this).text(), href: $(this)[0].attribs.href});
                    })
                    $('.discussionListItem.visible .PreviewTooltip').filter(function(){
                        var root = (options.uri).substring(0,(options.uri).indexOf('br/')+3);
                        result.push({title: $(this).text(), href: root+$(this)[0].attribs.href});
                    })
                    
                    signal++;  
                    
                    if(signal == urls.length){
                        return callback(null, result);
                    }                 
                })
                .catch(function(err){
                    return 'errado';
                })
        }        
    }
}