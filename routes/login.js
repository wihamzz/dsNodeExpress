const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/login', (req, res, next) => {
    let isConnected = false;
    if (req.session && req.session.isLogin === true){
        //res.redirect("/connecte");
        isConnected = true;
    }

    res.render(path.join(__dirname,"..","views","login.ejs"),{pageTitle: "login", isConnected: isConnected});

});

router.post('/login', (req, res, next) => {
    console.log(Object.assign({},req.body));
    const resForm = Object.assign({},req.body);
    //res.setHeader('Set-Cookie', 'cookieForm');
    req.session.isLogin = true;
    req.session.username = resForm.login;
    console.log(req.session);
    res.redirect('/');
});

exports.routes = router;
