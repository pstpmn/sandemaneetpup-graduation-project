<?php
require '../controller/database.php';
require 'confix.php';

$database = new database(IP, DBNAME, USER,PASS);
$input = json_decode(file_get_contents('php://input'), true);

$data = $database->select('SELECT * from book_time');
if ($data == true) {
    echo json_encode($data);
}
$pdo = null; //close connection