<?php
require '../../controller/database.php';
require '../confix.php';

$input = json_decode(file_get_contents('php://input'), true);
$database = new database(IP, DBNAME, USER,PASS);

$data = $database->insert('
insert into bank values(null,"'.$input['bank'].'","'.$input['account'].'",
'.$input['status'].',"'.$input['nameOwner'].'")
');

echo json_encode($data);
$pdo = null; //close connection