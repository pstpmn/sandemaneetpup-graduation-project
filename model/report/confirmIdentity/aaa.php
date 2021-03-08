<?php
require '../../../controller/database.php';
require '../../confix.php';

$conn = mysqli_connect(IP, USER, PASS, DBNAME) or die("Connection failed: " . mysqli_connect_error());
mysqli_query($conn, "SET NAMES 'utf8' ");

// storing  request (ie, get/post) global array to a variable  
$requestData = $_REQUEST;
$statementSQL;

if ($requestData['btnType'] == 'year') {
    $statementSQL = 'year(time_buy_ticket) = ' . $requestData["date"] . '';
} else if ($requestData['btnType'] == 'month') {
    $statementSQL = "(time_buy_ticket LIKE '" . $requestData['fullDate'] . "%') and (MONTH(time_buy_ticket) = '" . $requestData['date'] . "' )";
} else if ($requestData['btnType'] == 'week') {
    if($requestData['date'] == 1){
        $statementSQL = "(time_buy_ticket LIKE '" . $requestData['fullDate'] . "%') and (DAY(time_buy_ticket) >= 1) AND (DAY(time_buy_ticket) <= 7)";
    }
    else if($requestData['date'] == 2){
        $statementSQL = "(time_buy_ticket LIKE '" . $requestData['fullDate'] . "%') and (DAY(time_buy_ticket) >= 8) AND (DAY(time_buy_ticket) <= 14)";
    }
    else if($requestData['date'] == 3){
        $statementSQL = "(time_buy_ticket LIKE '" . $requestData['fullDate'] . "%') and (DAY(time_buy_ticket) >= 15) AND (DAY(time_buy_ticket) <= 21)";
    }
    else if($requestData['date'] == 4){
        $statementSQL = "(time_buy_ticket LIKE '" . $requestData['fullDate'] . "%') and (DAY(time_buy_ticket) >= 22) AND (DAY(time_buy_ticket) <= 28)";
    }
    else if($requestData['date'] == 5){
        $statementSQL = "(time_buy_ticket LIKE '" . $requestData['fullDate'] . "%') and (DAY(time_buy_ticket)) >= 29 AND (DAY(time_buy_ticket) <= 31)";
    }
} else if ($requestData['btnType'] == 'day') {
    $statementSQL = "(time_buy_ticket LIKE '" . $requestData['fullDate'] . "%') and (DAY(time_buy_ticket) = '" . $requestData['date'] . "')";

}




//ฟิลด์ที่จะเอามาแสดงและค้นหา
$columns = array(
    // datatable column index  => database column name
    0 => 'ticket_code',
    1 => 'cust_first_name',
);

// getting total number records without any search
$sql = "SELECT *";
$sql .= "FROM buy_ticket
join ticket_book on ticket_book.ticket_book_id = buy_ticket.ticket_book_id
join ticket_category on ticket_book.ticket_category_id = ticket_category.ticket_category_id
join customer on buy_ticket.customer_id = customer.customer_id
where " . $statementSQL . " and (buy_ticket.check_in is not null OR buy_ticket.check_out is not null)
";

$query = mysqli_query($conn, $sql) or die("employee-grid-data.php: get employees");
$totalData = mysqli_num_rows($query);
$totalFiltered = $totalData;  // when there is no search parameter then total number rows = total number filtered rows.


$sql = "SELECT *";
$sql .= "FROM buy_ticket
join ticket_book on ticket_book.ticket_book_id = buy_ticket.ticket_book_id
join ticket_category on ticket_book.ticket_category_id = ticket_category.ticket_category_id
join customer on buy_ticket.customer_id = customer.customer_id
where " . $statementSQL . " and (buy_ticket.check_in is not null OR buy_ticket.check_out is not null)
";
if (!empty($requestData['search']['value'])) {   // if there is a search parameter, $requestData['search']['value'] contains search parameter
    $sql .= " AND (buy_ticket.ticket_code LIKE '" . $requestData['search']['value'] . "%' ";
    $sql .= " OR customer.cust_first_name LIKE '" . $requestData['search']['value'] . "%' )";
}
$query = mysqli_query($conn, $sql) or die("employee-grid-data.php: get employees");
$totalFiltered = mysqli_num_rows($query); // when there is a search parameter then we have to modify total number filtered rows as per search result. 
$sql .= " ORDER BY " . $columns[$requestData['order'][0]['column']] . "   " . $requestData['order'][0]['dir'] . "  LIMIT " . $requestData['start'] . " ," . $requestData['length'] . "   ";
/* $requestData['order'][0]['column'] contains colmun index, $requestData['order'][0]['dir'] contains order such as asc/desc  */
$query = mysqli_query($conn, $sql) or die("employee-grid-data.php: get employees");

$data = array();
while ($row = mysqli_fetch_array($query)) {  // preparing an array
    $nestedData = array();

    // $time_buy_ticket = date_create($row["time_buy_ticket"]);
    $nestedData[] = $row["ticket_code"];
    $nestedData[] = $row["cust_first_name"] . " " . $row["cust_last_name"];
    $nestedData[] = "คนที่มาขึ้นเรือ";
    $data[] = $nestedData;
}

$sql1 = "SELECT *";
$sql1 .= "FROM buy_ticket
join ticket_book on ticket_book.ticket_book_id = buy_ticket.ticket_book_id
join ticket_category on ticket_book.ticket_category_id = ticket_category.ticket_category_id
join customer on buy_ticket.customer_id = customer.customer_id
where " . $statementSQL . " and (buy_ticket.check_in is null AND buy_ticket.check_out is null)
";

$query = mysqli_query($conn, $sql1) or die("employee-grid-data.php: get employees");
$totalData = mysqli_num_rows($query);
$totalFiltered = $totalData;  // when there is no search parameter then total number rows = total number filtered rows.


$sql = "SELECT *";
$sql .= "FROM buy_ticket
join ticket_book on ticket_book.ticket_book_id = buy_ticket.ticket_book_id
join ticket_category on ticket_book.ticket_category_id = ticket_category.ticket_category_id
join customer on buy_ticket.customer_id = customer.customer_id
where " . $statementSQL . " and (buy_ticket.check_in is null AND buy_ticket.check_out is null)
";
if (!empty($requestData['search']['value'])) {   // if there is a search parameter, $requestData['search']['value'] contains search parameter
    $sql .= " AND (buy_ticket.ticket_code LIKE '" . $requestData['search']['value'] . "%' ";
    $sql .= " OR customer.cust_first_name LIKE '" . $requestData['search']['value'] . "%' )";
}
$query = mysqli_query($conn, $sql) or die("employee-grid-data.php: get employees");
$totalFiltered = mysqli_num_rows($query); // when there is a search parameter then we have to modify total number filtered rows as per search result. 
$sql .= " ORDER BY " . $columns[$requestData['order'][0]['column']] . "   " . $requestData['order'][0]['dir'] . "  LIMIT " . $requestData['start'] . " ," . $requestData['length'] . "   ";
/* $requestData['order'][0]['column'] contains colmun index, $requestData['order'][0]['dir'] contains order such as asc/desc  */
$query = mysqli_query($conn, $sql) or die("employee-grid-data.php: get employees");

while ($row = mysqli_fetch_array($query)) {  // preparing an array
    $nestedData = array();

    // $time_buy_ticket = date_create($row["time_buy_ticket"]);
    $nestedData[] = $row["ticket_code"];
    $nestedData[] = $row["cust_first_name"] . " " . $row["cust_last_name"];
    $nestedData[] = "ไม่มาขึ้นเรือ";
    $data[] = $nestedData;
}
//ฟิลด์ที่จะเอามาแสดงและค้นหา
$json_data = array(
    "draw"            => intval($requestData['draw']),   // for every request/draw by clientside , they send a number as a parameter, when they recieve a response/data they first check the draw number, so we are sending same number in draw. 
    "recordsTotal"    => intval($totalData),  // total number of records
    "recordsFiltered" => intval($totalFiltered), // total number of records after searching, if there is no searching then totalFiltered = totalData
    "data"            => $data   // total data array
);

echo json_encode($json_data);  // send data as json format


// getting total number records without any search