const Product = require('../../../models/product');

module.exports.sellProduct = async function (req, res) {
    console.log(req.body);
    res.set('Access-Control-Allow-Origin', '*');

    let product = await Product.findOne({
        seller_email: req.body.seller_email,
        product_name: req.body.product_name,
    });
    if (!product) {
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
            console.log('(-!-)', err);
            return res.status(500)
        }
    }
    else {
        console.log('Updating',product._id);
        await Product.findByIdAndUpdate(product._id, {
            item_count: req.body.item_count,
            buy_price: req.body.buy_price,
            sell_price: req.body.sell_price,
            discount : req.body.discount
        })
        .then(updated=>{
            console.log(updated);
            return res.status(200).json({
                message : 'Updated Products Details'
            })
        })
        .catch(err=>{
            console.log('error updating',err)
        })
    }
}