<?php
require '../controller/database.php';
require 'confix.php';

$input = json_decode(file_get_contents('php://input'), true);

$database = new database(IP, DBNAME, USER, PASS);

$data = $database->update('update dayoff set dayoff = "' . $input['dayOff'] . '" , dayoff_cause = "' . $input['cause'] . '" ,
dayoff_status_id = ' . $input['status'] . ' where dayoff_id = "' . $input['id'] . '" ');
if ($data == true) {
    echo json_encode($data);
}
$pdo = null; //close connection