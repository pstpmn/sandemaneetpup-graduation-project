<?php
require '../controller/database.php';
require 'confix.php';

$input = json_decode(file_get_contents('php://input'), true);

$database = new database(IP, DBNAME, USER, PASS);

$data = $database->insert('insert into employee(username,password,emp_first_name,emp_last_name,gender,employee_category_id)
values ("' . $input['user'] . '","' . $input['pass'] . '" , "' . $input['fname'] . '" , "' . $input['lname'] . '" , "' . $input['gender'] . '" 
,' . $input['categoryEmp'] . ') ');
if ($data == true) {
    echo json_encode($data);
}
$pdo = null; //close connection