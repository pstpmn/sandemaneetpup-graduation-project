<?php
require '../../../controller/database.php';
require '../../confix.php';

$input = json_decode(file_get_contents('php://input'), true);
$database = new database(IP, DBNAME, USER, PASS);

$data = $database->select("select count(if(day(travel_date) >= 1,1,null) and if(day(travel_date) <= 7,1,null)) as week1, count(if(day(travel_date) >= 8,1,null) and if(day(travel_date) <= 14,1,null)) as week2 , count(if(day(travel_date) >= 15,1,null) and if(day(travel_date) <= 21,1,null)) as week3, count(if(day(travel_date) >= 22,1,null) and if(day(travel_date) <= 28,1,null)) as week4, count(if(day(travel_date) >= 29,1,null) and if(day(travel_date) <= 32,1,null)) as week5 
from buy_ticket
JOIN ticket_book on ticket_book.ticket_book_id = buy_ticket.ticket_book_id
where ticket_book.travel_date LIKE '" . $input['date'] . "%' AND (buy_ticket.check_in is not null OR buy_ticket.check_out is not null)");
echo json_encode($data);
