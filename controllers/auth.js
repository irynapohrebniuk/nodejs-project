const user = require("../models/user")

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        isAuthenticated: req.session.isLoggedIn,
        pageTitle: 'Login',
        path: '/login'
    })
}

exports.postLogin = (req, res, next) => {
    user.findById('5fbd7927846aef27ecafb4d5')
        .then(user => {
            req.session.isLoggedIn = true
            req.session.user = user
            console.log("user", user)
            console.log("req.session", req.session)
            res.redirect("/")
        })
    // res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly; Secure')
    
}

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err)
        res.redirect("/")
    })
}