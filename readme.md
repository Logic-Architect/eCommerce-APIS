# eCommerce APIS for WebSultanate Carts

# API to view all Products 
## type : 'GET'
## url : http://localhost:8000/api/v1/product/view-all

# API to add a product for selling
## type : 'POST'
## url : http://localhost:8000/api/v1/seller/sell-product
## x-www-form-urlencoded : true
### required key-values :
        seller_name  : '',
        seller_email : '',
        product_name : '',
        item_count   : '',
        buy_price    : '',
        sell_price   : '',
        discount     : ''

# API to add a product to Cart
## type : 'POST'
## url : http://localhost:8000/api/v1/user/add-to-cart
## x-www-form-urlencoded : true
### required key-values :
        buyer_email  : '',
        seller_email : '',
        product_name : '',
        item_count   : '',

# API to add a product for Viewing the Items added to Cart
## type : 'GET'
## url : http://localhost:8000/api/v1/user/view-cart
## query params : true
### required query parameter:
        user_email : ''
        