<?php
require 'header.php';
?>
<title>Ticket Recode</title>
<?php
require 'navbar.php';
?>
<!-- Body Implement -->
<style>
    #dataTicket {
        width: 65%;
        float: left;
    }

    #fillBarCode {
        width: 30%;
        float: left;
        margin-right: 35px
    }

    #scollbarTable {
        overflow: auto;
        height: 350px;
    }

    @media screen and (max-width:760px) {
        #dataTicket {
            width: 100%;
            margin-top: 60px;
        }

        #fillBarCode {
            width: 100%;

        }

    }
</style>

<script>
</script>

<div id="layoutSidenav_content">
    <main>
        <div class="container-fluid">
            <h1 class="mt-4">
                <center>ระบบ check in - check out <br>(สำหรับพนักงาน)</center>
            </h1><br><br>เลือกประเภท : 
            <button class="btn btn-success" id="btncheckIn" onclick="btnSelectCheckInAndOut(this)">check-in</button>
            <button class="btn btn-warning" id="btncheckOut" onclick="btnSelectCheckInAndOut(this)">check-out</button>
            <br><br>

            <div class="card" id="fillBarCode">
                <div class="card-body">
                    <center>ใส่รหัสตั๋วตรงนี้</center>
                    <br>
                    <input type="text" class="form-control" placeholder="โปรดใส่รหัสการจอง / รหัสตั๋ว" id="barcode">
                    <br>
                    


                    <br>
                    
                    <button class="form-control btn-success" id="btnScan" onclick="getListTicketCode(
                        document.getElementById('barcode').value
                    )">ตรวจสอบ</button>
                    <br><button onclick="setReset()" class="form-control btn-danger">รีเซ็ต</button>
                </div>
            </div>


            <div class="card" id='dataTicket'>
                <div class="card-body">
                    <center>
                        <h5>ข้อมูลตั๋วผ่านการเช็คอินวันนี้</h5>
                    </center><br>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" style="text-align: center;" id="dataTable-Ticket" width="100%" cellspacing="0">
                                <thead>
                                    <tr>
                                        <td><b>รหัสตั๋ว</b></td>
                                        <td><b>ชื่อ - นามสกุล</b></td>
                                        <td><b>ที่นั่ง</b></td>
                                        <td><b>ชั้น</b></td>
                                        <td><b>หมายเลขเรือ</b></td>
                                        <td><b>check In</b></td>
                                        <td><b>check out</b></td>
                                    </tr>
                                </thead>
                                <tbody id="tbody">

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


            <div class="container-modal">
                <!-- Modal -->
                <div class="modal fade" id="myModal" role="dialog">
                    <div class="modal-dialog modal-lg">
                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5>เลือกลูกค้าที่ต้องการจะเช็คอิน</h5>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body" style="overflow:auto;text-align:center">
                                <h4>Booking ID : <label id='display-bookingID'></label></h4>
                                <h5>หมายเลขเรือ : <label id='display-boatNumber'></label></h5>

                                <br>
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">เลือก</th>
                                            <th scope="col">รหัสตั๋ว</th>
                                            <th scope="col">ชื่อ - นามสกุล</th>
                                            <th scope="col">ที่นั่ง</th>
                                            <th scope="col">ชั้น</th>

                                        </tr>
                                    </thead>
                                    <tbody id="tbody-modal">
                                    </tbody>
                                </table>

                            </div>
                            <div class="modal-footer">
                                <button class="btn btn-success" id="btn-checkIn-checkOut" onclick="checkBoxListCustomer()">บันทึก</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal">ปิด</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </main>
    <script>
        // getTicketCheckIn();

        // $(document).ready(function() {
        //     $('#dataTable-Ticket').dataTable({
        //         "lengthChange": false
        //     });
        // })

        $(document).ready(function() {
            var dataTable = $('#dataTable-Ticket').DataTable({
                "processing": true,
                "serverSide": true,
                'retrieve': false,
                "ajax": {
                    url: "model/apiGetCheckInToday.php", // json datasource
                    type: "post", // method  , by default get
                    error: function() { // error handling
                        $(".employee-grid-error").html("");
                        $("#dataTable-TicketEdit").append('<tbody class="employee-grid-error"><tr><th colspan="3">No data found in the server</th></tr></tbody>');
                        $("#dataTable-TicketEdit_processing").css("display", "none");

                    }
                }
            });
        });
    </script>
    <br>
    <!--  Finish -->
    <?php
    require 'footer.php';
    ?>