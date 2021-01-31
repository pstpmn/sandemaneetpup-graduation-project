<?php
require '../controller/database.php';
require 'confix.php';

$input = json_decode(file_get_contents('php://input'), true);

$database = new database(IP, DBNAME, USER, PASS);

$data = $database->insert('insert into boat_seat(boat_seat_number,boat_seat_type,floor,boat_number)
values (' . $input['start'] . ',"' . $input['SeatType'] . '","' . $input['floor'] . '",'.$input['boatNumber'].') ');
if ($data == true) {
    echo json_encode($data);
}
$pdo = null; //close connection