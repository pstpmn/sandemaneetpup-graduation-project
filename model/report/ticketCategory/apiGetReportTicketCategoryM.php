<?php
require '../../../controller/database.php';
require '../../confix.php';

$input = json_decode(file_get_contents('php://input'), true);

$database = new database(IP, DBNAME, USER, PASS);
$data = $database->select('SELECT 
ticket_category.ticket_category_name,
SUM(IF(MONTH(ticket_book.time_buy_ticket) = 1 , 1 , 0)) as month1, SUM(IF(MONTH(ticket_book.time_buy_ticket) = 2 , 1 , 0)) as month2
, SUM(IF(MONTH(ticket_book.time_buy_ticket) = 3 , 1 , 0)) as month3, SUM(IF(MONTH(ticket_book.time_buy_ticket) = 4 , 1 , 0)) as month4
, SUM(IF(MONTH(ticket_book.time_buy_ticket) = 5 , 1 , 0))  as month5, SUM(IF(MONTH(ticket_book.time_buy_ticket) = 6 , 1 , 0)) as month6
, SUM(IF(MONTH(ticket_book.time_buy_ticket) = 7 , 1 , 0)) as month7 , SUM(IF(MONTH(ticket_book.time_buy_ticket) = 8 , 1 , 0)) as month8
, SUM(IF(MONTH(ticket_book.time_buy_ticket) = 9 , 1 , 0)) as month9, SUM(IF(MONTH(ticket_book.time_buy_ticket) = 10 , 1 , 0)) as month10
, SUM(IF(MONTH(ticket_book.time_buy_ticket) = 11 , 1 , 0)) as month11, SUM(IF(MONTH(ticket_book.time_buy_ticket) = 12 , 1 , 0)) as month12 
from buy_ticket
join ticket_book on ticket_book.ticket_book_id = buy_ticket.ticket_book_id
join ticket_category on ticket_book.ticket_category_id = ticket_category.ticket_category_id
where YEAR(time_buy_ticket) = "' . $input["date"] . '%"
GROUP BY ticket_book.ticket_category_id');




echo json_encode($data);
