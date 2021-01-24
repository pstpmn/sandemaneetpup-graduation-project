<?php 
include('header.php');
?>

  <?php session_start();    
    $ticket_code = $_SESSION['ticket_code'];
    $destinatio = $_SESSION['destinatio'];
  ?>

<style>

  form {
    width: 50%;
  }
  button[class="btn btn-primary"],
  button[class="btn btn-danger"] {
    width: 49.5%;
    margin-bottom: 10px;
  }

@media (max-width: 995px) {
  form{
    width: 100%;
  }
}

@media (max-width: 890px) {
  button[class="btn btn-primary"],
  button[class="btn btn-danger"] {
    width: 90%;
    margin-bottom: 10px;
  }
  button[class="btn btn-danger"]{
    width: 90%;
  }
}

@media (max-width: 590px) {
  button[class="btn btn-primarys"],
  button[class="btn btn-danger"] {
       width: 90%;
       margin-bottom: 10px;
     }
}
</style>
    
  <body class="has1">
     <h3 class="has4">กำหนดการเดินทาง / Travel Itinerary</br></br>
      รหัสการซื้อตั๋ว Ticket Code : <?php echo  $ticket_code ?> <span style="color:#22E906">(ชำระแล้ว)</span></h3>
      <center>
      <form>
<!-- select * from boat_schedule 
where boat_number = หมายเลขเรือ AND 
(location_id = ต้นทาง OR location_id = ปลายทาง ) 
order by order_location ASC -->
      <?php 
        include('mysqli_connect.php');
        $sql = "SELECT * FROM buy_ticket AS bt
        INNER JOIN customer as c ON bt.customer_id = c.customer_id
        INNER JOIN boat_seat as ba ON bt.boat_seat_id = ba.boat_seat_id
        INNER JOIN boat as b ON ba.boat_number = b.boat_number
        INNER JOIN location AS o ON bt.orgin = o.location_id  
        WHERE ticket_code = '$ticket_code' ";
        $result1 = mysqli_query($con,$sql);
      
        echo "<div class='box-3'>";
          echo "<b>ข้อมูลผู้โดยสาร</b><hr>";
            
            echo "<table>";
            echo "<tr>
              <th>ชื่อ - นามสกุล</th>
              <th>เบอร์โทรศัพท์</th>
              <th style='text-align:center'>ชั้น</th>
              <th style='text-align:center'>ฝั่ง</th>
              <th style='text-align:center'>ที่นั่ง</th>
            </tr>";
            foreach( $result1 as $row ) {
            echo "<tr>";
              echo "<td>" .$row["cust_first_name"]. " " .$row["cust_last_name"]. "</td>";
              echo "<td>" .$row["phone_number"].  "</td>";
              echo "<td style='text-align:center'>" .$row["floor"]. "</td>";
              echo "<td style='text-align:center'>" .$row["boat_seat_type"]. "</td>";
              echo "<td style='text-align:center'>" .$row["boat_seat_number"]. "</td>";
            echo "</tr>";
          }?>
          <?php
            mysqli_close($con);
          ?>
        <?php
        echo "</table>";
        echo "</div>";
        ?>
        
      <?php 
        echo "<div class='box-2'>";
          echo "<div class='box-4'>";
              echo "<b>ข้อมูลการเดินทาง</b><hr>";
                echo "<table style='overflow-x:auto;'>";
                  echo "<tr>";
                    echo "<th class='th-2'>ต้นทาง :</th>";
                    echo "<td>" .$row["location_name"]. "</td>";
                  echo "</tr>";
                  echo "<tr>";
                    echo "<th class='th-2'>ปลายทาง :</th>";
                    echo "<td> $destinatio </td>";
                  echo "</tr>";
                  echo "<tr>";
                    echo "<th class='th-2'>หมายเลขเรือ :</th>";
                    echo "<td>" .$row["boat_number"]. "</td>";
                  echo "</tr>";
                  echo "<tr>";
                    echo "<th class='th-2'>เวลาออกเรือ :</th>";
                    echo "<td>" .$row["boat_number"]. "น.</td>";
                  echo "</tr>";
                  echo "<tr>";
                    echo "<th class='th-2'>วันที่ออกเดินทาง :</th>";
                    echo "<td>" .$row["boat_number"]. "</td>";
                  echo "</tr>";
                  
                  
              echo "</table>";
              ?>

            </div>

            <div class="box-5">
              <b>ข้อมูลการชำระเงิน</b><hr>

                <table>
                  <tr>
                    <th class="th-3">เดินทาง :</th>
                    <td>2 ที่นั่ง</td>
                  </tr>
                  <tr>
                    <th class="th-3">ราคา :</th>
                    <td>550 บาท</td>
                  </tr>
                  <tr>
                    <th class="th-3">ส่วนลด :</th>
                    <td>0 บาท</td>
                  </tr>
                  <tr>
                    <th class="th-3">ยอดรวมชำระ :</th>
                    <td>1,100 บาท</td>
                  </tr>
              </table>
            </div>
          </div>
          
          <div class="box-6">
            <a href='index.php'><button type="button" class="btn btn-primary">ปริ้นตั๋ว</button></a>
            <a href='index.php'><button type="button" class="btn btn-danger">กลับไปยังหน้าแรก</button></a>
          </div>
      </form>
      </center>
            
      

       