const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('shop/products', {
                prods: products,
                pageTitle: 'All products',
                path: '/products'
            })
        })
        .catch(error => {
            console.log(error)
        })
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId
    Product.findProductById(prodId)
        .then(prod => {
            res.render('shop/product-detail', {
                prod: prod,
                pageTitle: prod.title,
                path: '/products/' + prodId.toString()
            })
        })
        .catch(error => console.log(error))
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop',
                path: '/'
            })
        })
        .catch(error => console.log(error))
}

exports.getCart = (req, res, next) => {
    req.user
        .getCart()
        .then(products => {
            res.render('shop/cart', {
                pageTitle: 'Your Cart',
                path: 'shop/cart',
                products: products
            })
        })
        .catch(err => console.log(err))
}

exports.postCart = (req, res, next) => {
    const productId = req.body.productId
    Product
        .findProductById(productId)
        .then(product => {
            return req.user.addToCart(product)
        })
        .then(result => res.redirect('/products'))
}

exports.postCartDeleteProduct = (req, res, next) => {
    const productId = req.body.prodId
    req.user
        .deleteProductFromCart(productId)
        .then(result => res.redirect('/cart'))
        .catch(err => console.log(err))
}

exports.postOrder = (req, res, next) => {
    req.user
        .addOrder()
        .then(result => res.redirect('/orders'))
        .catch(err => console.log(err))
}

exports.getOrders = (req, res, next) => {
    req.user
        .getOrders()
        .then((orders) => {
            console.log("orders: ", orders)
            res.render('shop/orders', {
                orders: orders,
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