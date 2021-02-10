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

        <h3 class="has2">เช็คอิน - เช็คเอาท์</h3>

        <center>
        <form action="up_check_in_out.php" method="POST" enctype="multipart/form-data" name="form1" id="form1">
        <div class="form-group">
            <input type="text" class="form-control" id="id_code" name="ticket_code"  placeholder="รหัสจองตั๋ว หรือ รหัสตั๋ว">
            
            <button type="submit" class="btn btn-success" name="check_in">เช็คอิน</button>

            <button type="submit" class="btn btn-warning" name="check_out">เช็คเอาท์</button>
        </div>
        </form>
        </center>