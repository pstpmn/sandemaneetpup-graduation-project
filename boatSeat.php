<?php
if (!isset($_GET['btnBoatSeat'])) {
    Header("Location:boat.php");
}
$boatNumber = $_GET['btnBoatSeat'];
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
<script>
    var listSeat = []; //List Boat Seat ID
    var listSeatNumber = []; //List Boat Seat Number
    var ticketPrice; // set price
    var listCountFloor = [];
    var listFloorData;
</script>
<div id="layoutSidenav_content">
    <main>
        <div class="container-fluid">
            <h1 class="mt-4">
                <center>จัดการที่นั่งเรือ</center>
            </h1>
            <br><br>

            
            <!-- แสดงภาพ ที่นั่งของเรือ -->
            <div class="tableSet" id="tableFromBoatSeat" style="overflow: auto;">
                <table class="table table-bordered table-primary" id="">
                    <!-- ทำงานโดย Process -->
                </table>
            </div>
            <center><div><i>ตัวอย่างที่นั่งเรือ</i></div><br></center>

            <div id='container-btnFloor'>
                <!-- ทำงานโดย Process -->
            </div>
            <script>
                getBoatSeatOnly('<?php echo $boatNumber; ?>');
            </script>
            <!-- end code ที่นั่งเรือ -->
            <br><br><br>

            <!-- ตารางที่นั่งเรือ -->
            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-table mr-1"></i>
                    หมายเลขเรือ : <label><u><?php echo $boatNumber ?></u></label>
                </div>
                <div class="card-body">
                    <button class='btn btn-primary' id='addBoatseat' onclick="getModalAddBoatSeatOne('<?php echo $boatNumber?>')">เพิ่มที่นั่งเรือ</button>
                    <button class='btn btn-primary' id='addBoatseatRow' onclick="getModalAddBoatSeatMultipleRows('<?php echo $boatNumber?>')">เพิ่มที่นั่งเรือเป็นแถว</button>

                    <br> <br>

                    <div class="table-responsive">
                        <table class="table table-bordered" style="text-align: center;" id="dataTable-boatSeat" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>หมายเลขที่นั่ง</th>
                                    <th>ตำแหน่งที่นั่ง</th>
                                    <th>ชั้น</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody id="table-boatSeat">
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <!-- end code ตารางที่นั่งเรือ -->

            <div class="container" style="overflow: auto;">
                <!-- Modal -->
                <div class="modal fade " id="modal-addBoatSeat" role="dialog" style="overflow: auto;">
                    <div class="modal-dialog" style="overflow: auto;">
                        <!-- Modal content-->
                        <div class="modal-content" style="overflow: auto;">
                            <div id="ModalHeader" class="modal-header">
                                <div id="txtModalHeader">
                                    <h4>เพิ่มที่นั่งเรือ</h4>
                                </div>
                                <button type="button" onclick="getRefreshPage()" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body" id='modal-body'>
                                
                            </div>
                            <div class="modal-footer">
                            <button type="button" id="btnAdd" class="btn btn-success" >ADD</button>
                                <button type="button" id="btnClose" onclick="getRefreshPage()" class="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    </main>
    <script>
        getShowDataTableBoatSeat('<?php echo $boatNumber ?>');
    </script>
    <!--  Finish -->
    <?php
    require 'footer.php';
    ?>