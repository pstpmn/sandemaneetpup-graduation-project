<?php
require '../controller/database.php';
require 'confix.php';

$input = json_decode(file_get_contents('php://input'), true);

$database = new database(IP, DBNAME, USER,PASS);

$data = $database->select('SELECT * from buy_ticket 
    join customer on customer.customer_id = buy_ticket.customer_id
    join boat_seat on boat_seat.boat_seat_id = buy_ticket.boat_seat_id
    join boat on boat.boat_number = boat_seat.boat_number
    join ticket_category on ticket_category.ticket_category_id  = buy_ticket.ticket_category_id
    join employee on employee.employee_id = buy_ticket.employee_id
    join ticket_status on buy_ticket.ticket_status_id = ticket_status.ticket_status_id
    join location on buy_ticket.orgin = location.location_id
    join location as desina on buy_ticket.destination = desina.location_id

    ');
if ($data == true) {
    echo json_encode($data);
}
$pdo = null; //close connection