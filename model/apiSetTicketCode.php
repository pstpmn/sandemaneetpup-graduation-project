<?php
require '../controller/database.php';
require 'confix.php';

$input = json_decode(file_get_contents('php://input'), true);

$database = new database(IP, DBNAME, USER,PASS);

$data = $database->update('update buy_ticket set ticket_code = "'.$input['ticketCodeNew'].'" 
    where ticket_code = "' . $input['ticketCodeOld'] . '" ');
if ($data == true) {
    echo json_encode($data);
}
$pdo = null; //close connection