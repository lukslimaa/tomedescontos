var mongoose = require('mongoose'),
    utils = require('./utils.js');

//defining mongodb schema
var schema = new mongoose.Schema({
   title: {
       type:String,
       required:true,
       unique:true
   },
   url: {
       type:String,
       required:true
   },
   img: {
       type:String
   },
   date: {
       type:String,
       required:true
   }
});

//defining my model
var Promo = mongoose.model('Promos', schema);

module.exports = {
    
    //method responsible to add all promos to database
    add: (data) => {
        for(i = 0; i < data.length; i++){
            var img, date;
            if(data[i].img){ img = data[i].img;} else {img = null;}
            if(data[i].date){ date = data[i].date;} else {date = utils.today();}
            var promo = new Promo({
                title: data[i].title,
                url: data[i].href,
                img: img,
                date: date
            });
            
            /* calling update method */
            updateDb(promo, function(result){
            });
        }
    },
    /* general method that returns the last 150 records sorted by date (descending) */
    find: (callback) => {
        Promo.find().sort({date: -1}).limit(150).exec(function(err, model){
            return callback(model);
        });
    }
};

/* method responsible to update database with new promo's information */
function updateDb(promo, cb){
    Promo.find({title: promo.title}, function(err, docs){
        if(docs.length){
            cb('title exists already!', null);
        } else {
            promo.save(function(err){
                cb(err, promo.title);
            });
        }
    });
}

//opening mongo connection
mongoose.connect('mongodb://localhost:27017/promotions');