<?php

// include_once '../config/database.php';

namespace controllers {

    class Doctor
    {
        //Atributo para banco de dados
        private $PDO;
        private $table_name;
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
            $this->table_name = 'doctor';
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
            cpf = :cpf AND password = MD5(:password) LIMIT 0,1");

            // $sth->bindValue(':email', $dados->email);
            // $sth->bindValue(':pass', $dados->email);
            foreach ($dados as $key => $value) {
                $sth->bindValue(':' . $key, $value);
            }
            $sth->execute();
            if ($sth->rowCount() == 1) {

                $result = $sth->fetch(\PDO::FETCH_ASSOC);
                // $returnUser = array("email"=> $result-)
                $result['permission'] = 3;
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
            $sth = $this->PDO->prepare("SELECT id, cpf, cro_crm,name,email,fixed_phone,whats_phone,end FROM doctor");
            $sth->execute();
            $result = $sth->fetchAll(\PDO::FETCH_ASSOC);
            $app->render('default.php', ["data" => $result], 200);
        }
        /*
		get
		param $id
		Pega pessoa pelo id
		*/
        public function get($cpf)
        {
            global $app;
            $sth = $this->PDO->prepare("SELECT id, cpf, cro_crm,name,email,fixed_phone,whats_phone,end FROM doctor WHERE cpf = :cpf");
            $sth->bindValue(':cpf', $cpf);
            $sth->execute();
            $result = $sth->fetch(\PDO::FETCH_ASSOC);
            $app->render('default.php', ["data" => $result], 200);
        }

        public function getByName($name)
        {
            global $app;
            $sth = $this->PDO->prepare("SELECT id, cpf, cro_crm,name,email,fixed_phone,whats_phone,end FROM doctor WHERE name LIKE '%$name%'");
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

            $sth = $this->PDO->prepare("INSERT INTO doctor (`cpf`, `cro_crm`, `name`, `email`, `fixed_phone`, `whats_phone`, `end`, `password`) VALUES (:cpf, :cro_crm, :name, :email, :fixed_phone, :whats_phone, :end, MD5(:password))");
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
        public function editar($cpf)
        {
            global $app;
            $dados = json_decode($app->request->getBody(), true);
            $dados = (sizeof($dados) == 0) ? $_POST : $dados;
            $sets = [];
            foreach ($dados as $key => $VALUES) {
                $sets[] = $key . " = :" . $key;
            }

            $sth = $this->PDO->prepare("UPDATE doctor SET " . implode(',', $sets) . " WHERE cpf = :cpf");
            $sth->bindValue(':cpf', $cpf);
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
        public function excluir($id)
        {
            global $app;
            $sth = $this->PDO->prepare("DELETE FROM pessoa WHERE id = :id");
            $sth->bindValue(':id', $id);
            $app->render('default.php', ["data" => ['status' => $sth->execute() == 1]], 200);
        }
    }
}
