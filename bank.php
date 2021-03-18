<?php
require 'header.php';
require 'checkAdmin.php';
require 'controller/database.php';
require 'model/confix.php';
$database = new database(IP, DBNAME, USER, PASS);
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
                <center>ระบบจัดการ บัญชีธนาคาร</center>
            </h1>
            <br><br>
            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-table mr-1"></i>
                    DataTable Example
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <button class='btn btn-primary' onclick="getModalAddBank()">เพิ่มบัญชีธนาคาร</button><br><br>
                        <table class="table table-bordered" style="text-align: center;" id="dataTable-bank" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>ลำดับ</th>
                                    <th>ธนาคาร</th>
                                    <th>หมายเลขบัญชี</th>
                                    <th>ชื่อ - นามสกุล</th>
                                    <th>สถานะ</th>
                                    <th>action</th>
                                </tr>
                            </thead>
                            <tbody id="tbody-bank">
                                <?php
                                $bank = $database->select("select * from bank");
                                if (count($bank) > 0) {
                                    for ($i = 0; $i < count($bank); $i++) {
                                        echo "<tr>";
                                        echo "<td>" . ($i + 1) . "</td>";
                                        echo "<td>" . $bank[$i]["bank_name"] . "</td>";
                                        echo "<td>" . $bank[$i]["bank_account"] . "</td>";
                                        echo "<td>" . $bank[$i]["bank_name_owner"] . "</td>";
                                        if ($bank[$i]["bank_status"] == 0) $bank[$i]["bank_status"] = "ปิดการใช้งาน";
                                        else $bank[$i]["bank_status"] = "เปิดการใช้งาน";
                                        echo "<td><b><button class='btn btn-link' onclick='getModalEditStatusBank(".$bank[$i]["bank_id"].")'>" . $bank[$i]["bank_status"] . "</button></b></td>";
                                        echo "<td><button class='btn btn-danger' onclick='setDeleteBank(".$bank[$i]["bank_id"].")')>ลบ</button></td>";
                                        echo "</tr>";
                                    }
                                } else {
                                    echo "<tr><td colspan='5'><h5>ไม่มีข้อมูล</h5></td></tr>";
                                }
                                ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- modal edit employee -->
        <div class="container" style="text-align: center;">
            <!-- Modal -->
            <div class="modal fade" id="modal-bank" role="dialog">
                <div class="modal-dialog modal-lg">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 id="header-bank">เพิ่มบัญชีธนาคาร</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div class="modal-body" id="modal-body-bank">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <td scope="col" width="30%"><b>ธนาคาร</b></td>
                                        <td><input id='text-bank' type="text"></td>
                                    </tr>
                                    <tr>
                                        <td scope="col" width="30%"><b>หมายเลขบัญชี</b></td>
                                        <td><input id='text-account' type="text"></td>
                                    </tr>
                                    <tr>
                                        <td scope="col" width="30%"><b>ชื่อ - นามสกุล</b></td>
                                        <td><input id='text-fullName' type="text"></td>
                                    </tr>
                                    <tr>
                                        <td scope="col" width="30%"><b>สถานะ</b></td>
                                        <td><select id='text-status'>
                                                <option value="1">เปิดการใช้งาน</option>
                                                <option value="0">ปิดการใช้งาน</option>

                                            </select></td>
                                    </tr>

                                </thead>
                                <tbody id="tbody-modal">

                                </tbody>
                            </table>
                        </div>
                        <div class="modal-footer">
                            <button type="button"  class="btn btn-success" onclick="setAddBank(
                                document.getElementById('text-bank').value,
                                document.getElementById('text-account').value,
                                document.getElementById('text-fullName').value,
                                document.getElementById('text-status').value
                            )">SAVE</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal">CLOSE</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>


        <div class="container" style="text-align: center;">
            <!-- Modal -->
            <div class="modal fade" id="modal-bank-status" role="dialog">
                <div class="modal-dialog">
                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 id="header-bank">เปลียนสถานะ บัญชีธนาคาร</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div class="modal-body" id="modal-body-bank">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <td scope="col" width="30%"><b>สถานะ</b></td>
                                        <td><select id='text-edit-status'>
                                                <option value="1">เปิดการใช้งาน</option>
                                                <option value="0">ปิดการใช้งาน</option>

                                            </select></td>
                                    </tr>

                                </thead>
                                <tbody id="tbody-modal">

                                </tbody>
                            </table>
                        </div>
                        <div class="modal-footer">
                            <button type="button" id='btnSaveEdit' class="btn btn-success">SAVE</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal">CLOSE</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <!-- End -->
    </main>
    <script>
        // getLocationCategory();
    </script>
    <!--  Finish -->
    <?php
    require 'footer.php';
    ?>