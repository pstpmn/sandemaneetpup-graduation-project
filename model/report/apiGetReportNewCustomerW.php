<?php
require '../../controller/database.php';
require '../confix.php';

$input = json_decode(file_get_contents('php://input'), true);

$database = new database(IP, DBNAME, USER, PASS);
$data = $database->select('select count(if(day(register_time) >= 1,1,null) and if(day(register_time) <= 7,1,null)) as week1, count(if(day(register_time) >= 8,1,null) and if(day(register_time) <= 14,1,null)) as week2 , count(if(day(register_time) >= 15,1,null) and if(day(register_time) <= 21,1,null)) as week3, count(if(day(register_time) >= 22,1,null) and if(day(register_time) <= 28,1,null)) as week4, count(if(day(register_time) >= 29,1,null) and if(day(register_time) <= 32,1,null)) as week5 from customer
where register_time LIKE "'.$input['date'].'%"');

echo json_encode($data);
