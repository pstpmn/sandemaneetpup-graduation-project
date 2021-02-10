<?php date_default_timezone_set("Asia/Bangkok");?>
    <!DOCTYPE html>
        <html lang="en" dir="ltr">
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0 maximum-scale=1.0, user-scalable=0'">
                <!-- css -->
                <link rel="stylesheet" href="css/header.css">
                <link rel="stylesheet" href="css/index.css">
                <link rel="stylesheet" href="css/show_information.css">
                <link rel="stylesheet" href="css/check_in_check_out.css">
                <link rel="stylesheet" href="css/styles.css">
                <link rel="stylesheet" href="css/footer.css">

                <!-- bootstrap -->
                <link rel="stylesheet" href="css/bootstrap.min.css">
            
                <!-- java script -->
                <script src="controller/function.js"></script>
                <script src="controller/clickEvent.js"></script>

                <!-- java script Responsive -->
                <script src="js/functionResponsive.js"></script>

                <!-- ajax jquery -->
                <script src="js/jquery.min.js"></script>
                
                <!-- bootstrap script -->
                <script src="js/bootstrap.min.js"></script>
                <script src="js/fontawesome.js"></script>
                
                <title>Sandmaneetpup</title>
                
            </head>
            <body>
                <nav>
                    <input type="checkbox" id="check">
                    <label for="check" class="checkbtn">
                        <i class="fas fa-bars"></i>
                    </label>
                        <label class="logo">แสนดีมณีทรัพย์</label>
                            <ul>
                                <li><a href="index.php" id="textNavber">หน้าแรก</a></li>
                                <li><a href="status.php" id="textNavber">ตรวจสอบสถานะ</a></li>
                                <li><a href="payment_form.php" id="textNavber">อัพสลิปการโอนเงิน</a></li>
                                <li><a href="check_in_out.php" id="textNavber">เช็คอิน - เช็คเอาท์</a></li>
                            </ul>
                </nav>
            </body>
        </html>