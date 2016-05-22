var scrap1 = require('.././model/hmSource.js'),
    db = require('.././model/db.js'),
    scrap2 = require('.././model/pfSource.js'),
    scrap3 = require('.././model/gSource.js');

module.exports = {
    ctrl: (urls) => {
        var promotions = [];
        for(i=0;i<urls.length;i++){
            if(urls[i].indexOf('hardmob') > 0){ 
                scrap1.hmSource(urls[i], function(result){
                    promotions.push.apply(promotions, result);
                    db.add(promotions);
                });
            }
            if(urls[i].indexOf('promoforum') > 0){
                scrap2.pfSource(urls[i], function(result){
                    promotions.push.apply(promotions, result);
                    db.add(promotions);
                });
            } else {
                scrap3.gSource(urls[i], function(result){
                    promotions.push.apply(promotions, result);
                    db.add(promotions);
                })
            }
        }
    }
}