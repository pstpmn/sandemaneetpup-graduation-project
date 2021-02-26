<?php
require 'header.php';
?>



	<canvas id="myChart"></canvas>
<script>
	let bookingId = [];
	let ticketId = [];
	$.post('model/apiTestReport.php', function(response) {
		let json = JSON.parse(response);
		for (i in json) {
			bookingId.push(json[i].ticket_book_code);
			ticketId.push(json[i].count);
		}
	})

	var ctx = document.getElementById('myChart').getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: bookingId,
			datasets: [{
				label: 'จำนวนตั๋ว',
				data: ticketId,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)'
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)'
				],
				pointRadius: 0,
				borderWidth: 1
			}]
		},
		options: {
			legend: {
				display: false
			},
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	});
</script>