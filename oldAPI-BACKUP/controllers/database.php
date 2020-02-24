<?php

namespace controllers {


    class DbVariables
    {

        // specify your own database credentials
        public $host = "localhost";
        public $db_name = "odonto_demo";
        public $username = "root";
        public $password = "pass";
        // public $conn;

        // get the database connection

        public function init()
        {
            $this->host = 'localhost';
            $this->db_name = 'odonto_demo';
            $this->username = 'root';
            $this->password = 'pass';
        }

        public function getHost()
        {
            return $this->host;
        }
        public function getDbName()
        {
            return $this->db_name;
        }
        public function getUsername()
        {
            return $this->username;
        }
        public function getPassword()
        {
            return $this->password;
        }
    }
}
