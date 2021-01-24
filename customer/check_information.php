<?php
session_start();
        if(isset($_POST['ticket_code'])){

            include('mysqli_connect.php');
            
            $ticket_code = $_POST['ticket_code'];

            $sql = "SELECT * FROM buy_ticket AS buy_t
            JOIN location AS i ON buy_t.destination = i.location_id
            WHERE ticket_code = '$ticket_code' ";
            $result = mysqli_query($con,$sql);

            if(mysqli_num_rows($result)){
                $row = mysqli_fetch_array($result);
                    $_SESSION["ticket_code"] = $row["ticket_code"];
                    $_SESSION["ticket_status_id"] = $row["ticket_status_id"];                    
                    $_SESSION["destinatio"] = $row["location_name"];
                    

                    if($_SESSION["ticket_status_id"]== 1){
                        echo "<script>";
                        echo "window.location = 'show_information_success.php'; ";
                        echo "</script>";
                      }

                    if($_SESSION["ticket_status_id"]== 2){
                        echo "<script>";
                        echo "window.location = 'show_information_book.php'; ";
                        echo "</script>";
                      }

                    if($_SESSION["ticket_status_id"]== 3){
                        echo "<script>";
                        echo "window.location = '.php'; ";
                        echo "</script>";
                      }

                    if($_SESSION["ticket_status_id"]== 4){
                        echo "<script>";
                        echo "window.location = 'show_information_pending.php'; ";
                        echo "</script>";
                      }
            }
                else{
                    echo "<script>";
                    echo 'alert(\' รหัสการซื้อตั๋ว ไม่ถูกต้อง\');';
                    echo "window.location = 'status.php'; ";
                    echo "</script>";
                }
            }
?>