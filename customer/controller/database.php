<?php
class Database
{
    private $pdo;
    public function __construct($host, $dbname, $username, $password)
    {
        try {
            $this->pdo = new PDO('mysql:host=' . $host . ';dbname=' . $dbname . ';charset=utf8', $username, $password);
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

    public function select($show)
    {
        $stmt = $this->pdo->prepare($show);
        $stmt->execute();
        $data = $stmt->fetchAll();
        if ($data == true) {
            return $data;
        }
        else{
            return false;
        }
    }

    public function insert($insert)
    {
        try {
            $stmt = $this->pdo->prepare($insert);
            if ($stmt->execute() == true) {
                return true;
            } else {
                return false;
            }
        } catch (PDOException $e) {
            return $e->getMessage();
        }
    }

    public function delete($delete)
    {
        try {
            $stmt = $this->pdo->prepare($delete);
            $stmt->execute();
            return true;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

    public function update($update)
    {
        try {
            $stmt = $this->pdo->prepare($update);
            if ($stmt->execute() == true) {
                return true;
            } else {
                return false;
            }
        } catch (PDOException $e) {
            return $e->getMessage();
        }
    }
}
