const path = require('path');
const express = require('express');
const router = express.Router();


router.get('/historique', (req, res, next) => {
    let isConnected = false;
    let historique = req.session.historique || [];
    if (req.session && req.session.isLogin === true){
        //res.redirect("/connecte");
        isConnected = true;

        res.render(path.join(__dirname, '..', 'views', 'historique.ejs'), {
            pageTitle: 'historique',
            isConnected: isConnected,
            historique: historique
        });
    }
    else {
        res.redirect("/");
    }

});

module.exports = router;

