<?php
require '../controller/database.php';
require 'confix.php';

$input = json_decode(file_get_contents('php://input'), true);

$database = new database(IP, DBNAME, USER, PASS);

$database->update('delete from boat_schedule where boat_number = ' . $input['boatNumber'] . ' ');
$database->update('delete from boat_seat where boat_number = ' . $input['boatNumber'] . ' ');
$data = $database->update('delete from boat where boat_number = ' . $input['boatNumber'] . ' ');
if ($data == true) {
    echo json_encode($data);
}
$pdo = null; //close connection