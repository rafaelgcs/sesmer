<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'vendor/autoload.php';
// $conn = new \PDO('mysql:host=localhost;dbname=sesmer_db', 'root', '');
// $conn = new \PDO('mysql:host=localhost;dbname=db_name', 'db_user', 'db_user_password');
$conn = new \PDO('mysql:host=localhost;dbname=ejcetc44_sesmer', 'ejcetc44_sesmer', 'sesmerpassword');

$config = [
    'templates.path' => 'templates',
    'settings' => [
        'displayErrorDetails' => true, # change this <------
        "determineRouteBeforeAppMiddleware" => true,
    ],
];

$app = new \Slim\App($config);

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

// LOGIN API
$app->post('/login', function (Request $request, Response $response) use ($app, $conn) {
    global $app;
    $table_name = 'user';
    $dados = json_decode($request->getBody(), true);
    $dados = (sizeof($dados) == 0) ? $_POST : $dados;
    /*
    O uso de prepare e bindValue é importante para se evitar SQL Injection
    */
    $sth = $conn->prepare("SELECT * FROM `$table_name` 
    WHERE
    email = :email AND password = MD5(:password) LIMIT 0,1");

    foreach ($dados as $key => $value) {
        $sth->bindValue(':' . $key, $value);
    }
    $sth->execute();
    if ($sth->rowCount() == 1) {

        $result = $sth->fetch(\PDO::FETCH_ASSOC);
        echo json_encode(array(
            "success" => true,
            "message" => "Login efetuado com sucesso!",
            "user" => $result,
        ));
    } else {
        echo json_encode(array(
            "success" => false,
            "message" => "E-mail ou senha incorretos!",
        ));
    }
});

// USERS API
$app->group('/user', function () use ($app, $conn) {
    $app->get('/all', function () use ($app, $conn) {
        $table_name = 'user';

        $sth = $conn->prepare("SELECT * FROM `$table_name`");
        if ($sth->execute()) {

            $result = $sth->fetchAll(\PDO::FETCH_ASSOC);
            echo json_encode(array(
                "success" => true,
                "users" => $result,
            ));
        }
    });

    $app->get('/{id}', function (Request $request, Response $response, $args) use ($app, $conn) {
        $table_name = 'user';
        $id = $args['id'];
        $sth = $conn->prepare("SELECT * FROM `$table_name` WHERE id = $id LIMIT 0,1");
        $sth->execute();
        $result = $sth->fetch(\PDO::FETCH_ASSOC);
        echo json_encode($result);
    });

    $app->post('/update', function (Request $request, Response $response) use ($app, $conn) {
        global $app;
        $table_name = 'user';
        $dados = json_decode($request->getBody(), true);
        $dados = (sizeof($dados) == 0) ? $_POST : $dados;
        $keys = array_keys($dados); //Pega as chaves do array

        $sth = $conn->prepare("UPDATE `$table_name` 
            SET firstname = :firstname, lastname = :lastname, email = :email
             WHERE id = :id");

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
            ));
        }
    });
});

// CLIENTS API
$app->group('/cliente', function () use ($app, $conn) {
    $app->post('/', function (Request $request, Response $response) use ($app, $conn) {
        global $app;
        $table_name = 'clientes';
        $dados = json_decode($request->getBody(), true);
        $dados = (sizeof($dados) == 0) ? $_POST : $dados;
        $keys = array_keys($dados); //Paga as chaves do array

        $sth = $conn->prepare("INSERT INTO `$table_name` (" . implode(',', $keys) . ", valor_gasto) VALUES (:" . implode(",:", $keys) . ",0)");

        foreach ($dados as $key => $value) {
            $sth->bindValue(':' . $key, $value);
        }
        if ($sth->execute()) {

            //Retorna o id inserido
            echo json_encode(array(
                "success" => true,
                "message" => "Cliente adicionado com sucesso!",
                "id" => $conn->lastInsertId(),
            ));
        } else {
            echo json_encode(array(
                "success" => false,
                "message" => "Não foi possível adicionar o cliente solicitado... Tente novamente mais tarde!",
            ));
        }
    });

    $app->get('/all', function () use ($app, $conn) {
        $table_name = 'clientes';

        $sth = $conn->prepare("SELECT * FROM `$table_name`");
        if ($sth->execute()) {

            $result = $sth->fetchAll(\PDO::FETCH_ASSOC);
            echo json_encode(array(
                "success" => true,
                "clientes" => $result,
            ));
        } else {
            echo json_encode(array(
                "success" => false,
                "message" => "Não foi possível encontrar nenhum cliente.",
            ));
        }
    });

    $app->get('/{id}', function (Request $request, Response $response, $args) use ($app, $conn) {
        $table_name = 'clientes';
        $id = $args['id'];
        $sth = $conn->prepare("SELECT * FROM `$table_name` WHERE id = $id LIMIT 0,1");
        $sth->execute();
        $result = $sth->fetch(\PDO::FETCH_ASSOC);
        echo json_encode($result);
    });

    $app->post('/update', function (Request $request, Response $response) use ($app, $conn) {
        global $app;
        $table_name = 'clientes';
        $dados = json_decode($request->getBody(), true);
        $dados = (sizeof($dados) == 0) ? $_POST : $dados;
        $keys = array_keys($dados); //Paga as chaves do array

        $sth = $conn->prepare("UPDATE `$table_name` 
            SET name = :name, email = :email, numero = :numero
             WHERE id = :id");

        foreach ($dados as $key => $value) {
            $sth->bindValue(':' . $key, $value);
        }
        if ($sth->execute()) {
            //Retorna o id inserido
            echo json_encode(array(
                "success" => true,
                "message" => "Cliente atualizado com sucesso!",
            ));
        } else {
            echo json_encode(array(
                "success" => false,
                "message" => "Não foi possível editar o cliente solicitado... Tente novamente mais tarde!",
            ));
        }
    });

    $app->get('/delete/{id}', function (Request $request, Response $response, $args) use ($app, $conn) {
        global $app;
        $table_name = 'clientes';
        $id = $args['id'];

        $sth = $conn->prepare("DELETE FROM `$table_name` WHERE id = $id");

        if ($sth->execute()) {
            echo json_encode(array(
                "success" => true,
                "message" => "Cliente exluído com êxito!",
            ));
        } else {
            echo json_encode(array(
                "success" => false,
                "message" => "Não foi possível deletar o cliente solicitado... Tente novamente mais tarde!",
            ));
        }
    });
});

// PRODUCTS API
$app->group('/product', function () use ($app, $conn) {
    $app->post('/', function (Request $request, Response $response) use ($app, $conn) {
        global $app;
        $table_name = 'mercadorias';
        $dados = json_decode($request->getBody(), true);
        $dados = (sizeof($dados) == 0) ? $_POST : $dados;
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
            ));
        }
    });

    $app->post('/update', function (Request $request, Response $response) use ($app, $conn) {
        global $app;
        $table_name = 'mercadorias';
        $stock_table_name = 'estoque';
        $dados = json_decode($request->getBody(), true);
        $dados = (sizeof($dados) == 0) ? $_POST : $dados;
        $keys = array_keys($dados); //Paga as chaves do array

        $sth = $conn->prepare("UPDATE `$table_name` 
            SET cod = :cod, name = :name, description = :description, p_unit = :p_unit, p_entrada = :p_entrada, p_saida = :p_saida, p_final = :p_final, img = :img
             WHERE id = :id");

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
            ));
        }
    });

    $app->get('/delete/{id}', function (Request $request, Response $response, $args) use ($app, $conn) {
        global $app;
        $table_name = 'mercadorias';
        $id = $args['id'];

        $sth = $conn->prepare("DELETE FROM `$table_name` WHERE id = $id");

        if ($sth->execute()) {
            echo json_encode(array(
                "success" => true,
                "message" => "Mercadoria excluída com êxito!",
            ));
        } else {
            echo json_encode(array(
                "success" => false,
                "message" => "Não foi possível deletar a mercadoria solicitada... Tente novamente mais tarde!",
            ));
        }
    });

    $app->get('/all', function () use ($app, $conn) {
        $table_name = 'mercadorias';

        $sth = $conn->prepare("SELECT m.*,e.quantidade as stock,e.saidas 
        FROM `$table_name` as m, estoque as e 
        WHERE e.mercadoriaId = m.cod");
        if ($sth->execute()) {

            $result = $sth->fetchAll(\PDO::FETCH_ASSOC);
            echo json_encode(array(
                "success" => true,
                "products" => $result,
            ));
        }
    });

    $app->get('/{id}', function (Request $request, Response $response, $args) use ($app, $conn) {
        $table_name = 'mercadorias';
        $id = $args['id'];
        $sth = $conn->prepare("SELECT m.*,e.quantidade as stock,e.saidas 
        FROM `$table_name` as m, estoque as e 
        WHERE e.mercadoriaId = m.cod AND m.id = $id");
        if ($sth->execute()) {

            $result = $sth->fetch(\PDO::FETCH_ASSOC);
            echo json_encode(array(
                "success" => true,
                "product" => $result,
            ));
        }
    });

    $app->get('/byExactlyName/{name}', function (Request $request, Response $response, $args) use ($app, $conn) {
        $table_name = 'mercadorias';
        $name = $args['name'];

        $sth = $conn->prepare("SELECT m.*,e.quantidade as stock,e.saidas 
        FROM `$table_name` as m, estoque as e 
        WHERE e.mercadoriaId = m.cod AND m.name = $name");
        if ($sth->execute()) {

            $result = $sth->fetch(\PDO::FETCH_ASSOC);
            echo json_encode(array(
                "success" => true,
                "product" => $result,
            ));
        } else {
            echo json_encode(array(
                "success" => true,
                "message" => "Não foi encontrada nenhuma mercadoria",
            ));
        }
    });
});

// STOCK API
$app->group('/stock', function () use ($app, $conn) {
    $app->post('/', function (Request $request, Response $response) use ($app, $conn) {
        global $app;
        $table_name = 'estoque';
        $dados = json_decode($request->getBody(), true);
        $dados = (sizeof($dados) == 0) ? $_POST : $dados;
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
            ));
        }
    });

    $app->post('/update', function (Request $request, Response $response) use ($app, $conn) {
        global $app;
        $table_name = 'estoque';
        $dados = json_decode($request->getBody(), true);
        $dados = (sizeof($dados) == 0) ? $_POST : $dados;
        $keys = array_keys($dados); //Paga as chaves do array
        $sth = $conn->prepare("UPDATE `$table_name` 
            SET quantidade = :quantidade, saidas = :saidas, ultima_data = :ultima_data 
             WHERE mercadoriaId = :mercadoriaId");

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
            ));
        }
    });

    $app->get('/delete/{cod}', function (Request $request, Response $response, $args) use ($app, $conn) {
        global $app;
        $table_name = 'estoque';
        $cod = $args['cod'];

        $sth = $conn->prepare("DELETE FROM `$table_name` WHERE mercadoriaId = $cod");

        if ($sth->execute()) {
            echo json_encode(array(
                "success" => true,
                "message" => "Estoque deletado com êxito!",
            ));
        } else {
            echo json_encode(array(
                "success" => false,
                "message" => "Não foi possível deletar o estoque da mercadoria solicitada... Tente novamente mais tarde!",
            ));
        }
    });

    $app->get('/all', function () use ($app, $conn) {
        $table_name = 'mercadorias';

        $sth = $conn->prepare("SELECT m.*,e.quantidade as stock,e.saidas 
        FROM `$table_name` as m, estoque as e 
        WHERE e.mercadoriaId = m.cod");
        if ($sth->execute()) {

            $result = $sth->fetchAll(\PDO::FETCH_ASSOC);
            echo json_encode(array(
                "success" => true,
                "products" => $result,
            ));
        }
    });
});

// SALES API
$app->group('/sale', function () use ($app, $conn) {
    $app->post('/', function (Request $request, Response $response) use ($app, $conn) {
        global $app;
        $table_name = 'vendas';
        $dados = json_decode($request->getBody(), true);
        $dados = (sizeof($dados) == 0) ? $_POST : $dados;
        $keys = array_keys($dados); //Paga as chaves do array

        $sth = $conn->prepare("INSERT INTO `$table_name` (" . implode(',', $keys) . ") VALUES (:" . implode(",:", $keys) . ")");

        foreach ($dados as $key => $value) {
            $sth->bindValue(':' . $key, $value);
        }
        if ($sth->execute()) {

            //Retorna o id inserido
            echo json_encode(array(
                "success" => true,
                "message" => "Venda registrada com sucesso!",
                "id" => $conn->lastInsertId(),
            ));
        } else {
            echo json_encode(array(
                "success" => false,
                "message" => "Não foi possível registrar a venda solicitada... Tente novamente mais tarde!",
            ));
        }
    });

    $app->post('/addItens', function (Request $request, Response $response) use ($app, $conn) {
        global $app;
        $table_name = 'itens_venda';
        $added = true;
        $dados = json_decode($request->getBody(), true);
        $dados = (sizeof($dados) == 0) ? $_POST : $dados;

        foreach ($dados as $toAdd) {
            $keys = array_keys($toAdd); //Paga as chaves do array

            $sth = $conn->prepare("INSERT INTO `$table_name` (" . implode(',', $keys) . ") VALUES (:" . implode(",:", $keys) . ")");

            foreach ($toAdd as $key => $value) {
                $sth->bindValue(':' . $key, $value);
            }
            if ($sth->execute()) {
                if ($added == true) {
                    $added = true;
                }
            } else {
                $added = false;
            }
        }
        if ($added) {
            //Retorna o id inserido
            echo json_encode(array(
                "success" => true,
                "message" => "Venda registrada com sucesso!",
            ));
        } else {
            echo json_encode(array(
                "success" => false,
                "message" => "Não foi possível registrar os itens da venda solicitada... Tente novamente mais tarde!",
            ));
        }
    });

    $app->post('/update/cliente', function (Request $request, Response $response) use ($app, $conn) {
        global $app;
        $table_name = 'clientes';
        $dados = json_decode($request->getBody(), true);
        $dados = (sizeof($dados) == 0) ? $_POST : $dados;
        $sth = $conn->prepare("UPDATE `$table_name` 
            SET valor_gasto = :valor_gasto 
             WHERE id = :id");

        foreach ($dados as $key => $value) {
            $sth->bindValue(':' . $key, $value);
        }
        if ($sth->execute()) {
            //Retorna o id inserido
            echo json_encode(array(
                "success" => true,
                "message" => "Cliente atualizado com sucesso!",
            ));
        } else {
            echo json_encode(array(
                "success" => false,
                "message" => "Não foi possível atualizar o cliente solicitado... Tente novamente mais tarde!",
            ));
        }
    });

    $app->post('/update/itens', function (Request $request, Response $response) use ($app, $conn) {
        global $app;
        $table_name = 'estoque';
        $added = true;
        $dados = json_decode($request->getBody(), true);
        $dados = (sizeof($dados) == 0) ? $_POST : $dados;

        foreach ($dados as $toAdd) {
            $keys = array_keys($toAdd); //Paga as chaves do array

            $sth = $conn->prepare("UPDATE `$table_name` 
                SET saidas = :saidas, quantidade = :quantidade
                WHERE mercadoriaId = :mercadoriaId");
            foreach ($toAdd as $key => $value) {
                $sth->bindValue(':' . $key, $value);
            }
            if ($sth->execute()) {
                if ($added == true) {
                    $added = true;
                }
            } else {
                $added = false;
            }
        }
        if ($added) {
            echo json_encode(array(
                "success" => true,
                "message" => "Venda registrada com sucesso!",
            ));
        } else {
            echo json_encode(array(
                "success" => false,
                "message" => "Não foi possível registrar os itens da venda solicitada... Tente novamente mais tarde!",
            ));
        }
    });

    $app->get('/delete/{cod}', function (Request $request, Response $response, $args) use ($app, $conn) {
        global $app;
        $table_name = 'estoque';
        $cod = $args['cod'];

        $sth = $conn->prepare("DELETE FROM `$table_name` WHERE mercadoriaId = $cod");

        if ($sth->execute()) {
            echo json_encode(array(
                "success" => true,
                "message" => "Estoque deletado com êxito!",
            ));
        } else {
            echo json_encode(array(
                "success" => false,
                "message" => "Não foi possível deletar o estoque da mercadoria solicitada... Tente novamente mais tarde!",
            ));
        }
    });

    $app->get('/all', function () use ($app, $conn) {
        $table_name = 'vendas';

        $sth = $conn->prepare("SELECT v.*, c.name as cliente, u.firstname as vendedor FROM `$table_name` as v, `clientes` as c, `user` as u WHERE v.clienteId = c.id AND v.vendedorId = u.id");
        if ($sth->execute()) {

            $result = $sth->fetchAll(\PDO::FETCH_ASSOC);
            echo json_encode(array(
                "success" => true,
                "message" => "As vendas registradas no sistema",
                "history" => $result,
            ));
        } else {
            echo json_encode(array(
                "success" => false,
                "message" => "Não foram encontradas nenhuma venda registrada no sistema.",
            ));
        }
    });

    $app->get('/all/{id}', function (Request $request, Response $response, $args) use ($app, $conn) {
        $table_name = 'vendas';
        $id = $args['id'];
        $sth = $conn->prepare("SELECT v.*, c.name as cliente, u.firstname as vendedor FROM `$table_name` as v, `clientes` as c, `user` as u WHERE v.clienteId = c.id AND v.vendedorId = u.id AND u.id = $id");
        if ($sth->execute()) {

            $result = $sth->fetchAll(\PDO::FETCH_ASSOC);
            echo json_encode(array(
                "success" => true,
                "message" => "As vendas registradas no sistema com o usuário logado.",
                "history" => $result,
            ));
        } else {
            echo json_encode(array(
                "success" => false,
                "message" => "Não foram encontradas nenhuma venda registrada no sistema para o usuário logado.",
            ));
        }
    });

    $app->get('/today', function () use ($app, $conn) {
        $table_name = 'vendas';
        $date = new DateTime();
        $dia = $date->format('d');
        $mes = $date->format('m');
        $ano = $date->format('Y');
        $sth = $conn->prepare("SELECT v.*, c.name as cliente, u.firstname as vendedor FROM `$table_name` as v, `clientes` as c, `user` as u
         WHERE v.clienteId = c.id AND v.vendedorId = u.id AND v.dia_venda = $dia AND v.mes_venda = $mes AND v.ano_venda = $ano LIMIT 0,5");
        if ($sth->execute()) {

            $result = $sth->fetchAll(\PDO::FETCH_ASSOC);
            echo json_encode(array(
                "success" => true,
                "message" => "As vendas registradas no sistema",
                "vendas" => $result,
            ));
        } else {
            echo json_encode(array(
                "success" => false,
                "message" => "Não foram encontradas nenhuma venda registrada no sistema.",
                "vendas" => $result,
            ));
        }
    });

    $app->get('/recents', function () use ($app, $conn) {
        $table_name = 'vendas';

        $sth = $conn->prepare("SELECT v.*, c.name as cliente, u.firstname as vendedor FROM `$table_name` as v, `clientes` as c, `user` as u WHERE v.clienteId = c.id AND v.vendedorId = u.id LIMIT 0,5");
        if ($sth->execute()) {

            $result = $sth->fetchAll(\PDO::FETCH_ASSOC);
            echo json_encode(array(
                "success" => true,
                "message" => "As vendas registradas no sistema",
                "vendas" => $result,
            ));
        } else {
            echo json_encode(array(
                "success" => false,
                "message" => "Não foram encontradas nenhuma venda registrada no sistema.",
                "vendas" => $result,
            ));
        }
    });

    $app->get('/{id}/itens', function (Request $request, Response $response, $args) use ($app, $conn) {
        $table_name = 'itens_venda';
        $id = $args['id'];
        $sth = $conn->prepare("SELECT m.*, iv.quantidade
            FROM `$table_name` as iv, `mercadorias` as m
            WHERE iv.venda_id = $id AND iv.mercadoria_cod = m.id");
        if ($sth->execute()) {

            $result = $sth->fetchAll(\PDO::FETCH_ASSOC);
            echo json_encode(array(
                "success" => true,
                "message" => "As vendas registradas no sistema com o usuário logado.",
                "itens" => $result,
            ));
        } else {
            echo json_encode(array(
                "success" => false,
                "message" => "Não foram encontradas nenhuma venda registrada no sistema para o usuário logado.",
            ));
        }
    });
});


$app->run();
