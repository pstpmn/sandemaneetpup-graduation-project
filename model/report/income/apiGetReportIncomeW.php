<?php
require '../../../controller/database.php';
require '../../confix.php';

$input = json_decode(file_get_contents('php://input'), true);

$database = new database(IP, DBNAME, USER, PASS);
$data = $database->select('SELECT
SUM(CASE WHEN DAY(time_buy_ticket) >= 1  AND DAY(time_buy_ticket) <= 7  THEN total_price ELSE 0 END) AS week1 ,
SUM(CASE WHEN DAY(time_buy_ticket) >= 8  AND DAY(time_buy_ticket) <= 14  THEN total_price ELSE 0 END) AS week2 ,
SUM(CASE WHEN DAY(time_buy_ticket) >= 15  AND DAY(time_buy_ticket) <= 21  THEN total_price ELSE 0 END) AS week3 ,
SUM(CASE WHEN DAY(time_buy_ticket) >= 22  AND DAY(time_buy_ticket) <= 28  THEN total_price ELSE 0 END) AS week4 ,
SUM(CASE WHEN DAY(time_buy_ticket) >= 29  AND DAY(time_buy_ticket) <= 32  THEN total_price ELSE 0 END) AS week5
FROM ticket_book where time_buy_ticket LIKE "' . $input['date'] . '%" ');

echo json_encode($data);
