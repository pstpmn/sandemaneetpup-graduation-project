<?php
session_start();
  if(isset($_POST['id']) && ($_POST['phone'])){

    include('mysqli_connect.php');
    
    $id = $_POST['id'];
    $phone = $_POST['phone'];

    $sql = "SELECT * FROM ticket_book AS t_b
    JOIN buy_ticket as bt ON t_b.ticket_book_id = bt.ticket_book_id
    JOIN customer as c ON bt.customer_id = c.customer_id
    JOIN location AS i ON t_b.destination = i.location_id
    WHERE ticket_book_code = '$id' && phone_number = '$phone' || ticket_code = '$id' && phone_number = '$phone'";
    $result = mysqli_query($con,$sql);

    if(mysqli_num_rows($result)){
        $row = mysqli_fetch_array($result);
          $_SESSION["ticket_book_code"] = $row["ticket_book_code"];
          $_SESSION["ticket_code"] = $row["ticket_code"];
          $_SESSION["phone_number"] = $row["phone_number"];
          $_SESSION["ticket_status_id"] = $row["ticket_status_id"];                    
          $_SESSION["destinatio"] = $row["location_name"];
              
            if($_SESSION["ticket_book_code"]== $id && $_SESSION["phone_number"] = $phone && $_SESSION["ticket_status_id"]== 1){
              echo "<script>";
              echo "window.location = 'booking_id_information_success.php'; ";
              echo "</script>";
              }

            if($_SESSION["ticket_book_code"]== $id && $_SESSION["phone_number"] = $phone && $_SESSION["ticket_status_id"]== 2){
              echo "<script>";
              echo "window.location = 'booking_id_information_book.php'; ";
              echo "</script>";
              }

            if($_SESSION["ticket_book_code"]== $id && $_SESSION["phone_number"] = $phone && $_SESSION["ticket_status_id"]== 3) {
              echo "<script>";
              echo "window.location = 'booking_id_information_cancel.php'; ";
              echo "</script>";
              }

            if($_SESSION["ticket_book_code"]== $id && $_SESSION["phone_number"] = $phone && $_SESSION["ticket_status_id"]== 4){
              echo "<script>";
              echo "window.location = 'booking_id_information_pending.php'; ";
              echo "</script>";
              }

            if($_SESSION["ticket_code"]== $id && $_SESSION["phone_number"] = $phone && $_SESSION["ticket_status_id"]== 1){
              echo "<script>";
              echo "window.location = 'ticket_id_information_success.php'; ";
              echo "</script>";
              }

            if($_SESSION["ticket_code"]== $id && $_SESSION["phone_number"] = $phone && $_SESSION["ticket_status_id"]== 2){
              echo "<script>";
              echo "window.location = 'ticket_id_information_book.php'; ";
              echo "</script>";
              }

            if($_SESSION["ticket_code"]== $id && $_SESSION["phone_number"] = $phone && $_SESSION["ticket_status_id"]== 3){
              echo "<script>";
              echo "window.location = 'booking_id_information_cancel.php'; ";
              echo "</script>";
              }
            
            if($_SESSION["ticket_code"]== $id && $_SESSION["phone_number"] = $phone && $_SESSION["ticket_status_id"]== 4){
              echo "<script>";
              echo "window.location = 'ticket_id_information_pending.php'; ";
              echo "</script>";
              }
      }
      else{
        echo "<script>";
        echo 'alert(\' รหัสการจอง หรือ รหัสตั๋ว ไม่ถูกต้อง\');';
        echo "window.location = 'status.php'; ";
        echo "</script>";
      }
  }
?>