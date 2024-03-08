// Définir la fonction de prêt avec des paramètres pour le montant du prêt, le taux d'intérêt et la durée du prêt
function calculEmprunt(capital, taux, duree){

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

module.exports = calculEmprunt;