<?php
require '../../../controller/database.php';
require '../../confix.php';

$input = json_decode(file_get_contents('php://input'), true);

$database = new database(IP, DBNAME, USER, PASS);
$data = $database->select('SELECT SUM(IF(MONTH(time_buy_ticket) = 1 , total_price , 0)) as month1, SUM(IF(MONTH(time_buy_ticket) = 2 , total_price , 0)) as month2
, SUM(IF(MONTH(time_buy_ticket) = 3 , total_price , 0)) as month3, SUM(IF(MONTH(time_buy_ticket) = 4 , total_price , 0)) as month4
, SUM(IF(MONTH(time_buy_ticket) = 5 , total_price , 0))  as month5, SUM(IF(MONTH(time_buy_ticket) = 6 , total_price , 0)) as month6
, SUM(IF(MONTH(time_buy_ticket) = 7 , total_price , 0)) as month7 , SUM(IF(MONTH(time_buy_ticket) = 8 , total_price , 0)) as month8
, SUM(IF(MONTH(time_buy_ticket) = 9 , total_price , 0)) as month9, SUM(IF(MONTH(time_buy_ticket) = 10 , total_price , 0)) as month10
, SUM(IF(MONTH(time_buy_ticket) = 11 , total_price , 0)) as month11, SUM(IF(MONTH(time_buy_ticket) = 12 , total_price , 0)) as month12 
from ticket_book
where YEAR(time_buy_ticket) = "' . $input['date'] . '"');




echo json_encode($data);
