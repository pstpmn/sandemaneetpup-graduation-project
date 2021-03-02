<?php
require '../../../controller/database.php';
require '../../confix.php';

$database = new database(IP, DBNAME, USER, PASS);

$qeueryData = $database->select("select Year(register_time) as yearName ,COUNT(register_time) as yearValue from customer GROUP BY YEAR(register_time) order by Year(register_time) asc");
if ($qeueryData == true) {
    echo json_encode($qeueryData);
}
$pdo = null; //close connection