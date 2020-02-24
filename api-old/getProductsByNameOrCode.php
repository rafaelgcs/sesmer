<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

// include database and object files
include_once './config/database.php';
include_once './objects/product.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// prepare product object
$product = new Product($db);

// $data;
$isCode;
$stmt;

if (isset($_GET['name'])) {
    $isCode = false;
    // $data = 
    $stmt = $product->productsByNameOrCode(null, $_GET['name']);
} else {
    $isCode = true;
    // $data = $_GET['code'];
    $stmt = $product->productsByNameOrCode($_GET['code'], null);
}



$return_arr = array();
$return_arr["products"] = array();


if ($stmt->rowCount() > 0) {

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $product_item = array(
            "id" => $id,
            "cod" => $cod,
            "name" => $name,
            "description" => $description,
            "p_unit" => $p_unit,
            "img" => $img,
            "p_entrada" => $p_entrada,
            "p_saida" => $p_saida,
            "p_final" => $p_final,
            "stock" => $stock,
            "saidas" => $saidas,
        );
        array_push($return_arr["products"], $product_item);
    }

    http_response_code(200);

    echo json_encode($return_arr);
} else {
    http_response_code(400);

    // tell the user product does not exist
    echo json_encode(array("message" => "Doctor does not exist.", "data"=> $_GET['name']));
}
