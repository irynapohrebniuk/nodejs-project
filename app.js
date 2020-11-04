const express = require('express')
const path = require('path')

const adminData = require('./routes/admin')
const userRoutes = require('./routes/user')

const bodyParser = require('body-parser')

const app = express()
app.set('view engine', 'pug')
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminData.routes)
app.use(userRoutes)

app.use((req,res,next) => {
    res.render('404', {pageTitle: "Page not found"})
})

app.listen(3000)

