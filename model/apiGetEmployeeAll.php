<?php
require '../controller/database.php';
require 'confix.php';

$database = new database(IP, DBNAME, USER,PASS);
$qeueryData = $database->select("select * from employee 
join employee_category on employee.employee_category_id = employee_category.employee_category_id 
order by employee_id asc");
if ($qeueryData == true) {
    echo json_encode($qeueryData);
}
$pdo = null; //close connection