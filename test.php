<?php
require 'header.php';
$a = $_REQUEST;
print_r($a);
?>
<html>
	<title>Datatable Demo By fordev22.com </title>
	<head>
		<meta charset="utf-8">
		<link rel="stylesheet" type="text/css" href="css/jquery.dataTables.css">
		<script type="text/javascript" language="javascript" src="js/jquery.js"></script>
		<script type="text/javascript" language="javascript" src="js/jquery.dataTables.js"></script>
		<script type="text/javascript" language="javascript" >
			$(document).ready(function() {
				var dataTable = $('#employee-grid').DataTable( {
					"processing": true,
					"serverSide": true,
					"ajax":{
						url :"model/testtest copy.php", // json datasource
						type: "post",  // method  , by default get
						error: function(){  // error handling
							$(".employee-grid-error").html("");
							$("#employee-grid").append('<tbody class="employee-grid-error"><tr><th colspan="3">No data found in the server</th></tr></tbody>');
							$("#employee-grid_processing").css("display","none");
							
						}
					}
				} );
			} );
		</script>
		<style>
			div.container {
			    margin: 0 auto;
			    max-width:760px;
			}
			div.header {
			    margin: 100px auto;
			    line-height:30px;
			    max-width:760px;
			}
			body {
			    background: #f7f7f7;
			    color: #333;
			    font: 90%/1.45em "Helvetica Neue",HelveticaNeue,Verdana,Arial,Helvetica,sans-serif;
			}
		</style>
	</head>
	<body>
		<div class="header"><h1>DataTable demo (Server side) in Php,Mysql and Ajax By fordev22.com  </h1></div>
		<div class="container">
			<table id="employee-grid"  cellpadding="0" cellspacing="0" border="0" class="display" width="100%">
					<thead>
						<tr>
						<th>รหัสการจอง</th>
                                    <th>ประเภทตั๋ว</th>
                                    <th>พนักงาน</th>
                                    <th>เวลาซื้อตั๋ว</th>
                                    <th>สิ้นสุดเวลาจอง</th>
                                    <th>วันที่ขึ้นเรือ</th>
                                    <th>สถานะ</th>
                                    <th>รูปภาพสลิป</th>
                                    <th>เวลาอัพสลิป</th>
						</tr>
					</thead>
			</table>
		</div>
	</body>
</html>