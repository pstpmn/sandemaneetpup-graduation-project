<?php
require '../controller/database.php';
require 'confix.php';

$input = json_decode(file_get_contents('php://input'), true);

$database = new database(IP, DBNAME, USER,PASS);

$qeueryData = $database->select('select * from boat_seat where boat_number = ' . $input['boatNumber'] . '');
if ($qeueryData == true) {
    echo json_encode($qeueryData);
}
$pdo = null; //close connection