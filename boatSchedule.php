<?php
require 'controller/database.php';
require 'model/confix.php';

if (!isset($_GET['btnBoat'])) {
    Header("Location:boat.php");
}
$boatNumber = $_GET['btnBoat'];
$database = new database(IP, DBNAME, USER, PASS);

require 'header.php';
require 'checkAdmin.php';

?>
<title>Ticket Recode</title>
<?php
require 'navbar.php';
?>
<!-- Body Implement -->

<style>
    hr {
        border-top: 3px solid #00BFFF;
    }

    #contrainerBox {
        display: table-cell;
        text-align: center;
        vertical-align: middle;
        border-radius: 5px;
        width: auto;
        height: 60px;
    }

    #contend {
        border-radius: 15px;
        background-color: #FFD700;
        height: 50px;
        align-items: center;
        display: flex;
        justify-content: center;
    }
</style>

<div id="layoutSidenav_content">
    <main>
        <div class="container-fluid">
            <h1 class="mt-4">
                <center>จัดการเส้นทางเรือ</center>
            </h1>
            <br><br>
            <button class="btn btn-primary" onclick="getModalAddBoatSchedule('<?php echo $boatNumber ?>')">เพิ่มเส้นทาง</button>
            <br><br>

            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-chart-area mr-1"></i>
                    จำลองเส้นทางการเดินเรือ หมายเลขเรือ : <?php echo $boatNumber ?>
                </div>


                <div class="card-body" style="overflow: auto;margin:30px"><canvas id="myAreaChart" width="100%" height="30"></canvas>
                    <center>
                        <table border="0" id='tableScheduleStart'>
                            <?php
                            $boatSchedule;
                            try {
                                $boatSchedule = $database->select('SELECT * from boat_schedule join location on location.location_id = boat_schedule.location_id 
                                where boat_number = ' . $boatNumber . ' AND start_time is not null order by boat_schedule_id asc');
                            } catch (Exception $err) {
                                echo "<script>alert('เกิดข้อผิดพลาด')</script>";
                            }
                            echo "<tr>";
                            for ($i = 0; $i < count($boatSchedule); $i++) {
                                if ($i > 0) {
                                    echo "<td>
                                    <hr width='200px'>
                                </td>";
                                }
                                echo "<td><div id='contrainerBox'>
                                <div id='contend'>" . $boatSchedule[$i]['location_name'] . "</div>
                                <div>เวลา " . $boatSchedule[$i]['start_time'] . "</div>
                            </div></td>";
                            }
                            echo  "</tr>";
                            $boatSchedule = null;
                            ?>
                        </table>
                        <br>
                        <i>ภาพตัวอย่างเส้นทางเรือรอบไป</i>
                        <br> <br><br><br><br>


                        <table border="0" id='tableScheduleReturn'>
                            <?php
                            try {
                                $boatSchedule = $database->select('SELECT * from boat_schedule join location on location.location_id = boat_schedule.location_id 
                                    where boat_number = ' . $boatNumber . ' AND return_time is not null order by boat_schedule_id asc');
                            } catch (Exception $err) {
                                echo "<script>alert('เกิดข้อผิดพลาด')</script>";
                            }
                            echo "<tr>";
                            for ($i = 0; $i < count($boatSchedule); $i++) {
                                if ($i > 0) {
                                    echo "<td>
                                        <hr width='200px'>
                                    </td>";
                                }
                                echo "<td><div id='contrainerBox'>
                                    <div id='contend'>" . $boatSchedule[$i]['location_name'] . "</div>
                                    <div>เวลา " . $boatSchedule[$i]['return_time'] . "</div>
                                </div></td>";
                            }
                            echo  "</tr>";
                            $boatSchedule = null;
                            ?>
                        </table>
                        <br>
                        <i>ภาพตัวอย่างเส้นทางเรือตอนกลับ</i>
                    </center>
                    <br>
                </div>
            </div>





            <div class="container" style="overflow: auto;">
                <!-- Modal -->
                <div class="modal fade " id="modal-addBoatSchedule" role="dialog" style="overflow: auto;">
                    <div class="modal-dialog">
                        <!-- Modal content-->
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 id="header-Employee">เพิ่มเส้นทางเรือ หมายเลข : <?php echo $boatNumber ?></h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body" id="modal-body-slip">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <td scope="col" width="40%"><b>สถานที่</b></td>
                                            <td>
                                                <select id='txt-location'>
                                                    <?php
                                                    $location = $database->select('select * from location');
                                                    for ($i = 0; $i < count($location); $i++) {
                                                        echo "<option value='" . $location[$i]['location_id'] . "'>" . $location[$i]['location_name'] . "</option>";
                                                    }
                                                    $location = null;
                                                    ?>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td scope="col" width="40%"><b>เวลาออก / เวลาถึง</b></td>
                                            <td><input id='txt-time' type="time" value=""></td>
                                        </tr>

                                        <tr>
                                            <td scope="col" width="40%"><b>รอบเรือ</b></td>
                                            <td>
                                                <form>รอบไป <input type="radio" id='txt-type-start' value='start' name='a'> &nbsp;&nbsp;
                                                    รอบกลับ <input type="radio" id='txt-type-return' value='return' name='a'>
                                                </form>
                                            </td>
                                        </tr>

                                    </thead>
                                    <tbody id="tbody-modal">

                                    </tbody>
                                </table>
                            </div>
                            <div class="modal-footer">
                                <button type="button" id='btnSaveEdit' class="btn btn-success" onclick="setAddBoatSchedule('<?php echo $boatNumber ?>')">บันทึก</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal">ปิด</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


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
                                    <th>สถานที่</th>
                                    <th>ประเภทรอบ</th>
                                    <th>เวลาเดินเรือ</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody id="table-ticket-edit">
                                <?php
                                $boatSchedule = $database->select('SELECT * from boat_schedule join location on location.location_id = boat_schedule.location_id 
                                where boat_number = ' . $boatNumber . ' order by boat_schedule_id desc');
                                for ($i = 0; $i < count($boatSchedule); $i++) {
                                    $aroundType;
                                    $time;
                                    if ($boatSchedule[$i]['start_time'] != null) {
                                        $aroundType = 'รอบไป';
                                        $time = $boatSchedule[$i]['start_time'];
                                    } else {
                                        $aroundType = 'รอบกลับ';
                                        $time = $boatSchedule[$i]['return_time'];
                                    }

                                    echo "<tr>";
                                    echo "<td>" . ($i + 1) . "</td>";
                                    echo "<td>" . $boatSchedule[$i]['location_name'] . "</td>";
                                    echo "<td><u>" . $aroundType . "</u></td>";
                                    echo "<td>" . $time . "</td>";
                                    echo "<td><button onclick='getModalEditBoatSchedule(" . $boatSchedule[$i]['boat_schedule_id'] . ")' class='btn btn-warning'>แก้ไข</button> "
                                        . "<button onclick='setDelectBoatSchedule(" . $boatSchedule[$i]['boat_schedule_id'] . ")' class='btn btn-danger'>ลบ</button></td> ";
                                }
                                ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>




    </main>

    <!--  Finish -->
    <?php
    $pdo = null;
    require 'footer.php';
    ?>