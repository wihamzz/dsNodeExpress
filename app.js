const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const port=8000;
const app = express();

const defautRoutes = require('./routes/defaut');
const formRoutes = require('./routes/form');
const loginRoutes = require('./routes/login');
const connecteRoutes = require('./routes/connecte');
const deconnectionRoutes = require('./routes/deconnection');

const session = require('express-session');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname,'public')));
app.use(session({ secret : "un secret", resave : false, saveUninitialized: false}));


app.use(formRoutes.routes);
app.use(loginRoutes.routes);
app.use(deconnectionRoutes);
app.use(connecteRoutes);
app.use(defautRoutes);



app.use((req,res,next)=>{

    let isConnected = false;

    if (req.session && req.session.isLogin === true){
        //res.redirect("/connecte");
        isConnected = true;
    }

    res.status(404).render(path.join(__dirname,"views","404.ejs"),{pageTitle: "404 not found", isConnected: isConnected});
});



app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));

app.listen(port);
console.log("serveur http à l'écoute sur le port : "+port);
