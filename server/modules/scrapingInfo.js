var cheerio = require('cheerio');
var iconv = require('iconv-lite');

module.exports = {
    scrapInfo: (html) => {
        var result = [];
        var $ = cheerio.load(html);
        
        if($('.threads li').hasClass('title')){
            $ = iconv.decode(new Buffer($), 'iso-8859-1');
            console.log($);
            $('.threads li .title').filter(function(){
                result.push({title: $(this).text(), href: $(this)[0].attribs.href});
            })
        }
        
        if($('.discussionListItem.visible').hasClass('PreviewTooltip')){
            $ = iconv.decode(new Buffer($), 'utf-8');
            $('.discussionListItem.visible .PreviewTooltip').filter(function(){
                var root = (options.uri).substring(0,(options.uri).indexOf('br/')+3);
                result.push({title: $(this).text(), href: root+$(this)[0].attribs.href});
            })
        }
        console.log(result)
;        return result;
    }
}