<?php
require '../controller/database.php';
require 'confix.php';

$input = json_decode(file_get_contents('php://input'), true);

$database = new database(IP, DBNAME, USER, PASS);
$selectBuyticket =  $database->select('select boat_seat.boat_seat_id from buy_ticket join boat_seat on boat_seat.boat_seat_id = buy_ticket.boat_seat_id');

for ($i = 0; $i < count($selectBuyticket); $i++) {
    $database->update('delete from buy_ticket where boat_seat_id = ' . $selectBuyticket[$i]['boat_seat_id'] . ' ');
}
$database->update('delete from boat_seat where boat_number = ' . $input['boatNumber'] . ' ');
$database->update('delete from boat_schedule where boat_number = ' . $input['boatNumber'] . ' ');
$data = $database->update('delete from boat where boat_number = ' . $input['boatNumber'] . ' ');
if ($data == true) {
    echo json_encode($data);
}
$pdo = null; //close connection