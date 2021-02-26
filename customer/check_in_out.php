<?php 
    include('header.php');
    date_default_timezone_set("Asia/Bangkok");
    $date = date('Y-m-d H:i:s');
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
        <form method="POST">
        <div class="form-group">
            <input type="text" class="form-control" id="id" name="id"  placeholder="รหัสการจอง หรือ รหัสตั๋ว">

            <input type="text" class="form-control" id="phone" name="phone"  placeholder="เบอร์โทรศัพท์">
            
            <button type="submit" class="btn btn-success" name="check_in" >เช็คอิน</button>

            <button type="submit" class="btn btn-warning" name="check_out">เช็คเอาท์</button>
        
        </div>
        </form>
        </center>
