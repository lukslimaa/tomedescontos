//=======================================================
//============= All application routes here =============
//=======================================================

const service = require('.././controller/service.js');

module.exports = function(app, db) {


    /** return first 150 rows ordered by creation date */
    app.get('/promos', function(req, res){
        db.find(function(promos){
            res.json(promos);
        });
    });

    app.get('/promoImages', (req, res) => {
        db.findImages((images)=>{
            res.json(images);
        });
    });


    /* Endpoint which returns all details about a product. Data comes from Buscape API. */
    app.get('/promoDetail/:title', (req, res) => {
        var productInfo = {};
        service.getProductDetail(req.params.title, (result) => {
            res.json(result);
        });
    });

    /* Endpoint which returns all details about a product. Data comes from my own database. */
    app.get('/promo/getPromoByTitle/:title', (req, res) => {
        //console.log(req.params.title);
        db.findPromoByTitle(req.params.title, (result) => {
            res.json(result);
        });
    });

    app.post('/promo/update', function(req, res) {
        db.updatePromo(req.body, (result) => {
            res.json(result);
        })
    });
}