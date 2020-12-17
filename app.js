const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const mongoDbStore = require('connect-mongodb-session')(session)

const path = require('path')
const MONGODB_URI = 'mongodb+srv://user:usershop@cluster0.itwlf.mongodb.net/shop' 

const adminRoutes = require('./routes/routes-admin')
const shopRoutes = require('./routes/routes-shop')
const authRoutes = require('./routes/auth')
const errorController = require('./controllers/error')

const User = require('./models/user')


const bodyParser = require('body-parser')

const app = express()
const store = new mongoDbStore({
    uri: MONGODB_URI,
    collection: 'sessions'
})


app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
    secret: 'my secret', 
    resave: false, 
    saveUninitialized: false,
    store: store
}))

app.use((req, res, next) => {
    User.findById('5fbd7927846aef27ecafb4d5')
        .then(user => {
            req.session.user = user
            next()
        })
        .catch(err => console.log(err))

})

app.use('/admin', adminRoutes)
app.use(shopRoutes)
app.use(authRoutes)

app.use(errorController.getError404)



mongoose
    .connect(MONGODB_URI)
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

