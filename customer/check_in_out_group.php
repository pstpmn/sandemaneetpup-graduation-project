<?php include('header.php');?>
<style>
button[class="btn btn-success"],
button[class="btn btn-warning"] {
    width: 24%;
    font-family: 'Kanit', sans-serif;
    font-size: 16px;     
}   
button[class="btn btn-danger"]{
    margin-top : 1%;
    width: 48.5%;
}

@media (max-width:890px) {
    button[class="btn btn-success"],
    button[class="btn btn-warning"] {
        width: 45%;
        font-size: 14px;
        margin-left: 5px;
       
    }
    button[class="btn btn-danger"]{
        margin-top : 1%;
        width: 92%;
        margin-left: 5px;
    }
}
</style>

    <body class="has1">

        <h3 class="has2">เช็ดอิน - เช็ดเอาท์</h3>

        <center>
        <form action="up_check_in_out.php" method="POST" enctype="multipart/form-data" name="form1" id="form1">
        <div class="form-group">
            <input type="text" class="form-control" id="id_code" name="ticket_code"  placeholder="รหัสการซื้อตั๋ว">
            
            <button type="submit" class="btn btn-success" name="check_in_group">Check In</button>

            <button type="submit" class="btn btn-warning" name="check_out_group">Check Out</button>

            <br>
            <a href='check_in_out.php'><button type="button" class="btn btn-danger">กลับไปยังก่อนหน้านี้</button></a>
        </div>
        </form>
        </center>