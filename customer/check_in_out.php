<?php 
    include('header.php');
    date_default_timezone_set("Asia/Bangkok");
    $date = date('d/m/Y');
    $Date_time = date('Y-m-d H:i:s');
?>
<style>
    button[class="btn btn-success"],
    button[class="btn btn-warning"] {
        width: 24%;
        font-family: 'Kanit', sans-serif;
        font-size: 16px;     
    }   

@media (max-width:890px) {
    button[class="btn btn-success"],
    button[class="btn btn-warning"] {
        width: 44%;
        font-size: 14px;
    }
}
</style>

    <body class="has1">

        <h3 class="has2">เช็คอิน - เช็คเอาท์</h3>

        <center>
            <form action="up_check_in_out.php" method="POST"  name="form1" id="form1">
                <input type="text" class="form-control" id="id" name="id"  placeholder="รหัสตั๋ว">

                <input type="text" class="form-control" id="phone" name="phone"  placeholder="เบอร์โทรศัพท์">

                <button type="submit" class="btn btn-success" name="check_in">เช็คอิน</button>

                <button type="submit" class="btn btn-warning" name="check_out">เช็คเอาท์</button>

            </form>
        </center>

<!-- 
<?php
    if(isset($_POST["check_in"])){
        
        $id = $_POST["id"];
        $phone = $_POST["phone"];

        include('mysqli_connect.php');

        $sql = "SELECT * FROM buy_ticket
        JOIN ticket_book ON buy_ticket.ticket_book_id = ticket_book.ticket_book_id
        JOIN customer ON customer.customer_id = buy_ticket.customer_id
        WHERE ticket_book_code = '$id' && phone_number = '$phone' || ticket_code = '$id' && phone_number = '$phone'";
        $result = mysqli_query($con,$sql);


    if(mysqli_num_rows($result)){
        $row = mysqli_fetch_array($result);
        $travel_date = date('d/m/Y' , strtotime($row['travel_date']));
// buy_ticket //
        if($row["ticket_book_code"] == $id && $row["phone_number"] == $phone){
            if($row["ticket_status_id"] == 1){
                if($date >= $travel_date){
                    if($row['check_in'] == null){
                        echo "<script type='text/javascript'>";
                        echo "alert('รหัส $id AND $phone AND $date AND $travel_date');";
                        echo "</script>";
                    }else{
                    }
                }else{
                    
                }
            }else{
                
            }  
        }else{
                            
        }
// ticket_code//
                if($row["ticket_code"] == $id && $row["phone_number"] == $phone){
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
    }
?> -->
