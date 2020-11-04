const express = require('express')
const path = require('path')
const expressHbs = require('express-handlebars')

const adminData = require('./routes/admin')
const userRoutes = require('./routes/shop')

const bodyParser = require('body-parser')

const app = express()

app.engine('hbs', 
    expressHbs({
        layoutsDir: 'views/layouts/', 
        defaultLayout: 'main-layout',
        extname: 'hbs'
    }))
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminData.routes)
app.use(userRoutes)

app.use((req,res,next) => {
    res.render('404', {pageTitle: "Page Not Found"})
})

app.listen(3000)

