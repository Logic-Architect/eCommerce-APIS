const Product = require('../../../models/product');

module.exports.viewAll = async function(req,res){
    
    Product.find({})
    .then(products=>{
        console.log(products)
        return res.status(200).json({
            product : products
        })
    })
    .catch(err=>{
        console.log('Error in finding Products',err)
        return res.status(500)
    })

}