<?php
require '../../../controller/database.php';
require '../../confix.php';

$input = json_decode(file_get_contents('php://input'), true);

$database = new database(IP, DBNAME, USER, PASS);
$data = $database->select('SELECT count(IF(MONTH(register_time) = 1 , 1 , NULL)) as month1, count(IF(MONTH(register_time) = 2 , 1 , NULL)) as month2
, count(IF(MONTH(register_time) = 3 , 1 , NULL)) as month3, count(IF(MONTH(register_time) = 4 , 1 , NULL)) as month4
, count(IF(MONTH(register_time) = 5 , 1 , NULL))  as month5, count(IF(MONTH(register_time) = 6 , 1 , NULL)) as month6
, count(IF(MONTH(register_time) = 7 , 1 , NULL)) as month7 , count(IF(MONTH(register_time) = 8 , 1 , NULL)) as month8
, count(IF(MONTH(register_time) = 9 , 1 , NULL)) as month9, count(IF(MONTH(register_time) = 10 , 1 , NULL)) as month10
, count(IF(MONTH(register_time) = 11 , 1 , NULL)) as month11, count(IF(MONTH(register_time) = 12 , 1 , NULL)) as month12 FROM customer where YEAR(register_time) = "'.$input['date'].'"');

echo json_encode($data);
