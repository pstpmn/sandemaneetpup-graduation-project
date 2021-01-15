<?php include('header.php');?>

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

    <!-- <?php

      $con= mysqli_connect("localhost","root","","project_db") or die("Error: " . mysqli_error($con));
      mysqli_query($con, "SET NAMES 'utf8' ");
      error_reporting( error_reporting() & ~E_NOTICE );
      date_default_timezone_set('Asia/Bangkok');
      
      $ticket_code = $_POST['ticket_code'];

      $query = "SELECT * FROM buy_ticket as p 
      INNER JOIN customer on customer.customer_id = buy_ticket.customer_id
      INNER JOIN boat_seat on boat_seat.boat_seat_id = buy_ticket.boat_seat_id
      INNER JOIN boat on boat.boat_number = boat_seat.boat_number
      INNER JOIN ticket_category on ticket_category.ticket_category_id  = buy_ticket.ticket_category_id
      INNER JOIN employee on employee.employee_id = buy_ticket.employee_id
      WHERE ticket_code = '$ticket_code' " or die("Error:" . mysqli_error());
      $result = mysqli_query($con, $query);

    ?> -->

  <body class="has1">
     <h3 class="has4">กำหนดการเดินทาง/Travel Itinerary</br></br>
      รหัสการซื้อตั๋ว Ticket Code : T04284 <span style="color:#F9D62E">(รอดำเนินการ)</span></h3>
      <center>
      <form>
      
        <div class="box-3">
          <b>ข้อมูลผู้โดยสาร</b><hr>
            
            <table>
            <?php
            echo " <tr>
              <th>ชื่อ - นามสกุล</th>
              <th>เบอร์โทรศัพท์</th>
              <th style='text-align:center'>ชั้น</th>
              <th style='text-align:center'>ฝั่ง</th>
              <th style='text-align:center'>ที่นั่ง</th>
            </tr>
            ";
            ?>

            <tr>
              <td>นาย พงศธร พัสมุณี</td>
              <td>012-3456789</td>
              <td style="text-align:center">T</td>
              <td style="text-align:center">R</td>
              <td style="text-align:center">21</td>
          </tr>

          <tr>
              <td>นาย ชัชพงศ์์ บวรธนสาร</td>
              <td>098-7654321</td>
              <td style="text-align:center">T</td>
              <td style="text-align:center">R</td>
              <td style="text-align:center">23</td>
          </tr>
          
        </table>
            
        </div>
        
      
        <div class="box-2">

          <div class="box-4">
                <b>ข้อมูลการเดินทาง</b><hr>

                <table style="overflow-x:auto;">
                  <tr>
                    <th class="th-2">ต้นทาง :</th>
                    <td>สุราษฎร์ธานี</td>
                  </tr>
                  <tr>
                    <th class="th-2">ปลายทาง :</th>
                    <td>เกาะเต่า</td>
                  </tr>
                  <tr>
                    <th class="th-2">วันที่ออกเดินทาง :</th>
                    <td>30/12/2020</td>
                  </tr>
                  <tr>
                    <th class="th-2">เวลาออกเรือ :</th>
                    <td>08.30 น.</td>
                  </tr>
                  <tr>
                    <th class="th-2">หมายเลขเรือ :</th>
                    <td>1</td>
                  </tr>
    
              </table>

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
            <a href='index.php'><button type="button" class="btn btn-danger">กลับไปยังหน้าแรก</button></a>
          </div>
      </form>
      </center>
            
      

       