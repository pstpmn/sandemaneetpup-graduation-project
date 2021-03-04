<?php
require '../../../controller/database.php';
require '../../confix.php';

$input = json_decode(file_get_contents('php://input'), true);
$database = new database(IP, DBNAME, USER, PASS);

$data = $database->select("select count(if(day(time_buy_ticket) >= 1,1,null) and if(day(time_buy_ticket) <= 7,1,null)) as week1,
count(if(day(time_buy_ticket) >= 8,1,null) and if(day(time_buy_ticket) <= 14,1,null)) as week2 ,
count(if(day(time_buy_ticket) >= 15,1,null) and if(day(time_buy_ticket) <= 21,1,null)) as week3, 
count(if(day(time_buy_ticket) >= 22,1,null) and if(day(time_buy_ticket) <= 28,1,null)) as week4,
count(if(day(time_buy_ticket) >= 29,1,null) and if(day(time_buy_ticket) <= 32,1,null)) as week5 
from buy_ticket
JOIN ticket_book on ticket_book.ticket_book_id = buy_ticket.ticket_book_id
where (ticket_book.time_buy_ticket LIKE '" . $input['date'] . "%') 
AND (buy_ticket.check_in is null AND buy_ticket.check_out is null)");
echo json_encode($data);
