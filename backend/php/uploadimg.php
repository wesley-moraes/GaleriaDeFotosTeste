<?php

/*
include "cors.php";
include "database.php";

    header('Content-Type: application/json');
    
    //Customizando para inserir os dados que preciso.
    $upload_directory = "uploads/";
    $file_name_array = explode(".", $_FILES['file']['name']);
    $file_name = reset($file_name_array) . "." . end($file_name_array);
    $upload_file = $upload_directory . $file_name;
    $id= reset($file_name_array);
    $image_link = "http://localhost/galeriadefotosteste/uploads/" . $file_name;
    $url = $image_link;

    $query = "INSERT INTO fotos (id, url) VALUES ('$id', '$url')";

    $result = $conn->query($query);

    if($result){
        
        if(!file_exists($upload_directory)){
            mkdir($upload_directory, 0777, true);
        }
    
        if(move_uploaded_file($_FILES['file']['tmp_name'], $upload_file)){
            echo json_encode([
                'message' => 'Arquivo Upado com Sucesso!',
                'image_link' => $image_link
            ]);
        }
    //echo "Dados salvos com sucesso!";
    } else {
        echo json_encode([
            'message' => 'Erro ao salvar os dados',
            'error' => $conn->error
        ]);
    }

*/

header('Content-Type: application/json');
include "cors.php";
include "conexaodb.php";

// Personalizando para inserir os dados
$upload_directory = "uploads/";
$file_name_array = explode(".", $_FILES['file']['name']);
$file_name = reset($file_name_array) . "." . end($file_name_array);
$upload_file = $upload_directory . $file_name;
$id = reset($file_name_array);
$image_link = "http://localhost/galeriadefotosteste/uploads/" . $file_name;
$url = $image_link;

$query = "INSERT INTO fotos (id, url) VALUES ('$id', '$url')";
$result = $conn->query($query);

if ($result) {
    if (!file_exists($upload_directory)) {
        mkdir($upload_directory, 0777, true);
    }

    if (move_uploaded_file($_FILES['file']['tmp_name'], $upload_file)) {
        echo json_encode([
            'message' => 'Arquivo Upado com Sucesso!',
            'image_link' => $image_link
        ]);
    } else {
        echo json_encode(['message' => 'Falha ao mover o arquivo.']);
    }
} else {
    echo json_encode([
        'message' => 'Erro ao salvar os dados no banco de dados',
        'error' => $conn->error
    ]);
}

?>