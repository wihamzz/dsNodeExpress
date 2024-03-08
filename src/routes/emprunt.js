const path = require('path');
const express = require('express');
const router = express.Router();

const calculEmprunt = require('../modules/calculEmprunt');

router.get('/emprunt', (req, res, next) => {
    let isConnected = false;
    if (req.session && req.session.isLogin === true){
        //res.redirect("/connecte");
        isConnected = true;
        let erreur = "";
        let result = "";
        if (req.session.lastErrorEmprunt != null){
            erreur = req.session.lastErrorEmprunt;
            req.session.lastErrorEmprunt = null;
        }
        if (req.session.lastResult != null){
            result = req.session.lastResult;
            req.session.lastResult = null;
        }
        res.render(path.join(__dirname,"..","views","emprunt.ejs"),{pageTitle: "Emprunt", isConnected: isConnected, resultatMensuel:result, erreur:erreur});
    }
    else {
        res.redirect("/");
    }
});


router.post('/emprunt', (req, res, next) => {
    const resForm = Object.assign({}, req.body);

    const capital = parseFloat(resForm.montant);
    const taux = parseFloat(resForm.taux);
    const duree = parseInt(resForm.duree);

    // Valider les paramètres d'entrée
    if(capital <= 0 || taux < 0 || duree<=0 || isNaN(duree) || isNaN(taux) || isNaN(capital)){

        req.session.lastErrorEmprunt = "Paramètres incorrects, veuillez réessayer";
        //res.render(path.join(__dirname,"..","views","emprunt.ejs"), {pageTitle: "emprunt",isConnected: isConnected, erreur: "Paramètres incorrects, veuillez réessayer", resultatMensuel: ""});
    }
    else{
        // Calculer la mensualité avec la fonction emprunt
        const mensualite = calculEmprunt(capital, taux, duree);

        // Initialiser un tableau dans la session s'il n'existe pas
        req.session.historique = req.session.historique || [];

        // Ajouter les informations du calcul à l'historique
        req.session.historique.push({ capital: capital, taux: taux, duree: duree, mensualite: mensualite});

        req.session.lastResult = "Le paiement mensuel pour un prêt de "+ capital +"€ avec un taux d'intérêt de "+ taux +"% sur "+ duree +" ans est : "+ mensualite.toFixed(2)+"€";


        //res.render(path.join(__dirname,"..","views","emprunt.ejs"), {pageTitle: "emprunt",isConnected: isConnected, erreur: "", resultatMensuel: "Le paiement mensuel pour un prêt de "+ capital +"€ avec un taux d'intérêt de "+ taux +"% sur "+ duree +" ans est : "+ mensualite.toFixed(2)+"€"});
    }
    res.redirect("/emprunt");
});


module.exports = router;
