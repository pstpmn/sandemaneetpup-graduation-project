<?php
require '../controller/database.php';
require 'confix.php';

$input = json_decode(file_get_contents('php://input'), true);

$database = new database(IP, DBNAME, USER, PASS);
$data;


if ($input['txtType'] == 'start') {
    $data = $database->insert('insert into boat_schedule(location_id,boat_number,start_time)
values(' . $input['txtLocation'] . ',' . $input['boatNumber'] . ',"' . $input['txtTime'] . '") ');
} else {
    $data = $database->insert('insert into boat_schedule(location_id,boat_number,return_time)
    values(' . $input['txtLocation'] . ',' . $input['boatNumber'] . ',"' . $input['txtTime'] . '") ');
}
if ($data == true) {
    echo json_encode($data);
}
$pdo = null; //close connection