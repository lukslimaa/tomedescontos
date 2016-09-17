//=======================================================
//============= All application routes here =============
//=======================================================

module.exports = function(app, db) {
    /** return first 150 rows ordered by creation date */
    app.get('/promos', function(req, res){
        db.find(function(promos){
        	//The server allows any domain to call it with the XMLHttpRequest
        	res.setHeader("Access-Control-Allow-Origin", "*");
            res.json(promos);
        });
    });

    app.get('/promoImages', (req, res) => {
        db.findImages((images)=>{
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.json(images);
        })
    })
}