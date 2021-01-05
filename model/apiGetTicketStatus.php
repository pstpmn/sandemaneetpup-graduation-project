<?php
require '../controller/database.php';
require 'confix.php';

$input = json_decode(file_get_contents('php://input'), true);

$database = new database(IP, DBNAME, USER,PASS);

$data = $database->select('SELECT  * from ticket_status');
if ($data == true) {
    echo json_encode($data);
}
$pdo = null; //close connection