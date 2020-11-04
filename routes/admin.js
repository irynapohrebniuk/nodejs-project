const express = require('express')
const path = require('path')

const router = express.Router()
const bodyParser = require('body-parser')
const products = []

router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(__dirname,'..', 'views', 'add-product.html'))
})

router.post('/add-product', (req, res, next) => {
    console.log(req.body.product)
    products.push({product: req.body.product})
    res.redirect('/')
})

exports.routes = router
exports.products = products