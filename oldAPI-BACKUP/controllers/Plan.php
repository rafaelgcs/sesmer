<?php

// include_once '../config/database.php';

namespace controllers {

    class Plan
    {
        //Atributo para banco de dados
        private $PDO;
        private $table_name;
        private $plan_table_name;
        /*
		__construct
		Conectando ao banco de dados
		*/
        function __construct()
        {
            // $this->PDO = new \PDO("mysql:host=" . $this->db->host . ";dbname=" . $this->db->db_name, $this->db->username, $this->db->password);
            $this->PDO = new \PDO('mysql:host=localhost;dbname=ejcetc44_cimatecjr_odonto', 'ejcetc44_cimatec', 'cimatecjr'); //Conexão
            // $this->PDO = new \PDO('mysql:host=localhost;dbname=odonto_demo', 'root', 'pass'); //Conexão
            $this->PDO->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION); //habilitando erros do PDO
            $this->table_name = 'plan';
            // $this->plan_table_name = 'patient_plan';
        }
        /*
		lista
		Listand pessoas
		*/
        public function lista()
        {
            global $app;
            $sth = $this->PDO->prepare("SELECT * FROM `$this->table_name`");
            $sth->execute();
            $result = $sth->fetchAll(\PDO::FETCH_ASSOC);
            $app->render('default.php', ["data" => $result], 200);
        }
        /*
		get
		param $id
		Pega pessoa pelo id
		*/
        public function get($cnpj)
        {
            global $app;
            $sth = $this->PDO->prepare("SELECT * FROM
            " . $this->table_name . "
            WHERE
                cnpj = :cnpj
            LIMIT
                0,1");
            // $sth = $this->PDO->prepare("SELECT * FROM $this->table_name WHERE cpf = :cpf");
            $sth->bindValue(':cnpj', $cnpj);
            $sth->execute();
            $result = $sth->fetch(\PDO::FETCH_ASSOC);
            $app->render('default.php', ["data" => $result], 200);
        }

        /*
		nova
		Cadastra pessoa
		*/
        public function new()
        {
            global $app;
            $dados = json_decode($app->request->getBody(), true);
            $dados = (sizeof($dados) == 0) ? $_POST : $dados;
            $keys = array_keys($dados); //Paga as chaves do array
            /*
			O uso de prepare e bindValue é importante para se evitar SQL Injection
			*/
            $sth = $this->PDO->prepare("INSERT INTO $this->table_name (" . implode(',', $keys) . ") VALUES (:" . implode(",:", $keys) . ")");
            foreach ($dados as $key => $value) {
                $sth->bindValue(':' . $key, $value);
            }
            $sth->execute();
            //Retorna o id inserido
            $app->render('default.php', ["data" => ['id' => $this->PDO->lastInsertId()]], 200);
        }

        /*
		editar
		param $id
		Editando pessoa
		*/
        public function editar($cnpj)
        {
            global $app;
            $dados = json_decode($app->request->getBody(), true);
            $dados = (sizeof($dados) == 0) ? $_POST : $dados;
            $sets = [];
            foreach ($dados as $key => $VALUES) {
                $sets[] = $key . " = :" . $key;
            }

            $sth = $this->PDO->prepare("UPDATE $this->table_name SET " . implode(',', $sets) . " WHERE cnpj = :cnpj");
            $sth->bindValue(':cnpj', $cnpj);
            foreach ($dados as $key => $value) {
                $sth->bindValue(':' . $key, $value);
            }
            //Retorna status da edição
            $app->render('default.php', ["data" => ['status' => $sth->execute() == 1]], 200);
        }

        /*
		excluir
		param $id
		Excluindo pessoa
		*/
        public function excluir($cnpj)
        {
            global $app;
            $sth = $this->PDO->prepare("DELETE FROM $this->table_name WHERE cnpj = :cnpj");
            $sth->bindValue(':cnpj', $cnpj);
            $app->render('default.php', ["data" => ['status' => $sth->execute() == 1]], 200);
        }
    }
}
