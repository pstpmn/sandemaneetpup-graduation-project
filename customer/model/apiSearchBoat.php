<?php
require '../controller/database.php';
require 'confix.php';

$input = json_decode(file_get_contents('php://input'), true);

$database = new database(IP, DBNAME, USER,PASS);

$searchLocationID = $database->select('SELECT * from boat_schedule 
join location on location.location_id = boat_schedule.location_id
where boat_schedule.location_id = ' . $input['location'] . ' ');

echo json_encode($searchLocationID);

$pdo = null; //close connection