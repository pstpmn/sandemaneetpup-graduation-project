<!-- payment_form -->
<?php

    date_default_timezone_set("Asia/Bangkok");
    $Date_time = date('Y-m-d H:i:s');
    $date = date('d/m/y H:i');

    $ticket_book = $_POST['ticket_book'];

    $valid_extensions = array('jpeg', 'jpg', 'png');
    
    $path = '../img/slip/';

    include('mysqli_connect.php');
    
    $sql = "SELECT * FROM ticket_book
    WHERE  ticket_book_code = '$ticket_book' ";
    $result = mysqli_query($con,$sql) or die ("Error in query: $sql " . mysqli_error());
    $data = mysqli_fetch_all($result,MYSQLI_ASSOC);
    $deadline_book = date('d/m/y H:i' , strtotime($data[0]['deadline_book']));

    if (isset($_POST["confirm_payment"])) {
        if (count($data) >= 1){
            if ($data[0]['ticket_status_id'] != 4){
                if ($data[0]['ticket_status_id'] != 3){
                    if ($data[0]['ticket_status_id'] == 2){
                        if ($date <= $deadline_book){
                            if ($data[0]['slip_img'] == null){

                                if(!empty($_POST['ticket_book']) || $_FILES['slip_img']){
                                    $img = $_FILES['slip_img']['name'];
                                    $tmp = $_FILES['slip_img']['tmp_name'];

                                    $ext = strtolower(pathinfo($img, PATHINFO_EXTENSION));
                                    $final_image = 'slip_'.$ticket_book.'.jpg';
                                    
                                    if(in_array($ext, $valid_extensions)) { 
                                        $path = $path.strtolower($final_image);
                                            if(move_uploaded_file($tmp,$path)) {
                                                $ticket_book = $_POST['ticket_book'];
                                                $payment_time = $_POST['payment_time'];
                                                $payment_bank = $_POST['payment_bank'];
                                                $payment_amount = $_POST['payment_amount'];

                                                $sql1 = "UPDATE ticket_book SET  
                                                time_up_slip='$Date_time' , 
                                                payment_time='$payment_time' , 
                                                payment_bank='$payment_bank' , 
                                                payment_amount='$payment_amount' , 
                                                slip_img ='$final_image',
                                                ticket_status_id ='4'
                                                WHERE ticket_book_code='$ticket_book'";
                                            }

                                            $result1 = mysqli_query($con, $sql1) or die ("Error in query: $sql1 " . mysqli_error());
                                            mysqli_close($con);
                                        }
                                            echo "<script type='text/javascript'>";
                                            echo "window.location = 'index.php'; ";
                                            echo "alert('อัพสลิปการโอนเงิน เรียบร้อย');";
                                            echo "</script>";
                                        }
                            }else{
                                echo "<script type='text/javascript'>";
                                echo "window.location = 'payment_form.php'; ";
                                echo "alert('เกิดข้อผิดพลาดในการอัพสลิปการโอนเงิน');";
                                echo "</script>";
                            }
                        }else{
                            echo "<script type='text/javascript'>";
                            echo "window.location = 'payment_form.php'; ";
                            echo "alert('รหัสการจอง $ticket_book ได้เลยเวลาในการชำระแล้ว !!!');";
                            echo "</script>";
                        }    
                    }else{
                        echo "<script type='text/javascript'>";
                        echo "window.location = 'payment_form.php'; ";
                        echo "alert('รหัสการจอง $ticket_book ได้มีการชำระเรียบร้อยแล้ว !!!');";
                        echo "</script>";
                    }
                }else{
                    echo "<script type='text/javascript'>";
                    echo "window.location = 'payment_form.php'; ";
                    echo "alert('รหัสการจอง $ticket_book ได้ทำการยกเลิกเรียบร้อย !!!');";
                    echo "</script>";
                }
            }else{
                echo "<script type='text/javascript'>";
                echo "window.location = 'payment_form.php'; ";
                echo "alert('รหัสการจอง $ticket_book อยู่ระหว่างรอดำเนินการ !!!');";
                echo "</script>";
            }
        }else{
                echo "<script type='text/javascript'>";
                echo "window.location = 'payment_form.php'; ";
                echo "alert('รหัสการจอง $ticket_book ไม่ถูกต้อง !!!');";
                echo "</script>";
        }
    }
?>
<!-- payment_form -->
                