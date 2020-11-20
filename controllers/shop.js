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
            console.log("getCart", products)
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
            console.log("postCart req: ", req.user)
            return req.user.addToCart(product)
        })
        .then(result => console.log(result))

    Product.findProductById(productId, product => {
        Cart.addProduct(productId, product.price)
    })
    res.redirect('/cart')
}

exports.postCartDeleteProduct = (req, res, next) => {
    const productId = req.body.prodId
    Product.findProductById(productId, product => {
        Cart.deleteProduct(productId, product.price)
    })
    res.redirect('/cart')
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