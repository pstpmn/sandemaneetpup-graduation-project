<?php
require 'header.php';
?>
<title>Ticket Recode</title>
<?php
require 'navbar.php';
?>
<!-- Body Implement -->
<style>
    input[type='radio'] {
        display: inline;
        width: 30%;
    }

    #container-detail-customer {
        background-color: #fff;
        padding: 20px;
        font-size: 35px;
    }

    #detail-customer {
        margin-top: 50px;
        font-size: 20px;
    }

    label {
        margin-top: 15px;
        margin-right: 10%;
        width: 100px;
        text-align: left;
    }

    #topic {
        width: 150px;
        display: inline-block;
        font-weight: bold;
    }
</style>

<div id="layoutSidenav_content">
    <main>
        <div class="container-fluid">
            <h1 class="mt-4">
                <center>ยกเลิกตั๋ว</center>
            </h1><br><br>
            <input type="text" id="ticket-code" class="form-control" placeholder="รหัสตั๋วของลูกค้า"><br>
            <br><br><button class="form-control btn-success" onclick="getDetailCustomerFromTicketCode(
                document.getElementById('ticket-code').value
            )">Cancel</button>
            <br><button class="form-control btn-danger">Reset</button>

            <br>
            <!-- <div id="container-detail-customer">
                <center><i class="far fa-calendar-check"></i> ยืนยันข้อมูลตั๋วลูกค้า</center>
                <div id="detail-customer">
                    <center>
                        <div id="topic">ชื่อ :</div><label id="fristName-label">....</label>
                        <div id="topic">นามสกุล :</div> <label id="lastName-label">....</label><br>
                        <div id="topic">เบอร์โทร : </div><label id="phone-label">....</label>
                        <div id="topic">รหัสตั๋ว :</div> <label id="ticketCode-label">....</label><br>
                        <div id="topic">ประเภทตั๋ว : </div><label id="ticketType-label">....</label>
                        <div id="topic">ซื้อกับพนักงาน :</div> <label id="employee-label">....</label><br>
                        <div id="topic">หมายเลขที่นั่ง : </div><label id="numberSeat-label">....</label>
                        <div id="topic">หมายเลขเรือ : </div><label id="numbetBoat-label">....</label><br>
                        <div id="topic">นั่งฝัง : </div><label id="seatType-label">....</label>
                        <div id="topic">ชั้น : </div><label id="floor-label">....</label><br><br>
                        <div id="topic">วันออกเรือ : </div><label id="travel-label" style="width:280px">....</label><br>
                        <div id="topic">เวลาซื้อตั๋ว : </div><label id="buyTime-label" style="width:280px">....</label><br>
                        <br><br><button class="form-control btn-success" onclick="setCancelTicket(
                            document.getElementById('ticketCode-label').textContent
                        )">confrim</button>
                        <br><button class="form-control btn-danger">cancel</button>
                    </center>

                </div>
            </div> -->
            <br>

        </div>

        <div class="container">
            <!-- Modal -->
            <div class="modal fade" id="dialog-cancelTicket" role="dialog">
                <div class="modal-dialog modal-xl	">
                    <!-- Modal content-->
                    <div class="modal-content" style="overflow: auto;">
                        <div class="modal-header">
                            <h4 id="dialog-ticketCode">แก้ไขข้อมูลตั๋วลูกค้า</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div class="modal-body" id="modal-body-editTicket" style="overflow: auto;">
                            <div id="detail-customer">
                                <center>
                                    <div id="topic">ชื่อ :</div><label id="fristName-label">....</label>
                                    <div id="topic">นามสกุล :</div> <label id="lastName-label">....</label><br>
                                    <div id="topic">เบอร์โทร : </div><label id="phone-label">....</label>
                                    <div id="topic">รหัสตั๋ว :</div> <label id="ticketCode-label">....</label><br>
                                    <div id="topic">ประเภทตั๋ว : </div><label id="ticketType-label">....</label>
                                    <div id="topic">ซื้อกับพนักงาน :</div> <label id="employee-label">....</label><br>
                                    <div id="topic">หมายเลขที่นั่ง : </div><label id="numberSeat-label">....</label>
                                    <div id="topic">หมายเลขเรือ : </div><label id="numbetBoat-label">....</label><br>
                                    <div id="topic">นั่งฝัง : </div><label id="seatType-label">....</label>
                                    <div id="topic">ชั้น : </div><label id="floor-label">....</label><br><br>
                                    <div id="topic">วันออกเรือ : </div><label id="travel-label" style="width:280px">....</label><br>
                                    <div id="topic">เวลาซื้อตั๋ว : </div><label id="buyTime-label" style="width:280px">....</label><br>
                                    <br><br>
                                </center>
                            </div>
                        </div>
                        <div id="modal-footer" class="modal-footer">
                            <button class="btn btn-success" onclick="setCancelTicket(
                            document.getElementById('ticketCode-label').textContent
                        )">confrim</button>
                            <br><button class="btn btn-danger" data-dismiss="modal">cancel</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </main>


    <!--  Finish -->
    <?php
    require 'footer.php';
    ?>