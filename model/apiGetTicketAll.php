<?php
require '../controller/database.php';
require 'confix.php';

$database = new database(IP, DBNAME, USER, PASS);
$data = $database->select('SELECT * from ticket_book
    join buy_ticket on buy_ticket.ticket_book_id  = ticket_book.ticket_book_id
    join boat_seat on boat_seat.boat_seat_id  = buy_ticket.boat_seat_id
    join customer on buy_ticket.customer_id  = customer.customer_id
    join ticket_category on ticket_category.ticket_category_id  = ticket_book.ticket_category_id
    join ticket_status on ticket_status.ticket_status_id  = ticket_book.ticket_status_id
');
if ($data == true) {
    echo json_encode($data);
}
$pdo = null; //close connection