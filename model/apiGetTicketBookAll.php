<?php
require '../controller/database.php';
require 'confix.php';

$conn = mysqli_connect(IP, USER, PASS, DBNAME) or die("Connection failed: " . mysqli_connect_error());
mysqli_query($conn, "SET NAMES 'utf8' ");

// storing  request (ie, get/post) global array to a variable  
$requestData = $_REQUEST;

//ฟิลด์ที่จะเอามาแสดงและค้นหา
$columns = array(
    // datatable column index  => database column name
    0 => 'ticket_book.ticket_book_code',
    1 => 'ticket_category.ticket_category_name',
    2 => 'employee.username',
    3 => 'ticket_book.time_buy_ticket',
    4 => 'ticket_book.deadline_book',
    5 => 'ticket_book.travel_date',
    6 => 'ticket_status.ticket_status_name',
    7 => 'ticket_book.slip_img',
    8 => 'ticket_book.time_up_slip',
);

// getting total number records without any search
$sql = "SELECT *";
$sql .= " FROM ticket_book join ticket_category on ticket_category.ticket_category_id  = ticket_book.ticket_category_id
join employee on employee.employee_id = ticket_book.employee_id
join ticket_status on ticket_status.ticket_status_id  = ticket_book.ticket_status_id";
$query = mysqli_query($conn, $sql) or die("employee-grid-data.php: get employees");
$totalData = mysqli_num_rows($query);
$totalFiltered = $totalData;  // when there is no search parameter then total number rows = total number filtered rows.


$sql = "SELECT *";
$sql .= " FROM ticket_book join ticket_category on ticket_category.ticket_category_id  = ticket_book.ticket_category_id
join employee on employee.employee_id = ticket_book.employee_id
join ticket_status on ticket_status.ticket_status_id  = ticket_book.ticket_status_id where 1=1";
if (!empty($requestData['search']['value'])) {   // if there is a search parameter, $requestData['search']['value'] contains search parameter
    $sql .= " AND (ticket_book.ticket_book_code LIKE '" . $requestData['search']['value'] . "%' ";
    $sql .= " OR ticket_category.ticket_category_name LIKE '" . $requestData['search']['value'] . "%' ";
    $sql .= " OR employee.username LIKE '" . $requestData['search']['value'] . "%' ";
    $sql .= " OR ticket_book.time_buy_ticket LIKE '" . $requestData['search']['value'] . "%' ";
    $sql .= " OR ticket_book.deadline_book LIKE '" . $requestData['search']['value'] . "%' ";
    $sql .= " OR ticket_book.travel_date LIKE '" . $requestData['search']['value'] . "%' ";
    $sql .= " OR ticket_status.ticket_status_name LIKE '" . $requestData['search']['value'] . "%' ";
    $sql .= " OR ticket_book.slip_img LIKE '" . $requestData['search']['value'] . "%' ";
    $sql .= " OR ticket_book.time_up_slip LIKE '" . $requestData['search']['value'] . "%' )";
}
$query = mysqli_query($conn, $sql) or die("employee-grid-data.php: get employees");
$totalFiltered = mysqli_num_rows($query); // when there is a search parameter then we have to modify total number filtered rows as per search result. 
$sql .= " ORDER BY " . $columns[$requestData['order'][0]['column']] . "   " . $requestData['order'][0]['dir'] . "  LIMIT " . $requestData['start'] . " ," . $requestData['length'] . "   ";
/* $requestData['order'][0]['column'] contains colmun index, $requestData['order'][0]['dir'] contains order such as asc/desc  */
$query = mysqli_query($conn, $sql) or die("employee-grid-data.php: get employees");

$data = array();
while ($row = mysqli_fetch_array($query)) {  // preparing an array
    $nestedData = array();
    $nestedData[] = "<button class='btn btn-link' onclick='getShowModalEditTicketCode(" . '"' . $row['ticket_book_code'] . '"' . ")'>" . $row["ticket_book_code"] . "</button>";
    $nestedData[] = "<button class='btn btn-link' onclick='getModalEditTicketType(" . '"' . $row['ticket_category_name'] . '"' . "," . '"' . $row['ticket_book_code'] . '"' . ")'>" . $row["ticket_category_name"] . "</button>";
    $nestedData[] = "<button class='btn btn-link' onclick='getShowModalEditEmployee(" . '"' . $row['emp_first_name'] . '"' . "," . '"' . $row['ticket_book_code'] . '"' . ")'>" . $row["username"] . "</button>";

    // $time_buy_ticket = date_create($row["time_buy_ticket"]);
    $nestedData[] = $row["time_buy_ticket"];

    // $deadline_book = date_create($row["deadline_book"]);
    $nestedData[] =$row["deadline_book"];

    // $travel_date = date_create($row["travel_date"]);
    $nestedData[] = $row["travel_date"];

    $nestedData[] = "<button class='btn btn-link' onclick='getShowModalTicketStatus(" . '"' . $row['ticket_status_name'] . '"' . "," . '"' . $row['ticket_book_code'] . '"' . ")'>" . $row["ticket_status_name"] . "</button>";

    $nestedData[] = $row["slip_img"];

    $nestedData[] = $row["time_up_slip"];

    $nestedData[] = "<button class='btn btn-info' onclick='getShowModalEditListCustomerFromTicket(" . '"' . $row['ticket_book_code'] . '"' . ")'>เปิด</button>";
    $nestedData[] = "<button class='btn btn-danger' onclick='setDeleteTicket(" . '"' . $row['ticket_book_code'] . '"' . ")'>ลบ</button>";

    $data[] = $nestedData;
}



$json_data = array(
    "draw"            => intval($requestData['draw']),   // for every request/draw by clientside , they send a number as a parameter, when they recieve a response/data they first check the draw number, so we are sending same number in draw. 
    "recordsTotal"    => intval($totalData),  // total number of records
    "recordsFiltered" => intval($totalFiltered), // total number of records after searching, if there is no searching then totalFiltered = totalData
    "data"            => $data   // total data array
);

echo json_encode($json_data);  // send data as json format





// $database = new database(IP, DBNAME, USER, PASS);
// $data = $database->select('SELECT * from ticket_book
//     join ticket_category on ticket_category.ticket_category_id  = ticket_book.ticket_category_id
//     join employee on employee.employee_id = ticket_book.employee_id
//     join ticket_status on ticket_status.ticket_status_id  = ticket_book.ticket_status_id
// ');
// if ($data == true) {
//     echo json_encode($data);
// }
// $pdo = null; //close connection 

