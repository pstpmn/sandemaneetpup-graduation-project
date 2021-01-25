<?php
if(($_SESSION["statusId"]) != 2){
    echo "<script>alert('คุณไม่มีสิทธิ์เข้าใช้งาน ขออภัยในความไม่สะดวก')</script>";
    echo "<script>window.location.replace('index.php')</script>";
}

