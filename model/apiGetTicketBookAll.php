<?php
require '../controller/database.php';
require 'confix.php';

$database = new database(IP, DBNAME, USER, PASS);
$data = $database->select('SELECT * from ticket_book
    join ticket_category on ticket_category.ticket_category_id  = ticket_book.ticket_category_id
    join employee on employee.employee_id = ticket_book.employee_id
    join ticket_status on ticket_status.ticket_status_id  = ticket_book.ticket_status_id
');
if ($data == true) {
    echo json_encode($data);
}
$pdo = null; //close connection