const path = require('path');
const express = require('express');
const router = express.Router();

const username = require('./login');

router.get('/connecte', (req, res, next) => {
    console.log("nom utilisateur : ", username);
    console.log(req.session);
    let isConnected = false;
    if (req.session && req.session.isLogin === true){
        //res.redirect("/connecte");
        isConnected = true;
    }

    if (req.session && req.session.isLogin === true){
        res.render(path.join(__dirname,"..","views","connecte.ejs"),{pageTitle: "page user connecte", username: req.session.username, isConnected: isConnected});
    }
    else{
        res.redirect("/")
    }



});

module.exports = router;