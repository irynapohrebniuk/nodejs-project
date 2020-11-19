const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add product',
        path: '/admin/add-product',
        editing: false
    })
}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title
    const description = req.body.description
    const price = req.body.price
    const imgUrl = req.body.imgUrl
    const userId = req.user._id
    console.log(userId)
    const product = new Product(null, title, description, price, imgUrl,userId)
    product
        .save()
        .then(result => {
            console.log("Created product = ", product)
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
    
    Product.findProductById(prodId)
        .then(product => {
            if (!product) {
                return res.redirect('/')
            }
            res.render('admin/edit-product', {
                pageTitle: 'Edit product',
                path: '/admin/edit-product/' + prodId.toString(),
                editing: editMode,
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
    const updatedProduct = new Product(
        prodId, 
        updatedTitle, 
        updatedDescription, 
        updatedPrice, 
        updatedImgUrl
    )

    updatedProduct.save()
    res.redirect('/admin/products')
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId
    Product.deleteById(prodId)
    res.redirect('/admin/products')
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(products => {
            res.render('admin/products', {
                prods: products,
                pageTitle: 'Admin products',
                path: '/admin/products'
            })
        })
        .catch(error => console.log(error))
}

// exports.getAddUser = (req, res, next) => {
//     res.render('admin/edit-user', {
//         pageTitle: 'Add user',
//         path: '/admin/add-user',
//         editing: false
//     })
// }

// exports.postAddUser = (req, res, next) => {
//     const name = req.body.userName
//     const email = req.body.userEmail
//     const user = new User(name, email)
//     user
//         .save()
//         .then(result => {
//             console.log("Created user")
//             res.redirect('/admin/users')
//         })
//         .catch(err => console.log(err))
// }

// exports.getUsers = (req, res, next) => {
//     User.fetchAll()
//         .then(users => {
//             res.render('admin/users', {
//                 users: users,
//                 pageTitle: 'Admin users',
//                 path: '/admin/users'
//             })
//         })
//         .catch(error => console.log(error))
// }