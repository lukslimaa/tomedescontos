var mongoose = require('mongoose');
var utils = require('./utils.js');

//defining mongodb schema
var schema = new mongoose.Schema({
   title: String,
   url: String,
   img: String,
   date: String
});

//defining my model
var Promo = mongoose.model('Promos', schema);

module.exports = {
    
    //method responsible to add all promos to database
    add: (data) => {
        for(i = 0; i < data.length; i++){
            var img;
            if(data[i].img){ img = data[i].img;} else {img = null;}
            var promo = new Promo({
                title: data[i].title,
                url: data[i].href,
                img: img,
                date: utils.today()
            });
            
            promo.save(function(err, result){
                if(err) throw err;
            });
        }
    },
    //general method that returns the last 50 records sorted by date (descending)
    find: (callback) => {
        Promo.find().sort({date: -1}).limit(50).exec(function(err, model){
            return callback(model);
        });
    }
};

//opening mongo connection
mongoose.connect('mongodb://localhost:27017/promotions');