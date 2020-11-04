const products = []

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', { 
        pageTitle: 'Add product', 
        path: '/admin/add-product',
        activeAddProduct: true
    })
}

exports.postAddProduct = (req, res, next) => {
    console.log(req.body.product)
    products.push({title: req.body.title})
    res.redirect('/')
}

exports.getProducts = (req, res, next) => {
    res.render('shop', {
        prods: products, 
        pageTitle: 'My products', 
        path: '/', 
        hasProducts: products.length > 0,
        activeShop: true
    })
}