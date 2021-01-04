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
                <center>จัดการข้อมูลตั๋วลูกค้า</center>
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
                                    <th>รหัสตั๋ว</th>
                                    <th>ประเภทตั๋ว</th>
                                    <th>หมายเลขเรือ</th>
                                    <th>รายชื่อลูกค้า</th>
                                    <th>พนักงาน</th>
                                    <th>เวลาซื้อตั๋ว</th>
                                    <th>สิ้นสุดเวลาจอง</th>
                                    <th>วันที่ขึ้นเรือ</th>
                                    <th>สถานะ</th>
                                    <th>รูปภาพสลิป</th>
                                    <th>เวลาอัพสลิป</th>
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


            <div class="container" >
                <!-- Modal -->
                <div class="modal fade" id="dialog-TicketEdit" role="dialog"  >
                    <div class="modal-dialog" >
                        <!-- Modal content-->
                        <div class="modal-content" style="overflow: auto;">
                            <div class="modal-header">
                                <h4 id="dialog-ticketCode">แก้ไขข้อมูลตั๋วลูกค้า</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body" id="modal-body-editTicket" style="overflow: auto;">
                                
                                </table>
                            </div>
                            <div  id="modal-footer" class="modal-footer" >
                            
                            </div>
                        </div>

                    </div>
                </div>
            </div>

    </main>
    <script>
        getTicketEdit();
    </script>


    <!--  Finish -->
    <?php
    require 'footer.php';
    ?>