<?php

require '../controller/database.php';
require 'confix.php';

$database = new database(IP, DBNAME, USER,PASS);
while (true) {
    $ticketCODE = rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9);
    $checkTicketID = $database->select('select ticket_code from buy_ticket where ticket_code = "' . $ticketCODE . '" ');

    if ($checkTicketID == null) {
        echo json_encode($ticketCODE);
        return;
    } else {
        continue;
    }
}
$pdo = null;
