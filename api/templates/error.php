<?php 
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Headers: access");
// // header('Access-Control-Allow-Methods:  ["GET", "POST", "PATCH", "DELETE", "OPTIONS"]');
// // header("Access-Control-Allow-Credentials: true");
// // header('Content-Type: application/json');
// header('Content-Type: application/json; charset=utf-8');
echo json_encode(array("message"=>$message, "success" => $success));