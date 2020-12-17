const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    console.log("Adding the new product")
    res.render('admin/edit-product', {
        pageTitle: 'Add product',
        path: '/admin/add-product',
        isAuthenticated: req.isLoggedIn,
        editing: false
    })
}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title
    const description = req.body.description
    const price = req.body.price
    const imgUrl = req.body.imgUrl
    const product = new Product({ title: title, price: price, description: description, imgUrl: imgUrl, userId: req.session.user })
    product
        .save()
        .then(result => {
            res.redirect('/admin/products')
        })
        .catch(err => console.log(err))
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit
    if (!editMode) {
        return res.redirect('/')
    }
    const prodId = req.params.productId

    Product.findById(prodId)
        .then(product => {
            if (!product) {
                return res.redirect('/')
            }
            res.render('admin/edit-product', {
                pageTitle: 'Edit product',
                path: '/admin/edit-product/' + prodId.toString(),
                editing: editMode,
                isAuthenticated: req.isLoggedIn,
                product: product
            })
        })
        .catch(error => console.log(error))
}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId
    const updatedTitle = req.body.title
    const updatedDescription = req.body.description
    const updatedPrice = req.body.price
    const updatedImgUrl = req.body.imgUrl

    Product.findById(prodId)
        .then(product => {
            product.title = updatedTitle
            product.description = updatedDescription
            product.price = updatedPrice
            product.imgUrl = updatedImgUrl
            return product.save()
        })
        .then(result => {
            console.log("product is updated", result)
            res.redirect('/admin/products')
        })
        .catch(err => console.log(err))
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId
    Product.findByIdAndRemove(prodId)
        .then((product)=> 
        console.log("The product is removed", product))
    res.redirect('/admin/products')
}

exports.getProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('admin/products', {
                prods: products,
                isAuthenticated: req.session.user.isLoggedIn,
                pageTitle: 'Admin products',
                path: '/admin/products'
            })
        })
        .catch(error => console.log(error))
}
