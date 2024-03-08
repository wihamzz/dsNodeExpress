# Rapport DS node express


### install :
* ```npm install ejs```
* ```npm install express```
* ```npm install express-session```
* ```npm install node```


## Explication de code

### Code 1

Fonction d'emprunt de emprunt.js. <br>
Cette fonction est utilisée par le client sur le site pour calculer la valeur du paiement mensuel.<br>
Le client envoie les 3 valeurs capitale, taux, durée(en année) depuis un formulaire HTML. Les valeur sont tester lors de la récupération <br>
Le code renvoie le résultat en dessous du formulaire et envoie les valeurs entrées et le résultat dans l'historique.
```js
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
```