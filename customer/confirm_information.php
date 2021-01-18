<?php include('header.php');?>

<style>
form {
  width: 50%;
}
button[class="btn btn-success"],
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
  form{
    width: 100%;
  }
  button[class="btn btn-success"],
  button[class="btn btn-danger"] {
       width: 90%;
       margin-bottom: 10px;
     }
}
@media (max-width: 590px) {
  form{
    width: 100%;
  }
  button[class="btn btn-success"],
  button[class="btn btn-danger"] {
       width: 90%;
       margin-bottom: 10px;
     }
}
</style>

  <body class="has1">
     <h3 class="has4">กำหนดการเดินทาง/Travel Itinerary</br></h3>
      <center>
      <form>
      
        <div class="box-3">
          <b>ข้อมูลผู้โดยสาร</b><hr>
            
            <table>
            <tr>
              <th>ชื่อ - นามสกุล</th>
              <th>เบอร์โทรศัพท์</th>
              <th style="text-align:center">ชั้น</th>
              <th style="text-align:center">ฝั่ง</th>
              <th style="text-align:center">ที่นั่ง</th>
            </tr>
            
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
            <a href='confirm_show_information.php'><button type="button" class="btn btn-success">ยืนยันข้อมูล</button></a>
            <a href='index.php'><button type="button" class="btn btn-danger">กลับไปยังหน้าแรก</button></a>
          </div>
      </form>
      </center>
            
      

       