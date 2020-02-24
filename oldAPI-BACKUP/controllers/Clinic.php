<?php

// include_once '../config/database.php';

namespace controllers {

    class Clinic
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
            //$this->PDO = new \PDO('mysql:host=localhost;dbname=odonto_demo', 'root', 'pass'); //Conexão
            $this->PDO->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION); //habilitando erros do PDO
            $this->table_name = 'clinic';
            $this->owner_table_name = 'clinic_owner';
            $this->tech_table_name = 'clinic_technical_manager';
        }



        public function doLogin()
        {
            global $app;
            $dados = json_decode($app->request->getBody(), true);
            $dados = (sizeof($dados) == 0) ? $_POST : $dados;
            // $keys = array_keys($dados); //Paga as chaves do array
            /*
			O uso de prepare e bindValue é importante para se evitar SQL Injection
            */
            // $sth = $this->PDO->prepare("INSERT INTO doctor (" . implode(',', $keys) . ") VALUES (:" . implode(",:", $keys) . ")");
            $sth = $this->PDO->prepare("SELECT * FROM `$this->table_name` 
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
                $result['permission'] = 2;
                $app->render('default.php', ["data" => array("success" => true,  "message" => "Login efetuado com sucesso.", "user" => $result)], 200);
            } else {
                $app->render('default.php', ["data" => array("success" => false,  "message" => "E-mail ou senha incorretos.")], 200);
            }
        }

        /*
		lista
		Listand pessoas
        */
        public function lista()
        {
            global $app;
            $sth = $this->PDO->prepare("SELECT c.*, t.name as tech_name, t.email as tech_email, t.cpf as tech_cpf, t.cro as tech_cro, t.fixed_phone as tech_fixed_phone, t.whats_phone as tech_whats_phone FROM
            `$this->table_name` as c, `$this->tech_table_name` as t
            WHERE
            t.clinic_cnpj = c.cnpj");
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
            $sth = $this->PDO->prepare("SELECT c.*, t.name as tech_name, t.email as tech_email, t.cpf as tech_cpf, t.cro as tech_cro, t.fixed_phone as tech_fixed_phone, t.whats_phone as tech_whats_phone FROM
           `$this->table_name` as c, `$this->tech_table_name` as t
           WHERE
           t.clinic_cnpj = c.cnpj AND c.cnpj = :cnpj");
            // $sth = $this->PDO->prepare("SELECT * FROM $this->table_name WHERE cpf = :cpf");
            $sth->bindValue(':cnpj', $cnpj);
            $sth->execute();
            $result = $sth->fetch(\PDO::FETCH_ASSOC);
            $app->render('default.php', ["data" => $result], 200);
        }

        public function getByName($name)
        {
            global $app;
            $sth = $this->PDO->prepare("SELECT c.*, t.name as tech_name, t.email as tech_email, t.cpf as tech_cpf, t.cro as tech_cro, t.fixed_phone as tech_fixed_phone, t.whats_phone as tech_whats_phone FROM
            `$this->table_name` as c, `$this->tech_table_name` as t
            WHERE
            t.clinic_cnpj = c.cnpj AND c.name LIKE '%$name%'");
            // $sth->bindValue(':name', $name);
            $sth->execute();
            $result = $sth->fetchAll(\PDO::FETCH_ASSOC);
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
            $sth = $this->PDO->prepare("INSERT INTO $this->table_name (`name`, `cnpj`, `cro`, `fixed_phone`, `whats_phone`, `email`, `end`, `created_date`, `password`)
                VALUES (:name, :cnpj, :cro, :fixed_phone, :whats_phone, :email, :end, :created_date, MD5(:password))");
            foreach ($dados as $key => $value) {
                $sth->bindValue(':' . $key, $value);
            }
            $sth->execute();
            //Retorna o id inserido
            $app->render('default.php', ["data" => ['id' => $this->PDO->lastInsertId()]], 200);
        }

        public function newOwner()
        {
            global $app;
            $dados = json_decode($app->request->getBody(), true);
            $dados = (sizeof($dados) == 0) ? $_POST : $dados;
            $keys = array_keys($dados); //Paga as chaves do array
            /*
			O uso de prepare e bindValue é importante para se evitar SQL Injection
			*/
            $sth = $this->PDO->prepare("INSERT INTO $this->owner_table_name (" . implode(',', $keys) . ") VALUES (:" . implode(",:", $keys) . ")");
            foreach ($dados as $key => $value) {
                $sth->bindValue(':' . $key, $value);
            }
            $sth->execute();
            //Retorna o id inserido
            $app->render('default.php', ["data" => ['id' => $this->PDO->lastInsertId()]], 200);
        }

        public function newTech()
        {
            global $app;
            $dados = json_decode($app->request->getBody(), true);
            $dados = (sizeof($dados) == 0) ? $_POST : $dados;
            $keys = array_keys($dados); //Paga as chaves do array
            /*
			O uso de prepare e bindValue é importante para se evitar SQL Injection
			*/
            $sth = $this->PDO->prepare("INSERT INTO $this->tech_table_name (" . implode(',', $keys) . ") VALUES (:" . implode(",:", $keys) . ")");
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

            $sth = $this->PDO->prepare("UPDATE $this->table_name SET " . implode(',', $sets) . " WHERE cnpj = :cnpjDefault");
            $sth->bindValue(':cnpjDefault', $cnpj);
            foreach ($dados as $key => $value) {
                $sth->bindValue(':' . $key, $value);
            }

            //Retorna status da edição
            $app->render('default.php', ["data" => ['status' => $sth->execute() == 1]], 200);
        }

        public function editarOwner($cnpj)
        {
            global $app;
            $dados = json_decode($app->request->getBody(), true);
            $dados = (sizeof($dados) == 0) ? $_POST : $dados;
            $sets = [];
            foreach ($dados as $key => $VALUES) {
                $sets[] = $key . " = :" . $key;
            }

            $sth = $this->PDO->prepare("UPDATE $this->owner_table_name SET " . implode(',', $sets) . " WHERE clinic_cnpj = :cnpj");
            $sth->bindValue(':cnpj', $cnpj);
            foreach ($dados as $key => $value) {
                $sth->bindValue(':' . $key, $value);
            }

            //Retorna status da edição
            $app->render('default.php', ["data" => ['status' => $sth->execute() == 1]], 200);
        }
        public function editarTech($cnpj, $cpf)
        {
            global $app;
            $dados = json_decode($app->request->getBody(), true);
            $dados = (sizeof($dados) == 0) ? $_POST : $dados;
            $sets = [];
            foreach ($dados as $key => $VALUES) {
                $sets[] = $key . " = :" . $key;
            }

            $sth = $this->PDO->prepare("UPDATE $this->tech_table_name SET " . implode(',', $sets) . " WHERE cpf = :cpfDefault AND clinic_cnpj = :cnpj");
            $sth->bindValue(':cpfDefault', $cpf);
            $sth->bindValue(':cnpj', $cnpj);
            foreach ($dados as $key => $value) {
                $sth->bindValue(':' . $key, $value);
            }

            //Retorna status da edição
            $app->render('default.php', ["data" => ['status' => $sth->execute() == 1]], 200);
        }

        public function linkarPlanPatient()
        {
            global $app;
            $dados = json_decode($app->request->getBody(), true);
            $dados = (sizeof($dados) == 0) ? $_POST : $dados;
            $keys = array_keys($dados); //Paga as chaves do array
            /*
			O uso de prepare e bindValue é importante para se evitar SQL Injection
			*/
            $sth = $this->PDO->prepare("INSERT INTO $this->plan_table_name (" . implode(',', $keys) . ") VALUES (:" . implode(",:", $keys) . ")");
            foreach ($dados as $key => $value) {
                $sth->bindValue(':' . $key, $value);
            }
            $sth->execute();
            //Retorna o id inserido
            $app->render('default.php', ["data" => ['id' => $this->PDO->lastInsertId()]], 200);
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
