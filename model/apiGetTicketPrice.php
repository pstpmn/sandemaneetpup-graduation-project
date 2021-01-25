<?php
require '../controller/database.php';
require 'confix.php';

$database = new database(IP, DBNAME, USER,PASS);
$input = json_decode(file_get_contents('php://input'), true);

$data = $database->select('SELECT * from ticket_category where ticket_category_id = '.$input['ticketCategoryId'].'');
if ($data == true) {
    echo json_encode($data);
}
$pdo = null; //close connection