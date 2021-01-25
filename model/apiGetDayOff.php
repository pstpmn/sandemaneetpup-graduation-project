<?php
require '../controller/database.php';
require 'confix.php';

$database = new database(IP, DBNAME, USER, PASS);
$input = json_decode(file_get_contents('php://input'), true);

$qeueryData = $database->select("select * from dayOff where dayOff = '" . $input['date'] . "' OR dayOff = '".$input['dayName']."' ");
if ($qeueryData == true) {
    echo json_encode($qeueryData);
}
$pdo = null; //close connection