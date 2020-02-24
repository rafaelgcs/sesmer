<?php
// 'user' object
class User
{

    // database connection and table name
    private $conn;
    private $table_name = "clientes";

    // object properties
    public $id;
    public $firstname;
    public $lastname;
    public $email;
    public $password;
    public $permission;

    // constructor
    public function __construct($db)
    {
        $this->conn = $db;
    }

    function verifyPassword($data)
    {
        return password_verify($data,$this->password);//password_hash($data, PASSWORD_BCRYPT);
        // echo 
    }

    // create() method will be here

    function create()
    {

        // insert query
        $query = "INSERT INTO " . $this->table_name . "
            SET
                firstname = :firstname,
                lastname = :lastname,
                email = :email,
                password = :password,
                permission = :permission";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->firstname = htmlspecialchars(strip_tags($this->firstname));
        $this->lastname = htmlspecialchars(strip_tags($this->lastname));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->password = htmlspecialchars(strip_tags($this->password));
        // echo json_encode($this);
        // bind the values
        $stmt->bindParam(':firstname', $this->firstname);
        $stmt->bindParam(':lastname', $this->lastname);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':permission', $this->permission);

        // hash the password before saving to database
        $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
        $stmt->bindParam(':password', $password_hash);

        // execute the query, also check if query was successful
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }


    function emailExists()
    {

        // query to check if email exists
        $query = "SELECT id, firstname, lastname, password
                FROM " . $this->table_name . "
                WHERE email = ?
                LIMIT 0,1";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->email = htmlspecialchars(strip_tags($this->email));

        // bind given email value
        $stmt->bindParam(1, $this->email);

        // execute the query
        $stmt->execute();

        // get number of rows
        $num = $stmt->rowCount();

        // if email exists, assign values to object properties for easy access and use for php sessions
        if ($num > 0) {

            // get record details / values
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            // assign values to object properties
            $this->id = $row['id'];
            $this->firstname = $row['firstname'];
            $this->lastname = $row['lastname'];
            $this->password = $row['password'];

            // return true because email exists in the database
            return true;
        }

        // return false if email does not exist in the database
        return false;
    }

    function login($pass)
    {
        // query to check if email exists
        $query = "SELECT *
         FROM " . $this->table_name . "
         WHERE email = ? and password = MD5(?)
         LIMIT 0,1";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->password = htmlspecialchars(strip_tags($this->password));

        // bind given email value
        $stmt->bindParam(1, $this->email);
        $stmt->bindParam(2, $pass);

        // execute the query
        $stmt->execute();

        // get number of rows
        $num = $stmt->rowCount();

        // if email exists, assign values to object properties for easy access and use for php sessions
        if ($num > 0) {

            // get record details / values
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            // assign values to object properties
            $this->email = $row['email'];
            $this->password = $row['password'];
            $this->permission = $row['permission'];

            // return true because email exists in the database
            return true;
        }

        // return false if email does not exist in the database
        return false;
    }
}
