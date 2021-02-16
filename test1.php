<?php
session_start();
$_SESSION["admin"] = 1;
$_SESSION['gm'] = 6; 
$_SESSION["username"] = "asdsa";

echo $_SESSION["admin"];

?>