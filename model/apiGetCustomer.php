<?php
require '../controller/database.php';
require 'confix.php';

$input = json_decode(file_get_contents('php://input'), true);

$database = new database(IP, DBNAME, USER,PASS);

$qeueryData = $database->select("select * from customer where customer_id = ".$input['ticketCode']."");
if ($qeueryData == true) {
    echo json_encode($qeueryData);
}
$pdo = null; //close connection