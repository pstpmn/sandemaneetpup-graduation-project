<?php
require '../controller/database.php';
require 'confix.php';

$input = json_decode(file_get_contents('php://input'), true);

$database = new database(IP, DBNAME, USER, PASS);

$data = $database->update('update dayOff set dayOff = "' . $input['dayOff'] . '" , dayOff_cause = "' . $input['cause'] . '" ,
dayOff_status_id = ' . $input['status'] . ' where dayOff_id = "' . $input['id'] . '" ');
if ($data == true) {
    echo json_encode($data);
}
$pdo = null; //close connection