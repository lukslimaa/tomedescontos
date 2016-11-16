const request = require('request-promise');

module.exports = {

    /* This function returns all data about a given product. (Search by the product title) */
    getProductDetail: (title, callback) => {
        
        console.log('recebido: ' + title);

        const options = {
            uri: 'http://sandbox.buscape.com/service/findProductList/3250684742747036454c303d',
            qs: {
            keyword: title,
            format: 'json'
            },
            method: 'GET'

        }

        request(options).then((body) => {

            var result = JSON.parse(body);
            var jsonData = {};
            
            jsonData["minPrice"] = result.product[0].product.pricemin;
            jsonData["maxPrice"] = result.product[0].product.pricemax;
            jsonData["productName"] = result.product[0].product.productname;
            jsonData["image"] = result.product[0].product.thumbnail.formats[1].formats.url;

            console.log(jsonData);

            return callback(jsonData);
        }).catch((err) => {
            console.log(err);
        })
    }
}