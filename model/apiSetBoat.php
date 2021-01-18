<?php
require '../controller/database.php';
require 'confix.php';

$input = json_decode(file_get_contents('php://input'), true);

$database = new database(IP, DBNAME, USER, PASS);

$data = $database->update('UPDATE boat SET boat_number = ' . $input['boatNumber'] . ' , boat_name = "' . $input['boatName'] . '" 
    where boat_number = ' . $input['boatNumber'] . ' ');
if ($data == true) {
    echo json_encode($data);
}
$pdo = null; //close connection