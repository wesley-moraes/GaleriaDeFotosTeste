<?php
    include "cors.php";
    include "conexaodb.php";

    header('Content-Type: application/json');

    $query = "SELECT * FROM fotos ORDER BY id DESC";
    $result = $conn->query($query);

    $data = [];    

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row; // Adiciona cada linha ao array
        }

        //$data = array_reverse($data);
    } 

    echo json_encode($data); // Converte o array em JSON e o envia

?>