<?php
require '../controller/database.php';
require 'confix.php';

$database = new database(IP, DBNAME, USER,PASS);
$qeueryData = $database->select("select * from dayoff join dayoff_status on dayoff.dayOff_status_id = dayoff_status.dayoff_status_id");
if ($qeueryData == true) {
    echo json_encode($qeueryData);
}
$pdo = null; //close connection