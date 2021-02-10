<?php
require '../controller/database.php';
require 'confix.php';

$input = json_decode(file_get_contents('php://input'), true);

$database = new database(IP, DBNAME, USER, PASS);

$data = $database->update('update ticket_book set ticket_status_id = 3 , reason_cancel = "'.$input['reason'].'"
where ticket_book_code = "'.$input['ticketCode'].'"');
if ($data == true) {
    echo json_encode($data);
}
$pdo = null; //close connection