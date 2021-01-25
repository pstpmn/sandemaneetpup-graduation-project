<?php
require '../controller/database.php';
require 'confix.php';

$input = json_decode(file_get_contents('php://input'), true);

$database = new database(IP, DBNAME, USER, PASS);

$data = $database->insert('insert into dayOff(dayOff,dayOff_cause,dayOff_status_id)
values ("' . $input['dayOff'] . '","' . $input['cause'] . '",' . $input['status'] . ') ');
if ($data == true) {
    echo json_encode($data);
}
$pdo = null; //close connection