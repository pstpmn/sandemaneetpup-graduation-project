<?php
require '../../../controller/database.php';
require '../../confix.php';

$input = json_decode(file_get_contents('php://input'), true);
$addDay;
if ($input['week'] == 1) {
    $addDay = 0;
} else if ($input['week'] == 2) {
    $addDay = 7;
} else if ($input['week'] == 3) {
    $addDay = 14;
} else if ($input['week'] == 4) {
    $addDay = 21;
} else if ($input['week'] == 5) {
    $addDay = 28;
}
$database = new database(IP, DBNAME, USER, PASS);



// $data = $database->select("SELECT sum(IF(DAY(time_buy_ticket) = " . (1 + $addDay) . " , 1 , NULL)) as day1 , sum(IF(DAY(time_buy_ticket) = " . (2 + $addDay) . " , 1 , NULL)) as day2 , sum(IF(DAY(time_buy_ticket) = " . (3 + $addDay) . " , 1 , NULL)) as day3 
// , sum(IF(DAY(time_buy_ticket) = " . (4 + $addDay) . " , 1 , NULL)) as day4 ,sum(IF(DAY(time_buy_ticket) = " . (5 + $addDay) . ", 1 , NULL)) as day5 ,sum(IF(DAY(time_buy_ticket) = " . (6 + $addDay) . " , 1 , NULL)) as day6 , 
// count(IF(DAY(time_buy_ticket) = " . (7 + $addDay) . " , 1 , NULL)) as day7 
// from ticket_book
// where time_buy_ticket LIKE '" . $input["date"] . "%' ");




$data = $database->select("select sum(if(day(time_buy_ticket) = " . (1 + $addDay) . ",total_price,0)) as day1 
,  sum(if(day(time_buy_ticket) = " . (2 + $addDay) . ",total_price,0)) as day2 
,  sum(if(day(time_buy_ticket) = " . (3 + $addDay) . ",total_price,0)) as day3 
,  sum(if(day(time_buy_ticket) = " . (4 + $addDay) . ",total_price,0)) as day4
,  sum(if(day(time_buy_ticket) = " . (5 + $addDay) . ",total_price,0)) as day5 
,  sum(if(day(time_buy_ticket) = " . (6 + $addDay) . ",total_price,0)) as day6 
,  sum(if(day(time_buy_ticket) = " . (7 + $addDay) . ",total_price,0)) as day7
from ticket_book
where time_buy_ticket LIKE '" . $input["date"] . "%'");
echo json_encode($data);
