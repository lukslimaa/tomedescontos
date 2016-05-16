var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var request = require('request-promise');



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
                result.push({title: $(this).text(), href: root+$(this)[0].attribs.href});
            })
            
            return callback(result);
        })
        .catch(function(err){
            return err;
        })
    }
}