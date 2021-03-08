<?php
require '../../../controller/database.php';
require '../../confix.php';

$conn = mysqli_connect(IP, USER, PASS, DBNAME) or die("Connection failed: " . mysqli_connect_error());
mysqli_query($conn, "SET NAMES 'utf8' ");

// storing  request (ie, get/post) global array to a variable  
$requestData = $_REQUEST;
$statementSQL;

if ($requestData['btnType'] == 'year') {
    $statementSQL = "SELECT buy_ticket.ticket_code , customer.cust_first_name ,  customer.cust_last_name , customer.phone_number
    from buy_ticket 
    JOIN ticket_book on ticket_book.ticket_book_id = buy_ticket.ticket_book_id
    JOIN customer on customer.customer_id = buy_ticket.customer_id
    where year(ticket_book.time_buy_ticket) =  " . $requestData['date'] . "";
} else if ($requestData['btnType'] == 'month') {
    $statementSQL = "SELECT buy_ticket.ticket_code , customer.cust_first_name ,  customer.cust_last_name , customer.phone_number
    from buy_ticket 
    JOIN ticket_book on ticket_book.ticket_book_id = buy_ticket.ticket_book_id
    JOIN customer on customer.customer_id = buy_ticket.customer_id
    where ticket_book.time_buy_ticket like '" . $requestData['fullDate'] . "%' AND MONTH(ticket_book.time_buy_ticket) = " . $requestData['date'] . " ";
} else if ($requestData['btnType'] == 'week') {
    if ($requestData['date'] == 1) {
        $statementSQL = "SELECT buy_ticket.ticket_code , customer.cust_first_name ,  customer.cust_last_name , customer.phone_number
        from buy_ticket 
        JOIN ticket_book on ticket_book.ticket_book_id = buy_ticket.ticket_book_id
        JOIN customer on customer.customer_id = buy_ticket.customer_id
        where ticket_book.time_buy_ticket like '" . $requestData['fullDate'] . "%'
        AND (DAY(ticket_book.time_buy_ticket) >= 1 AND DAY(ticket_book.time_buy_ticket) <= 7)";
    } else if ($requestData['date'] == 2) {
        $statementSQL = "SELECT buy_ticket.ticket_code , customer.cust_first_name ,  customer.cust_last_name , customer.phone_number
        from buy_ticket 
        JOIN ticket_book on ticket_book.ticket_book_id = buy_ticket.ticket_book_id
        JOIN customer on customer.customer_id = buy_ticket.customer_id
        where ticket_book.time_buy_ticket like '" . $requestData['fullDate'] . "%'
        AND (DAY(ticket_book.time_buy_ticket) >= 8 AND DAY(ticket_book.time_buy_ticket) <= 14)";
    } else if ($requestData['date'] == 3) {
        $statementSQL = "SELECT buy_ticket.ticket_code , customer.cust_first_name ,  customer.cust_last_name , customer.phone_number
        from buy_ticket 
        JOIN ticket_book on ticket_book.ticket_book_id = buy_ticket.ticket_book_id
        JOIN customer on customer.customer_id = buy_ticket.customer_id
        where ticket_book.time_buy_ticket like '" . $requestData['fullDate'] . "%'
        AND (DAY(ticket_book.time_buy_ticket) >= 15 AND DAY(ticket_book.time_buy_ticket) <= 21)";
    } else if ($requestData['date'] == 4) {
        $statementSQL = "SELECT buy_ticket.ticket_code , customer.cust_first_name ,  customer.cust_last_name , customer.phone_number
        from buy_ticket 
        JOIN ticket_book on ticket_book.ticket_book_id = buy_ticket.ticket_book_id
        JOIN customer on customer.customer_id = buy_ticket.customer_id
        where ticket_book.time_buy_ticket like '" . $requestData['fullDate'] . "%'
        AND (DAY(ticket_book.time_buy_ticket) >= 22 AND DAY(ticket_book.time_buy_ticket) <= 28)";
    } else if ($requestData['date'] == 5) {
        $statementSQL = "SELECT buy_ticket.ticket_code , customer.cust_first_name ,  customer.cust_last_name , customer.phone_number
        from buy_ticket 
        JOIN ticket_book on ticket_book.ticket_book_id = buy_ticket.ticket_book_id
        JOIN customer on customer.customer_id = buy_ticket.customer_id
        where ticket_book.time_buy_ticket like '" . $requestData['fullDate'] . "%'
        AND (DAY(ticket_book.time_buy_ticket) >= 29 AND DAY(ticket_book.time_buy_ticket) <= 31)";
    }
} else if ($requestData['btnType'] == 'day') {
    $statementSQL = "SELECT buy_ticket.ticket_code , customer.cust_first_name ,  customer.cust_last_name , customer.phone_number
    from buy_ticket 
    JOIN ticket_book on ticket_book.ticket_book_id = buy_ticket.ticket_book_id
    JOIN customer on customer.customer_id = buy_ticket.customer_id
    where ticket_book.time_buy_ticket like '" . $requestData['fullDate'] . "%'
    AND (DAY(ticket_book.time_buy_ticket) = " . $requestData['date'] . ")";
}


//ฟิลด์ที่จะเอามาแสดงและค้นหา
$columns = array(
    // datatable column index  => database column name
    0 => 'ticket_code',
    1 => 'cust_first_name',
    2 => 'phone_number',
);

// getting total number records without any search
$sql = "" . $statementSQL . "";
$query = mysqli_query($conn, $sql) or die("employee-grid-data.php: get employees");
$totalData = mysqli_num_rows($query);
$totalFiltered = $totalData;  // when there is no search parameter then total number rows = total number filtered rows.


$sql = "" . $statementSQL . "";
if (!empty($requestData['search']['value'])) {   // if there is a search parameter, $requestData['search']['value'] contains search parameter
    $sql .= " AND (ticket_code LIKE '" . $requestData['search']['value'] . "%' ";
    $sql .= " OR customer.cust_first_name LIKE '" . $requestData['search']['value'] . "%' ";
    $sql .= " OR customer.phone_number LIKE '" . $requestData['search']['value'] . "%' )";
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
    $nestedData[] = $row["phone_number"];
    $data[] = $nestedData;
}

$json_data = array(
    "draw"            => intval($requestData['draw']),   // for every request/draw by clientside , they send a number as a parameter, when they recieve a response/data they first check the draw number, so we are sending same number in draw. 
    "recordsTotal"    => intval($totalData),  // total number of records
    "recordsFiltered" => intval($totalFiltered), // total number of records after searching, if there is no searching then totalFiltered = totalData
    "data"            => $data   // total data array
);

echo json_encode($json_data);  // send data as json format
