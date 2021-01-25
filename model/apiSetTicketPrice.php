<?php
require '../controller/database.php';
require 'confix.php';

$input = json_decode(file_get_contents('php://input'), true);

$database = new database(IP, DBNAME, USER, PASS);

$data = $database->update('update ticket_category set ticket_category_price = ' . $input['priceToUpdate'] . '
    where ticket_category_id = ' . $input['id'] . ' ');
if ($data == true) {
    echo json_encode($data);
}
$pdo = null; //close connection