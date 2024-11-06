<?php 
    include "cors.php";

    $servername = "localhost";
    $username = "root";
    $password = "RootPassword12_3";
    $database = "galeria_foto";

    // Criando a conexão
    $conn = new mysqli($servername, $username, $password, $database);

    // Checando a conexão
    if ($conn->connect_error) {
        echo ("Falha na conexão: " . $conn->connect_error);
        die(); // Para caso dê algum erro ele pare o código aqui!
    }
    
    /*
    else{
        echo json_encode([
            'message' => 'Conexao realizada'
        ]);
    }
    */
    
    
?>