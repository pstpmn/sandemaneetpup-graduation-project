<?php
require '../../controller/database.php';
require '../confix.php';

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
$data = $database->select("SELECT count(IF(DAY(register_time) = ".(1+$addDay)." , 1 , NULL)) as day1 , count(IF(DAY(register_time) = ".(2+$addDay)." , 1 , NULL)) as day2 , count(IF(DAY(register_time) = ".(3+$addDay)." , 1 , NULL)) as day3 
, count(IF(DAY(register_time) = ".(4+$addDay)." , 1 , NULL)) as day4 ,count(IF(DAY(register_time) = ".(5+$addDay).", 1 , NULL)) as day5 ,count(IF(DAY(register_time) = ".(6+$addDay)." , 1 , NULL)) as day6 , 
count(IF(DAY(register_time) = ".(7+$addDay)." , 1 , NULL)) as day7 FROM customer where register_time LIKE '" . $input["date"] . "%' ");

echo json_encode($data);
