<?php
require '../controller/database.php';
require 'confix.php';

$database = new database(IP, DBNAME, USER,PASS);

$data = $database->select('SELECT * from location ');
if ($data == true) {
    echo json_encode($data);
}
$pdo = null; //close connection