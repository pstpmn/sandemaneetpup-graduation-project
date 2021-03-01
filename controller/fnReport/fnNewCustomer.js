const getGraphBarCountCustomerY = async () => {
    let yearValue = [];
    let yearName = [];
    let response;
    let json;
    if (barChart != null) {
        barChart.destroy();
    }

    try {
        response = await fetch('model/report/apiGetReportNewCustomerY.php', {
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        json = await response.json();
    } catch (err) {
        alert('เกิดข้อผิดพลาดในการติดต่อกับ API web Service ');
        return;
    }
    if (json.length <= 0) {
        alert("ไม่มีข้อมูลรายการ");
        return;
    }
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


const getGraphPieCountCustomerY = async () => {
    let yearValue = [];
    let yearName = [];
    let response;
    let json;

    if (pieChart != null) {
        pieChart.destroy();
    }

    try {
        response = await fetch('model/report/apiGetReportNewCustomerY.php', {
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        json = await response.json();
    } catch (err) {
        alert('เกิดข้อผิดพลาดในการติดต่อกับ API web Service ');
        return;
    }

    if (json.length <= 0) {
        alert("ไม่มีข้อมูลรายการ");
        return;
    }
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


const getGraphBarCountCustomerD = async (date, week) => {
    let value = [];
    let dayToweek = [];
    let response;
    let json;
    let checkCountJson = false;

    try {
        response = await fetch('model/report/apiGetReportNewCustomerD.php', {
            method: "POST",
            body: JSON.stringify({
                date: date,
                week: week
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        json = await response.json();
    } catch (err) {
        alert('เกิดข้อผิดพลาดในการติดต่อกับ API web Service ');
        return;
    }

    //check data
    for (let i = 0; i < 7; i++) {
        if (json[0][i] != 0) {
            checkCountJson = true;
            break;
        }
    }
    if (checkCountJson != true) {
        alert("ไม่มีข้อมูลรายการสัปดาห์นี้");
        return;
    }

    if (barChart != null) {
        barChart.destroy();
    }

    if (week == 1) {
        dayToweek = ['วันที่ 1', 'วันที่ 2', 'วันที่ 3', 'วันที่ 4', 'วันที่ 5', 'วันที่ 6', 'วันที่ 7'];
    }
    else if (week == 2) {
        dayToweek = ['วันที่ 8', 'วันที่ 9', 'วันที่ 10', 'วันที่ 11', 'วันที่ 12', 'วันที่ 13', 'วันที่ 14'];
    }
    else if (week == 3) {
        dayToweek = ['วันที่ 15', 'วันที่ 16', 'วันที่ 17', 'วันที่ 18', 'วันที่ 19', 'วันที่ 20', 'วันที่ 21'];
    }
    else if (week == 4) {
        dayToweek = ['วันที่ 22', 'วันที่ 23', 'วันที่ 24', 'วันที่ 25', 'วันที่ 26', 'วันที่ 27', 'วันที่ 28'];
    }
    else if (week == 5) {
        dayToweek = ['วันที่ 29', 'วันที่ 30', 'วันที่ 31'];
    }
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
            labels: dayToweek,
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


const getGraphPieCountCustomerD = async (date, week) => {
    let value = [];
    let dayToweek = [];
    let checkCountJson = false;
    let response;
    let json;

    try {
        response = await fetch('model/report/apiGetReportNewCustomerD.php', {
            method: "POST",
            body: JSON.stringify({
                date: date,
                week: week
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        json = await response.json();
    } catch (err) {
        alert('เกิดข้อผิดพลาดในการติดต่อกับ API web Service ');
        return;
    }

    //check data
    for (let i = 0; i < 7; i++) {
        if (json[0][i] != 0) {
            checkCountJson = true;
            break;
        }
    }
    if (checkCountJson != true) {
        return;
    }

    if (pieChart != null) {
        pieChart.destroy();
    }

    if (week == 1) {
        dayToweek = ['วันที่ 1', 'วันที่ 2', 'วันที่ 3', 'วันที่ 4', 'วันที่ 5', 'วันที่ 6', 'วันที่ 7'];
    }
    else if (week == 2) {
        dayToweek = ['วันที่ 8', 'วันที่ 9', 'วันที่ 10', 'วันที่ 11', 'วันที่ 12', 'วันที่ 13', 'วันที่ 14'];
    }
    else if (week == 3) {
        dayToweek = ['วันที่ 15', 'วันที่ 16', 'วันที่ 17', 'วันที่ 18', 'วันที่ 19', 'วันที่ 20', 'วันที่ 21'];
    }
    else if (week == 4) {
        dayToweek = ['วันที่ 22', 'วันที่ 23', 'วันที่ 24', 'วันที่ 25', 'วันที่ 26', 'วันที่ 27', 'วันที่ 28'];
    }
    else if (week == 5) {
        dayToweek = ['วันที่ 29', 'วันที่ 30', 'วันที่ 31'];
    }


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




const getGraphPieCountCustomerW = async (date) => {
    let value = [];
    let checkCountJson = false;
    let response;
    let json;

    try {
        response = await fetch('model/report/apiGetReportNewCustomerW.php', {
            method: "POST",
            body: JSON.stringify({
                date: date
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        json = await response.json();
    } catch (err) {
        alert('เกิดข้อผิดพลาดในการติดต่อกับ API web Service ');
        return;
    }
    //check data
    for (let i = 0; i < 5; i++) {
        if (json[0][i] != 0) {
            checkCountJson = true;
            break;
        }
    }
    if (checkCountJson != true) {
        alert('ไม่พบข้อมูลของเดือนนี้')
        return;
    }
    if (pieChart != null) {
        pieChart.destroy();
    }


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


const getGraphPieCountCustomerM = async (date) => {
    if (pieChart != null) {
        pieChart.destroy();
    }

    let value = [];
    let response = await fetch('model/report/apiGetReportNewCustomerM.php', {
        method: "POST",
        body: JSON.stringify({
            date: date
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    json = await response.json();
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



const getGraphBarCountCustomerW = async (date) => {
    let value = [];
    let checkCountJson = false;
    let response;
    let json;

    try {
        response = await fetch('model/report/apiGetReportNewCustomerW.php', {
            method: "POST",
            body: JSON.stringify({
                date: date
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        json = await response.json();
    } catch (err) {
        alert('เกิดข้อผิดพลาดในการติดต่อกับ API web Service ');
        return;
    }
    //check data
    for (let i = 0; i < 5; i++) {
        if (json[0][i] != 0) {
            checkCountJson = true;
            break;
        }
    }
    if (checkCountJson != true) {
        return;
    }
    if (pieChart != null) {
        pieChart.destroy();
    }


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



const getGraphBarCountCustomerM = async (date) => {
    let value = [];
    if (barChart != null) {
        barChart.destroy();
    }

    let response = await fetch('model/report/apiGetReportNewCustomerM.php', {
        method: "POST",
        body: JSON.stringify({
            date: date
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    json = await response.json();
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
