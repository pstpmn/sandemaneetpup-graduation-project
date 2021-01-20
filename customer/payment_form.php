<?php include('header.php');?>


<style>
   .form {
      width: 48%;
      background: #ccc;
      padding: 20px;
      border: 1px solid black;
    }

    form ol {
      padding-left: 0;
    }

    form li, div > p {
      background: #eee;
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      list-style-type: none;
      border: 1px solid black;
    }

    .form img {
      height: auto;
      order: 1;
      width:auto; 
      max-width: auto; 
      max-height:130px; 
      margin-top:10px;
      
    }

    select[class=form-control] {
      width: 48%;
      margin-bottom: 15px;
      box-shadow: 0 3px 3px rgba(0, 0, 0, 0.034), 0 12.5px 10px rgba(0, 0, 0, 0.06);
    }

    button[class="btn btn-info"] {
      width: 20%;
      font-family: 'Kanit', sans-serif;
    }

    @media (max-width: 890px) {
    button[class="btn btn-info"] {
        width: 90%;
      }
    .form {
      width: 90%;
    }
    .form img {
      width:auto;
    }

    select[class=form-control] {
      width: 90%;
      margin-bottom: 15px;
    }
 }
  </style>

    <body class="has1">
        
        <h3 class="has3">ฟอร์มแจ้งชำระเงินสำหรับการโอนเงินผ่านบัญชีธนาคาร</h3>
        <form action="up_slip.php" method="POST" enctype="multipart/form-data" name="form1" id="form1"> 
          <center>
          <div class="form-group">
             
            <input type="text" class="form-control" id="ticket_code"  name="ticket_code" placeholder="รหัสการซื้อตั๋ว">

            <select  name='payment_bank' class="form-control" id=''>
              <option value="0">ธนคาร</option>
              <option value="ไทยพาณชย์">ไทยพาณชย์</option>
              <option value="กรุงศรี">กรุงศรี</option>
              <option value="กรุงไทย">กรุงไทย</option>
            </select>

            <input type="text" class="form-control" id="payment_time"  name="payment_time" placeholder="เวลาโอน">

            <input type="text" class="form-control" id="payment_amount"  name="payment_amount" placeholder="จำนวนเงิน">
        
            <!-- <input  id='date' class="form-control" name="datetime" value="<?php echo date('d/m/Y H:i')?>">
             -->
              <div class="form">
                  <input type='file' id="slip_img" name="slip_img" onchange="showMyImage(this)" />
                  <img id="slip" style="display:none;" src="" alt="logo" />
                  <br>

              </div>
                  <br>
                  <button type="submit" class="btn btn-info" id="upslip" name="submit"> ยืนยันการชำระเงิน </button>
          </div>
        </form>
        </center>

<script>
    function showMyImage(fileInput) {
      var files = fileInput.files;
        for (var i = 0; i < files.length; i++) {           
            var file = files[i];
            console.log(file.name);
            var imageType = /image.*/;     
            if (!file.type.match(imageType)) {
                continue;
            }           
            var img=document.getElementById("slip");            
            img.file = file;    
            var reader = new FileReader();
            reader.onload = (function(aImg) { 
                return function(e) { 
                    aImg.src = e.target.result; 
                }; 
            })(img);
            reader.readAsDataURL(file);
            slip.style.display = 'block';
        }
    }
  </script>