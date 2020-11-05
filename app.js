const express = require('express')
const path = require('path')

const adminRoutes = require('./routes/root-add-product')
const userRoutes = require('./routes/root-product-list')
const errorController = require('./controllers/error')

const bodyParser = require('body-parser')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes)
app.use(userRoutes)

app.use(errorController.getError404)

app.listen(3000)

