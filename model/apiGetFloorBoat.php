<?php
require '../controller/database.php';
require 'confix.php';

$database = new database(IP, DBNAME, USER, PASS);
$input = json_decode(file_get_contents('php://input'), true);

$qeueryData = $database->select("SELECT DISTINCT floor FROM boat_seat WHERE boat_number = ".$input['boatNumber']."");
if ($qeueryData == true) {
    echo json_encode($qeueryData);
}
$pdo = null; //close connection