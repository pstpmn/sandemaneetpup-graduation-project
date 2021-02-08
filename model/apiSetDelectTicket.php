<?php
require '../controller/database.php';
require 'confix.php';

$input = json_decode(file_get_contents('php://input'), true);

$database = new database(IP, DBNAME, USER, PASS);
$queryTicketBookID =  $database->select('select ticket_book_id from ticket_book where ticket_book_code = "' . $input['id'] . '" ');
$database->update('delete from buy_ticket where ticket_book_id = ' . $queryTicketBookID[0][0] . ' ');
$data =  $database->update('delete from ticket_book where ticket_book_code = "' . $input['id'] . '" ');
if ($data == true) {
    echo json_encode($data);
}
$pdo = null; //close connection