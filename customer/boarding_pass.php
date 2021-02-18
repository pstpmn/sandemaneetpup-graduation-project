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
  .box-QRCode {
    padding: 10px;
    width: 100%;
    background-color: #fff;
    border: 0 solid rgba(0, 0, 0, .125);
    border-radius: .25rem;
    margin-bottom: 10px;
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px 0 rgba(0, 0, 0, .06);
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
            <div id="qrcode" ondragstart="return false" onselectstart="return false"></div>
        </center>  

<center>
    <button type="button" class="btn btn-success" onclick="()">ดาวน์โหลด</button></a>
    <a href='show_information_success.php'><button type="button" class="btn btn-danger">ย้อนกลับ</button></a>
</center>

<script type="text/javascript">
    $ticket_book_code = "<?php echo $ticket_book ?>";
    new QRCode(document.getElementById("qrcode"), {
        render: "canvas",
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#FFFFFF",
        text: $ticket_book_code,
        correctLevel: QRCode.CorrectLevel.H
    });
    
</script>