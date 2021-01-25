<?php
session_start();
foreach ($_SESSION['username'] as $key){
    echo('Session[username]:'.$key."<br>");
}
echo 'Session_id:'.session_id();
?>