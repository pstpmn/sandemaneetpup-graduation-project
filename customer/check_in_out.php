<?php include('header.php');?>
<style>
    button[class="btn btn-light"]{
        width: 24%;
        font-family: 'Kanit', sans-serif;
        font-size: 16px;
        margin-left: 1%;
        border-radius: 15px;
        box-shadow: 0 3px 3px rgba(0, 0, 0, 0.034), 0 7px 6px rgba(0, 0, 0, 0.048), 0 12px 10px rgba(0, 0, 0, 0.06), 0 22px 17px rgba(0, 0, 0, 0.072), 0 41px 33px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12);
}

@media (max-width:1120px) {
    button[class="btn btn-light"]{
        width: 45%;
        font-size: 14px;
        margin-left: 1%;
       
    }
}
@media (max-width:960px) {
    button[class="btn btn-light"]{
        width: 45%;
        font-size: 14px;
        margin-left: 1%;
       
    }
}
@media (max-width:890px) {
    button[class="btn btn-light"]{
        width: 45%;
        font-size: 14px;
        margin-left: 1%;
       
    }
}
</style>

    <body class="has1">

        <h3 class="has2">เลือกการ เช็ดอิน - เช็ดเอาท์</h3>

        <center>
        <div class="form-group">

            <a href="check_in_out_group.php"><button  type="button" class="btn btn-light">
                <br><img src="image/group.png" style = "width: 30%"><br><br>
                <span style="color:#0056b3">เช็ดอิน - เช็ดเอาท์ (กลุ่ม)</span>
            </button></a>
            
            <a href="check_in_out_individual.php"><button  type="button" class="btn btn-light">
                <br><img src="image/individual.png" style = "width: 30%"><br><br>
                <span style="color:#0056b3">เช็ดอิน - เช็ดเอาท์ (1 ที่นั่ง)</span>
            </button></a>
        </div>
        </center>