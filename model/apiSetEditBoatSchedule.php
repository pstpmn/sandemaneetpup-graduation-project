<?php
require '../controller/database.php';
require 'confix.php';

$input = json_decode(file_get_contents('php://input'), true);

$database = new database(IP, DBNAME, USER, PASS);

if ($input['txtType'] == 'start') {
    $data = $database->update('update boat_schedule set location_id = ' . $input['txtLocation'] . ' , start_time = "' . $input['txtTime'] . '"
    where boat_schedule_id = ' . $input['id'] . ' ');
} else {
    $data = $database->update('update boat_schedule set location_id = ' . $input['txtLocation'] . ' , return_time = "' . $input['txtTime'] . '" 
    where boat_schedule_id = ' . $input['id'] . ' ');
}
if ($data == true) {
    echo json_encode($data);
}
$pdo = null; //close connection
