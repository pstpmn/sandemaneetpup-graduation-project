<?php
require '../controller/database.php';
require 'confix.php';

$database = new database(IP, DBNAME, USER,PASS);
$qeueryData = $database->select("select * from dayoff");
if ($qeueryData == true) {
    echo json_encode($qeueryData);
}
$pdo = null; //close connection