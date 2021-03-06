const setBtnReportType = (btn) => {
    if (btn.getAttribute('name') == 'day') {
        document.getElementById('btnDay').setAttribute('class', 'btn btn-success')
        document.getElementById('btnWeek').setAttribute('class', 'btn btn-warning')
        document.getElementById('btnMonth').setAttribute('class', 'btn btn-warning')
        document.getElementById('btnYear').setAttribute('class', 'btn btn-warning')

        document.getElementById('container-ReportType').innerHTML = "<select id='txtWeek' class='custom-select'><option value='1'>สัปดาห์ 1</option><option value='2'>สัปดาห์ 2</option><option value='3'>สัปดาห์ 3</option>"
            + "<option  value='4'>สัปดาห์ 4</option><option  value='5'>สัปดาห์ 5</option></select><br><br>"
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

const getGraph = async (typeGraph) => {
    let btnType;
    if (document.getElementById('btnDay').getAttribute('class') == 'btn btn-success') btnType = "day";
    else if (document.getElementById('btnWeek').getAttribute('class') == 'btn btn-success') btnType = "week";
    else if (document.getElementById('btnMonth').getAttribute('class') == 'btn btn-success') btnType = "month";
    else if (document.getElementById('btnYear').getAttribute('class') == 'btn btn-success') btnType = "year";
    else {
        return alert('กรุณาเลือก ประเภทการ Report ก่อน !!')
    }

    // check chart if have will destory chart
    if (pieChart != null) {
        pieChart.destroy();
    }
    if (barChart != null) {
        barChart.destroy();
    }
    // calling Funcsion specifically Report Type
    if (typeGraph == "newCustomer") getGraphCustomer(btnType);
    else if (typeGraph == "countTicket") getGraphCountTicket(btnType);
    else if (typeGraph == "income") getGraphIncome(btnType);
    else if (typeGraph == "ticketCategory") getGraphTicketCategory(btnType);
    else if (typeGraph == "checkIn") getGraphCheckIn(btnType);
    else if (typeGraph == "confirmIdentity") getGraphConfirmIdentity(btnType);

}

const calculatePercentage = (array) => {
    let sum = sumArray(array)
    let listPercentage = [];
    for (let i = 0; i < array.length; i++) {
        listPercentage.push(Math.round((array[i] / sum) * 100));
    }
    return listPercentage;
}

const sumArray = (array) => {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += parseInt(array[i]);
    }
    return sum;
}

const showContainerGraph = () => {
    document.getElementById('showGraph').style.display = 'block';
}
const hideContainerGraph = () => {
    document.getElementById('showGraph').style.display = 'none';
}



const getGraphBar = async (labels, value) => {
    var ctx = document.getElementById('myChart').getContext('2d');
    if (typeof value.datasets == "object") {
        barChart = new Chart(ctx, {
            type: 'bar',
            data: value,
            options: {
                legend: {
                    display: false,
                    labels: {
                        display: false
                    }
                }
            }
        });
        return;
    }

    barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
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
            }],
        }, options: {
            legend: {
                display: false,
                labels: {
                    display: false
                }
            }
        }
    });
}


const getGraphPie = async (labels, value) => {
    let percentData;
    let arrayKeepSum = [];

    if (typeof value.datasets == "object") {
        for (let i = 0; i < value.datasets.length; i++) {
            sum = sumArray(value.datasets[i].data);
            arrayKeepSum.push(sum);
        }
        percentData = calculatePercentage(arrayKeepSum)
    }
    else {
        percentData = calculatePercentage(value)
    }

    var ctxx = document.getElementById("PieChart").getContext('2d');
    pieChart = new Chart(ctxx, {
        type: 'pie',
        data: {
            labels: labels,
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
                data: percentData
            }]
        }
    });

}


const getDetailGraph = (columnList, dataList, reportType) => {
    if (reportType == 'newCustomer') {
        document.getElementById('table-column').innerHTML = "<td>#</td>";
        let percentage = calculatePercentage(dataList);
        for (let i = 0; i < columnList.length; i++) {
            document.getElementById('table-column').innerHTML += "<td><b>" + columnList[i] + "</b></td>";
        }
        document.getElementById('table-data').innerHTML = "<tr><td style='width: 19%;'><b>จำนวนคน</b></td></tr>";
        for (let i = 0; i < dataList.length; i++) {
            document.getElementById('table-data').innerHTML += "<td>" + dataList[i] + "</td>";
        }
        document.getElementById('table-percentage').innerHTML = "<tr><td style='width: 19%;'><b>ร้อยละ</b></td></tr>";
        for (let i = 0; i < percentage.length; i++) {
            document.getElementById('table-percentage').innerHTML += "<td>" + percentage[i] + "%</td>";
        }
        document.getElementById('table-resultGraph').innerHTML = "<b>รวมจำนวน : " + sumArray(dataList) + " คน</b>";
    }
    else if (reportType == 'countTicket') {
        document.getElementById('table-column').innerHTML = "<td>#</td>";
        let percentage = calculatePercentage(dataList);
        for (let i = 0; i < columnList.length; i++) {
            document.getElementById('table-column').innerHTML += "<td><b>" + columnList[i] + "</b></td>";
        }
        document.getElementById('table-data').innerHTML = "<tr><td style='width: 19%;'><b>จำนวนตั๋ว</b></td></tr>";
        for (let i = 0; i < dataList.length; i++) {
            document.getElementById('table-data').innerHTML += "<td>" + dataList[i] + "</td>";
        }
        document.getElementById('table-percentage').innerHTML = "<tr><td style='width: 19%;'><b>ร้อยละ</b></td></tr>";
        for (let i = 0; i < percentage.length; i++) {
            document.getElementById('table-percentage').innerHTML += "<td>" + percentage[i] + "%</td>";
        }
        document.getElementById('table-resultGraph').innerHTML = "<b>รวมจำนวน : " + sumArray(dataList) + " คน</b>";
    }
    else if (reportType == 'income') {
        document.getElementById('table-column').innerHTML = "<td>#</td>";
        let percentage = calculatePercentage(dataList);
        for (let i = 0; i < columnList.length; i++) {
            document.getElementById('table-column').innerHTML += "<td><b>" + columnList[i] + "</b></td>";
        }
        document.getElementById('table-data').innerHTML = "<tr><td style='width: 19%;'><b>จำนวนเงิน</b></td></tr>";
        for (let i = 0; i < dataList.length; i++) {
            document.getElementById('table-data').innerHTML += "<td>" + dataList[i] + "</td>";
        }
        document.getElementById('table-percentage').innerHTML = "<tr><td style='width: 19%;'><b>ร้อยละ</b></td></tr>";
        for (let i = 0; i < percentage.length; i++) {
            document.getElementById('table-percentage').innerHTML += "<td>" + percentage[i] + "%</td>";
        }
        document.getElementById('table-resultGraph').innerHTML = "<b>รวมจำนวน : " + sumArray(dataList) + " คน</b>";
    }
    else if (reportType == 'ticketCategory') {
        let sum;
        let arrayKeepSum = [];
        for (let i = 0; i < dataList.datasets.length; i++) {
            sum = sumArray(dataList.datasets[i].data);
            arrayKeepSum.push(sum);
        }
        dataList = arrayKeepSum;

        document.getElementById('table-column').innerHTML = "<td>#</td>";
        let percentage = calculatePercentage(dataList);
        for (let i = 0; i < columnList.length; i++) {
            document.getElementById('table-column').innerHTML += "<td><b>" + columnList[i] + "</b></td>";
        }
        document.getElementById('table-data').innerHTML = "<tr><td style='width: 19%;'><b>จำนวนตั๋ว</b></td></tr>";
        for (let i = 0; i < dataList.length; i++) {
            document.getElementById('table-data').innerHTML += "<td>" + dataList[i] + "</td>";
        }
        document.getElementById('table-percentage').innerHTML = "<tr><td style='width: 19%;'><b>ร้อยละ</b></td></tr>";
        for (let i = 0; i < percentage.length; i++) {
            document.getElementById('table-percentage').innerHTML += "<td>" + percentage[i] + "%</td>";
        }
        document.getElementById('table-resultGraph').innerHTML = "<b>รวมจำนวนตั๋วทั้งหมด : " + sumArray(dataList) + " ใบ</b>";
    }
}


const dataTableForReport = async (labels, btnType, dataTableType) => {
    let dom = document.getElementById('container-dataTable-btn');
    dom.innerHTML = "";
    let select = document.createElement("select");
    dom.innerHTML = "โปรดเลือกช่วงของข้อมูล : "

    if (dataTableType == "confirmIdentity") {
        document.getElementById('dataTable-thead').innerHTML = "<tr><td>รหัสตั๋ว</td><td>ชื่อ-นามสกุล</td><td>ประเภท</td></tr>";
        select.style.width = "150px"
        select.className = "custom-select mr-sm-2"
        select.id = "txtInput-dataTable";

        for (let i = 0; i < labels.length; i++) {
            let option = document.createElement("option");
            option.value = labels[i];
            option.text = labels[i];
            select.appendChild(option);
        }
        dom.appendChild(select)
        dom.innerHTML += " --> <button class='btn btn-info' onclick='getDataTableConfirm(" + '"' + btnType + '"' + ")'>แสดงข้อมูล</button>"
        getDataTableConfirm(btnType)
    }
    displayDataTable();
}


const displayDataTable = () => {
    document.getElementById('container-dataTable').style.display = "block";
}

const hideDataTable = () => {
    document.getElementById('container-dataTable').style.display = "none";
}