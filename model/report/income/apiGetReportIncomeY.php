<?php
require '../../../controller/database.php';
require '../../confix.php';

$database = new database(IP, DBNAME, USER, PASS);

$qeueryData = $database->select("SELECT year(time_buy_ticket) as year , sum(total_price) as value from ticket_book GROUP by year(time_buy_ticket) ORDER BY  year(time_buy_ticket) ASC");
if ($qeueryData == true) {
    echo json_encode($qeueryData);
}
$pdo = null; //close connection