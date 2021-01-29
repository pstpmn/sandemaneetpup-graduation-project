<?php

    date_default_timezone_set("Asia/Bangkok");
    include('mysqli_connect.php');

    $date = date('Y-m-d H:i:s');
    $ticket_code = $_POST['ticket_code'];
    
    $sql = "SELECT * FROM buy_ticket where ticket_code = '$ticket_code'";
    $result = mysqli_query($con,$sql) or die ("Error in query: $sql " . mysqli_error());
    $data = mysqli_fetch_all($result,MYSQLI_ASSOC);
?>

<?php
    if (isset($_POST["check_in_group"])) {
        if(count($data) >= 1){
            if(count($data) >= 2){
                if($data[0]['ticket_status_id'] == 1){
                    if($data[0]["check_in"] == null){
                        $sql1 = "UPDATE buy_ticket SET 
                        check_in = '$date'
                        WHERE ticket_code = '$ticket_code'  AND ticket_status_id = '1' ";
                        $result1 = mysqli_query($con,$sql1) or die ("Error in query: $sql1 " . mysqli_error());
                        
                        echo "<script type='text/javascript'>";
                        echo "window.location = 'check_in_out.php'; ";
                        echo "alert('$ticket_code Check In เรียบร้อย ');";
                        echo "</script>";    
                    }
                    else{
                        echo "<script type='text/javascript'>";
                        echo "window.location = 'check_in_out.php'; ";
                        echo "alert('$ticket_code มีการ Check In แล้ว');";
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
                echo "alert('$ticket_code รหัสนี้มีจำนวนที่นั่ง แค่ 1 ที่นั่ง ควร Check In ที่นั่งเดียว');";
                echo "</script>";
            }       
        }
        else{
            echo "<script type='text/javascript'>";
            echo "window.location = 'check_in_out.php'; ";
            echo "alert('$ticket_code ไม่มีรหัสนี้ ');";
            echo "</script>";
        }
        mysqli_close($con);
    }
?>


<?php 
    if (isset($_POST["check_out_group"])){
        if(count($data) >= 1){
            if(count($data) >= 2 ){
                if($data[0]['ticket_status_id'] == 1){
                    if($data[0]["check_in"] != null){
                        if($data[0]["check_out"] == null){
                            $sql1 = "UPDATE buy_ticket SET 
                            check_out = '$date'
                            WHERE ticket_code = '$ticket_code'  AND ticket_status_id = '1' ";
                            $result1 = mysqli_query($con,$sql1) or die ("Error in query: $sql1 " . mysqli_error());
                            
                            echo "<script type='text/javascript'>";
                            echo "window.location = 'check_in_out.php'; ";
                            echo "alert('$ticket_code Check Out เรียบร้อย ');";
                            echo "</script>";
                        }
                        else{
                            echo "<script type='text/javascript'>";
                            echo "window.location = 'check_in_out.php'; ";
                            echo "alert('$ticket_code มีการ Check Out แล้ว');";
                            echo "</script>";
                        }
                    }
                    else{
                        echo "<script type='text/javascript'>";
                        echo "window.location = 'check_in_out.php'; ";
                        echo "alert('ยังไม่มีการ Check In กรุณา Check In ก่อน');";
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
                echo "alert('$ticket_code รหัสนี้มีจำนวนที่นั่ง แค่ 1 ที่นั่ง ควร Check In ที่นั่งเดียว');";
                echo "</script>";
            }
        }
        else{
            echo "<script type='text/javascript'>";
            echo "window.location = 'check_in_out.php'; ";
            echo "alert('$ticket_code ไม่มีรหัสนี้ ');";
            echo "</script>";
        }
    }
?>