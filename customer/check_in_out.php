<?php 
    include('header.php');
    date_default_timezone_set("Asia/Bangkok");
    $date = date('Y-m-d');
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
            <form method="post">
                <input type="text" class="form-control" id="id" name="id"  placeholder="รหัสการจอง หรือ รหัสตั๋ว">

                <input type="text" class="form-control" id="phone" name="phone"  placeholder="เบอร์โทรศัพท์">

                <button type="submit" class="btn btn-success" name="check_in">เช็คอิน</button>

                <button type="submit" class="btn btn-warning" name="check_out">เช็คเอาท์</button>

            </form>
        </center>


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
            $travel_date = date('Y-m-d' , strtotime($row['travel_date']));
// buy_ticket //
                if($row["ticket_book_code"] == $id && $row["phone_number"] == $phone){
                    if($row["ticket_status_id"] == 1){
                        if($date >= $deadline_book){
                            if($row['check_in'] == null){
                                echo "<script type='text/javascript'>";
                                echo "alert('รหัส $id AND $phone เรียบร้อย $date');";
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
                        if($date >= $deadline_book){
                            if($row['check_in'] == null){
                                echo "<script type='text/javascript'>";
                                echo "alert('รหัส $id AND $phone เรียบร้อย $date');";
                                echo "</script>";
                            }else{
                    
                            }
                        }else{
                    
                        }   
                    }else{
                    
                    }
                }else{

                }
        }
    }
?>
