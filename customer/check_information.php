<?php
session_start();
        if(isset($_POST['ticket_book'])){

            include('mysqli_connect.php');
            
            $ticket_book = $_POST['ticket_book'];

            $sql = "SELECT * FROM ticket_book AS t_b
            JOIN location AS i ON t_b.destination = i.location_id
            WHERE ticket_book_code = '$ticket_book' ";
            $result = mysqli_query($con,$sql);

            if(mysqli_num_rows($result)){
                $row = mysqli_fetch_array($result);
                    $_SESSION["ticket_book_code"] = $row["ticket_book_code"];
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
                        echo "window.location = 'show_information_cancel.php'; ";
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
                    echo 'alert(\' รหัสจองตั๋ว ไม่ถูกต้อง\');';
                    echo "window.location = 'status.php'; ";
                    echo "</script>";
                }
            }
?>