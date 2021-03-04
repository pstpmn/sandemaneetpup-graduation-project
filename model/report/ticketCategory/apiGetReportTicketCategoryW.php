<?php
require '../../../controller/database.php';
require '../../confix.php';

$input = json_decode(file_get_contents('php://input'), true);

$database = new database(IP, DBNAME, USER, PASS);
$data = $database->select('SELECT ticket_category.ticket_category_name,
SUM(CASE WHEN DAY(ticket_book.time_buy_ticket) >= 1  AND DAY(ticket_book.time_buy_ticket) <= 7  THEN 1 ELSE 0 END) AS week1 ,
SUM(CASE WHEN DAY(ticket_book.time_buy_ticket) >= 8  AND DAY(ticket_book.time_buy_ticket) <= 14  THEN 1 ELSE 0 END) AS week2 ,
SUM(CASE WHEN DAY(ticket_book.time_buy_ticket) >= 15  AND DAY(ticket_book.time_buy_ticket) <= 21  THEN 1 ELSE 0 END) AS week3 ,
SUM(CASE WHEN DAY(ticket_book.time_buy_ticket) >= 22  AND DAY(ticket_book.time_buy_ticket) <= 28  THEN 1 ELSE 0 END) AS week4 ,
SUM(CASE WHEN DAY(ticket_book.time_buy_ticket) >= 29  AND DAY(ticket_book.time_buy_ticket) <= 32  THEN 1 ELSE 0 END) AS week5
FROM buy_ticket
join ticket_book on ticket_book.ticket_book_id = buy_ticket.ticket_book_id
join ticket_category on ticket_book.ticket_category_id = ticket_category.ticket_category_id
where time_buy_ticket LIKE "' . $input["date"] . '%"
GROUP BY ticket_book.ticket_category_id');

echo json_encode($data);
