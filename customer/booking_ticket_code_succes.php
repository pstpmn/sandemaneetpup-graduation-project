<?php 
include('header.php');

include('mysqli_connect.php');
    
    $ticket_id = $_REQUEST["ID"];
    $destinatio = $_REQUEST['destinatio'];

    $sql = "SELECT * FROM `ticket_book`
    JOIN buy_ticket ON ticket_book.ticket_book_id = buy_ticket.ticket_book_id
    JOIN customer ON customer.customer_id = buy_ticket.customer_id
    JOIN boat_seat ON boat_seat.boat_seat_id = buy_ticket.boat_seat_id
    JOIN location ON location.location_id = ticket_book.orgin
    JOIN boat ON boat_seat.boat_number =boat.boat_number
    JOIN boat_schedule ON boat_schedule.boat_number = boat.boat_number
    JOIN ticket_category ON ticket_category.ticket_category_id = ticket_book.ticket_category_id
    WHERE ticket_code = '$ticket_id'
    GROUP BY ticket_book.ticket_book_id ";
    $result1 = mysqli_query($con,$sql);
    $count = 0;
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
}

@media (max-width: 590px) {
  button[class="btn btn-primarys"],
  button[class="btn btn-danger"] {
       width: 90%;
       margin-bottom: 10px;
     }
}
</style>

<center>
  <form>
  <body class="has1">
     <h3 class="has4">กำหนดการเดินทาง / Trael Itinerary</br></br>
      รหัสตั๋ว Ticket ID : <?php echo  $ticket_id ?> <span style="color:#22E906">(ชำระแล้ว)</span></h3>

      <?php

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
            $count ++ ;
          }?>
          <?php
            mysqli_close($con);
          ?>
        <?php
        echo "</table>";
        echo "</div>";
        ?>
        
      <div class='box-2'>
        <?php
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
                    echo "<td>" .date("h:i",strtotime($row["start_time"])). " น.</td>";
                  echo "</tr>";
                  echo "<tr>";
                    echo "<th class='th-2'>วันที่ออกเดินทาง :</th>";
                    echo "<td>" .date("d/m/Y",strtotime($row["travel_date"])). "</td>";
                  echo "</tr>";
                  
                  
              echo "</table>";
              ?>

            </div>
            
            <?php
            echo "<div class='box-5'>";
              echo "<b>ข้อมูลการชำระเงิน</b><hr>";
                echo "<table>";
                  echo "<tr>";
                    echo "<th class='th-3'>เดินทาง :</th>";
                    echo "<td>".$count." ที่นั่ง</echo>";
                  echo "</tr>";
                  echo "<tr>";
                    echo "<th class='th-3'>ราคา :</th>";
                    echo "<td>" .$row["ticket_category_price"]. " บาท</td>";
                  echo "</tr>";
                  echo "<tr>";
                    echo "<th class='th-3'>ส่วนลด :</th>";
                    echo "<td>0 บาท</td>";
                  echo "</tr>";
                  echo "<tr>";
                    echo "<th class='th-3'>ยอดรวมชำระ :</th>";
                    echo "<td>" .$count * $row["ticket_category_price"]. " บาท</td>";
                  echo "</tr>";
              echo "</table>";
            echo "</div>";
            ?>
          </div>

          <div class="box-6">
            <center>
              <h5>QR Code</h5>
              <div id="qrcode" ondragstart="return false" onselectstart="return false"></div><br>
            </center>
            
            <button type="button" class="btn btn-primary"  onclick="window.print(document.getElementById('plaquette'))">ดาวน์โหลด QR Code</button></a>
            <a href='index.php'><button type="button" class="btn btn-danger">กลับไปยังหน้าแรก</button></a>
          </div>
      </form>
      </center>

<script>

  var $ticket_id = "<?php echo $ticket_id ?>";
    new QRCode(document.getElementById("qrcode"), {
        render: "canvas",
        width: 200,
        height: 200,
        colorDark: "#000000",
        colorLight: "#FFFFFF",
        text: $ticket_id,
        correctLevel: QRCode.CorrectLevel.H
    }
  );

</script>