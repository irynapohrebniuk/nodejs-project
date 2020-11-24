const express = require('express')
const mongoose = require('mongoose')

const path = require('path')

const adminRoutes = require('./routes/routes-admin')
const shopRoutes = require('./routes/routes-shop')
const errorController = require('./controllers/error')

const User = require('./models/user')


const bodyParser = require('body-parser')
const { nextTick } = require('process')
const { Mongoose } = require('mongoose')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    User.findById('5fbd7927846aef27ecafb4d5')
        .then(user => {
            req.user = user
            next()
        })
        .catch(err => console.log(err))

})

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use(errorController.getError404)



mongoose
    .connect('mongodb+srv://user:usershop@cluster0.itwlf.mongodb.net/shop?retryWrites=true&w=majority')
    .then(result => {
        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    name: 'Iryna',
                    email: 'iryna.pohrebniuk@gmail.com',
                    cart: {
                        items: []
                    }
                })
                user.save()
            }
        })
        app.listen(3000)
    })
    .catch(err => console.log(err))

