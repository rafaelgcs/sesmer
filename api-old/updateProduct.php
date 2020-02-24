<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './config/database.php';
include_once './objects/product.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// instantiate user object
$product = new Product($db);

$data = json_decode(file_get_contents("php://input"));


$product->id = $data->id;
$product->cod = $data->cod;
$product->name = $data->name;
$product->description = $data->description;
$product->p_unit = $data->p_unit;
$product->img = $data->img;
$product->p_entrada = $data->p_entrada;
$product->p_saida = $data->p_saida;
$product->p_final = $data->p_final;
// $product->stock = $data->stock;
// $product->saidas = $data->saidas;


// p_entrada: "11.55"
// p_saida: "24.26"
// p_final: "0.69"
// stock: "35"
// saidas: "0"


// echo json_encode($data);

$updated = json_decode($product->update());
if ($updated->updated) {
    http_response_code(200);

    // generate jwt
    // $jwt = JWT::encode($token, $key);
    echo json_encode(
        array(
            "message" => "Produto atualizado com sucesso!",
            "product" => json_encode($product),
            "updated" => true,
            "data" => json_encode($data),
            "query" => $updated->query
        )
    );
} else {
    http_response_code(203);
    echo json_encode(
        array(
            "message" => "Produto não foi atualizado!",
            "updated" => false,
            "data" => json_decode(json_encode($data)),
            "query" => $updated->query
            // "product" => json_encode($product)
        )
    );
}
