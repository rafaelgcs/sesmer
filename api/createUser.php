<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
include_once './config/database.php';
include_once './objects/user.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// instantiate user object
$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

$user->firstname = isset($_GET['firstname']) ? $_GET['firstname']: null;
$user->lastname = isset($_GET['lastname']) ? $_GET['lastname']: null;
$user->email = isset($_GET['email']) ? $_GET['email']: null;
$user->password = isset($_GET['password']) ? $_GET['password']: null;
$user->permission = isset($_GET['permission']) ? $_GET['permission']: null;

// echo json_encode($data);
if($user->create()){
    http_response_code(200);
 
    // generate jwt
    // $jwt = JWT::encode($token, $key);
    echo json_encode(
            array(
                "message" => "Usuário criado com sucesso.",
                "user" => json_encode($user)//$user
            )
        );
}else{
    echo 'não deu certo!';
}

