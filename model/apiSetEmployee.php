<?php
require '../controller/database.php';
require 'confix.php';

$input = json_decode(file_get_contents('php://input'), true);

$database = new database(IP, DBNAME, USER, PASS);

$data = $database->update('update employee set username = "' . $input['user'] . '" , password = "' . $input['pass'] . '" ,
emp_first_name = "' . $input['fname'] . '" , emp_last_name = "' . $input['lname'] . '" ,
gender = "' . $input['gender'] . '" , employee_category_id = ' . $input['categoryEmp'] . ' 
    where employee_id = "' . $input['id'] . '" ');
if ($data == true) {
    echo json_encode($data);
}
$pdo = null; //close connection