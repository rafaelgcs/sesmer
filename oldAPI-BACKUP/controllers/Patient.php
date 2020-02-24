<?php

// include_once '../config/database.php';

namespace controllers {

    class Patient
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
            $this->table_name = 'patient';
            $this->plan_table_name = 'patient_plan';
        }

        public function getAllSchedule($cpf)
        {
            global $app;
            $sth = $this->PDO->prepare("SELECT pro.*, pp.do_procedure_date, pac.name as patient, doc.color, doc.name as doctor, pp.id as item 
            FROM `procedure` as pro, `patient_procedure` as pp, patient as pac, `doctor` as doc 
            WHERE pro.id = pp.procedure_id AND pp.patient_cpf = pac.cpf AND doc.id = pp.doctor_id AND pp.patient_cpf = $cpf");
            // $sth = $this->PDO->prepare("SELECT * FROM $this->table_name WHERE cpf = :cpf");
            // $sth->bindValue(':id', $id);
            $sth->execute();
            $result = $sth->fetchAll(\PDO::FETCH_ASSOC);
            $app->render('default.php', ["data" => $result], 200);
        }

        /*
		lista
		Listand pessoas
		*/
        public function lista()
        {
            global $app;
            $sth = $this->PDO->prepare("SELECT p.*, t.expire_date, t.carteira, t.codigo, plan.name as plano, plan.cnpj FROM
            " . $this->table_name . " as p, $this->plan_table_name as t, plan
        WHERE
            t.patient_cpf = p.cpf AND t.plan_cnpj = plan.cnpj");
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
            $sth = $this->PDO->prepare("SELECT p.*, t.expire_date, t.carteira, t.codigo, plan.name as plano, plan.cnpj FROM
            " . $this->table_name . " as p, $this->plan_table_name as t, plan
        WHERE
            p.cpf = :cpf AND t.patient_cpf = p.cpf AND t.plan_cnpj = plan.cnpj
        LIMIT
            0,1");
            // $sth = $this->PDO->prepare("SELECT * FROM $this->table_name WHERE cpf = :cpf");
            $sth->bindValue(':cpf', $cpf);
            $sth->execute();
            $result = $sth->fetch(\PDO::FETCH_ASSOC);
            $app->render('default.php', ["data" => $result], 200);
        }

        public function getByName($name)
        {
            global $app;
            $sth = $this->PDO->prepare("SELECT p.*, t.expire_date, t.carteira, t.codigo, plan.name as plano, plan.cnpj FROM
            " . $this->table_name . " as p, $this->plan_table_name as t, plan
            WHERE
            p.name LIKE '%$name%' AND t.patient_cpf = p.cpf AND t.plan_cnpj = plan.cnpj");
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
        public function editar($cpf)
        {
            global $app;
            $dados = json_decode($app->request->getBody(), true);
            $dados = (sizeof($dados) == 0) ? $_POST : $dados;
            $sets = [];
            foreach ($dados as $key => $VALUES) {
                $sets[] = $key . " = :" . $key;
            }

            $sth = $this->PDO->prepare("UPDATE $this->table_name SET " . implode(',', $sets) . " WHERE cpf = :cpf");
            $sth->bindValue(':cpf', $cpf);
            foreach ($dados as $key => $value) {
                $sth->bindValue(':' . $key, $value);
            }
            
            //Retorna status da edição
            $app->render('default.php', ["data" => ['status' => $sth->execute() == 1]], 200);
        }

        public function editarPlan($cpf){
            global $app;
            $dados = json_decode($app->request->getBody(), true);
            $dados = (sizeof($dados) == 0) ? $_POST : $dados;
            $sets = [];
            foreach ($dados as $key => $VALUES) {
                $sets[] = $key . " = :" . $key;
            }

            $sth = $this->PDO->prepare("UPDATE $this->plan_table_name SET " . implode(',', $sets) . " WHERE patient_cpf = :cpf");
            $sth->bindValue(':cpf', $cpf);
            foreach ($dados as $key => $value) {
                $sth->bindValue(':' . $key, $value);
            }
            
            //Retorna status da edição
            $app->render('default.php', ["data" => ['status' => $sth->execute() == 1]], 200);
        }

        public function linkarPlanPatient(){
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
        public function excluir($id)
        {
            global $app;
            $sth = $this->PDO->prepare("DELETE FROM pessoa WHERE id = :id");
            $sth->bindValue(':id', $id);
            $app->render('default.php', ["data" => ['status' => $sth->execute() == 1]], 200);
        }
    }
}
