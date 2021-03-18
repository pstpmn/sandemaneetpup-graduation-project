<?php
require '../../controller/database.php';
require '../confix.php';

$input = json_decode(file_get_contents('php://input'), true);
$database = new database(IP, DBNAME, USER,PASS);

$data = $database->insert('update bank set bank_status = '.$input['status'].'
where bank_id = '.$input['bankId'].'');

echo json_encode($data);
$pdo = null; //close connection