const express = require('express')
const path = require('path')

const router = express.Router()

const adminData = require('./admin')

router.get('/', (req, res, next) => {
    const products = adminData.products
    res.render('user', {prods: products, docTitle: 'My products'})
})

module.exports = router