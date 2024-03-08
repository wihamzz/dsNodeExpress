const path = require('path');
const express = require('express');
const router = express.Router();



router.get('/login', (req, res, next) => {
    let isConnected = false;
    if (req.session && req.session.isLogin === true){
        isConnected = true;
        res.redirect("/");
    }
    res.render(path.join(__dirname,"..","views","login.ejs"),{pageTitle: "login", isConnected: isConnected, erreur: ""});
});

router.post('/login', (req, res, next) => {
    console.log(Object.assign({},req.body));
    const resForm = Object.assign({},req.body);
    if (resForm.login === "user" && resForm.mdp === "user"){
        req.session.username = resForm.login;
        req.session.isLogin = true;
        res.redirect('/')
    }
    else {
        let isConnected = false;
        res.render(path.join(__dirname,"..","views","login.ejs"),{pageTitle: "login", isConnected: isConnected, erreur: "Mauvais login ou mot de passe"});
    }
    console.log(req.session);
});

module.exports = router;

