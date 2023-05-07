const Product = require('../../../models/product');

module.exports.sellProduct = async function(req,res){
    console.log(req.body);

    let item = Product.create(req.body)

    return res.status(200).json({
        message : 'Product Added to Sell',
    })
}