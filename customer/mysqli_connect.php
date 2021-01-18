<?php include('model/confix.php');

    $con= mysqli_connect(IP,USER,PASS,DBNAME) or die("Error: " . mysqli_error($con));
    mysqli_query($con, "SET NAMES 'utf8' ");
    error_reporting( error_reporting() & ~E_NOTICE );
    date_default_timezone_set('Asia/Bangkok');
?>

