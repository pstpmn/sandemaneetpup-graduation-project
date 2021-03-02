<?php
require '../../../controller/database.php';
require '../../confix.php';

$database = new database(IP, DBNAME, USER, PASS);

$qeueryData = $database->select("SELECT year(time_buy_ticket) as year , count(time_buy_ticket) as value from buy_ticket JOIN ticket_book on ticket_book.ticket_book_id = buy_ticket.ticket_book_id GROUP by year(time_buy_ticket) ORDER BY  year(time_buy_ticket) ASC");
if ($qeueryData == true) {
    echo json_encode($qeueryData);
}
$pdo = null; //close connection