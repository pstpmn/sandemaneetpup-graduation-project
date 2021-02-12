<body class="sb-nav-fixed">
    <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <a class="navbar-brand" href="index.html">
            <center><?php echo $_SESSION["statusName"]; ?><br> SANDEMANEETPUP</center>
        </a>
        <button class="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" href="#"><i class="fas fa-bars"></i></button>
        <!-- Navbar Search-->
        <form class="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
            <div class="input-group">
                <div class="input-group-append">
                </div>
            </div>
        </form>
        <!-- Navbar-->
        <ul class="navbar-nav ml-auto ml-md-0">
            <li class="nav-item dropdown">
            </li>
        </ul>
    </nav>
    <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
            <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div class="sb-sidenav-menu">
                    <div class="nav">
                        <div class="sb-sidenav-menu-heading">Core</div>
                        <a class="nav-link" href="home.php">
                            <div class="sb-nav-link-icon"><i class="fas fa-home"></i></div>
                            หน้าหลัก
                        </a>
                        <div class="sb-sidenav-menu-heading">ระบบเบื้องต้น</div>

                        <a class="nav-link collapsed" href="save.php">
                            <div class="sb-nav-link-icon"><i class="fas fa-save"></i></div>
                            บันทึกตั๋ว
                        </a>

                        <a class="nav-link collapsed" href="cancel.php">
                            <div class="sb-nav-link-icon"><i class="fas fa-trash-alt"></i></div>
                            ยกเลิกตั๋ว
                        </a>

                        <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                            <div class="sb-nav-link-icon"><i class="fas fa-edit"></i></div>
                            แก้ไข
                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                        </a>


                        <div class="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav">
                                <a class="nav-link" href="ticket.php">ตั๋ว</a>
                                <a class="nav-link" href="customer.php">ลูกค้า</a>
                            </nav>
                        </div>

                        <a class="nav-link collapsed" href="scanQRCode.php">
                            <div class="sb-nav-link-icon"><i class="fas fa-barcode"></i></div>
                            สแกน QR Code
                        </a>

                        <a class="nav-link collapsed" href="validatedSlip.php">
                            <div class="sb-nav-link-icon"><i class="fas fa-dlist"></i></div>
                            <label id="count-slip-navbar">สลิปโอนเงิน&nbsp;</label>
                            <script>
                                getCountSlipNoValidate()
                            </script>
                        </a>

                        <div class="sb-sidenav-menu-heading">ระบบรายงานผลลัพธ์</div>
                        <a class="nav-link" href="">
                            <div class="sb-nav-link-icon"><i class="fas fa-chart-area"></i></div>
                            สรุปผลลัพธ์ (ยังไม่ทำ)
                        </a>
                        <div class="sb-sidenav-menu-heading">ระบบจัดการ Admin</div>

                        <a class="nav-link" href="employee.php">
                            <div class="sb-nav-link-icon"><i class="fas fa-user-cog"></i></div>
                            จัดการพนักงาน
                        </a>

                        <a class="nav-link" href="location.php">
                            <div class="sb-nav-link-icon"><i class="far fa-compass"></i></div>
                            จัดการสถานที่
                        </a>

                        <a class="nav-link" href="boat.php">
                            <div class="sb-nav-link-icon"><i class="fas fa-ship"></i></div>
                            จัดการเรือ
                        </a>

                        <a class="nav-link" href="dayOff.php">
                            <div class="sb-nav-link-icon"><i class="far fa-calendar-alt"></i></div>
                            จัดการวันหยุดงาน
                        </a>

                        <a class="nav-link" href="book.php">
                            <div class="sb-nav-link-icon"><i class="far fa-hourglass"></i></div>
                            จัดการเวลาจองตั๋ว
                        </a>

                        <a class="nav-link" href="ticketPrice.php">
                            <div class="sb-nav-link-icon"><i class="fas fa-dollar-sign"></i></div>
                            จัดการราคาตั๋ว
                        </a>
                    </div>
                </div>
                <div class="sb-sidenav-footer">
                    
                    <div class="">Logged in : <?php echo $_SESSION["username"]; ?></div>
                    <div class='small' style="text-align:right"><a href="logout.php">ออกจากระบบ</a></div>
                </div>
            </nav>
        </div>