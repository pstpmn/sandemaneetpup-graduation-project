<?php

    include('mysqli_connect.php');
    date_default_timezone_set("Asia/Bangkok");
    $date = date('d/m/Y');
    $Date_time = date('Y-m-d H:i:s');

    $id = $_POST["id"];
    $phone = $_POST["phone"];

    $sql = "SELECT * FROM buy_ticket
    JOIN ticket_book ON buy_ticket.ticket_book_id = ticket_book.ticket_book_id
    JOIN customer ON customer.customer_id = buy_ticket.customer_id
    WHERE ticket_code = '$id' && phone_number = '$phone'";
    $result = mysqli_query($con,$sql);

?>

<?php
// Check In //

    if(mysqli_num_rows($result)){
        $row = mysqli_fetch_array($result);
        $travel_date = date('d/m/Y' , strtotime($row['travel_date']));
            
        if(isset($_POST["check_in"])){
            if(count($row) >= 1){
                if($row["ticket_status_id"] == 1){
                    if($date >= $travel_date){
                        if($row['check_in'] == null){
                            $sql_check_in = "UPDATE buy_ticket
                            INNER JOIN customer ON buy_ticket.customer_id = customer.customer_id
                            SET check_in = '$Date_time'
                            WHERE ticket_code = '$id' AND phone_number = '$phone' ";
                            $check_in = mysqli_query($con,$sql_check_in) or die ("Error in query: $sql_check_in" . mysqli_error());

                            echo "<script type='text/javascript'>";
                            echo "window.location = 'index.php'; ";
                            echo "alert('รหัสตั๋ว $id Check In เรียบร้อย ');";
                            echo "</script>";
                        }else{
                            echo "<script type='text/javascript'>";
                            echo "window.location = 'check_in_out.php'; ";
                            echo "alert('รหัส $id ได้มีการ Check In แล้ว');";
                            echo "</script>";
                        }
                    }else{
                        echo "<script type='text/javascript'>";
                        echo "window.location = 'status.php'; ";
                        echo "alert('รหัสตั๋ว $id ยังไม่ถึงวันเดินทาง ไม่สามารถ Check In ได้ !!!');";
                        echo "</script>";
                    }
                }else{
                    echo "<script type='text/javascript'>";
                    echo "window.location = 'status.php'; ";
                    echo "alert('รหัสตั๋ว $id สถานะของคุณยังไม่ผ่านการตรวจ โปรดตรวจสอบสถานะด้วย !!!');";
                    echo "</script>";
                 }
            }else{
                echo "<script type='text/javascript'>";
                echo "window.location = 'status.php'; ";
                echo "alert('รหัสตั๋ว $id หรือ เบอร์โทรศัพท์ $phone ไม่ถูกต้อง !!!!');";
                echo "</script>";
            }
        }

// Check Out //
        if(isset($_POST["check_out"])){
            if(count($row) >= 1){
                if($row["ticket_status_id"] == 1){
                    if($date >= $travel_date){
                        if($row['check_out'] == null){
                            $sql_check_out = "UPDATE buy_ticket
                            INNER JOIN customer ON buy_ticket.customer_id = customer.customer_id
                            SET check_out = '$Date_time'
                            WHERE ticket_code = '$id' AND phone_number = '$phone' ";
                            $check_out = mysqli_query($con,$sql_check_out) or die ("Error in query: $sql_check_out" . mysqli_error());

                            echo "<script type='text/javascript'>";
                            echo "window.location = 'index.php'; ";
                            echo "alert('รหัสตั๋ว $id Check Out เรียบร้อย ');";
                            echo "</script>";
                        }else{
                            echo "<script type='text/javascript'>";
                            echo "window.location = 'check_in_out.php'; ";
                            echo "alert('รหัส $id ได้มีการ Check Out แล้ว');";
                            echo "</script>";
                        }
                    }else{
                        echo "<script type='text/javascript'>";
                        echo "window.location = 'status.php'; ";
                        echo "alert('รหัสตั๋ว $id ยังไม่ถึงวันเดินทาง ไม่สามารถ Check Out ได้ !!!');";
                        echo "</script>";
                    }
                }else{
                    echo "<script type='text/javascript'>";
                    echo "window.location = 'status.php'; ";
                    echo "alert('รหัสตั๋ว $id สถานะของคุณยังไม่ผ่านการตรวจ โปรดตรวจสอบสถานะด้วย !!!');";
                    echo "</script>";
                 }
            }else{
                echo "<script type='text/javascript'>";
                echo "window.location = 'status.php'; ";
                echo "alert('รหัสตั๋ว $id หรือ เบอร์โทรศัพท์ $phone ไม่ถูกต้อง !!!!');";
                echo "</script>";
            }
        }
    }