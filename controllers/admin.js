const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add product',
        path: '/admin/add-product',
        activeAddProduct: true
    })
}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title
    const description = req.body.description
    const price = req.body.price
    const imgUrl = req.body.imgUrl
    const product = new Product(title, description, price, imgUrl)
    product.save()
    res.redirect('/')
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin products',
            path: '/admin/products'
        })
    })
}