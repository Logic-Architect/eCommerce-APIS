const User = require('../../../models/user');
const Product = require('../../../models/product')
const Sold = require('../../../models/sold');


// CREATING A FRESH USER 
module.exports.create = async function (req, res) {
    console.log(req.body);
    res.set('Access-Control-Allow-Origin', '*');
    let user = await User.findOne({ email: req.body.email })

    if (!user) {
        User.create(req.body)
            .then(user => {

                // Create User Cart
                Sold.create({ buyer: user._id })

                console.log('*****', user);
                return res.status(200).json({
                    message: 'User Created Successfully',
                    user: user
                })
            })
            .catch(err => {
                console.log('(-_-)', err);
                if (req.body && (req.body.email == undefined)) {
                    return res.status(400).json({
                        message: 'Email required'
                    })
                }
                else {
                    res.status(500).json({
                        message: 'Internal Server Error'
                    })
                }
            })
    }
    else {
        return res.status(400).json({
            message: 'User Already Exists'
        })
    }
}

// ADDING ITEMS TO CART AND CREATING A USER IF NOT CREATED 
module.exports.addToCart = async function (req, res) {
    console.log(req.body);
    res.set('Access-Control-Allow-Origin', '*');


    if (!(req.body.product_name && req.body.seller_email && req.body.buyer_email && req.body.item_count)) {
        return res.status(400).json({
            meassage: 'Insufficient information to add Item'
        })
    }

    let buyer = req.body.buyer_email;
    let product = await Product.findOne({
        product_name: req.body.product_name,
        seller_email: req.body.seller_email
    })

    if (!product) {
        return res.status(200).json({
            message: 'No Such Product Avaliable To Buy'
        })
    }

    console.log('Product to buy is ', product);
    let item = {
        info: product._id,
        item_count: req.body.item_count
    }
    console.log('Item added to cart is ', item)

    let userInfo;
    // Check whether User is registered or not 
    let user = await User.findOne({ email: buyer });
    userInfo = user
    if (!user) {
         await User.create({ email: buyer })
         .then(async user=>{
             await Sold.create({ buyer: user._id })
             userInfo = user
         })
        console.log('User and its cart Created');
        user = await User.findOne({ email: buyer })
    }
    console.log('user to buy is ', user);



    // Check for item availability 
    let net_cost, discount
    if (product.item_count >= item.item_count) {
        discount = (product.discount / 100) * product.sell_price
        net_cost = item.item_count * (product.sell_price - discount)
    }
    else {
        return res.status(503).json({
            message: product.seller_name + ' does not have the listed number of Items'
        })
    }

    // Update items in Products 
    updatedCount = product.item_count-item.item_count;
    console.log(updatedCount,product.item_count,item.item_count)

    // await Sold.create({ buyer: user._id })
    await Sold.findOne({ buyer: userInfo._id })
        .then(async(userCart) => {
            console.log('0', userCart)
            userCart.product.push(item);
            userCart.save();

            await Product.findByIdAndUpdate(item.info , {item_count : updatedCount})

            console.log('UserCart', userCart)
            res.status(200).json({
                message: 'Item Added To Cart',
                item_added_is: {
                    Product: product.product_name,
                    Seller: product.seller_name,
                    Seller_Email: product.seller_email,
                    Items: item.item_count,
                    per_product_cost: product.sell_price,
                    total_cost: item.item_count * product.sell_price,
                    discount_percentage: product.discount,
                    discount: item.item_count * discount,
                    net_cost: net_cost
                }
            })
        })
}

// View the Cart Items 
module.exports.viewCart = async function (req, res) {
    console.log(req.query.user_email);
    res.set('Access-Control-Allow-Origin', '*');

    let user =await User.findOne({email : req.query.user_email})
    // console.log(user._id)
    if(!user){
        return res.status(400).json({
            message : 'User Does Not Exist'
        })
    }

    Sold.findOne({ buyer: user._id})
        .then(async (cart) => {
            console.log(cart);
            let products =[];
            let i=0;
            
                for(items of cart.product){
                    console.log('Item1',items)
                     await Product.findById(items.info)
                    .then(temp=>{
                        products[i++]={
                            product_detail :{
                                seller_email : temp.seller_email,
                                sold_by : temp.seller_name,
                                product_name : temp.product_name,
                                sold_at : temp.sell_price,
                                discount : temp.discount
                            },
                            quantity_buyed : items.item_count
                        };
                        console.log('0',products)
                    })
                }

            console.log('1',products)
            return res.status(200).json({
                user: cart.buyer,
                product_info: products
            })
        })
}