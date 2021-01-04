<script langauge="JavaScript">
// แสดงฟังก์ชั่นต่างๆ เกี่ยวกับเวลา
// สร้างตัวแปรต่างๆ พร้อมกับการเรียกใช้ฟังก์ชัน
 
var right_now=new Date();
// สร้างตัวแปรเพื่อใช้กับวันที่และเวลาโดยเฉพาะชื่อ right_now
 
document.write(Date());
// แสดงผลลัพธ์ของฟังก์ชัน Date(); 
// ตัวอย่างผลลัพธิ์ที่ได้  Mon Aug 18 11:38:38 2008
 
document.write(right_now.getFullYear());
// แสดงผลลัพธ์ของฟังก์ชัน getYear() โดยใช้ข้อมูลจากตัวแปร right_now
// ตัวอย่างผลลัพธิ์ที่ได้  2008 ซึ่งเป็นปีปัจจุบัน จากMon Aug 18 11:38:38 2008
  
document.write(right_now.getMonth()+1);
// แสดงผลลัพธ์ของฟังก์ชัน getMonth() โดยใช้ข้อมูลจากตัวแปร right_now
// ตัวอย่างผลลัพธิ์ที่ได้  8 เป็นตัวเลขเดือนปัจจุบันจากMon Aug 18 11:38:38 2008
 
document.write(right_now.getDate());
// แสดงผลลัพธ์ของฟังก์ชัน getDate() โดยใช้ข้อมูลจากตัวแปร right_now
// ตัวอย่างผลลัพธิ์ที่ได้  18 ซึ่งเป็นวันที่จาก Mon Aug 18 11:38:38 2008
 
document.write(right_now.getHours());
// แสดงผลลัพธ์ของฟังก์ชัน getHours() โดยใช้ข้อมูลจากตัวแปร right_now
// ตัวอย่างผลลัพธิ์ที่ได้  11 ซึ่งเป็นเวลาชั่วโมงจาก Mon Aug 18 11:38:38 2008
 
document.write(right_now.getMinutes());
// แสดงผลลัพธ์ของฟังก์ชัน getMinutes() โดยใช้ข้อมูลจากตัวแปร right_now
// ตัวอย่างผลลัพธิ์ที่ได้  38 ซึ่งเป็นเวลานาทีจาก Mon Aug 18 11:38:38 2008
 
document.write(right_now.getSeconds());
// แสดงผลลัพธ์ของฟังก์ชัน getSeconds() โดยใช้ข้อมูลจากตัวแปร right_now
// ตัวอย่างผลลัพธิ์ที่ได้  38 ซึ่งเป็นเวลาวินาทีจาก Mon Aug 18 11:38:38 2008
 
// -->
</script>