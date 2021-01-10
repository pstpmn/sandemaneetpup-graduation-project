<?php
require '../controller/database.php';
require 'confix.php';

$input = json_decode(file_get_contents('php://input'), true);

$database = new database(IP, DBNAME, USER, PASS);

$data = $database->update('update customer set cust_first_name = "' . $input['fname'] . '" , cust_last_name = "' . $input['lname'] . '",gender = "' . $input['gender'] . '" , phone_number = "' . $input['phone'] . '" , register_time = "' . $input['registerDate'] . '" , count = ' . $input['count'] . ' where customer_id = "' . $input['customerID'] . '" ');
if ($data == true) {
    echo json_encode($data);
}
$pdo = null; //close connection