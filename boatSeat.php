<?php
require 'header.php';
require 'checkAdmin.php';

?>
<title>Ticket Recode</title>
<?php
require 'navbar.php';
?>
<!-- Body Implement -->

<?php

?>
<div id="layoutSidenav_content">
    <main>
        <div class="container-fluid">
            <h1 class="mt-4">
                <center>จัดการที่นั่งเรือ</center>
            </h1>
            <br><br>
            <!-- แสดงภาพ ที่นั่งของเรือ -->
            <div class="tableSet" id="tableFromBoatSeatBottom">
                <table class="table table-bordered table-primary" id="">
                    <tr id="rightBottom">
                        <td bgcolor="#fff" id='td-rightBottom'>
                            <center>Right</center>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="999" bgcolor="#fff">
                            <center>ที่นั่งเรือ</center>
                        </td>
                    </tr>
                    <tr id="leftBottom">
                        <td bgcolor="#fff" id='td-leftBottom'>
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
            <!-- end code ที่นั่งเรือ -->

            <br><br><br>

            <!-- ตารางที่นั่งเรือ -->
            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-table mr-1"></i>
                    DataTable Example
                </div>
                <div class="card-body">
                    <button class='btn btn-primary' onclick="getShowModalAddBoat()">เพิ่มที่นั่งเรือ</button>
                    <div class="table-responsive">
                        <table class="table table-bordered" style="text-align: center;" id="dataTable-employee" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>ลำดับ</th>
                                    <th>หมายเลขเรือ</th>
                                    <th>ชื่อเรือ</th>
                                    <th>จัดการที่นั่งเรือ</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody id="table-ticket-edit">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <!-- end code ตารางที่นั่งเรือ -->
            
        </div>

    </main>

    <!--  Finish -->
    <?php
    require 'footer.php';
    ?>