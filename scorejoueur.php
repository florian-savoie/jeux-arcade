<?php
// Récupère les données du formulaire GET
$pseudo = $_GET["pseudo"];
$score = $_GET["score"];
$dat   = date("d/m/Y");
//echo "$nom;$score;$dat\n";

$fic = 'score.csv';
// Obtient le contenu intégral du fichier CSV
$str = file_get_contents($fic);

// Ajoute une nouvelle entrée au fichier CSV
/*$str.= "$pseudo;$score;$dat\n";*/

// Écriture sur le disque. Si le fichier n'existe pas il est créé
file_put_contents($fic, $str);

// le serveur envoie au client la table des scores
echo $str;
?>