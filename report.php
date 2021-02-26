<?php
//validated the report

if (isset($_GET['reportType']) == true && $_GET['reportType'] == "income") {
} else if (isset($_GET['reportType']) == true && $_GET['reportType'] == "checkIn") {
} else if (isset($_GET['reportType']) == true && $_GET['reportType'] == "newCustomer") {
} else if (isset($_GET['reportType']) == true && $_GET['reportType'] == "ticketStatus") {
} else if (isset($_GET['reportType']) == true && $_GET['reportType'] == "ticketCatagory") {
} else {
    header("Location:home.php");
}


require 'header.php';
require 'navbar.php';
?>
<script>
    var barChart;
    var pieChart;
</script>
<title>Report</title>
<div id="layoutSidenav_content">
    <main>
        <div class="container-fluid">
            <h1 class="mt-4">
                <center>Report System</center>
            </h1><br>


            <div class="container p-3 my-3 border bg-white">
                <h1 class="h3 mb-2 text-gray-800">เลือกประเภท</h1>
                <button class="btn btn-warning" onclick="setBtnReportType(this)" name='day' id='btnDay'>รายวัน</button> <button onclick="setBtnReportType(this)" id='btnWeek' name='week' class="btn btn-warning">รายสัปดาห์</button>
                <button class="btn btn-warning" id='btnMonth' name='month' onclick="setBtnReportType(this)">รายเดือน</button>
                <button class="btn btn-warning" id='btnYear' name='year' onclick="setBtnReportType(this)">รายปี</button>
                <br><br>
                <div id='container-ReportType'>
                    <input type="text" class="form-control" disabled placeholder="กรุณาเลือกประเภทก่อนน">
                </div>
                <br>
                <button class="btn btn-info" onclick="getGraph()">แสดงข้อมูล</button>
            </div>


            <div class="container" style="padding:0;">
                <sbpro-card _ngcontent-jvv-c126="" _nghost-jvv-c73="">
                    <div _ngcontent-jvv-c73="" class="card mb-4 card-header-actions h-100">
                        <div _ngcontent-jvv-c126="" class="card-header">Bar Chart
                        </div>
                        <div _ngcontent-jvv-c126="" class="card-body">
                            <canvas id="myChart"></canvas>

                        </div>
                    </div>
                </sbpro-card>
            </div>



            <br>
            <div class="container" style="padding:0;">
                <div _ngcontent-jvv-c126="" class="row">
                    <div _ngcontent-jvv-c126="" class="col-lg-6 mb-4">
                        <sbpro-card _ngcontent-jvv-c126="" _nghost-jvv-c73="">
                            <div _ngcontent-jvv-c73="" class="card mb-4 card-header-actions h-100">
                                <div _ngcontent-jvv-c126="" class="card-header">Pie Chart
                                </div>
                                <div _ngcontent-jvv-c126="" class="card-body" style="height: 290px;">
                                    <canvas id="PieChart"></canvas>

                                </div>
                            </div>
                        </sbpro-card>
                    </div>
                    <div _ngcontent-jvv-c126="" class="col-lg-6 mb-4">
                        <sbpro-card _ngcontent-jvv-c126="" _nghost-jvv-c73="">
                            <div _ngcontent-jvv-c73="" class="card mb-4 card-header-actions h-100">
                                <div _ngcontent-jvv-c126="" class="card-header">Detail</div>
                                <div _ngcontent-jvv-c126="" class="card-body" style="height: 290px;">
                                </div>
                            </div>
                        </sbpro-card>
                    </div>
                </div>
            </div>
            <br>
        </div>
    </main>
    <?php
    require 'footer.php';
    ?>