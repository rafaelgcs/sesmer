<?php

// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Headers: access");
// include_once '../config/database.php';

namespace controllers {

    class User
    {
        //Atributo para banco de dados
        private $PDO;
        private $table_name;
        /*
		__construct
		Conectando ao banco de dados
		*/
        // function __construct()
        // {
        //     // $this->PDO = new \PDO("mysql:host=" . $this->db->host . ";dbname=" . $this->db->db_name, $this->db->username, $this->db->password);
        //     $this->PDO = new \PDO('mysql:host=localhost;dbname=sesmer', 'root', 'pass'); //Conexão
        //     //$this->PDO = new \PDO('mysql:host=localhost;dbname=odonto_demo', 'root', 'pass'); //Conexão
        //     $this->PDO->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION); //habilitando erros do PDO
        //     $this->table_name = 'user';
        // }

        // public function doLogin()
        // {
        //     global $app;
        //     $dados = json_decode($app->request->getBody(), true);
        //     $dados = (sizeof($dados) == 0) ? $_POST : $dados;
        //     // $keys = array_keys($dados); //Paga as chaves do array
        //     /*
		// 	O uso de prepare e bindValue é importante para se evitar SQL Injection
        //     */
        //     // $sth = $this->PDO->prepare("INSERT INTO doctor (" . implode(',', $keys) . ") VALUES (:" . implode(",:", $keys) . ")");
        //     $sth = $this->PDO->prepare("SELECT * FROM `$this->table_name` 
        //     WHERE
        //     email = :email AND password = MD5(:password) LIMIT 0,1");

        //     // $sth->bindValue(':email', $dados->email);
        //     // $sth->bindValue(':pass', $dados->email);
        //     foreach ($dados as $key => $value) {
        //         $sth->bindValue(':' . $key, $value);
        //     }
        //     $sth->execute();
        //     if ($sth->rowCount() == 1) {

        //         $result = $sth->fetch(\PDO::FETCH_ASSOC);
        //         // $returnUser = array("email"=> $result-)
        //         // $result['permission'] = 1;
        //         $app->render('default.php', ["data" => array("user" => $result), "success" => true, "message" => "Login Efetuado com Sucesso!"], 200);
        //     } else {
        //         $app->render('error.php', ["success" => false, "message" => "E-mail ou senha incorretos."], 200);
        //     }
        // }

        public function list()
        {
            // throw new Exception("Um erro qualquer");

            // global $app;
            // $sth = $this->PDO->prepare("SELECT * FROM `$this->table_name`");
            // $sth->execute();
            // $result = $sth->fetchAll(\PDO::FETCH_ASSOC);
            // $app->render('default.php', ["data" => $result, "success" => true], 200);
            echo "Ola";
        }
    }
}
