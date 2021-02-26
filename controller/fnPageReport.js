const setBtnReportType = (btn) => {
    if (btn.getAttribute('name') == 'day') {
        document.getElementById('btnDay').setAttribute('class', 'btn btn-success')
        document.getElementById('btnWeek').setAttribute('class', 'btn btn-warning')
        document.getElementById('btnMonth').setAttribute('class', 'btn btn-warning')
        document.getElementById('btnYear').setAttribute('class', 'btn btn-warning')

        document.getElementById('container-ReportType').innerHTML = "<select id='txtWeek' class='custom-select'><option value='1'>สัปดาห์ 1</option><option value='2'>สัปดาห์ 2</option><option value='3'>สัปดาห์ 3</option>"
        +"<option  value='4'>สัปดาห์ 4</option><option  value='5'>สัปดาห์ 5</option></select><br><br>"
        document.getElementById('container-ReportType').innerHTML += "<input id='txtDate' type='month' class='custom-select' value='2021-01'>";
    }
    else if (btn.getAttribute('name') == 'week') {
        document.getElementById('btnWeek').setAttribute('class', 'btn btn-success')
        document.getElementById('btnDay').setAttribute('class', 'btn btn-warning')
        document.getElementById('btnMonth').setAttribute('class', 'btn btn-warning')
        document.getElementById('btnYear').setAttribute('class', 'btn btn-warning')

        document.getElementById('container-ReportType').innerHTML = "<input id='txtDate' type='month' class='custom-select' value='2021-01'>";

    }
    else if (btn.getAttribute('name') == 'month') {
        document.getElementById('btnMonth').setAttribute('class', 'btn btn-success')
        document.getElementById('btnWeek').setAttribute('class', 'btn btn-warning')
        document.getElementById('btnDay').setAttribute('class', 'btn btn-warning')
        document.getElementById('btnYear').setAttribute('class', 'btn btn-warning')

        document.getElementById('container-ReportType').innerHTML = "<input id='txtDate' type='number' placeholder='ใส่เป็น ค.ศ เช่น 2021'class='custom-select'>";

    }
    else if (btn.getAttribute('name') == 'year') {
        document.getElementById('btnYear').setAttribute('class', 'btn btn-success')
        document.getElementById('btnMonth').setAttribute('class', 'btn btn-warning')
        document.getElementById('btnWeek').setAttribute('class', 'btn btn-warning')
        document.getElementById('btnDay').setAttribute('class', 'btn btn-warning')
        document.getElementById('container-ReportType').innerHTML = "";
    }
}

const getGraph = async () => {
    let date;
    date = document.getElementById('txtDate').value;
    var value = [];
    if (document.getElementById('btnDay').getAttribute('class') == 'btn btn-success') {
        getGraphgetGraphBarCountCustomerD(date,document.getElementById('txtWeek').value);
    }
    else if (document.getElementById('btnMonth').getAttribute('class') == 'btn btn-success') {
        getGraphBarCountCustomerM(date);
        getGraphPieCountCustomerM(date);
    }
    else if (document.getElementById('btnWeek').getAttribute('class') == 'btn btn-success') {
        getGraphBarCountCustomerW(date);
        getGraphPieCountCustomerW(date);

    }
    else if (document.getElementById('btnYear').getAttribute('class') == 'btn btn-success') { }

}

const calculatePercentage = (array) => {
    let sum = sumArray(array)
    let listPercentage = [];
    for (let i = 0; i < array.length; i++) {

        listPercentage.push(Math.round((array[i] / sum) * 100));
    }
    return listPercentage;
}



const getGraphgetGraphBarCountCustomerD = async(date,week) =>{
    let value = [];
    if (barChart != null) {
        barChart.destroy();
    }
    let dayToweek = [];
    if(week == 1){
        dayToweek = ['วันที่ 1','วันที่ 2','วันที่ 3','วันที่ 4','วันที่ 5','วันที่ 6','วันที่ 7'];
    }
    else if(week == 2){
        dayToweek = ['วันที่ 8','วันที่ 9','วันที่ 10','วันที่ 11','วันที่ 12','วันที่ 13','วันที่ 14'];
    }
    else if(week == 3){
        dayToweek = ['วันที่ 15','วันที่ 16','วันที่ 17','วันที่ 18','วันที่ 19','วันที่ 20','วันที่ 21'];
    }
    else if(week == 4){
        dayToweek = ['วันที่ 22','วันที่ 23','วันที่ 24','วันที่ 25','วันที่ 26','วันที่ 27','วันที่ 28'];
    }
    else if(week == 5){
        dayToweek = ['วันที่ 29','วันที่ 30','วันที่ 31'];
    }

    let response = await fetch('model/report/apiGetReportNewCustomerD.php', {
        method: "POST",
        body: JSON.stringify({
            date: date,
            week:week
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    json = await response.json();
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


const getGraphPieCountCustomerW = async (date) => {
    if (pieChart != null) {
        pieChart.destroy();
    }
    let value = [];
    let response = await fetch('model/report/apiGetReportNewCustomerW.php', {
        method: "POST",
        body: JSON.stringify({
            date: date
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    json = await response.json();
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
    if (barChart != null) {
        barChart.destroy();
    }

    let response = await fetch('model/report/apiGetReportNewCustomerW.php', {
        method: "POST",
        body: JSON.stringify({
            date: date
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    json = await response.json();
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


const sumArray = (array) => {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += parseInt(array[i]);
    }

    return sum;
}