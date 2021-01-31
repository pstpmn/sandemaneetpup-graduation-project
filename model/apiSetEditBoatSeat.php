<?php
require '../controller/database.php';
require 'confix.php';

$input = json_decode(file_get_contents('php://input'), true);

$database = new database(IP, DBNAME, USER, PASS);

$data = $database->update('update boat_seat set boat_seat_number = ' . $input['numbetSeat'] . ' , boat_seat_type = "' . $input['seatType'] . '" ,
floor = "' . $input['floor'] . '" where boat_seat_id = ' . $input['boatSeatId'] . ' ');
if ($data == true) {
    echo json_encode($data);
}
$pdo = null; //close connection