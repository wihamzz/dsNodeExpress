const path = require('path');
const express = require('express');
const router = express.Router();

const message = [];

router.get('/form', (req, res, next) => {
    let isConnected = false;
    if (req.session && req.session.isLogin === true){
        //res.redirect("/connecte");
        isConnected = true;
    }

    res.render(path.join(__dirname,"..","views","form.ejs"),{pageTitle: "formulaire", isConnected: isConnected});

});

router.post('/form', (req, res, next) => {
    console.log(Object.assign({},req.body));
    const aa = Object.assign({},req.body);
    message.push({ message: req.body.message });
    res.redirect('/');
});

exports.routes = router;
exports.message = message;
