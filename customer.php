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
    </main>
    <script>
        getShowCustomerEdit();
    </script>


    <!--  Finish -->
    <?php
    require 'footer.php';
    ?>