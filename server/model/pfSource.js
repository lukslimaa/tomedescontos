var cheerio = require('cheerio'),
    iconv = require('iconv-lite'),
    request = require('request-promise'),
    utils = require('./utils.js');



module.exports = {
    pfSource: (url, callback) => {
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
            var a = iconv.decode(new Buffer(html), 'utf8');
            var $ = cheerio.load(a);
            $('.discussionListItem.visible:not(.sticky) .PreviewTooltip').filter(function(){
                var root = (options.uri).substring(0,(options.uri).indexOf('br/')+3);
                result.push({title: $(this).text(), href: root+$(this)[0].attribs.href, img: null, date: utils.today()});
            })
            
            return callback(result);
        })
        .catch(function(err){
            return err;
        })
    }
}