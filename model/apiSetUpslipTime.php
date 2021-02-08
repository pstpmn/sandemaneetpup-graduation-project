<?php
require '../controller/database.php';
require 'confix.php';

$input = json_decode(file_get_contents('php://input'), true);

$database = new database(IP, DBNAME, USER, PASS);

$data = $database->update('update ticket_book set time_up_slip = "' . $input['upSlipTime'] . '" 
    where ticket_book_code = "' . $input['ticketCode'] . '" ');
if ($data == true) {
    echo json_encode($data);
}
$pdo = null; //close connection