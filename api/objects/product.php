<?php
// 'mercadorias' object
class Product
{

    // database connection and table name
    private $conn;
    private $table_name = "mercadorias";

    // object properties
    public $id;
    public $cod;
    public $name;
    public $description;
    public $p_unit;
    public $img;
    public $p_entrada;
    public $p_saida;
    public $p_final;
    public $stock;

    // constructor
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // create() method will be here

    function create()
    {
        // insert query
        $query = "INSERT INTO " . $this->table_name . "
            SET
                cod = :cod,
                name = :name,
                description = :description,
                p_unit = :p_unit,
                img = :img,
                p_entrada = :p_entrada,
                p_saida = :p_saida,
                p_final = :p_final";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->cod = htmlspecialchars(strip_tags($this->cod));
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->p_unit = htmlspecialchars(strip_tags($this->p_unit));
        $this->img = htmlspecialchars(strip_tags($this->img));
        $this->p_entrada = htmlspecialchars(strip_tags($this->p_entrada));
        $this->p_saida = htmlspecialchars(strip_tags($this->p_saida));
        $this->p_final = htmlspecialchars(strip_tags($this->p_final));
        // echo json_encode($this);
        // bind the values
        $stmt->bindParam(':cod', $this->cod);
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':description', $this->description);
        $stmt->bindParam(':p_unit', $this->p_unit);
        $stmt->bindParam(':img', $this->img);
        $stmt->bindParam(':p_entrada', $this->p_entrada);
        $stmt->bindParam(':p_saida', $this->p_saida);
        $stmt->bindParam(':p_final', $this->p_final);

        // execute the query, also check if query was successful
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    function allProducts()
    {
        $query = "SELECT m.*,e.quantidade as stock,e.saidas 
        FROM mercadorias as m, estoque as e 
        WHERE e.mercadoriaId = m.cod";

        $stmt = $this->conn->prepare($query);

        $stmt->execute();

        // return false if email does not exist in the database
        return $stmt;
    }
}
