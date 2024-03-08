const path = require('path');
const express = require('express');
const router = express.Router();

const accessMessage = require('./form');


router.get('/', (req, res, next) => {
    console.log("acces message : ", accessMessage.message);
    console.log(req.session);
    let isConnected = false;
    if (req.session && req.session.isLogin === true){
        //res.redirect("/connecte");
        isConnected = true;
    }
    else {
        if (accessMessage.message) {
            const lemessage = accessMessage.message;
            if (lemessage.length > 0) {
                let value;
                for (const elt of lemessage) {
                    value = elt.message;
                    console.log("value : ", elt.message);
                }
            }
        }
    }
    res.render(path.join(__dirname,"..","views","accueil.ejs"),{pageTitle: "page accueil", username: req.session.username, accessMessage : accessMessage.message, isConnected: isConnected});


});

module.exports = router;
