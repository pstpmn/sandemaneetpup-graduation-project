<?php
require '../../controller/database.php';
require '../confix.php';

$input = json_decode(file_get_contents('php://input'), true);
$database = new database(IP, DBNAME, USER,PASS);

$data = $database->insert('
insert into bank values(null,"'.$input['bank'].'","'.$input['account'].'",
'.$input['status'].',"'.$input['nameOwner'].'")
');

// $name_file =  $input['img'][0];
// $tmp_name =  $input['img'][0];
// $locate_img ="img/logo_bank/";
// move_uploaded_file($tmp_name,$locate_img.$name_file);

echo json_encode($data);
$pdo = null; //close connection