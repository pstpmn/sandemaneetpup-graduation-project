<?php
session_start();
        if(isset($_POST['ticket_code'])){

            include('mysqli_connect.php');
            
            $ticket_code = $_POST['ticket_code'];

            $sql = "SELECT * FROM buy_ticket AS buy_t
            -- JOIN location AS o ON buy_t.orgin = o.location_id
            JOIN boat_seat AS b ON buy_t.boat_seat_id = b.boat_seat_id
            WHERE ticket_code = '$ticket_code' ";
            $result = mysqli_query($con,$sql);

            if(mysqli_num_rows($result)){
                $row = mysqli_fetch_array($result);
                    $_SESSION["ticket_status_id"] = $row["ticket_status_id"];
                    $_SESSION["buy_ticket_id"] = $row["buy_ticket_id"];
                    $_SESSION["ticket_code"] = $row["ticket_code"];
                    
                    $_SESSION["floor"] = $row["floor"];
                    $_SESSION["boat_seat_number"] = $row["boat_seat_number"];
                    $_SESSION["boat_seat_type"] = $row["boat_seat_type"];
                    $_SESSION["boat_number"] = $row["boat_number"];
                    

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