const Product = require('../../../models/product');

module.exports.sellProduct = async function (req, res) {
    console.log(req.body);
    res.set('Access-Control-Allow-Origin', '*');
    
    try {
        Product.create(req.body)
            .then(product => {
                return res.status(200).json({
                    message: 'Product Added to Sell',
                    product: product
                })
            })
            .catch(err => {
                console.log('(-_-)', err);
                res.status(400).json({
                    error: err
                })
            })

    } catch (error) {
        console.log('(-_-)', err);
        return res.status(500)
    }
}