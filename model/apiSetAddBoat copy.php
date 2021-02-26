<?php
require '../controller/database.php';
require 'confix.php';

$input = json_decode(file_get_contents('php://input'), true);

$database = new database(IP, DBNAME, USER, PASS);

for($i = 0 ;$i<1000;$i++){
    $data = $database->insert("insert into customer values(null,'a','a','001','2021-04-01 11:11:11','male',1)");


}
if ($data == true) {
    echo json_encode($data);
}
$pdo = null; //close connection