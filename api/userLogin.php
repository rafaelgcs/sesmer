<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
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

$user->email = $data->email;
$email_exists = $user->emailExists();

$verifyPassword = $user->verifyPassword($data->password);


// check if email exists and if password is correct
if ($email_exists && $verifyPassword) {

    $userLogin = $user->login();

    if ($userLogin) {
        $return = json_encode(array(
            "firstname" => $user->firstname,
            "lastname" => $user->lastname,
            "email" => $user->email,
            "permission" => $user->permission,
        ));

        // set response code
        http_response_code(200);

        echo json_encode(
            array(
                "message" => "Login efetuado com sucesso!",
                "logged" => true,
                "user" => json_decode($return)
            )
        );
    }else{
        http_response_code(200);

        echo json_encode(
            array(
                "message" => "Login não pôde ser efetuado.",
                "logged" => false
            )
        );
    }
} else {
    http_response_code(200);

    echo json_encode(
        array(
            "message" => "User not found or e-mail and password not are correct.",
            "logged" => false
        )
    );
}
