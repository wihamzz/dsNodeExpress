const path = require('path');
const express = require('express');
const router = express.Router();

const username = require('./login');

router.get('/deconnection', (req, res, next) => {
    //console.log("nom utilisateur : ", username);
    //console.log(req.session);
    if (req.session && req.session.isLogin === true){
        //res.redirect("/connecte");
        //res.clearCookie("cookieForm");
        req.session.destroy();
    }

    res.redirect("/")


});

module.exports = router;