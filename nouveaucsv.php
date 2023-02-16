<?php 
    echo 'le csv est :'. $_POST['csv'];
    file_put_contents('tests.csv', $_POST['csv']);
    echo `j'ai bien ecrie ton fichier CSV`;
    ?>