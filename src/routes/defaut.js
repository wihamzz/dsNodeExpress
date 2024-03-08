const path = require('path');
const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    let isConnected = false;
    if (req.session && req.session.isLogin === true){
        //res.redirect("/connecte");
        isConnected = true;
    }

    res.render(path.join(__dirname,"..","views","accueil.ejs"),{pageTitle: "page accueil", username: req.session.username, isConnected: isConnected});


});

module.exports = router;
