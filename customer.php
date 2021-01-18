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

    .tableSet {
        overflow: auto;
    }

    #noneTable {
        display: none;
    }

    #container-boatSeat-customerData {
        display: none;
    }

    #register-customer-detail {
        background-color: white;
        padding: 20px;
        border-radius: 5px;
        /* display: none; */
    }
</style>
<div id="layoutSidenav_content">
    <main>
        <div class="container-fluid">
            <h1 class="mt-4">
                <center>จัดการข้อมูลลูกค้า</center>
            </h1>
            <br><br>
            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-table mr-1"></i>
                    DataTable Example
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered" style="text-align: center;" id="dataTable-TicketEdit" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>ชื่อ</th>
                                    <th>นามสกุล</th>
                                    <th>หมายเลขโทรศัพท์</th>
                                    <th>เพศ</th>
                                    <th>วันที่ใช้งานครั้งแรก</th>
                                    <th>จำนวนที่ใช้บริการ</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody id="table-ticket-edit">

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="container">
                <!-- Modal -->
                <div class="modal fade" id="dialogListCustomer" role="dialog">
                    <div class="modal-dialog modal-lg">
                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 id="dialog-ticketCode">แก้ไขข้อมูลลูกค้า</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body" id="modal-body-slip" style="overflow: auto;">
                                <div id='addCustomer-TicketEdit'></div>
                                <table class="table table-bordered" style="text-align: center;">
                                    <thead>
                                        <tr>
                                            <td scope="col" width="30%"><b>ชื่อ</b></td>
                                            <td><input id='text-fname' type="text" value=""></td>
                                        </tr>
                                        <tr>
                                            <td scope="col" width="30%"><b>นามสกุล</b></td>
                                            <td><input id='text-lname' type="text" value=""></td>
                                        </tr>
                                        <tr>
                                            <td scope="col" width="30%"><b>เพศ</b></td>
                                            <td><select id='text-gender' name='gender'>
                                                <option value="Male">ชาย</option>
                                                <option value="Female">หญิง</option>
                                                </select></td>
                                        </tr>
                                        <tr>
                                            <td scope="col" width="30%"><b>เบอร์โทรศัพ</b></td>
                                            <td><input id='text-phone' type="tel" value=""></td>
                                        </tr>
                                        <tr>
                                            <td scope="col" width="30%"><b>วันที่ลงทะเบียน</b></td>
                                            <td><input id='text-registerDate' type="text"></td>
                                        </tr>
                                        <tr>
                                            <td scope="col" width="30%"><b>จำนวนที่ใช้บริการ</b></td>
                                            <td><input id='text-count' type="number" value=""></td>
                                        </tr>
                                    </thead>
                                    <tbody id="tbody-modal">
                                    </tbody>
                                </table>
                            </div>
                            <div class="modal-footer">
                                <button type="button" id='btn-saveEdit' class="btn btn-success">Save</button>

                                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>



            <div class="container">
                <!-- Modal -->
                <div class="modal fade" id="dialog-TicketEdit" role="dialog">
                    <div class="modal-dialog">
                        <!-- Modal content-->
                        <div class="modal-content" style="overflow: auto;">
                            <div class="modal-header">
                                <h4 id="dialog-ticketCode">แก้ไขข้อมูลตั๋วลูกค้า</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body" id="modal-body-editTicket" style="overflow: auto;">

                                </table>
                            </div>
                            <div id="modal-footer" class="modal-footer">

                            </div>
                        </div>

                    </div>
                </div>
            </div>



            <!-- show select Boat Seat -->
            <div class="container">
                <!-- Modal -->
                <div class="modal fade" id="dialog-showAddTicket" role="dialog">
                    <div class="modal-dialog modal-xl">
                        <!-- Modal content-->
                        <div class="modal-content" style="overflow: auto;">
                            <div class="modal-header">
                                <h4 id="header-select-boatSeat">เพิ่มลูกค้าในรหัสตั๋ว : </h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body" id="modal-body-editTicket">
                                <h1 id='header-addCustomer' class="mt-4">
                                </h1>
                                ต้นทาง <select id='select-Location_start' disabled class='custom-select' onchange="getSearchBoat(
                document.getElementById('select-Location_start').value,
                document.getElementById('select-Location_end').value
                )">

                                </select>
                                <br><br>
                                ปลายทาง <select id='select-Location_end' disabled class='custom-select' onchange="getSearchBoat(
                document.getElementById('select-Location_start').value,
                document.getElementById('select-Location_end').value
                )">

                                </select>
                                <script>
                                    getSelectLocation();
                                </script>
                                <br> <br>
                                เลือกหมายเลขเรือ <select id='boat-number' disabled class='custom-select'>
                                    <option>!!! เลือกต้นทาง และปลายทาง ก่อนถึงจะแสดง !!!</option>
                                </select>
                                <br><br>
                                เลือกวันที่ออกเดินทาง
                                <input type='date' id='date' class="form-control" disabled value="<?php echo date('Y-m-d') ?>">

                                <br>
                                <button class="btn btn-primary" disabled id="search-boat" onclick="getBoatSeat(
                document.getElementById('boat-number').value,
                document.getElementById('date').value,
                document.getElementById('select-Location_start').value,
                document.getElementById('select-Location_end').value
                )">ค้นหาที่นั่งเรือ</button>


                                <br><br><br>
                                <div id="container-boatSeat-customerData">
                                    <b>เลือกที่นั่งเรือเพิ่มเติม</b><br><br>
                                    <div class="tableSet" id="tableFromBoatSeatBottom" style="overflow: auto;">
                                        <table class="table table-bordered table-primary" id="">
                                            <tr id="rightBottom">
                                                <td bgcolor="#fff">
                                                    <center>Right</center>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="125" bgcolor="#fff">
                                                    <center>ที่นั่งเรือ</center>
                                                </td>
                                            </tr>
                                            <tr id="leftBottom">
                                                <td bgcolor="#fff">
                                                    <center>Left</center>
                                                </td>
                                            </tr>

                                        </table>
                                    </div>

                                    <div class="tableSet" id="tableFromBoatSeatTop" style="display:none">
                                        <table class="table table-bordered table-primary" id="">
                                            <tr id="rightTop">
                                                <td bgcolor="#fff">
                                                    <center>Right</center>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="125" bgcolor="#fff">
                                                    <center>ที่นั่งเรือ</center>
                                                </td>
                                            </tr>
                                            <tr id="leftTop">
                                                <td bgcolor="#fff">
                                                    <center>Left</center>
                                                </td>
                                            </tr>

                                        </table>
                                    </div>


                                    <button class="btn btn-success" id="floorOneBtn" onclick="btnFloorOne()">ชั้น 1</button>
                                    <button class="btn btn-warning" id="floorTwoBtn" onclick="btnFloorTwo()">ชั้น 2</button>
                                    <br><br><b>เลขที่นั่งเรือ :</b> <label id="number-boatseat">กรุณาเลือกที่นั่งเรือ</label>

                                    <br><br><br>
                                    <button class="form-control btn-primary" id='btn-save' onclick="registerCustomer(listSeat,listSeatNumber)">ตกลง</button><br>
                                    <button class="form-control btn-danger" id='btn-reset' onclick="getShowChangeBoatSeat('207952690','111','2021-01-07','1','2','134')">รีเซ็ต</button>

                                    </table>
                                </div>
                                <div id="modal-footer" class="modal-footer">

                                </div>
                            </div>

                        </div>
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
                                <h4>โปรดระบุข้อมูลลูกค้า</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>

                            </div>
                            <div class="modal-body">
                                <div id="register-customer">
                                    <div id="register-customer-detail">

                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button class="btn btn-success" id="btnSaveTicket" onclick="saveTicketAddCustomer(listSeat,
                                    listSeatNumber,
                                    document.getElementById('select-Location_start').value,
                                    document.getElementById('select-Location_end').value)">Save</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
    </main>
    <script>
        getShowCustomerEdit();
    </script>


    <!--  Finish -->
    <?php
    require 'footer.php';
    ?>