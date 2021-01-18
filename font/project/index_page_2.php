<?php include('header.php');?>

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

    button[class="form-control btn btn-success"],
    button[class="form-control btn btn-danger"] {
         width: 24%;
         margin-bottom: 10px;
     }
     
    button[class="btn btn-success"],
    button[class="btn btn-warning"]{
         width: 5%;
     }
     table[class="table table-bordered table-primary"]{
         width: 80%;
         margin-bottom: 15px;
     }
     .font{
         font-family: 'Kanit', sans-serif;
     }
     
    @media (max-width: 890px) {
    button[class="form-control btn btn-success"],
    button[class="form-control btn btn-danger"] {
         width: 90%;
         margin-bottom: 10px;
     }
    button[class="btn btn-success"],
    button[class="btn btn-warning"]{
         width: 15%;
     }
     input[type='radio'] {
        display: inline;
        width: 20%;
    }
    }
    
</style>
    
    <center>
           <body class="has1">
            <h3 class="has3">เลือกที่นั่งเรือของลูกค้า</h3>
            <div class="tableSet" id="tableSet">
                <table class="table table-bordered table-primary">
                    <?php
                    $seat = 1;
                    for ($n = 0; $n < 3; $n++) {
                        echo "<tr>";
                        if ($n == 1) {
                            echo "<td colspan='100'><center>ที่นั่งเรือ</center></td>";
                        } else {
                            for ($i = 0; $i < 25; $i++) {
                                echo "<td id='" . $seat . "' onclick='setTd(" . $seat . ")'>" . $seat . "</td>";
                                $seat++;
                            }
                        }
                        echo "</tr>";
                    }
                    ?>
                </table>
            </div>

            <button id="floorOneBtn" class="btn btn-success" onclick="floorOne()" >ชั้น 1</button> 
            <button id="floorTwoBtn" class="btn btn-warning" onclick="floorTwo()" >ชั้น 2</button>

            <br><br>
            <div class="font">
                <b>เลขที่นั่งเรือ :</b> <label>กรุณาเลือกที่นั่งเรือ</label> <br><br>
                <input type="text" class="form-control" placeholder="ชื่อจริง">
                <input type="text" class="form-control" placeholder="นามสกุล">
                <input type="number" class="form-control" placeholder="เบอร์โทรศัพท์">
                <input type="radio">ชาย
                <input type="radio">หญิง
                <br><br><br>
                <a href='show_information.php'>
                <button type="button" class="form-control btn btn-success">Save</button>
                </a>
                <button type="button" class="form-control btn btn-danger">Reset</button>
            </div>
        </div>
    
    <br>
    </center>

    <script>
        document.getElementById("floorOneBtn").setAttribute("class","btn btn-success");
        var td = document.getElementById('8');
        var td1 = document.getElementById('1');

        td.setAttribute('bgcolor', '#14B62E');
        td.innerHTML = "<i class='fas fa-check-circle'></i>";

        td1.setAttribute('bgcolor', '#f5ef4c');
        td1.innerHTML = "<i class='fas fa-check-circle'></i>";

        let setTd = (idTd) => {
            let td = document.getElementById(idTd);
            if (td.getAttribute("bgcolor") == "#14B62E" || td.getAttribute("bgcolor") == "#f5ef4c") {
                alert("กูมีคนซื้่อแล้วไปซื่อที่อื่นซะๆๆ");
            } else if (td.innerHTML == idTd) {
                td.setAttribute('bgcolor', '#cfd2d4');
                td.innerHTML = "<i class='fas fa-check-circle'></i>";
            } else {
                td.innerHTML = idTd;
                td.setAttribute('bgcolor', '#b8daff');
            }
        }

        let floorTwo = () => {
            document.getElementById("floorOneBtn").setAttribute("class","btn btn-warning");
            document.getElementById("floorTwoBtn").setAttribute("class","btn btn-success");
            
            let div = document.getElementById("tableSet");
            div.innerHTML = "<table class='table table-bordered table-primary'><?php
                    $seat = 51;
                    for ($n = 0; $n < 3; $n++) {
                        echo "<tr>";
                        if ($n == 1) {
                            echo "<td colspan='100'><center>ที่นั่งเรือ</center></td>";
                        } else {
                            for ($i = 0; $i < 37; $i++) {
                                echo "<td id='" . $seat . "' onclick='setTd(" . $seat . ")'>" . $seat . "</td>";
                                $seat++;
                            }
                        }
                        echo "</tr>";
                    }
                    ?></table>"}

        let floorOne = () => {
            document.getElementById("floorOneBtn").setAttribute("class","btn btn-success");
            document.getElementById("floorTwoBtn").setAttribute("class","btn btn-warning");

            let div = document.getElementById("tableSet");
            div.innerHTML = "<table class='table table-bordered table-primary'><?php
                    $seat = 1;
                    for ($n = 0; $n < 3; $n++) {
                        echo "<tr>";
                        if ($n == 1) {
                            echo "<td colspan='100'><center>ที่นั่งเรือ</center></td>";
                        } else {
                            for ($i = 0; $i < 50; $i++) {
                                echo "<td id='" . $seat . "' onclick='setTd(" . $seat . ")'>" . $seat . "</td>";
                                $seat++;
                            }
                        }
                        echo "</tr>";
                    }
                    ?>
        </table>"}
    </script>


