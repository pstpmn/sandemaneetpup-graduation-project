const getGraphBarCountCustomerY = async (json) => {
    let yearValue = [];
    let yearName = [];
    for (let i = 0; i < json.length; i++) {
        yearValue.push(json[i].yearValue);
        yearName.push(json[i].yearName);
    }

    var ctx = document.getElementById('myChart').getContext('2d');
    barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: yearName,
            datasets: [{
                label: 'จำนวนลูกค้า',
                data: yearValue,
                backgroundColor: [
                    "#2ecc71",
                    "#3498db",
                    "#95a5a6",
                    "#9b59b6",
                    "#f1c40f",
                    "#e74c3c",
                    "#34495e"
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
}


const getGraphPieCountCustomerY = async (json) => {
    let yearValue = [];
    let yearName = [];

    for (let i = 0; i < json.length; i++) {
        yearValue.push(json[i].yearValue);
        yearName.push(json[i].yearName);
    }


    let percent = calculatePercentage(yearValue)

    var ctxx = document.getElementById("PieChart").getContext('2d');
    pieChart = new Chart(ctxx, {
        type: 'pie',
        data: {
            labels: yearName,
            datasets: [{
                backgroundColor: [
                    "#2ecc71",
                    "#3498db",
                    "#95a5a6",
                    "#9b59b6",
                    "#f1c40f",
                    "#e74c3c",
                    "#34495e"
                ],
                data: percent
            }]
        }
    });
}


const getGraphBarCountCustomerD = async (json, week) => {
    let value = [];
    value.push(json[0].day1);
    value.push(json[0].day2)
    value.push(json[0].day3)
    value.push(json[0].day4)
    value.push(json[0].day5)
    value.push(json[0].day7)


    var ctx = document.getElementById('myChart').getContext('2d');
    barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: week,
            datasets: [{
                label: 'จำนวน',
                data: value,
                backgroundColor: [
                    "#2ecc71",
                    "#3498db",
                    "#95a5a6",
                    "#9b59b6",
                    "#f1c40f",
                    "#e74c3c",
                    "#34495e"
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
}


const getGraphPieCountCustomerD = async (json, week) => {
    let value = [];
    value.push(json[0].day1);
    value.push(json[0].day2)
    value.push(json[0].day3)
    value.push(json[0].day4)
    value.push(json[0].day5)
    value.push(json[0].day7)


    let percent = calculatePercentage(value)

    var ctxx = document.getElementById("PieChart").getContext('2d');
    pieChart = new Chart(ctxx, {
        type: 'pie',
        data: {
            labels: week,
            datasets: [{
                backgroundColor: [
                    "#2ecc71",
                    "#3498db",
                    "#95a5a6",
                    "#9b59b6",
                    "#f1c40f",
                    "#e74c3c",
                    "#34495e"
                ],
                data: percent
            }]
        }
    });
}




const getGraphPieCountCustomerW = async (json) => {
    let value = [];
    value.push(json[0].week1);
    value.push(json[0].week2)
    value.push(json[0].week3)
    value.push(json[0].week4)
    value.push(json[0].week5)


    let percent = calculatePercentage(value)

    var ctxx = document.getElementById("PieChart").getContext('2d');
    pieChart = new Chart(ctxx, {
        type: 'pie',
        data: {
            labels: ['สัปดาห์ 1', 'สัปดาห์ 2', 'สัปดาห์ 3', 'สัปดาห์ 4', 'สัปดาห์ 5'],
            datasets: [{
                backgroundColor: [
                    "#2ecc71",
                    "#3498db",
                    "#95a5a6",
                    "#9b59b6",
                    "#f1c40f",
                    "#e74c3c",
                    "#34495e"
                ],
                data: percent
            }]
        }
    });
}


const getGraphPieCountCustomerM = async (json) => {
    let value = [];
    
    value.push(json[0].month1);
    value.push(json[0].month2)
    value.push(json[0].month3)
    value.push(json[0].month4)
    value.push(json[0].month5)
    value.push(json[0].month6)
    value.push(json[0].month7)
    value.push(json[0].month8)
    value.push(json[0].month9)
    value.push(json[0].month10)
    value.push(json[0].month11)
    value.push(json[0].month12)


    let percent = calculatePercentage(value)

    var ctxx = document.getElementById("PieChart").getContext('2d');
    pieChart = new Chart(ctxx, {
        type: 'pie',
        data: {
            labels: ['เดือน 1', 'เดือน 2', 'เดือน 3', 'เดือน 4', 'เดือน 5', 'เดือน 6', 'เดือน 7', 'เดือน 8', 'เดือน 9', 'เดือน 10', 'เดือน 11', 'เดือน 12'],
            datasets: [{
                backgroundColor: [
                    "#2ecc71",
                    "#3498db",
                    "#95a5a6",
                    "#9b59b6",
                    "#f1c40f",
                    "#e74c3c",
                    "#34495e"
                ],
                data: percent
            }]
        }
    });
}



const getGraphBarCountCustomerW = async (json) => {
    let value = [];
   



    value.push(json[0].week1);
    value.push(json[0].week2)
    value.push(json[0].week3)
    value.push(json[0].week4)
    value.push(json[0].week5)

    var ctx = document.getElementById('myChart').getContext('2d');

    barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['สัปดาห์ 1', 'สัปดาห์ 2', 'สัปดาห์ 3', 'สัปดาห์ 4', 'สัปดาห์ 5'],
            datasets: [{
                label: 'สัปดาห์',
                data: value,
                backgroundColor: [
                    "#2ecc71",
                    "#3498db",
                    "#95a5a6",
                    "#9b59b6",
                    "#f1c40f",
                    "#e74c3c",
                    "#34495e"
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
}



const getGraphBarCountCustomerM = async (json) => {
    let value = [];
  

    value.push(json[0].month1);
    value.push(json[0].month2)
    value.push(json[0].month3)
    value.push(json[0].month4)
    value.push(json[0].month5)
    value.push(json[0].month6)
    value.push(json[0].month7)
    value.push(json[0].month8)
    value.push(json[0].month9)
    value.push(json[0].month10)
    value.push(json[0].month11)
    value.push(json[0].month12)


    var ctx = document.getElementById('myChart').getContext('2d');
    barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['เดือน 1', 'เดือน 2', 'เดือน 3', 'เดือน 4', 'เดือน 5', 'เดือน 6', 'เดือน 7', 'เดือน 8', 'เดือน 9', 'เดือน 10', 'เดือน 11', 'เดือน 12'],
            datasets: [{
                label: 'จำนวนตั๋ว',
                data: value,
                backgroundColor: [
                    "#2ecc71",
                    "#3498db",
                    "#95a5a6",
                    "#9b59b6",
                    "#f1c40f",
                    "#e74c3c",
                    "#34495e"
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
}
