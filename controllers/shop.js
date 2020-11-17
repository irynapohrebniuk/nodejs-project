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
            path: '/products/' + prodId.toString()
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
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = []
            for (product of products) {
                const cartProductData = cart.products.find(
                    prod => prod.id === product.id
                )
                if (cartProductData) {
                    cartProducts.push({ productData: product, quantity: cartProductData.quantity })
                }
            }
            res.render('shop/cart', {
                pageTitle: 'Your Cart',
                path: 'shop/cart',
                products: cartProducts,
                totalPrice: cart.totalPrice
            })
        })

    })

}

exports.postCart = (req, res, next) => {
    const productId = req.body.productId
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