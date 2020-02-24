<?php

// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Headers: access");
// header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS");
// header("Access-Control-Allow-Credentials: true");

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

// include './controllers/User.php';

require 'vendor/autoload.php';
// require 'config/database.php';

$conn = new \PDO('mysql:host=localhost;dbname=sesmer', 'root', 'pass');

$config = [
    'templates.path' => 'templates',
    'settings' => [
        'displayErrorDetails' => true, # change this <------
        "determineRouteBeforeAppMiddleware" => true,
    ],
];

$app = new \Slim\App($config);

// $app->options('/{routes:.+}', function ($request, $response, $args) {
//     return $response;
// });

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

$app->add(function ($request, $response, $next) {
    $route = $request->getAttribute("route");

    $methods = [];

    if (!empty($route)) {
        $pattern = $route->getPattern();

        foreach ($this->router->getRoutes() as $route) {
            if ($pattern === $route->getPattern()) {
                $methods = array_merge_recursive($methods, $route->getMethods());
            }
        }
        //Methods holds all of the HTTP Verbs that a particular route handles.
    } else {
        $methods[] = $request->getMethod();
    }

    $response = $next($request, $response);


    return $response->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader("Access-Control-Allow-Methods", implode(",", $methods));
});

$app->post('/login', function (Request $request, Response $response) use ($app, $conn) {
    global $app;
    $table_name = 'user';
    // $response->withHeader('Access-Control-Allow-Origin', '*'),
    $dados = json_decode($request->getBody(), true);
    $dados = (sizeof($dados) == 0) ? $_POST : $dados;
    // $keys = array_keys($dados); //Paga as chaves do array
    /*
    O uso de prepare e bindValue é importante para se evitar SQL Injection
    */
    // $sth = $this->PDO->prepare("INSERT INTO doctor (" . implode(',', $keys) . ") VALUES (:" . implode(",:", $keys) . ")");
    $sth = $conn->prepare("SELECT * FROM `$table_name` 
    WHERE
    email = :email AND password = MD5(:password) LIMIT 0,1");

    // $sth->bindValue(':email', $dados->email);
    // $sth->bindValue(':pass', $dados->email);
    foreach ($dados as $key => $value) {
        $sth->bindValue(':' . $key, $value);
    }
    $sth->execute();
    if ($sth->rowCount() == 1) {

        $result = $sth->fetch(\PDO::FETCH_ASSOC);
        // $returnUser = array("email"=> $result-)
        // $result['permission'] = 1;
        echo json_encode(array(
            "success" => true,
            "message" => "Login efetuado com sucesso!",
            "user" => $result,
        ));
        // $app->render('default.php', ["data" => array("user" => $result), "success" => true, "message" => "Login Efetuado com Sucesso!"], 200);
    } else {
        echo json_encode(array(
            "success" => false,
            "message" => "E-mail ou senha incorretos!",
        ));
        // $app->render('error.php', ["success" => false, "message" => "E-mail ou senha incorretos."], 200);
    }
});

$app->group('/user', function () use ($app, $conn) {
    $app->get('/all', function () use ($app, $conn) {
        $table_name = 'user';

        $sth = $conn->prepare("SELECT * FROM `$table_name`");
        $sth->execute();
        $result = $sth->fetchAll(\PDO::FETCH_ASSOC);
        // $app->render('default.php', ["data" => $result, "success" => true], 200);
        echo json_encode($result);
    });

    $app->get('/{id}', function (Request $request, Response $response, $args) use ($app, $conn) {
        $table_name = 'user';
        $id = $args['id'];
        $sth = $conn->prepare("SELECT * FROM `$table_name` WHERE id = $id LIMIT 0,1");
        $sth->execute();
        $result = $sth->fetch(\PDO::FETCH_ASSOC);
        // $app->render('default.php', ["data" => $result, "success" => true], 200);
        echo json_encode($result);
    });
});

$app->group('/product', function () use ($app, $conn) {
    $app->post('/', function (Request $request, Response $response) use ($app, $conn) {
        global $app;
        $table_name = 'mercadorias';
        $dados = json_decode($request->getBody(), true);
        $dados = (sizeof($dados) == 0) ? $_POST : $dados;
        // $dados = (sizeof($dados) == 0) ? $_POST : $dados;
        $keys = array_keys($dados); //Paga as chaves do array

        $sth = $conn->prepare("INSERT INTO `$table_name` (" . implode(',', $keys) . ") VALUES (:" . implode(",:", $keys) . ")");

        foreach ($dados as $key => $value) {
            $sth->bindValue(':' . $key, $value);
        }
        if ($sth->execute()) {

            //Retorna o id inserido
            echo json_encode(array(
                "success" => true,
                "message" => "Mercadoria adicionada com sucesso!",
                "id" => $conn->lastInsertId(),
            ));
        } else {
            echo json_encode(array(
                "success" => false,
                "message" => "Não foi possível adicionar a mercadoria solicitada... Tente novamente mais tarde!",
                // "id" => $sth->lastInsertId(),
            ));
        }
        // $app->render('default.php', ["data" => ['id' => $this->PDO->lastInsertId()]], 200);
    });

    $app->get('/all', function () use ($app, $conn) {
        $table_name = 'mercadorias';

        $sth = $conn->prepare("SELECT m.*,e.quantidade as stock,e.saidas 
        FROM `$table_name` as m, estoque as e 
        WHERE e.mercadoriaId = m.cod");
        if ($sth->execute()) {

            $result = $sth->fetchAll(\PDO::FETCH_ASSOC);
            // $app->render('default.php', ["data" => $result, "success" => true], 200);
            echo json_encode(array(
                "success" => true,
                "products" => $result,
            ));
        }
    });
});

$app->group('/stock', function () use ($app, $conn) {
    $app->post('/', function (Request $request, Response $response) use ($app, $conn) {
        global $app;
        $table_name = 'estoque';
        $dados = json_decode($request->getBody(), true);
        $dados = (sizeof($dados) == 0) ? $_POST : $dados;
        // $dados = (sizeof($dados) == 0) ? $_POST : $dados;
        $keys = array_keys($dados); //Paga as chaves do array

        $sth = $conn->prepare("INSERT INTO `$table_name` (" . implode(',', $keys) . ") VALUES (:" . implode(",:", $keys) . ")");

        foreach ($dados as $key => $value) {
            $sth->bindValue(':' . $key, $value);
        }
        if ($sth->execute()) {

            //Retorna o id inserido
            echo json_encode(array(
                "success" => true,
                "message" => "Mercadoria adicionada com sucesso!",
                "id" => $conn->lastInsertId(),
            ));
        } else {
            echo json_encode(array(
                "success" => false,
                "dados" => $dados,
                "message" => "Não foi possível adicionar a mercadoria solicitada... Tente novamente mais tarde!",
                // "id" => $sth->lastInsertId(),
            ));
        }
        // $app->render('default.php', ["data" => ['id' => $this->PDO->lastInsertId()]], 200);
    });

    $app->get('/all', function () use ($app, $conn) {
        $table_name = 'mercadorias';

        $sth = $conn->prepare("SELECT m.*,e.quantidade as stock,e.saidas 
        FROM `$table_name` as m, estoque as e 
        WHERE e.mercadoriaId = m.cod");
        if ($sth->execute()) {

            $result = $sth->fetchAll(\PDO::FETCH_ASSOC);
            // $app->render('default.php', ["data" => $result, "success" => true], 200);
            echo json_encode(array(
                "success" => true,
                "products" => $result,
            ));
        }
    });
});


$app->run();
