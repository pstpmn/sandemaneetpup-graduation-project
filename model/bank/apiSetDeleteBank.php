<?php
require '../../controller/database.php';
require '../confix.php';

$input = json_decode(file_get_contents('php://input'), true);
$database = new database(IP, DBNAME, USER,PASS);

$data = $database->delete('delete from bank where bank_id = '.$input['bankId'].'');
echo json_encode($data);
$pdo = null; //close connection