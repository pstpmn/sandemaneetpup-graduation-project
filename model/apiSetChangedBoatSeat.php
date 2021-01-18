<?php
require '../controller/database.php';
require 'confix.php';

$input = json_decode(file_get_contents('php://input'), true);

$database = new database(IP, DBNAME, USER,PASS);

$data = $database->update('update buy_ticket set boat_seat_id = '.$input['boatseatID'].' 
    where ticket_code = "' . $input['ticketCode'] . '" AND  boat_seat_id = '.$input['oldBoatSeat'].'  ');
if ($data == true) {
    echo json_encode($data);
}
$pdo = null; //close connection