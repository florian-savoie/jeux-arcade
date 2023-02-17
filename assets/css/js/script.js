let score            = 500 ;
let nbrdecoup        = 5 ;
let resultatscore    = null ;
let randomNum        = Math.floor(Math.random() * 4) + 1;

var d                = new Date();
var date             = d.getDate()+'-'+(d.getMonth()+1)+'-'+d.getFullYear();

const bienvenue         = document.getElementById("divbienvenue");
const carte             = document.getElementById("ledivacacher");
const scores            = document.getElementById("score");
const montableau        = document.getElementById("demo");
const afficherscore     = document.getElementById("afficherscore");
const afficherscore2    = document.getElementById("afficherscore2");
const nbressaie         = document.getElementById("nbressaie");
const cartechoisie         = document.getElementById("cartechoisie");

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
       cartechoisie.style.color = "rgba(4, 251, 29, 1)";
       cartechoisie.style.backgroundColor = "rgba(17, 238, 135, 0.4)";
       cartechoisie.innerHTML = "Vous avez selectrionné la bonne Carte" ; 
       randomNum = Math.floor(Math.random() * 4) + 1;
          if ( nbrdecoup == 0 ){
            afficherscore2.innerHTML = score ;
             new bootstrap.Modal(document.getElementById("joueurGagnant"), []).show();
           }
            }else{
              score-=100 ;
              nbrdecoup-=1 ;
              afficherscore.innerHTML = score ;
              nbressaie.innerHTML = nbrdecoup ;
              cartechoisie.style.color = "red";
              cartechoisie.style.backgroundColor = " rgba(186, 53, 53, 0.6)";
              cartechoisie.innerHTML = "Vous avez selectrionné la mauvaise Carte" ;
              randomNum = Math.floor(Math.random() * 4) + 1;
                if ( nbrdecoup == 0 ) {
                  afficherscore2.innerHTML = score ;
                    new bootstrap.Modal(document.getElementById("joueurGagnant"), []).show();
                }
            }
}


function enregistrerscore (){
   pseudo = document.getElementById("inputjoueur").value;
     if ( pseudo != ""){
        let monnouvelindex = -1 ;
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "voirtableauscore.php");
        xhttp.send();
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            resultatscore = this.responseText;
            const lignes = resultatscore.split(`\n`);
            for (n = 0; n < lignes.length ; n++) {
               if ( monnouvelindex<0 ){
                  const valeur = lignes[n].split(`;`);
                   if (score > valeur[1]) {
                      monnouvelindex = n;
                      //supprime le derniere element du tableau
                      lignes.pop();
                      //insere mon nouveau hight score au tableau a l'index 3
                      lignes.splice(monnouvelindex,0,pseudo+";"+score+";"+date);    
                   }
                }
              } 
              const csv = lignes.join("\n").replace(/;/g, ";");
              var xhttp = new XMLHttpRequest();
              //   document.getElementById('info').innerHTML = '';      
              xhttp.open("POST", "nouveaucsv.php");
              xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
              xhttp.send(`csv=`+csv);
              xhttp.onreadystatechange = function() {
               if (this.readyState == 4 && this.status == 200)
                   {
                   //var str = this.responseText;
                   affichagetableau();
                   }
                };
           }
         };
        }else{
              new bootstrap.Modal(document.getElementById("joueurGagnant"), []).show();
             }
   }

function retouracceuil(){
  window.location.href = "http://localhost/jeujs/";
}


function affichagetableau(){
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "voirtableauscore.php");
  xhttp.send();
  xhttp.onreadystatechange = function() {
     if (this.readyState == 4 && this.status == 200){
         rresultatscores = this.responseText;
         scores.style.display = "block "; 
         bienvenue.style.display = "none";
         carte.style.display = "none";
         const lignes = rresultatscores.split(`\n`);
         let strTableHTML = ` <table class="table table-dark table-hover">\n\n`+
         "<thead>"+
        "<tr>"+
        "<th>classement</th>"+
        "<th>Pseudo</th>"+
        "<th>SCORE</th>"+
        "<th>date</th>"+
        "</tr>"+
        "</thead>"+
        "<tbody>";
        i = 1;
        for (n = 0; n < lignes.length; n++ ){
          console.log(lignes[n]);
          
          const etudiant = lignes[n].split(`;`);
          //console.log(etudiant[0]);
          strTableHTML += `<tr>\n`+
          `\t<td>`+i+`</td>\n`+
          `\t<td>`+etudiant[0]+`</td>\n`+
          `\t<td>`+etudiant[1]+`</td>\n`+
          `\t<td>`+etudiant[2]+`</td>\n`+
          `</tr>\n\n`;
          i++;
         }
           strTableHTML += `<tbody></table>\n`;
          montableau.innerHTML = strTableHTML ;
        }
      }
}
