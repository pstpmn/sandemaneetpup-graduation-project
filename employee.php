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
                <center>จัดการพนักงาน</center>
            </h1>
            <br><br>
            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-table mr-1"></i>
                    DataTable Example
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered" style="text-align: center;" id="dataTable-employee" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>ลำดับ</th>
                                    <th>username</th>
                                    <th>password</th>
                                    <th>ชื่อ</th>
                                    <th>นามสกุล</th>
                                    <th>เพศ</th>
                                    <th>ประเภทพนักงาน</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody id="table-ticket-edit">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- modal edit employee -->
        <div class="container" style="text-align: center;">
            <!-- Modal -->
            <div class="modal fade" id="modal-Employee" role="dialog">
                <div class="modal-dialog modal-lg">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 id="dialog-ticketCode">แก้ไขข้อมูลพนักงาน</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div class="modal-body" id="modal-body-slip">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <td scope="col" width="30%"><b>ID</b></td>
                                        <td><input id='text-id' type="text" disabled value=""></td>
                                    </tr>
                                    <tr>
                                        <td scope="col" width="30%"><b>username</b></td>
                                        <td><input id='text-user' type="text" value=""></td>
                                    </tr>
                                    <tr>
                                        <td scope="col" width="30%"><b>password</b></td>
                                        <td><input id='text-pass' type="text" value=""></td>
                                    </tr>
                                    <tr>
                                        <td scope="col" width="30%"><b>ชื่อ</b></td>
                                        <td><input id='text-fname' type="text" value=""></td>
                                    </tr>
                                    <tr>
                                        <td scope="col" width="30%"><b>นามสกุล</b></td>
                                        <td><input id='text-lname' type="tel" value=""></td>
                                    </tr>
                                    <tr>
                                        <td scope="col" width="30%"><b>เพศ</b></td>
                                        <td><select id='select-gender' name='gender'>
                                                <option value="Male">ชาย</option>
                                                <option value="Female">หญิง</option>
                                            </select></td>
                                    </tr>
                                    <tr>
                                        <td scope="col" width="30%"><b>ประเภทพนักงาน</b></td>
                                        <td>
                                            <div id='contrainer-category'> </div>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody id="tbody-modal">

                                </tbody>
                            </table>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-success" onclick="setEditEmp()">Edit</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <!-- End -->
    </main>
    <script>
        getEmpCategory();
        getListEmployee();
    </script>
    <!--  Finish -->
    <?php
    require 'footer.php';
    ?>