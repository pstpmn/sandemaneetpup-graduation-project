<?php session_start();
session_id();
?>
<?php
require '../controller/database.php';
require 'confix.php';

if (isset($_POST['username'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $database = new database(IP, DBNAME, USER, PASS);
    $qeueryData = $database->select('select * from employee
    join employee_category on employee_category.employee_category_id = employee.employee_category_id
     where username = "' . $username . '" AND password = "' . $password . '" ');

    if (count($qeueryData) > 0) {
        $_SESSION["username"] = $qeueryData[0]['username'];
        $_SESSION["statusName"] = $qeueryData[0]['employee_category_name'];
        $_SESSION["statusId"] = $qeueryData[0]['employee_category_id'];
        $_SESSION["fullName"] = $qeueryData[0]['emp_first_name'] . " " . $qeueryData[0]['emp_last_name'];
        Header("Location: ../home.php");
    } else {
        echo "<script>alert(\" user หรือ  password ไม่ถูกต้อง\")</script>";
        echo "<script>window.history.back()</script>";
    }
}
