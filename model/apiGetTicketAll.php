<?php
// require '../controller/database.php';
// require 'confix.php';
date_default_timezone_set('Asia/Bangkok');

// $database = new database(IP, DBNAME, USER, PASS);
// $data = $database->select('SELECT * from ticket_book
//     join buy_ticket on buy_ticket.ticket_book_id  = ticket_book.ticket_book_id
//     join boat_seat on boat_seat.boat_seat_id  = buy_ticket.boat_seat_id
//     join customer on buy_ticket.customer_id  = customer.customer_id
//     join ticket_category on ticket_category.ticket_category_id  = ticket_book.ticket_category_id
//     join ticket_status on ticket_status.ticket_status_id  = ticket_book.ticket_status_id
//     where check_in LIKE "'.date("Y-m-d").'%" OR check_out LIKE "'.date("Y-m-d").'%"
// ');
// if ($data == true) {
//     echo json_encode($data);
// }
// $pdo = null; //close connection




require '../controller/database.php';
require 'confix.php';

$conn = mysqli_connect(IP, USER, PASS, DBNAME) or die("Connection failed: " . mysqli_connect_error());
mysqli_query($conn, "SET NAMES 'utf8' ");

// storing  request (ie, get/post) global array to a variable  
$requestData = $_REQUEST;

//ฟิลด์ที่จะเอามาแสดงและค้นหา
$columns = array(
    // datatable column index  => database column name
    0 => 'ticket_code',
    1 => 'cust_first_name',
    2 => 'boat_seat_number',
    3 => 'floor',
    4 => 'boat_number ',
);

// getting total number records without any search
$sql = 'SELECT * from ticket_book
join buy_ticket on buy_ticket.ticket_book_id  = ticket_book.ticket_book_id
join boat_seat on boat_seat.boat_seat_id  = buy_ticket.boat_seat_id
join customer on buy_ticket.customer_id  = customer.customer_id
join ticket_category on ticket_category.ticket_category_id  = ticket_book.ticket_category_id
join ticket_status on ticket_status.ticket_status_id  = ticket_book.ticket_status_id
where check_in LIKE "' . date("Y-m-d") . '%" OR check_out LIKE "' . date("Y-m-d") . '%"
';

$query = mysqli_query($conn, $sql) or die("employee-grid-data.php: get employees");
$totalData = mysqli_num_rows($query);
$totalFiltered = $totalData;  // when there is no search parameter then total number rows = total number filtered rows.


$sql = 'SELECT * from ticket_book
join buy_ticket on buy_ticket.ticket_book_id  = ticket_book.ticket_book_id
join boat_seat on boat_seat.boat_seat_id  = buy_ticket.boat_seat_id
join customer on buy_ticket.customer_id  = customer.customer_id
join ticket_category on ticket_category.ticket_category_id  = ticket_book.ticket_category_id
join ticket_status on ticket_status.ticket_status_id  = ticket_book.ticket_status_id
where (check_in LIKE "' . date("Y-m-d") . '%" OR check_out LIKE "' . date("Y-m-d") .  '%")
AND 1=1';
if (!empty($requestData['search']['value'])) {   // if there is a search parameter, $requestData['search']['value'] contains search parameter
    $sql .= " AND (buy_ticket.ticket_code LIKE '" . $requestData['search']['value'] . "%' ";
    $sql .= " OR customer.cust_first_name LIKE '" . $requestData['search']['value'] . "%' ";
    $sql .= " OR boat_seat.boat_seat_number LIKE '" . $requestData['search']['value'] . "%' ";
    $sql .= " OR boat_seat.floor LIKE '" . $requestData['search']['value'] . "%' ";
    $sql .= " OR boat_seat.boat_number LIKE '" . $requestData['search']['value'] . "%' )";
}
$query = mysqli_query($conn, $sql) or die("employee-grid-data.php: get employees");
$totalFiltered = mysqli_num_rows($query); // when there is a search parameter then we have to modify total number filtered rows as per search result. 
$sql .= " ORDER BY " . $columns[$requestData['order'][0]['column']] . "   " . $requestData['order'][0]['dir'] . "  LIMIT " . $requestData['start'] . " ," . $requestData['length'] . "   ";
/* $requestData['order'][0]['column'] contains colmun index, $requestData['order'][0]['dir'] contains order such as asc/desc  */
$query = mysqli_query($conn, $sql) or die("employee-grid-data.php: get employees");

$data = array();
while ($row = mysqli_fetch_array($query)) {  // preparing an array
    $nestedData = array();

    $nestedData[] = $row['ticket_code'];
    $nestedData[] = $row['cust_first_name'] . " " . $row['cust_last_name'];
    $nestedData[] = $row['boat_seat_number'];
    $nestedData[] = $row['floor'];
    $nestedData[] = $row['boat_number'];
    if($row['check_in'] != null){
        $nestedData[] = "<i class='fas fa-check' ></i>";
    }
    else{
        $nestedData[] = "<i class='fas fa-times-circle' ></i>";
    }
    if($row['check_out'] != null){
        $nestedData[] = "<i class='fas fa-check' ></i>";
    }
    else{
        $nestedData[] = "<i class='fas fa-times-circle' ></i>";
    }
    $data[] = $nestedData;
}



$json_data = array(
    "draw"            => intval($requestData['draw']),   // for every request/draw by clientside , they send a number as a parameter, when they recieve a response/data they first check the draw number, so we are sending same number in draw. 
    "recordsTotal"    => intval($totalData),  // total number of records
    "recordsFiltered" => intval($totalFiltered), // total number of records after searching, if there is no searching then totalFiltered = totalData
    "data"            => $data   // total data array
);

echo json_encode($json_data);  // send data as json format