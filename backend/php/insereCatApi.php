<?php
    include "cors.php";
    include "conexaodb.php";

    header('Content-Type: application/json');

    $data = json_decode(file_get_contents("php://input"), true);

    if($data){
        $id = $data['id'];
        $url = $data['url'];
    
        $query = "INSERT INTO fotos (id, url) VALUES ('$id', '$url')";
        $result = $conn->query($query);

        if ($result) {
            echo json_encode([
                "message" => "Dados recebidos com sucesso!",
                "id" => $id,
                "url" => $url
            ]);
        }else{
            echo json_encode([
                    "message" => "Falha ao enviar arquivo",
            ]);
        }

    }else{
        echo json_encode([
            "message" => "Nenhum dado recebido"
        ]);
    }


?>