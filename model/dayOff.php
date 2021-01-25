<?php
require 'header.php';
require 'checkAdmin.php';
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
                <center>จัดการวันหยุดงาน</center>
            </h1>
            <br><br>
            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-table mr-1"></i>
                    DataTable Example
                </div>
                <div class="card-body">
                    <button class='btn btn-primary' onclick="getShowModalAddDayOff('regular')">เพิ่มวันหยุดประจำ</button>
                    <button class='btn btn-primary' onclick="getShowModalAddDayOff('special')">เพิ่มวันหยุดพิเศษ</button>

                    <div class="table-responsive">
                        <table class="table table-bordered" style="text-align: center;" id="dataTable-dayOff" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>ลำดับ</th>
                                    <th>วันที่หยุด</th>
                                    <th>สาเหตุ</th>
                                    <th>ประเภทวันหยุด</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody id="table-dayOff">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- modal edit employee -->
        <div class="container" style="text-align: center;">
            <!-- Modal -->
            <div class="modal fade" id="modal-dayOff" role="dialog">
                <div class="modal-dialog modal-lg">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 id="header-Employee">แก้ไขเรือ</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div class="modal-body" id="modal-body-slip">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <td scope="col" width="30%"><b>วันที่หยุด</b></td>
                                        <td id="implemant">

                                        </td>
                                    </tr>
                                    <tr>
                                        <td scope="col" width="30%"><b>สาเหตุ</b></td>
                                        <td><textarea id='text-cause' value=""></textarea></td>
                                    </tr>
                                    <tr id="tr-foot">

                                    </tr>
                                </thead>
                                <tbody id="tbody-modal">

                                </tbody>
                            </table>
                        </div>
                        <div class="modal-footer">
                            <button type="button" id='btnSaveEdit' class="btn btn-success">Edit</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <!-- End -->
    </main>
    <script>
        getListDayOff();
    </script>
    <!--  Finish -->
    <?php
    require 'footer.php';
    ?>