<?php
	require 'header.php';
?>

<canvas id="myChart" width="400" height="400"></canvas>


<script>
var ctx = document.getElementById("myChart").getContext("2d");

var data = {
  labels: ["Chocolate", "Vanilla", "Strawberry","Strawberry"],
  datasets: [{
    label: "Blue",
    backgroundColor: "blue",
    data: [3, 7, 4,5]
  }, {
    label: "Red",
    backgroundColor: "red",
    data: [4, 3, 5]
  }, {
    label: "Green",
    backgroundColor: "green",
    data: [7, 2, 6]
  }]
};

var myBarChart = new Chart(ctx, {
  type: 'bar',
  data: data,
  options: {
    barValueSpacing: 20,
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
        }
      }]
    }
  }
});

</script>