<?php
require '../controller/database.php';
require 'confix.php';


$database = new database(IP, DBNAME, USER, PASS);

$data = $database->select('SELECT buy_ticket.ticket_code,ticket_status_id,boat.boat_number,payment_time,time_up_slip ,payment_bank,payment_amount,slip_img
    from buy_ticket 
    join customer on customer.customer_id = buy_ticket.customer_id
    join boat_seat on boat_seat.boat_seat_id = buy_ticket.boat_seat_id
    join boat on boat.boat_number = boat_seat.boat_number
    join ticket_category on ticket_category.ticket_category_id  = buy_ticket.ticket_category_id
    join employee on employee.employee_id = buy_ticket.employee_id
    where (ticket_status_id = 2 or ticket_status_id = 1 ) and time_up_slip is not null');
if ($data == true) {
    echo json_encode($data);
}
$pdo = null; //close connection