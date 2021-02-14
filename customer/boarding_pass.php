<?php include('header.php');?>

<?php
    $ticket_book = $_GET['ticket_book'];
?>

<style>
    button[class="btn btn-success"],
    button[class="btn btn-danger"] {
        width: 15%;
        margin-top: 20px;
        font-family: 'Prompt', sans-serif;
  }

@media (max-width: 890px) {
    button[class="btn btn-success"],
    button[class="btn btn-danger"] {
        width: 20%;
        margin-top: 20px;
  }
}

@media (max-width: 590px) {
    button[class="btn btn-success"],
    button[class="btn btn-danger"] {
        width: 40%;
        font-size: 12px;
    }
}
</style>

<body class="has1">
        
        <h3 class="has2">QR Code</h3>
        
        <center>
            <div id="qrcode"></div>
        </center>  

<center>
    <button type="button" class="btn btn-success">ดาวน์โหลด</button></a>
    <a href='show_information_success.php'><button type="button" class="btn btn-danger">ย้อนกลับ</button></a>
</center>

<script type="text/javascript">
    $ticket_book_code = "<?php echo $ticket_book ?>";
    new QRCode(document.getElementById("qrcode"), {
        text: $ticket_book_code,
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#FFFFFF",
        correctLevel: QRCode.CorrectLevel.M
    });
</script>