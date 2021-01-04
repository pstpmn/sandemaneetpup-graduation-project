<?php

$input = json_decode(file_get_contents('php://input'), true);
$barcode = $input['hidden1'];

echo json_encode($input);
