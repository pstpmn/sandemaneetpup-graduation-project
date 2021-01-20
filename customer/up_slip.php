<?php

    date_default_timezone_set("Asia/Bangkok");
    $date = date('Y-m-d H:i:s');

    include('mysqli_connect.php');

    $valid_extensions = array('jpeg', 'jpg', 'png');
    
    $path = 'uploads/';

    if(!empty($_POST['ticket_code']) || $_FILES['slip_img']){
    $img = $_FILES['slip_img']['name'];
    $tmp = $_FILES['slip_img']['tmp_name'];

    $ext = strtolower(pathinfo($img, PATHINFO_EXTENSION));
    // $final_image = rand(1000,1000000).$img;
    
    if(in_array($ext, $valid_extensions)) { 
        $path = $path.strtolower($img);
            if(move_uploaded_file($tmp,$path)) {
                $ticket_code = $_POST['ticket_code'];
                $payment_time = $_POST['payment_time'];
                $payment_bank = $_POST['payment_bank'];
                $payment_amount = $_POST['payment_amount'];

            $sql = "UPDATE buy_ticket SET  
            time_up_slip='$date' , 
            payment_time='$date' , 
            payment_bank='$payment_bank' , 
            payment_amount='$payment_amount' , 
            slip_img ='$path',
            ticket_status_id ='4'
            WHERE ticket_code='$ticket_code'";
         }
            $result = mysqli_query($con, $sql) or die ("Error in query: $sql " . mysqli_error());
            mysqli_close($con);
       
    }
}
    if($result){
        echo "<script type='text/javascript'>";
        echo "window.location = 'index.php'; ";
        echo "alert('Up Sllip เรียบร้อย');";
        echo "</script>";
    }
    else{
        echo "<script type='text/javascript'>";
        echo "window.location = 'payment_form.php'; ";
        echo "alert('Error');";
        echo "</script>";
    }
?>