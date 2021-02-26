<?php 
include('header.php');
?>

  <?php session_start();    
    $ticket_id = $_SESSION['ticket_code'];
    $destinatio = $_SESSION['destinatio'];
  ?>

<style>

  form {
    width: 50%;
  }
  button[class="btn btn-info"],
  button[class="btn btn-danger"] {
    width: 49.5%;
    margin-bottom: 10px;
    font-family: 'Kanit', sans-serif;
  }

@media (max-width: 995px) {
  form{
    width: 100%;
  }
}

@media (max-width: 890px) {
  button[class="btn btn-info"],
  button[class="btn btn-danger"] {
    width: 90%;
    margin-bottom: 10px;
  }
}

@media (max-width: 590px) {
  button[class="btn btn-info"],
  button[class="btn btn-danger"] {
       width: 90%;
       margin-bottom: 10px;
     }
}
</style>

  <body class="has1">
     <h3 class="has4">กำหนดการเดินทาง / Travel Itinerary</br></br>
      รหัสตั๋ว Ticket ID : <?php echo  $ticket_id ?> <span style="color:red">(ค้างชำระ)</span></h3>
      <center>
      <form>
      
      <?php 
        include('mysqli_connect.php');
        // $sql = "SELECT * FROM ticket_book AS tb
        // INNER JOIN buy_ticket as bt ON tb.ticket_book_id = bt.ticket_book_id
        // INNER JOIN customer as c ON bt.customer_id = c.customer_id
        // INNER JOIN boat_seat as ba ON bt.boat_seat_id = ba.boat_seat_id
        // INNER JOIN boat as b ON ba.boat_number = b.boat_number
        // INNER JOIN location AS l ON tb.orgin = l.location_id
        // RIGHT JOIN boat_schedule AS bs ON b.boat_number = bs.boat_number AND l.location_id = bs.location_id
        // WHERE ticket_book_code = '$ticket_book' ";

        $sql = "SELECT * FROM ticket_book AS tb
        INNER JOIN buy_ticket as bt ON tb.ticket_book_id = bt.ticket_book_id
        INNER JOIN customer as c ON bt.customer_id = c.customer_id
        INNER JOIN boat_seat as ba ON bt.boat_seat_id = ba.boat_seat_id
        INNER JOIN boat as b ON ba.boat_number = b.boat_number
        INNER JOIN location AS l ON tb.orgin = l.location_id
        RIGHT JOIN boat_schedule AS bs ON b.boat_number = bs.boat_number AND l.location_id = bs.location_id
        INNER JOIN ticket_category AS tc ON tb.ticket_category_id = tc.ticket_category_id
        WHERE ticket_code = '$ticket_id' ";
        $result1 = mysqli_query($con,$sql);
        $count = 0;
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
            <a href='payment_form.php'><button type="button" class="btn btn-info">ไปยังหน้าอัพสลิป</button></a>
            <a href='index.php'><button type="button" class="btn btn-danger">กลับไปยังหน้าแรก</button></a>
          </div>
      </form>
      </center>
            
      

       