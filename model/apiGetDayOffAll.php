<?php
require '../controller/database.php';
require 'confix.php';

$database = new database(IP, DBNAME, USER,PASS);
$qeueryData = $database->select("select * from dayOff join dayOff_status on dayOff.dayOff_status_id = dayOff_status.dayOff_status_id");
if ($qeueryData == true) {
    echo json_encode($qeueryData);
}
$pdo = null; //close connection