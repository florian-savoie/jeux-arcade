let score            = 500 ;
let nbrdecoup        = 5 ;
let resultatscore    = null ;
let randomNum = Math.floor(Math.random() * 4) + 1;


const bienvenue         = document.getElementById("divbienvenue");
const carte             = document.getElementById("ledivacacher");
const scores            = document.getElementById("score");
const montableau        = document.getElementById("demo");
const afficherscore     = document.getElementById("afficherscore");
const afficherscore2    = document.getElementById("afficherscore2");
const nbressaie         = document.getElementById("nbressaie");

afficherscore.innerHTML    = score ;
nbressaie.innerHTML        = nbrdecoup ;



document.addEventListener("keydown", function(event){
    
  if (event.key === "s") {
    carte.style.display = "block ";
    bienvenue.style.display = "none";
    scores.style.display = "none "; 
  }
});


btnquitter.addEventListener("click", function(){
  scores.style.display = "block "; 
  bienvenue.style.display = "none";
  carte.style.display = "none";
});



function resultat(imagenumero , numero){
  monmage = document.getElementById(imagenumero);
  // Récupérer la valeur de l'image
  valeurImage = numero;

    if (randomNum == valeurImage){
       //alert("bravo a vous");
       score+=400 ;
       nbrdecoup-=1 ;
       afficherscore.innerHTML = score ;
       nbressaie.innerHTML = nbrdecoup ;
       randomNum = Math.floor(Math.random() * 4) + 1;
          if ( nbrdecoup == 0 ){
             new bootstrap.Modal(document.getElementById("joueurGagnant"), []).show();
           }
            }else{
              score-=100 ;
              nbrdecoup-=1 ;
              afficherscore.innerHTML = score ;
              nbressaie.innerHTML = nbrdecoup ;
              randomNum = Math.floor(Math.random() * 4) + 1;
                if ( nbrdecoup == 0 ) {
                    new bootstrap.Modal(document.getElementById("joueurGagnant"), []).show();
                }
            }
}


function enregistrerscore (){
  afficherscore2.innerHTML = score ;
   pseudo = document.getElementById("inputjoueur").value;
     if ( pseudo != ""){
        affichagetableau();
       }else{
         new bootstrap.Modal(document.getElementById("joueurGagnant"), []).show();
        }
}

function retouracceuil(){
  window.location.href = "http://localhost/jeujs/";
}


function affichagetableau(){
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "scorejoueur.php?pseudo="+pseudo+"&score="+score);
  xhttp.send();
  xhttp.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200){
         resultatscore = this.responseText;
         scores.style.display = "block "; 
         bienvenue.style.display = "none";
         carte.style.display = "none";
         const lignes = resultatscore.split(`\n`);
         let strTableHTML = ` <table class="table table-dark table-hover">\n\n`+
         "<thead>"+
        "<tr>"+
        "<th>Pseudo</th>"+
        "<th>SCORE</th>"+
        "<th>date</th>"+
        "</tr>"+
        "</thead>"+
        "<tbody>";
        for (n = 0; n < lignes.length-1; n++ ){
          console.log(lignes[n]);
          const etudiant = lignes[n].split(`;`);
          //console.log(etudiant[0]);
          strTableHTML += `<tr>\n`+
          `\t<td>`+etudiant[0]+`</td>\n`+
          `\t<td>`+etudiant[1]+`</td>\n`+
          `\t<td>`+etudiant[2]+`</td>\n`+
          `</tr>\n\n`;
         }
           strTableHTML += `<tbody></table>\n`;
          montableau.innerHTML = strTableHTML ;
        }
      }
}

function veriftop(){

var xhttp = new XMLHttpRequest();
xhttp.open("GET", "scorejoueur.php?");
xhttp.send();
xhttp.onreadystatechange = function() {
   if (this.readyState == 4 && this.status == 200){
       resultatscore = this.responseText;
  
const lignes = resultatscore.split(`\n`);
for (n = 0; n < lignes.length-1; n++ ){
  const valeur = lignes[n].split(`;`);
  console.log(valeur[1])
  if (score > valeur[1]){
    console.log(n+' mon score '+score+" est superieur a "+ valeur[1]);
  }
 //scoreatrier.push(valeur[1]);
}
}}
}
