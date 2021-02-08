<?php
require '../controller/database.php';
require 'confix.php';

$input = json_decode(file_get_contents('php://input'), true);

$database = new database(IP, DBNAME, USER,PASS);

$data = $database->select('SELECT * from ticket_book 
    join buy_ticket on buy_ticket.ticket_book_id = ticket_book.ticket_book_id
    join customer on customer.customer_id = buy_ticket.customer_id
    join boat_seat on boat_seat.boat_seat_id = buy_ticket.boat_seat_id
    join boat on boat.boat_number = boat_seat.boat_number
    join ticket_category on ticket_category.ticket_category_id  = ticket_book.ticket_category_id
    join employee on employee.employee_id = ticket_book.employee_id
    join location on ticket_book.orgin = location.location_id
    join location as desina on ticket_book.destination = desina.location_id
    where ticket_book_code = "' . $input['ticketCode'] . '" ');
if ($data == true) {
    echo json_encode($data);
}
$pdo = null; //close connection