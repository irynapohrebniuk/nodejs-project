const Product = require('../models/product')
const Order = require('../models/order')

exports.getProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('shop/products', {
                prods: products,
                isAuthenticated: req.isLoggedIn,
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
    Product.findById(prodId)
        .then(prod => {
            res.render('shop/product-detail', {
                prod: prod,
                isAuthenticated: req.isLoggedIn,
                pageTitle: prod.title,
                path: '/products/' + prodId.toString()
            })
        })
        .catch(error => console.log(error))
}

exports.getIndex = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('shop/index', {
                prods: products,
                isAuthenticated: req.isLoggedIn,
                pageTitle: 'Shop',
                path: '/'
            })
        })
        .catch(error => console.log(error))
}

exports.getCart = (req, res, next) => {
    req.session.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            res.render('shop/cart', {
                pageTitle: 'Your Cart',
                path: 'shop/cart',
                isAuthenticated: req.isLoggedIn,
                products: user.cart.items
            })
        })
        .catch(err => console.log(err))
}

exports.postCart = (req, res, next) => {
    const productId = req.body.productId
    Product
        .findById(productId)
        .then(product => {
            return req.session.user.addToCart(product)
        })
        .then(result => res.redirect('/products'))
}

exports.postCartDeleteProduct = (req, res, next) => {
    const productId = req.body.prodId
    req.session.user
        .removeFromCart(productId)
        .then(result => res.redirect('/cart'))
        .catch(err => console.log(err))
}

exports.postOrder = (req, res, next) => {
    req
        .session
        .user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.cart.items.map(prod => { 
                return { quantity: prod.quantity, product: { ...prod.productId._doc} } 
            })
            const order = new Order({
                user: {
                    name: req.session.user.name,
                    userId: req.session.user
                },
                products: products
            })
            return order.save()
        })
        .then(result => req.session.user.clearCart())
        .then(result => res.redirect('/orders'))
        .catch(err => console.log(err))
}

exports.getOrders = (req, res, next) => {
    Order.find({'user.userId': req.session.user._id})
        .then(orders => {
            res.render('shop/orders', {
                orders: orders,
                isAuthenticated: req.isLoggedIn,
                pageTitle: 'Orders',
                path: '/orders'
            })
        })
}

exports.getCheckout = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/checkout', {
            prods: products,
            isAuthenticated: req.isLoggedIn,
            pageTitle: 'Checkout',
            path: '/checkout'
        })
    })
}