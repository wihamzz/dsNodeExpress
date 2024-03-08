<img src="../src/public/images/logoUvsq.jpg" width="500px" alt="Logo uvsq">

_Pires Nino_ <br>
_Zehren William_ <br>
_Bouedec Nicolas_ <br>


<h1 style="color:#5d79e7; text-align: center"> Rapport DS Node Express </h1>

<h1 style="color:#5d79e7; text-align: center; margin-top: 100px"> Table des matières</h1>

<ol>
    <li> <a href="#introduction"> Introduction  </a> </li>
    <li> <a href="#install"> Installation </a> </li>
    <li> <a href="#archi"> Présentation de l'architecture </a> </li>
    <ol>
        <li> <a href="#arborescence"> Présentation de l'arborescence </a> </li>
        <li> <a href="#pages"> Présentation des pages </li>
    </ol>
    <li> <a href="#code"> Présentation des morceaux de code importants  </a>  </li>
    <ol>
        <li> <a href="#morceaucode1"> Morceau de code 1 : Fonction calculEmprunt </a> </li>
        <li> <a href="#morceaucode2"> Morceau de code 2 :   </a> </li>
    </ol>
</ol>

<h2 style="color:#5d79e7; page-break-before: always" id="introduction"> Introduction </h2>

L'objectif de ce devoir est d'appliquer les connaissances et les savoirs acquis durant le cours de Développement Avancé.

Il nous est demandé de réaliser une application web utilisant NodeJS et ExpressJS permettant à un utilisateur de se connecter au site via un identifiant, puis de calculer les mensualités d'un potentiel emprunt et enfin de consulter ses derniers calculs dans un historique. 

<h2 style="color:#5d79e7;" id="install"> Installation </h2>

Pour pouvoir faire fonctionner le projet, il faut en premier lieu avoir node sur son ordinateur.

Lien de téléchargement : https://nodejs.org/en/download

Choisissez alors la version qui convient à votre appareil. 

<br>

Il existe ensuite deux cas de figure pour l'installation des différents packages permettant d'utiliser le site : 

- Cas de figure 1 :

Le fichier package.json est à la racine du projet. 

Dans le cas où le fichier package.json est à la racine du projet 

- Cas de figure 2 :

<h2 style="color:#5d79e7; page-break-before: always" id="archi"> Présentation de l'architecture </h2>

<h3 style="color:#5d79e7;" id="arborescence"> Présentation de l'arborescence </h3>



<h3 style="color:#5d79e7;" id="pages"> Présentation des pages </h3>



<h2 style="color:#5d79e7; page-break-before: always" id="code"> Présentation des morceaux de code importants </h2>

<h3 style="color:#5d79e7;" id="morceaucode1"> Morceau de code 1 : Fonction calculEmprunt </h3>



<h3 style="color:#5d79e7;" id="morceaucode2"> Morceau de code 2 :  </h3>






### install :
* ```npm install ejs```
* ```npm install express```
* ```npm install express-session```
* ```npm install node```


## Explication de code

### Code 1

Fonction d'emprunt de emprunt.js.<br>
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