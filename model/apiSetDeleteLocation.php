<?php
require '../controller/database.php';
require 'confix.php';

$input = json_decode(file_get_contents('php://input'), true);

$database = new database(IP, DBNAME, USER, PASS);
$selectBuyticket =  $database->select('
select buy_ticket.buy_ticket_id from buy_ticket join ticket_book on ticket_book.ticket_book_id = buy_ticket.ticket_book_id
where ticket_book.orgin  = ' . $input['locationId'] . ' OR ticket_book.destination = ' . $input['locationId'] . ' ');

for ($i = 0; $i < count($selectBuyticket); $i++) {
    $database->delete('delete from buy_ticket where buy_ticket_id = ' . $selectBuyticket[$i]['buy_ticket_id'] . ' ');
}

$database->delete('delete from ticket_book where destination = ' . $input['locationId'] . '
OR orgin = ' . $input['locationId'] . ' ');


$data = $database->update('delete from location  where location_id = "' . $input['locationId'] . '" ');
if ($data == true) {
    echo json_encode($data);
}
$pdo = null; //close connection