exports.getError404 = (req,res,next) => {
    res.render('404', {
        isAuthenticated: req.isLoggedIn,
        pageTitle: "Page Not Found", 
        path: ''
    })
}