<?php
require '../controller/database.php';
require 'confix.php';

$input = json_decode(file_get_contents('php://input'), true);
$detailBoatSeat = array();
$database = new database(IP, DBNAME, USER, PASS);


$ticketBookId = $database->select('select ticket_book_id from ticket_book where ticket_book_code = "' . $input['ticketBookCode'] . '"');

for ($i = 0; $i < count($input['listSeat']); $i++) {
    // ตรวจสอบจำนวนการใช้งานของลูกค้า
    $checkCount = $database->select("SELECT count from customer 
    where cust_first_name = '" . $input['fristName'][$i] . "' AND cust_last_name = '" . $input['lastName'][$i] . "' ");

    //เก็บรายละเอียดข้อมูลที่นั่งจากลูกค้า
    $checkSeatDetail = $database->select('select * from boat_seat where  boat_seat_id  = ' . $input['listSeat'][$i] . ' ');

    $array = array($checkSeatDetail[0]['boat_seat_number'], $checkSeatDetail[0]['boat_seat_type'], $checkSeatDetail[0]['floor']);
    array_push($detailBoatSeat, $array);

    //ลูกค้าไม่เคยใช้งานเลย เพิ่มลูกค้า
    if ($checkCount == false) {
        $addCustomer = $database->insert('insert into customer (cust_first_name,cust_last_name,phone_number,gender,count) 
    values("' . $input['fristName'][$i] . '" , "' . $input['lastName'][$i] . '","' . $input['phoneNumber'][$i] . '","' . $input['gender'][$i] . '","1")');
    }

    //มีประวัติการใช้งาน
    else {
        $addCount = $checkCount[0]['count'] + 1;
        $updateCustomer = $database->update('update customer set count = ' . $addCount . ' 
    where cust_first_name = "' . $input['fristName'][$i] . '" AND cust_last_name = "' . $input['lastName'][$i] . '" ');
    }

    //ดึงข้อมูล ID ลูกค้า 
    $checkIDCustomer = $database->select('select customer_id from customer 
where cust_first_name = "' . $input['fristName'][$i] . '" AND cust_last_name = "' . $input['lastName'][$i] . '" ');



    while (true) {
        $ticketCODE = rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9);
        $checkTicketCode = $database->select('select ticket_code from buy_ticket where ticket_code = "' . $ticketCODE . '" ');

        if ($checkTicketCode == null) {
            break;
        } else {
            continue;
        }
    }


    $queryTicket = $database->insert('insert into buy_ticket(customer_id,boat_seat_id,ticket_code,ticket_book_id) 
    values(' . $checkIDCustomer[0][0] . ',' . $input['listSeat'][$i] . ',"' . $ticketCODE . '",' . $ticketBookId[0][0] . ');
    ');
}


echo json_encode(true);
$pdo = null;  //close connection