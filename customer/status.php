<?php include('header.php');?>
<style>
    button[class="btn btn-primary"],
    button[class="btn btn-danger"] {
        width: 24%;
        font-family: 'Kanit', sans-serif;
    }
    
    span{
      margin-left:26%;
    }
    

@media (max-width: 890px) {
    button[class="btn btn-primary"],
    button[class="btn btn-danger"] {
        width: 90%;
        margin-bottom: 10px;
    }
    span{
      margin-left:5%;
      font-size:12px;
    }
}

</style>
    <body class="has1">
        
        <h3 class="has2">ตรวจสอบสถานะ</h3>
        
        <center>
        <div class="form-group"> 
            <form action="check_information.php" method="POST"  name="form1" id="form1"> 
                <input type="text" class="form-control" id="id_code" name="id"  placeholder="รหัสการจอง หรือ รหัสตั๋ว">

                <input type="text" class="form-control" id="phone" name="phone"  placeholder="เบอร์โทรศัพท์">

                <button type="submit" class="btn btn-primary">ตกลง</button></a>
                <a href='index.php'><button type="button" class="btn btn-danger">กลับไปยังหน้าแรก</button></a>

                <br />
                <br />
                <b>คำแนะนำ</b>
                <br>
        </center>
                <span>1.กรอกรหัสการจองหรือรหัสตั๋ว 10 หลัก เพื่อตรวจสอบข้อมูลการจอง และสถานะชำระเงิน<br></span>
                <span>2.ถ้ากรอกรหัสการจอง กรอกเบอร์โทรศัพท์คนใดหคนนึ่งที่ร่วมทางกัน<br></span>
                <span>3.ตรวจสอบข้อมูลทางโทรศัพท์ โทร 087 - 8873162 (ตลอด 24 ชม.)</span>
            </form>
        </div>
                