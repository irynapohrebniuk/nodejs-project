const express = require('express')
const path = require('path')

const adminRoutes = require('./routes/routes-admin')
const shopRoutes = require('./routes/routes-shop')
const errorController = require('./controllers/error')
const mongoConnect = require('./util/database').mongoConnect
const User = require('./models/user')


const bodyParser = require('body-parser')
const { nextTick } = require('process')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    User.findUserById('5fb6d413fa0f31cf222ac23f')
        .then(user => {
            req.user = new User(user._id,user.name, user.email,user.cart)
            next()
        })
        .catch(err => console.log(err))
        
})

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorController.getError404)



mongoConnect(client => {

    app.listen(3000)
})