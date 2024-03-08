const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/emprunt', (req, res, next) => {
    let isConnected = false;
    if (req.session && req.session.isLogin === true){
        //res.redirect("/connecte");
        isConnected = true;
        res.render(path.join(__dirname,"..","views","emprunt.ejs"),{pageTitle: "Emprunt", isConnected: isConnected, resultatMensuel:" ", erreur:""});
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
        let isConnected = true;
        res.render(path.join(__dirname,"..","views","emprunt.ejs"),
            {pageTitle: "emprunt",isConnected: isConnected, erreur: "Paramètres incorrects, veuillez réessayer",
                resultatMensuel: ""});
    }

    // Calculer la mensualité avec la fonction emprunt
    const mensualite = emprunt(capital, taux, duree);

    // Initialiser un tableau dans la session s'il n'existe pas
    req.session.historique = req.session.historique || [];

    // Ajouter les informations du calcul à l'historique
    req.session.historique.push({
        capital: capital,
        taux: taux,
        duree: duree,
        mensualite: mensualite
    });

    let isConnected = true;
    res.render(path.join(__dirname,"..","views","emprunt.ejs"),
        {pageTitle: "emprunt",isConnected: isConnected, erreur: "",
            resultatMensuel: "Le paiement mensuel pour un prêt de "+ capital +"€ avec un taux d'intérêt de "+ taux +"% sur "+ duree +" ans est : "+ mensualite.toFixed(2)+"€"});
});

// Définir la fonction de prêt avec des paramètres pour le montant du prêt, le taux d'intérêt et la durée du prêt
function emprunt(capital, taux, duree){

    // Calculer le nombre total de paiements
    const nombreDePayement = duree*12;

    if (taux == 0){
        const mensualite = capital / nombreDePayement;
        return mensualite;
    }

    // Calculer le taux d'intérêt mensuel
    const interetMensuel = taux/12/100;

    // Calculez la mensualité à l'aide de la formule : M = P[r(1+r)^n]/[(1+r)^n – 1]
    const mensualite= (capital * interetMensuel * Math.pow(1 + interetMensuel, nombreDePayement)) /
        (Math.pow(1 + interetMensuel, nombreDePayement) - 1);

    // Return la valeur du paiement mensuel
    return mensualite;
}

module.exports = router;
