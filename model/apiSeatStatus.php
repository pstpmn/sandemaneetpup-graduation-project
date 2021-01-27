<?php
require '../controller/database.php';
require 'confix.php';

$input = json_decode(file_get_contents('php://input'), true);

$database = new database(IP, DBNAME, USER,PASS);
$date = $input['date'];
$qeueryData = $database->select("select * from buy_ticket 
join boat_seat on boat_seat.boat_seat_id = buy_ticket.boat_seat_id
join customer on customer.customer_id = buy_ticket.customer_id
where DATE(`travel_date`) = DATE('" . $date . "') AND boat_number = " . $input['boatNumber'] . " AND (ticket_status_id = 1 OR ticket_status_id = 2 OR ticket_status_id = 4)");
if ($qeueryData == true) {
    echo json_encode($qeueryData);
}
$pdo = null; //close connection