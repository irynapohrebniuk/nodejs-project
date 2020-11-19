const express = require('express')

const router = express.Router()
const adminController = require('../controllers/admin')

router.get('/add-product', adminController.getAddProduct)

router.post('/add-product', adminController.postAddProduct)

router.get('/products', adminController.getProducts)

router.get('/edit-product/:productId', adminController.getEditProduct)

router.post('/edit-product', adminController.postEditProduct)

router.post('/delete-product', adminController.postDeleteProduct)

// router.get('/add-user', adminController.getAddUser)

// router.post('/add-user', adminController.postAddUser)

// router.get('/users', adminController.getUsers)

module.exports = router