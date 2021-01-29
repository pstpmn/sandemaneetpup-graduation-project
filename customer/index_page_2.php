<?php include('header.php'); ?>

<?php
if (isset($_POST["btnSearch"])) {
    $orgin = $_POST['select-Location_start-responsive'];
    $destination = $_POST['select-Location_end-responsive'];
    $boatId = $_POST['boat-number'];
    $date = $_POST['date'];
    echo $orgin ."       a";
    if($orgin == "0" || $destination == "0"){
        echo "<script type='text/javascript'>";
        echo "window.location = 'index.php'; ";
        echo "alert('ต้นทาง หรือ ปลายทาง ยังไม่ได้เลือก  !!!');";
        echo "</script>";
    }
    else if($orgin == $destination){
        echo "<script type='text/javascript'>";
        echo "window.location = 'index.php'; ";
        echo "alert('ต้นทาง และ ปลายทาง เหมือนกัน  !!!');";
        echo "</script>";
    }
}
?>

<style>
    input[type='radio'] {
        display: inline;
        width: 5%;
    }

    .tableSet {
        overflow: auto;
    }

    td {
        cursor: pointer;
    }

    button[class="form-control btn btn-danger"],
    button[class="form-control btn btn-primary"] {
        width: 24%;
        margin-bottom: 10px;
        font-family: 'Kanit', sans-serif;
    }

    button[class="btn btn-success"],
    button[class="btn btn-warning"] {
        width: 5%;
        font-family: 'Kanit', sans-serif;
    }

    .font {
        font-family: 'Kanit', sans-serif;
    }

    table[class="table table-bordered table-primary"] {
        width: 85%;
        margin-bottom: 5px;
    }
    
    #container-boatSeat-customerData {
        display: none;
        width: 95%;
    }
    #tableFromBoatSeatTop{
        width: 97%;
    }

    @media (max-width: 890px) {

        button[class="form-control btn btn-danger"],
        button[class="form-control btn btn-primary"] {
            width: 100%;
            margin-bottom: 10px;
        }

        button[class="btn btn-success"],
        button[class="btn btn-warning"] {
            width: 15%;
        }

        input[type='radio'] {
            display: inline;
            width: 20%;
        }

        table[class="table table-bordered table-primary"] {
            width: 90%;
            margin-bottom: 5px;
            margin-left: 15px;
        }

        #container-boatSeat-customerData {
        display: none;
        width: 90%;
        }

        #tableFromBoatSeatTop{
            width: 100%;
        }
    }
</style>

<script>
//List Boat Seat ID
    var listSeat = []; 
//List Boat Seat Number
    var listSeatNumber = []; 
</script>

<center>
    <body class="has1">
        <div id="container-boatSeat-customerData">
            <h3 class="has2">เลือกที่นั่งเรือของลูกค้า</h3>
            <div class="tableSet" id="tableFromBoatSeatBottom">
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

        <button id="floorOneBtn" class="btn btn-success" onclick="btnFloorOne()">ชั้น 1</button>
        <button id="floorTwoBtn" class="btn btn-warning" onclick="btnFloorTwo()">ชั้น 2</button>
        <br><br>
            เลขที่นั่งเรือ : <label id="number-boatseat">กรุณาเลือกที่นั่งเรือ</label>
        <br><br>

        <button type="button" class="form-control btn btn-primary" id="floorTwoBtn" 
        onclick="registerCustomer(boatId,listSeatNumber,origin,destination)">ตกลง</button>

        <a href='index.php'><button type="button" class="form-control btn btn-danger">ยกเลิก</button></a>


        <div class="container">
            <div class="modal fade" id="myModal" role="dialog">
                <div class="modal-dialog">
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
                            <button class="btn btn-success" id="btnSaveTicket" 
                            onclick="saveTicketNormal(listSeat,listSeatNumber,origin,destination)">บันทึก</button>
                            
                            <button type="button" class="btn btn-danger" data-dismiss="modal">ยกเลิก</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        
        <script>
            let origin = "<?php echo $orgin ?>";
            let destination = "<?php echo $destination ?>";
            let boatId = "<?php echo $boatId ?>";
            let date = "<?php echo $date ?>";
            getBoatSeat(boatId, date, origin, destination);
        </script>
        <br>
</center>
