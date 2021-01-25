<?php
session_start();

if((!$_SESSION["username"])){
    Header("Location:index.php");
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <link href="css/styles.css" rel="stylesheet" />
    <!-- use -->
    <script src="controller/fnTicketPrice.js"></script>
    <script src="controller/fnDayOff.js"></script>
    <script src="controller/fnBoat.js"></script>
    <script src="controller/function.js"></script>
    <script src="controller/fnBoatSeat.js"></script>
    <script src="controller/fnEmployee.js"></script>
    <script src="controller/fnLocation.js"></script>
    <script src="controller/clickEvent.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/js/all.min.js" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous"></script>

    <link rel="stylesheet" href="http://cdn.datatables.net/1.10.22/css/jquery.dataTables.min.css">
    <script type="text/javascript" src="http://cdn.datatables.net/1.10.22/js/jquery.dataTables.min.js"></script>