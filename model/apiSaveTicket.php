<?php
require '../controller/database.php';
require 'confix.php';

$input = json_decode(file_get_contents('php://input'), true);
$detailBoatSeat = array();
$database = new database(IP, DBNAME, USER, PASS);

// ตรวจสอบจำนวนการใช้งานของลูกค้า
$checkCount = $database->select("SELECT count from customer 
    where cust_first_name = '" . $input['fristName'] . "' AND cust_last_name = '" . $input['lastName'] . "' ");

//เก็บรายละเอียดข้อมูลที่นั่งจากลูกค้า
$checkSeatDetail = $database->select('select * from boat_seat where  boat_seat_id  = ' . $input['ticketID'] . ' ');

$array = array($checkSeatDetail[0]['boat_seat_number'], $checkSeatDetail[0]['boat_seat_type'], $checkSeatDetail[0]['floor']);
array_push($detailBoatSeat, $array);

//ลูกค้าไม่เคยใช้งานเลย เพิ่มลูกค้า
if ($checkCount == false) {
    $addCustomer = $database->insert('insert into customer (cust_first_name,cust_last_name,phone_number,gender,count) 
    values("' . $input['fristName'] . '" , "' . $input['lastName'] . '","' . $input['phoneNumber'] . '","' . $input['gender'] . '","1")');
}

//มีประวัติการใช้งาน
else {
    $addCount = $checkCount[0]['count'] + 1;
    $updateCustomer = $database->update('update customer set count = ' . $addCount . ' 
    where cust_first_name = "' . $input['fristName'] . '" AND cust_last_name = "' . $input['lastName'] . '" ');
}

//ดึงข้อมูล ID ลูกค้า 
$checkIDCustomer = $database->select('select customer_id from customer 
where cust_first_name = "' . $input['fristName'] . '" AND cust_last_name = "' . $input['lastName'] . '" ');


//ดึงข้อมูล ระยะเวลาการจอง และ คำนวณ
date_default_timezone_set('Asia/Bangkok');
$checkDeadlineBook = $database->select('select * from book_time');
$registerDate = date('Y:m:d H:i:s');
$registerDate = date('Y-m-d H:i:s', strtotime($registerDate . ' + ' . $checkDeadlineBook[0]['book_day'] . ' days'));
$registerDate = date('Y-m-d H:i:s', strtotime($registerDate . ' + ' . $checkDeadlineBook[0]['book_hour'] . ' hour'));
$registerDate = date('Y-m-d H:i:s', strtotime($registerDate . ' + ' . $checkDeadlineBook[0]['book_minute'] . ' minute'));



// บันทึกตั๋ว
// for ($i = 0; $i < count($input['ticketID']); $i++) {
//สร้างรหัสตั๋ว
// $ticketCODE;
// while (true) {
//     $ticketCODE = rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9);
//     $checkTicketID = $database->select('select ticket_code from buy_ticket where ticket_code = "' . $ticketCODE . '" ');

//     if ($checkTicketID == null) {
//         break;
//     } else {
//         continue;
//     }
// }

$data = $database->insert('insert into buy_ticket(ticket_category_id,customer_id,boat_seat_id,ticket_code,travel_date,ticket_status_id,employee_id,deadline_book,orgin,destination)
    values (1,' . $checkIDCustomer[0][0] . ',"' . $input['ticketID'] . '","' . $input['ticketCode'] . '","' . $input['date'] . '" , ' . $input['ticketStatus'] . ' ,' . $input['empId'] . ',"' . $registerDate . '",' . $input['orgin'] . ',' . $input['destination'] . ')');
// }

echo json_encode(true);
$pdo = null;  //close connection