<?php
require 'header.php';
?>

<title>Main</title>
</head>

<body>
    <div id="bg_tapbar">
        <div id="tapbar">
            <div id="tapbar_menu">
                <button id="btn_banner">แสนดีมณีทรัพย์</button>
                <button id="btn_main">หน้าแรก</button>
                <button id="btn_main">ตรวจสอบสถานะ</button>
                <button id="btn_main">อัพสลิปการโอนเงิน</button>
                <button id="btn_main">วิธีการจอง-ซื้อตั๋ว</button>
            </div>
            <div id="detail"><br><br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                จองตั๋ว - ซื้อตั๋ว ออนไลน์<br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                เรือนอน สุราษฎร์ธานี - เกาะเต่า
            </div>
            <div id="register">
                <div id="container">
                    <div id="input">
                        <b>เลือกรอบที่ต้องการ
                            <br>ออกเดินทาง</b>
                            <div id="input1">
                                <br>
                                &nbsp;&nbsp;&nbsp;<b>ปลายทางที่จะไป</b><br>
                                &nbsp;&nbsp;&nbsp;<input type="radio" name="destination" value="SuratThani"> สุราษฎร์ธานี
                                <br>
                                &nbsp;&nbsp;&nbsp;<input type="radio" name="destination" value="KohTao"> เกาะเต่า
                                <br><br>
                                &nbsp;&nbsp;&nbsp;<b>วันที่ต้องการเดินทาง</b><br>
                                &nbsp;&nbsp;&nbsp;&nbsp;<input type="date" name="destination">
                                <br><br>
                                <center><button class="btn btn-success">ค้นหาที่นั่ง</button></center>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
<?php
require 'footer.php';
?>