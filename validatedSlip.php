<?php
require 'header.php';
?>
<title>Ticket Recode</title>
<?php
require 'navbar.php';
?>
<!-- Body Implement -->


<div id="layoutSidenav_content">
    <main>
        <div class="container-fluid">
            <h1 class="mt-4">
                <center>ระบบตรวจสอบสลิปโอนเงิน ลูกค้า</center>
            </h1><br><br>


            <button class="btn btn-success" id="btnSlipNoValidated" onclick="btnSelectSlip(this)">สลิปที่ยังไม่ตรวจสอบ</button>
            <button class="btn btn-warning" id="btnSlipValidated" onclick="btnSelectSlip(this)">สลิปที่ตรวจสอบแล้ว</button><br><br>
            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-table mr-1"></i>
                    ข้อมูล สลิปโอนเงินของลูกค้า
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0" style="text-align: center;">
                            <thead>
                                <tr>
                                    <th>Ticket Code</th>
                                    <th>รายชื่อลูกค้า</th>
                                    <th>หมายเลขเรือ</th>
                                    <th>เวลาโอนเงิน</th>
                                    <th>เวลาอัพสลิป</th>
                                    <th>ธนาคาร</th>
                                    <th>ราคา</th>
                                    <th>รูปภาพสลิป</th>
                                    <th>สถานะ</th>
                                    <th>action</th>
                                </tr>
                            </thead>
                            <tbody id="tbody-slip">

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="container">
                <!-- Modal -->
                <div class="modal fade" id="myModal" role="dialog">
                    <div class="modal-dialog">
                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4>รูปภาพภาพสลิปโอนเงิน</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body" id="modal-body-slip">
                                asdsd
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <script>
                getSlipTranferMoney();
                setInterval("getSlipTranferMoney()", 9000);
            </script>

            <div class="container">
                <!-- Modal -->
                <div class="modal fade" id="dialogListCustomer" role="dialog">
                    <div class="modal-dialog">
                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 id="dialog-ticketCode">รายชื่อลูกค้า</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body" id="modal-body-slip">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">ชื่อ</th>
                                            <th scope="col">นามสกุล</th>
                                            <th scope="col">เบอร์โทรศัพ</th>
                                            <th scope="col">ที่นั่ง</th>
                                            <th scope="col">ชั้น</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbody-modal">
                                    </tbody>
                                </table>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    </main>
    <script>
    </script>


    <!--  Finish -->
    <?php
    require 'footer.php';
    ?>