<?php
require '../controller/database.php';
require 'confix.php';

date_default_timezone_set('Asia/Bangkok');


$input = json_decode(file_get_contents('php://input'), true);
$registerDate = date('Y:m:d H:i:s');


$database = new database(IP, DBNAME, USER,PASS);

$data = $database->update('update buy_ticket set check_out = "'.$registerDate.'" where buy_ticket_id = '.$input['ticketID'].'');

$pdo = null; //close connection