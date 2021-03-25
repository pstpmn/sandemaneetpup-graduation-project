<?php
require '../controller/database.php';
require 'confix.php';


$database = new database(IP, DBNAME, USER, PASS);

$data = $database->insert('SELECT * from ticket_book 
    join ticket_category on ticket_category.ticket_category_id  = ticket_book.ticket_category_id
    join employee on employee.employee_id = ticket_book.employee_id
    where (ticket_status_id = 4 or ticket_status_id = 1 or ticket_status_id = 3) and time_up_slip is not null');
if ($data == true) {
    echo json_encode($data);
}
$pdo = null; //close connection