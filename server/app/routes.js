//=======================================================
//============= All application routes here =============
//=======================================================

module.exports = function(app, db) {
    
    /** return first 150 rows ordered by creation date */
    app.get('/promos', function(req, res){
        db.find(function(promos){
            res.json(promos);
        });
    });
}