const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/products', {
            prods: products,
            pageTitle: 'All products',
            path: '/products'
        })
    })
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId
    Product.findProductById(prodId, prod => {
        res.render('shop/product-detail', {
            prod: prod,
            pageTitle: prod.title,
            path: '/products/'+ prodId.toString()
        })
    })
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        })
    })
}

exports.getCart = (req, res, next) => {
        res.render('shop/cart', {
            pageTitle: 'Your Cart',
            path: '/cart'
        })
}

exports.postCart = (req, res, next) => {
    const productId = req.body.productId
    Product.findProductById(productId, product => {
        Cart.addProduct(productId,product.price)
    })
    res.redirect('/products')
    // Product.fetchAll((products) => {
    //     res.render('shop/cart', {
    //         prods: products,
    //         pageTitle: 'Cart',
    //         path: '/cart'
    //     })
    // })
}

exports.getOrders = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/orders', {
            prods: products,
            pageTitle: 'Orders',
            path: '/orders'
        })
    })
}

exports.getCheckout = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/checkout', {
            prods: products,
            pageTitle: 'Checkout',
            path: '/checkout'
        })
    })
}