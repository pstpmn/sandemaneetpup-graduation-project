<?php
require '../../../controller/database.php';
require '../../confix.php';

$database = new database(IP, DBNAME, USER, PASS);

$qeueryData = $database->select("SELECT year(ticket_book.travel_date) as year , count(ticket_book.ticket_book_id) as value 
from buy_ticket
join ticket_book on ticket_book.ticket_book_id = buy_ticket.ticket_book_id
join ticket_category on ticket_book.ticket_category_id = ticket_category.ticket_category_id
where (buy_ticket.check_in is null AND buy_ticket.check_out is null)
GROUP BY year(ticket_book.travel_date)
ORDER BY  year(travel_date) ASC");
echo json_encode($qeueryData);
$pdo = null; //close connection