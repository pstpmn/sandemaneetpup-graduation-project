<?php
date_default_timezone_set('Asia/Bangkok');
require 'header.php';
require 'controller/database.php';
require 'model/confix.php';
require 'navbar.php';
$database = new database(IP, DBNAME, USER, PASS);


$booking = $database->select("select count(ticket_book_id) from ticket_book where time_buy_ticket LIKE '" . date("Y-m-d") . "%'  ");
$ticket = $database->select("select count(buy_ticket.buy_ticket_id) from buy_ticket
join ticket_book on ticket_book.ticket_book_id = buy_ticket.ticket_book_id
where ticket_book.time_buy_ticket LIKE '" . date("Y-m-d") . "%'  ");
$money = $database->select("select sum(total_price) from ticket_book where time_buy_ticket LIKE '" . date("Y-m-d") . "%'  ");
$waitToPay = $database->select("select count(ticket_book_id) from ticket_book 
where ticket_status_id = 2 AND deadline_book >= NOW()");
$thanPaidDate = $database->select("select count(ticket_book_id) from ticket_book 
where travel_date LIKE '" . date("Y-m-d") . "%' AND ticket_status_id = 2 AND deadline_book < NOW()");

$boat = $database->select("SELECT boat.boat_number , boat.boat_name, COUNT(boat_seat.boat_seat_number) as count FROM boat_seat
join boat on boat.boat_number = boat_seat.boat_number 
GROUP BY boat_seat.boat_number");

$rankLocation = $database->select("SELECT location.location_name , COUNT(destination) as count 
FROM ticket_book 
JOIN location on location.location_id = ticket_book.destination 
GROUP BY destination 
ORDER by COUNT(destination) DESC
")

?>
<title>Dashboard</title>

<!-- Body Implement -->
<style>
    input[type='radio'] {
        display: inline;
        width: 30%;
    }
</style>

<div id="layoutSidenav_content">
    <main>
        <div class="container-fluid">
            <div class="container-fluid">
                <h1 class="mt-4">Dashboard</h1>

                <div class="row">
                    <div class="col-xl-3 col-md-6">
                        <div class="card bg-primary text-white mb-4">
                            <div class="card-body">
                                <h5>จำนวนการซื้อตั๋ววันนี้ </h5>
                                การจอง : <?php echo $booking[0][0] ?> &nbsp;&nbsp;|&nbsp;&nbsp; ตั๋ว : <?php echo $ticket[0][0] ?> ใบ
                                <?php
                                ?>
                            </div>
                        </div>
                    </div>


                    <div class="col-xl-3 col-md-6">
                        <div class="card bg-success text-white mb-4">
                            <div class="card-body">
                                <h5>จำนวนรายได้วันนี้ </h5>
                                <?php echo $money[0][0] ?> บาท
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-3 col-md-6">
                        <div class="card text-white mb-4" style="background-color: #929C98;">
                            <div class="card-body">
                                <h5>จำนวนตั๋วรอการชำระเงิน </h5>
                                <?php echo $waitToPay[0][0] ?> การจอง
                            </div>
                        </div>
                    </div>


                    <div class="col-xl-3 col-md-6">
                        <div class="card bg-danger text-white mb-4">
                            <div class="card-body">
                                <h5>ตั๋วที่เลยเวลาชำระเงินวันนี้ </h5>
                                <?php echo $thanPaidDate[0][0] ?> การจอง
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-8 mb-4" style="height: 250px;">
                        <!-- Billing card 1-->
                        <div class="card h-100 border-left-lg border-left-primary">

                            <div class="card-body" style="overflow:auto;text-align:center">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">หมายเลขเรือ</th>
                                            <th scope="col">ชื่อเรือ</th>
                                            <th scope="col">จำนวนที่นั่งว่างวันนี้</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php
                                        for ($i = 0; $i < count($boat); $i++) {
                                            echo "<tr>";
                                            echo "<td>" . ($i + 1) . "</td>";
                                            echo "<td>" . $boat[$i]["boat_number"] . "</td>";
                                            echo "<td>" . $boat[$i]["boat_name"] . "</td>";

                                            $seat = $database->select("SELECT count(buy_ticket.buy_ticket_id) as count FROM buy_ticket
                                                JOIN boat_seat on boat_seat.boat_seat_id = buy_ticket.boat_seat_id
                                                join ticket_book on ticket_book.ticket_book_id = buy_ticket.ticket_book_id
                                                WHERE boat_seat.boat_number = " . $boat[$i]["boat_number"] . " AND
                                                ticket_book.travel_date like '" . date("Y-m-d") . "%' ");

                                            echo "<td>" . $boat[$i]["count"] - $seat[0]["count"] . " / " . $boat[$i]["count"] . "</td>";
                                            echo "</tr>";
                                        }

                                        ?>
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>

                    <div class="col-lg-4 mb-4" style="height: 250px;">
                        <!-- Billing card 1-->
                        <div class="card h-100 border-left-lg border-left-primary">
                            <div class="card-body" style="background:lightskyblue">
                                <center>
                                    <i>
                                        <h5>อันดับ location ที่ลูกค้าไปมากที่สุด</h5>
                                    </i>
                                </center>
                                <table class="table table-hover">
                                    <?php
                                        for($i=0;$i<count($rankLocation);$i++){
                                            echo "<tr>";
                                            echo "<td>อันดับ ".($i+1)."</td>";
                                            echo "<td>".$rankLocation[$i]['location_name']."</td>";
                                            echo "</tr>";

                                        }
                                    ?>
                                </table>
                            </div>
                        </div>
                    </div>


                </div>

            </div>




        </div>


    </main>


    <!--  Finish -->
    <?php
    require 'footer.php';
    ?>