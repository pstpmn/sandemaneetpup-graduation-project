<?php

    date_default_timezone_set("Asia/Bangkok");
    include('mysqli_connect.php');

    $date = date('Y-m-d H:i:s');
    $ticket_code = $_POST['ticket_code'];
    $phone = $_POST['phone'];
    
    $sql = "SELECT * FROM buy_ticket
    WHERE  ticket_code = '$ticket_code' ";
    $result = mysqli_query($con,$sql) or die ("Error in query: $sql " . mysqli_error());
    $data = mysqli_fetch_all($result,MYSQLI_ASSOC);

    $sql1 = "SELECT * FROM buy_ticket as bt
    INNER JOIN customer as c ON bt.customer_id = c.customer_id 
    WHERE  ticket_code = '$ticket_code' AND phone_number = '$phone' ";
    $result1 = mysqli_query($con,$sql1) or die ("Error in query: $sql1 " . mysqli_error());
    $data1 = mysqli_fetch_all($result1,MYSQLI_ASSOC);
?>


<!-- 
    if (isset($_POST["check_in_group"])) {
        if(count($data) >= 1){
            if(count($data) >= 2){
                if($data[0]['ticket_status_id'] == 1){
                    if($data[0]["check_in"] == null){
                        $sql2 = "UPDATE buy_ticket SET 
                        check_in = '$date'
                        WHERE ticket_code = '$ticket_code'  AND ticket_status_id = '1' ";
                        $result2 = mysqli_query($con,$sql2) or die ("Error in query: $sql2 " . mysqli_error());
                        
                        echo "<script type='text/javascript'>";
                        echo "window.location = 'check_in_out.php'; ";
                        echo "alert('รหัส $ticket_code Check In เรียบร้อย ');";
                        echo "</script>";    
                    }
                    else{
                        echo "<script type='text/javascript'>";
                        echo "window.location = 'check_in_out.php'; ";
                        echo "alert('รหัส $ticket_code มีการ Check In แล้ว');";
                        echo "</script>";
                    }
                }
                else{
                    echo "<script type='text/javascript'>";
                    echo "window.location = 'status.php'; ";
                    echo "alert(".$data[0]['ticket_status_id']."สถานะของคุณยังไม่ผ่านการตรวจ โปรดตรวจสอบสถานะด้วย !!!');";
                    echo "</script>";
                }
            }
            else{
                echo "<script type='text/javascript'>";
                echo "window.location = 'check_in_out_individual.php'; ";
                echo "alert('$ticket_code รหัสนี้มีจำนวนที่นั่ง แค่ 1 ที่นั่ง ควร Check In แบบ 1 ที่นั่ง');";
                echo "</script>";
            }       
        }
        else{
            echo "<script type='text/javascript'>";
            echo "window.location = 'check_in_out.php'; ";
            echo "alert('$ticket_code รหัสไม่ถูกต้อง !!!');";
            echo "</script>";
        }
        mysqli_close($con);
    }

    // if (isset($_POST["check_out_group"])){
        // if(count($data) >= 1){
        //     if(count($data) >= 2 ){
        //         if($data[0]['ticket_status_id'] == 1){
        //             if($data[0]["check_out"] == null){
        //                 $sql2 = "UPDATE buy_ticket SET 
        //                 check_out = '$date'
        //                 WHERE ticket_code = '$ticket_code'  AND ticket_status_id = '1' ";
        //                 $result2 = mysqli_query($con,$sql2) or die ("Error in query: $sql2 " . mysqli_error());
                        
        //                 echo "<script type='text/javascript'>";
        //                 echo "window.location = 'check_in_out.php'; ";
        //                 echo "alert('รหัส $ticket_code Check Out เรียบร้อย ');";
        //                 echo "</script>";
        //             }
        //             else{
        //                 echo "<script type='text/javascript'>";
        //                 echo "window.location = 'check_in_out.php'; ";
        //                 echo "alert('รหัส $ticket_code มีการ Check Out แล้ว');";
        //                 echo "</script>";
        //             }
        //         }
        //         else{
        //             echo "<script type='text/javascript'>";
        //             echo "window.location = 'status.php'; ";
        //             echo "alert(".$data[0]['ticket_status_id']."สถานะของคุณยังไม่ผ่านการตรวจ โปรดตรวจสอบสถานะด้วย !!!');";
        //             echo "</script>";
        //         }
        //     }
        //     else{
        //         echo "<script type='text/javascript'>";
        //         echo "window.location = 'check_in_out_individual.php'; ";
        //         echo "alert('$ticket_code รหัสนี้มีจำนวนที่นั่ง แค่ 1 ที่นั่ง ควร Check In แบบ 1 ที่นั่ง');";
        //         echo "</script>";
        //     }
        // }
        // else{
        //     echo "<script type='text/javascript'>";
        //     echo "window.location = 'check_in_out.php'; ";
        //     echo "alert('$ticket_code รหัสไม่ถูกต้อง !!!');";
        //     echo "</script>";
        // }
    }


<!-- check_in -->
<?php 
    if (isset($_POST["check_in"])){
        if(count($data1) >= 1){
            if($data1[0]['ticket_status_id'] == 1){
                if($data1[0]["check_in"] == null){
                    $sql3 = "UPDATE buy_ticket as bt
                    INNER JOIN customer as c ON bt.customer_id = c.customer_id
                    SET check_in = '$date'
                    WHERE ticket_code = '$ticket_code'  AND ticket_status_id = '1' AND  phone_number = '$phone' ";
                    $result3 = mysqli_query($con,$sql3) or die ("Error in query: $sql3 " . mysqli_error());
                    
                    echo "<script type='text/javascript'>";
                    echo "window.location = 'check_in_out.php'; ";
                    echo "alert('รหัส $ticket_code Check In เรียบร้อย ');";
                    echo "</script>"; 
                }
                else{
                    echo "<script type='text/javascript'>";
                    echo "window.location = 'check_in_out.php'; ";
                    echo "alert('รหัส $ticket_code มีการ Check In แล้ว');";
                    echo "</script>";
                    }
            }
            else{
                echo "<script type='text/javascript'>";
                echo "window.location = 'status.php'; ";
                echo "alert(".$data[0]['ticket_status_id']."สถานะของคุณยังไม่ผ่านการตรวจ โปรดตรวจสอบสถานะด้วย !!!');";
                echo "</script>";
                }
        }
        else{
            echo "<script type='text/javascript'>";
            echo "window.location = 'check_in_out.php'; ";
            echo "alert('รหัส หรือ เบอร์โทรศัพท์ไม่ถูกต้อง !!!');";
            echo "</script>";
        }
    }
?> -->

<!-- check_out -->
<?php 
    if (isset($_POST["check_out"])){
        if(count($data1) >= 1){
            if($data1[0]['ticket_status_id'] == 1){
                if($data1[0]["check_out"] == null){
                    $sql3 = "UPDATE buy_ticket as bt
                    INNER JOIN customer as c ON bt.customer_id = c.customer_id
                    SET check_out = '$date'
                    WHERE ticket_code = '$ticket_code'  AND ticket_status_id = '1' AND  phone_number = '$phone' ";
                    $result3 = mysqli_query($con,$sql3) or die ("Error in query: $sql3 " . mysqli_error());
                    
                    echo "<script type='text/javascript'>";
                    echo "window.location = 'check_in_out.php'; ";
                    echo "alert('รหัส $ticket_code Check Out เรียบร้อย ');";
                    echo "</script>"; 
                }
                else{
                    echo "<script type='text/javascript'>";
                    echo "window.location = 'check_in_out.php'; ";
                    echo "alert('รหัส $ticket_code มีการ Check Out แล้ว');";
                    echo "</script>";
                    }
            }
            else{
                echo "<script type='text/javascript'>";
                echo "window.location = 'status.php'; ";
                echo "alert(".$data[0]['ticket_status_id']."สถานะของคุณยังไม่ผ่านการตรวจ โปรดตรวจสอบสถานะด้วย !!!');";
                echo "</script>";
                }
        }
        else{
            echo "<script type='text/javascript'>";
            echo "window.location = 'check_in_out.php'; ";
            echo "alert('รหัส หรือ เบอร์โทรศัพท์ไม่ถูกต้อง !!!');";
            echo "</script>";
        }
    }
?>
<!-- check_in - check_out-->