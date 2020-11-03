const express = require('express')
const path = require('path')

const adminRoutes = require('./routes/admin')
const userRoutes = require('./routes/user')

const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes)
app.use(userRoutes)

app.use((req,res,next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(3000)

