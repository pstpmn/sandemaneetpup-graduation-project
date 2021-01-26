<?php
require '../controller/database.php';
require 'confix.php';

$database = new database(IP, DBNAME, USER,PASS);
$input = json_decode(file_get_contents('php://input'), true);

$data = $database->update('update book_time set book_day = '.$input['days'].' , book_hour = '.$input['hours'].' , book_minute = '.$input['minutes'].'');
if ($data == true) {
    echo json_encode($data);
}
$pdo = null; //close connection