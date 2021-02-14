<?php include('header.php');?>
<style>
    button[class="btn btn-primary"],
    button[class="btn btn-danger"] {
        width: 24%;
        font-family: 'Kanit', sans-serif;
    }

@media (max-width: 890px) {
    button[class="btn btn-primary"],
    button[class="btn btn-danger"] {
        width: 90%;
        margin-bottom: 10px;
    }
}

</style>
    <body class="has1">
        
        <h3 class="has2">ตรวจสอบสถานะ</h3>
        
        <center>
        <div class="form-group"> 
            <form action="check_information.php" method="POST"  name="form1" id="form1"> 
                <input type="text" class="form-control" id="id_code" name="ticket_book"  placeholder="รหัสการจอง">

                <button type="submit" class="btn btn-primary">ตกลง</button></a>
                <a href='index.php'><button type="button" class="btn btn-danger">กลับไปยังหน้าแรก</button></a>
            </form>
        </div>
        </center>