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

const getGraph = async () => {
    let date;
    let response;
    let json;
    let checkCountJson = false;


    if (pieChart != null) {
        pieChart.destroy();
    }
    if (barChart != null) {
        barChart.destroy();
    }

    if (document.getElementById('btnDay').getAttribute('class') == 'btn btn-success') {
        date = document.getElementById('txtDate').value;
        let week = document.getElementById('txtWeek').value;
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
            alert('เกิดข้อผิดพลาดในการติดต่อกับ API web Service ' + err);
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

        if (week == 1) {
            week = ['วันที่ 1', 'วันที่ 2', 'วันที่ 3', 'วันที่ 4', 'วันที่ 5', 'วันที่ 6', 'วันที่ 7'];
        }
        else if (week == 2) {
            week = ['วันที่ 8', 'วันที่ 9', 'วันที่ 10', 'วันที่ 11', 'วันที่ 12', 'วันที่ 13', 'วันที่ 14'];
        }
        else if (week == 3) {
            week = ['วันที่ 15', 'วันที่ 16', 'วันที่ 17', 'วันที่ 18', 'วันที่ 19', 'วันที่ 20', 'วันที่ 21'];
        }
        else if (week == 4) {
            week = ['วันที่ 22', 'วันที่ 23', 'วันที่ 24', 'วันที่ 25', 'วันที่ 26', 'วันที่ 27', 'วันที่ 28'];
        }
        else if (week == 5) {
            week = ['วันที่ 29', 'วันที่ 30', 'วันที่ 31'];
        }


        getGraphBarCountCustomerD(json, week);
        getGraphPieCountCustomerD(json, week);
    }
    else if (document.getElementById('btnMonth').getAttribute('class') == 'btn btn-success') {
        let checkCountJson = false;
        date = document.getElementById('txtDate').value;

        try {
            response = await fetch('model/report/apiGetReportNewCustomerM.php', {
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
            alert('ไม่พบข้อมูลของปีนี้')
            return;
        }
        getGraphBarCountCustomerM(json);
        getGraphPieCountCustomerM(json);
    }
    else if (document.getElementById('btnWeek').getAttribute('class') == 'btn btn-success') {
        date = document.getElementById('txtDate').value;

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
        getGraphBarCountCustomerW(json);
        getGraphPieCountCustomerW(json);

    }
    else if (document.getElementById('btnYear').getAttribute('class') == 'btn btn-success') {
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

        getGraphBarCountCustomerY(json);
        getGraphPieCountCustomerY(json);
    }

    //Display Graph to Show
    document.getElementById('showGraph').style.display = 'block';

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