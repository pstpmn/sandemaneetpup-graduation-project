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
                <center>ระบบสแกน QR Code</center>
            </h1><br><br>
            <button class="btn btn-success" id="btncheckIn" onclick="btnSelectCheckInAndOut(this)">check in</button>
            <button class="btn btn-warning" id="btncheckOut" onclick="btnSelectCheckInAndOut(this)">check out</button>
            <br><br>

            <div class="card" id="fillBarCode">
                <div class="card-body">
                    <center>ใส่โค๊ดตรงนี้</center>
                    <br>
                    <input type="text" class="form-control" placeholder="รหัสตั๋วของลูกค้า" id="barcode">
                    <br><br><button class="form-control btn-success" id="btnScan" onclick="getListTicketCode(
                        document.getElementById('barcode').value
                    )">Scan</button>
                    <br><button id="reset" class="form-control btn-danger">Reset</button>
                </div>
            </div>
            <div class="card" id="dataTicket">
                <div class="card-body">
                    <center>ข้อมูลตั๋วที่ผ่านการเช็คอิน</center><br>
                    <div id="scollbarTable">
                        <Table class="table table-bordered" style="text-align: center">
                            <thead>
                                <tr style="font-weight:bold">
                                    <td>รหัสตั๋ว</td>
                                    <td>ชื่อ</td>
                                    <td>นามสกุล</td>
                                    <td>ที่นั่ง</td>
                                    <td>ชั่น</td>
                                    <td>หมายเลขเรือ</td>
                                    <td>check In</td>
                                    <td>check out</td>
                                </tr>
                            </thead>
                            <tbody id="tbody">
                            </tbody>
                        </Table>
                        <script>
                            getTicketCheckIn();
                        </script>
                    </div>
                    <br>
                </div>
                <!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal"> -->

            </div>
            <div class="container-modal">
                <!-- Modal -->
                <div class="modal fade" id="myModal" role="dialog">
                    <div class="modal-dialog">
                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5>เลือกลูกค้าที่ต้องการจะเช็คอิน</h5>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body" style="overflow:auto;text-align:center">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">ติ๊กลูกค้า</th>
                                            <th scope="col">ชื่อ</th>
                                            <th scope="col">ที่นั่ง</th>
                                            <th scope="col">หมายเลขเรือ</th>

                                        </tr>
                                    </thead>
                                    <tbody id="tbody-modal">
                                    </tbody>
                                </table>
                                <!-- <center>
                                    <input type="checkbox" id="inlineCheckbox1" value="option1"> พงศธร พัสมุณี ที่นั่ง 11 หมายเลขเรือ 111 <br>
                                    <input type="checkbox" id="inlineCheckbox1" value="option1">

                                </center> -->
                            </div>
                            <div class="modal-footer">
                                <button class="btn btn-success" id="btn-checkIn-checkOut" onclick="checkBoxListCustomer()">Save</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </main>
    <br>
    <!--  Finish -->
    <?php
    require 'footer.php';
    ?>