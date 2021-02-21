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
    0 => 'cust_first_name',
    1 => 'cust_last_name',
    2 => 'phone_number',
    3 => 'gender',
    4 => 'register_time',
    5 => 'count',
);

// getting total number records without any search
$sql = "SELECT *";
$sql .= " FROM customer";
$query = mysqli_query($conn, $sql) or die("employee-grid-data.php: get employees");
$totalData = mysqli_num_rows($query);
$totalFiltered = $totalData;  // when there is no search parameter then total number rows = total number filtered rows.


$sql = "SELECT *";
$sql .= " FROM customer where 1=1";
if (!empty($requestData['search']['value'])) {   // if there is a search parameter, $requestData['search']['value'] contains search parameter
    $sql .= " AND (cust_first_name LIKE '" . $requestData['search']['value'] . "%' ";
    $sql .= " OR cust_last_name LIKE '" . $requestData['search']['value'] . "%' ";
    $sql .= " OR phone_number LIKE '" . $requestData['search']['value'] . "%' ";
    $sql .= " OR gender LIKE '" . $requestData['search']['value'] . "%' ";
    $sql .= " OR register_time LIKE '" . $requestData['search']['value'] . "%' ";
    $sql .= " OR count LIKE '" . $requestData['search']['value'] . "%' )";
}
$query = mysqli_query($conn, $sql) or die("employee-grid-data.php: get employees");
$totalFiltered = mysqli_num_rows($query); // when there is a search parameter then we have to modify total number filtered rows as per search result. 
$sql .= " ORDER BY " . $columns[$requestData['order'][0]['column']] . "   " . $requestData['order'][0]['dir'] . "  LIMIT " . $requestData['start'] . " ," . $requestData['length'] . "   ";
/* $requestData['order'][0]['column'] contains colmun index, $requestData['order'][0]['dir'] contains order such as asc/desc  */
$query = mysqli_query($conn, $sql) or die("employee-grid-data.php: get employees");

$data = array();
while ($row = mysqli_fetch_array($query)) {  // preparing an array
    $nestedData = array();
    
    $nestedData[] = $row['cust_first_name'] ." ".$row['cust_last_name'];
    $nestedData[] = $row['phone_number'];
    $nestedData[] = $row['gender'];
    $nestedData[] = $row['register_time'];
    $nestedData[] = $row['count'];
    $nestedData[] = "<button class='btn btn-warning' onclick='getShowModalCustomer(" . '"' . $row['customer_id'] . '"' . ")'>แก้ไข</button> 
    <button class='btn btn-danger' onclick='setDeleteCustomer(" . '"' . $row['customer_id'] . '"' . "," . '"' . $row['cust_first_name'] . '"' . "," . '"' . $row['cust_last_name'] . '"' . ")'>ลบ</button>";

    $data[] = $nestedData;
}



$json_data = array(
    "draw"            => intval($requestData['draw']),   // for every request/draw by clientside , they send a number as a parameter, when they recieve a response/data they first check the draw number, so we are sending same number in draw. 
    "recordsTotal"    => intval($totalData),  // total number of records
    "recordsFiltered" => intval($totalFiltered), // total number of records after searching, if there is no searching then totalFiltered = totalData
    "data"            => $data   // total data array
);

echo json_encode($json_data);  // send data as json format