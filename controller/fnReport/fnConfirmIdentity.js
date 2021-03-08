const getGraphConfirmIdentity = async (btnType) => {

    let date;
    let responseForNormal;
    let responseForOnline;
    let jsonOnline;
    let jsonNormal;
    let value = [];
    let label = [];
    let labels = [];


    if (btnType == "day") {
        let responseForConfirm;
        let responseForNoConfirm;
        let jsonForConfirm;
        let jsonForNoConfirm;
        let checkValueForConfirm = false;
        let checkValueForNoConfirm = false;

        date = document.getElementById('txtDate').value;
        label = document.getElementById('txtWeek').value;
        try {
            responseForConfirm = await fetch('model/report/confirmIdentity/apiGetReportConfirmD.php', {
                method: "POST",
                body: JSON.stringify({
                    date: date,
                    week: label
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

            responseForNoConfirm = await fetch('model/report/confirmIdentity/apiGetReportConfirmDforNo.php', {
                method: "POST",
                body: JSON.stringify({
                    date: date,
                    week: label
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

            jsonForConfirm = await responseForConfirm.json();
            jsonForNoConfirm = await responseForNoConfirm.json();
        } catch (err) {
            alert('เกิดข้อผิดพลาดในการติดต่อกับ API web Service ' + err);
            hideContainerGraph();
            hideDataTable();
            return;
        }
        if (label == 1) {
            labels = ['วันที่ 1', 'วันที่ 2', 'วันที่ 3', 'วันที่ 4', 'วันที่ 5', 'วันที่ 6', 'วันที่ 7'];
            label = [1, 2, 3, 4, 5, 6, 7];
        }
        else if (label == 2) {
            labels = ['วันที่ 8', 'วันที่ 9', 'วันที่ 10', 'วันที่ 11', 'วันที่ 12', 'วันที่ 13', 'วันที่ 14'];
            label = [8, 9, 10, 11, 12, 13, 14];

        }
        else if (label == 3) {
            labels = ['วันที่ 15', 'วันที่ 16', 'วันที่ 17', 'วันที่ 18', 'วันที่ 19', 'วันที่ 20', 'วันที่ 21'];
            label = [15, 16, 17, 18, 19, 20, 21];

        }
        else if (label == 4) {
            labels = ['วันที่ 22', 'วันที่ 23', 'วันที่ 24', 'วันที่ 25', 'วันที่ 26', 'วันที่ 27', 'วันที่ 28'];
            label = [22, 23, 24, 25, 26, 27, 28];

        }
        else if (label == 5) {
            labels = ['วันที่ 29', 'วันที่ 30', 'วันที่ 31'];
            label = [29, 30, 31];
        }
        for (let i in jsonForConfirm[0]) {
            if (jsonForConfirm[0][i] > 0 && jsonForConfirm[0][i] != null) {
                checkValueForConfirm = true;
                break;
            }
        }

        for (let i in jsonForNoConfirm[0]) {
            if (jsonForNoConfirm[0][i] > 0 && jsonForNoConfirm[0][i] != null) {
                checkValueForNoConfirm = true;
                break;
            }
        }
        if (checkValueForConfirm == false && checkValueForNoConfirm == false) {
            hideContainerGraph();
            hideDataTable();
            return alert("ไม่พบข้อมูลนี้ !!");
        }
        if (checkValueForConfirm == false) {
            jsonForConfirm[0].day1 = 0
            jsonForConfirm[0].day2 = 0
            jsonForConfirm[0].day3 = 0
            jsonForConfirm[0].day4 = 0
            jsonForConfirm[0].day5 = 0
            jsonForConfirm[0].day6 = 0
            jsonForConfirm[0].day7 = 0
        }
        if (checkValueForNoConfirm == false) {
            jsonForNoConfirm[0].day1 = 0
            jsonForNoConfirm[0].day2 = 0
            jsonForNoConfirm[0].day3 = 0
            jsonForNoConfirm[0].day4 = 0
            jsonForNoConfirm[0].day5 = 0
            jsonForNoConfirm[0].day6 = 0
            jsonForNoConfirm[0].day7 = 0
        }

        value = {
            labels: labels,
            datasets: [{
                label: "กลุ่มคนที่ขึ้นเรือ",
                backgroundColor: "#2ecc71",
                data: [jsonForConfirm[0].day1, jsonForConfirm[0].day2, jsonForConfirm[0].day3, jsonForConfirm[0].day4, jsonForConfirm[0].day5, jsonForConfirm[0].day6, jsonForConfirm[0].day7]
            }, {
                label: "กลุ่มคนที่ไม่ได้มาขึ้นเรือ",
                backgroundColor: "#3498db",
                data: [jsonForNoConfirm[0].day1, jsonForNoConfirm[0].day2, jsonForNoConfirm[0].day3, jsonForNoConfirm[0].day4, jsonForNoConfirm[0].day5, jsonForNoConfirm[0].day6, jsonForNoConfirm[0].day7]
            }]
        };


    }
    else if (btnType == "month") {
        let responseForConfirm;
        let responseForNoConfirm;
        let jsonForConfirm;
        let jsonForNoConfirm;
        let checkValueForConfirm = false;
        let checkValueForNoConfirm = false;
        date = document.getElementById('txtDate').value;

        try {
            responseForConfirm = await fetch('model/report/confirmIdentity/apiGetReportConfirmM.php', {
                method: "POST",
                body: JSON.stringify({
                    date: date
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            responseForNoConfirm = await fetch('model/report/confirmIdentity/apiGetReportConfirmMforNo.php', {
                method: "POST",
                body: JSON.stringify({
                    date: date
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

            jsonForConfirm = await responseForConfirm.json();
            jsonForNoConfirm = await responseForNoConfirm.json();
        } catch (err) {
            alert('เกิดข้อผิดพลาดในการติดต่อกับ API web Service ' + err);
            hideContainerGraph();
            hideDataTable();

            return;
        }
        //check data
        for (let i in jsonForConfirm[0]) {
            if (jsonForConfirm[0][i] > 0 && jsonForConfirm[0][i] != null) {
                checkValueForConfirm = true;
                break;
            }
        }

        for (let i in jsonForNoConfirm[0]) {
            if (jsonForNoConfirm[0][i] > 0 && jsonForNoConfirm[0][i] != null) {
                checkValueForNoConfirm = true;
                break;
            }
        }
        if (checkValueForConfirm == false && checkValueForNoConfirm == false) {
            hideContainerGraph();
            hideDataTable();
            return alert("ไม่พบข้อมูลนี้ !!");
        }
        if (checkValueForConfirm == false) {
            jsonForConfirm[0].month1 = 0
            jsonForConfirm[0].month2 = 0
            jsonForConfirm[0].month3 = 0
            jsonForConfirm[0].month4 = 0
            jsonForConfirm[0].month5 = 0
            jsonForConfirm[0].month6 = 0
            jsonForConfirm[0].month7 = 0
            jsonForConfirm[0].month8 = 0
            jsonForConfirm[0].month9 = 0
            jsonForConfirm[0].month10 = 0
            jsonForConfirm[0].month11 = 0
            jsonForConfirm[0].month12 = 0
        }
        if (checkValueForNoConfirm == false) {
            jsonForNoConfirm[0].month1 = 0
            jsonForNoConfirm[0].month2 = 0
            jsonForNoConfirm[0].month3 = 0
            jsonForNoConfirm[0].month4 = 0
            jsonForNoConfirm[0].month5 = 0
            jsonForNoConfirm[0].month6 = 0
            jsonForNoConfirm[0].month7 = 0
            jsonForNoConfirm[0].month8 = 0
            jsonForNoConfirm[0].month9 = 0
            jsonForNoConfirm[0].month10 = 0
            jsonForNoConfirm[0].month11 = 0
            jsonForNoConfirm[0].month12 = 0
        }

        label = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        labels = ['เดือน 1', 'เดือน 2', 'เดือน 3', 'เดือน 4', 'เดือน 5', 'เดือน 6', 'เดือน 7', 'เดือน 8', 'เดือน 9', 'เดือน 10', 'เดือน 11', 'เดือน 12']
        value = {
            labels: ['เดือน 1', 'เดือน 2', 'เดือน 3', 'เดือน 4', 'เดือน 5', 'เดือน 6', 'เดือน 7', 'เดือน 8', 'เดือน 9', 'เดือน 10', 'เดือน 11', 'เดือน 12'],
            datasets: [{
                label: "จำนวนคนที่มาขึ้นเรือ",
                backgroundColor: "#2ecc71",
                data: [jsonForConfirm[0].month1, jsonForConfirm[0].month2, jsonForConfirm[0].month3, jsonForConfirm[0].month4, jsonForConfirm[0].month5,
                jsonForConfirm[0].month6, jsonForConfirm[0].month7, jsonForConfirm[0].month8, jsonForConfirm[0].month9, jsonForConfirm[0].month10,
                jsonForConfirm[0].month11, jsonForConfirm[0].month12]
            }, {
                label: "จำนวนคนที่ไม่ได้มาขึ้นเรือ",
                backgroundColor: "#3498db",
                data: [jsonForNoConfirm[0].month1, jsonForNoConfirm[0].month2, jsonForNoConfirm[0].month3, jsonForNoConfirm[0].month4, jsonForNoConfirm[0].month5,
                jsonForNoConfirm[0].month6, jsonForNoConfirm[0].month7, jsonForNoConfirm[0].month8, jsonForNoConfirm[0].month9, jsonForNoConfirm[0].month10,
                jsonForNoConfirm[0].month11, jsonForNoConfirm[0].month12]
            }]
        };
    }
    else if (btnType == "week") {
        let responseForConfirm;
        let responseForNoConfirm;
        let jsonForConfirm;
        let jsonForNoConfirm;
        let checkValueForConfirm = false;
        let checkValueForNoConfirm = false;
        label = [1, 2, 3, 4, 5];
        labels = ['สัปดาห์ 1', 'สัปดาห์ 2', 'สัปดาห์ 3', 'สัปดาห์ 4', 'สัปดาห์ 5'];

        date = document.getElementById('txtDate').value;
        try {
            responseForConfirm = await fetch('model/report/confirmIdentity/apiGetReportConfirmW.php', {
                method: "POST",
                body: JSON.stringify({
                    date: date
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

            responseForNoConfirm = await fetch('model/report/confirmIdentity/apiGetReportConfirmWforNo.php', {
                method: "POST",
                body: JSON.stringify({
                    date: date
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

            jsonForConfirm = await responseForConfirm.json();
            jsonForNoConfirm = await responseForNoConfirm.json();
        } catch (err) {
            alert('เกิดข้อผิดพลาดในการติดต่อกับ API web Service ' + err);
            hideContainerGraph();
            hideDataTable();

            return;
        }
        //check data
        for (let i in jsonForConfirm[0]) {
            if (jsonForConfirm[0][i] > 0 && jsonForConfirm[0][i] != null) {
                checkValueForConfirm = true;
                break;
            }
        }

        for (let i in jsonForNoConfirm[0]) {
            if (jsonForNoConfirm[0][i] > 0 && jsonForNoConfirm[0][i] != null) {
                checkValueForNoConfirm = true;
                break;
            }
        }
        if (checkValueForConfirm == false && checkValueForNoConfirm == false) {
            hideContainerGraph();
            hideDataTable();
            return alert("ไม่พบข้อมูลนี้ !!");
        }
        if (checkValueForConfirm == false) {
            jsonForConfirm[0].week1 = 0
            jsonForConfirm[0].week2 = 0
            jsonForConfirm[0].week3 = 0
            jsonForConfirm[0].week4 = 0
            jsonForConfirm[0].week5 = 0
        }
        if (checkValueForNoConfirm == false) {
            jsonForNoConfirm[0].week1 = 0
            jsonForNoConfirm[0].week2 = 0
            jsonForNoConfirm[0].week3 = 0
            jsonForNoConfirm[0].week4 = 0
            jsonForNoConfirm[0].week5 = 0
        }

        value = {
            labels: ['สัปดาห์ 1', 'สัปดาห์ 2', 'สัปดาห์ 3', 'สัปดาห์ 4', 'สัปดาห์ 5'],
            datasets: [{
                label: "จำนวนคนที่มาขึ้นเรือ",
                backgroundColor: "#2ecc71",
                data: [jsonForConfirm[0].week1, jsonForConfirm[0].week2, jsonForConfirm[0].week3, jsonForConfirm[0].week4, jsonForConfirm[0].week5]
            }, {
                label: "จำนวนคนที่ไม่ได้มาขึ้นเรือ",
                backgroundColor: "#3498db",
                data: [jsonForNoConfirm[0].week1, jsonForNoConfirm[0].week2, jsonForNoConfirm[0].week3
                    , jsonForNoConfirm[0].week4, jsonForNoConfirm[0].week5]
            }]
        };


    }
    else if (btnType == "year") {
        let valueConfirm = [];
        let valueNoComfirm = [];
        try {
            responseForNormal = await fetch('model/report/confirmIdentity/apiGetReportConfirmY.php', {
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

            responseForOnline = await fetch('model/report/confirmIdentity/apiGetReportConfirmYforNo.php', {
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

            jsonConfirm = await responseForNormal.json();
            jsonNoConfirm = await responseForOnline.json();

        } catch (err) {
            alert('เกิดข้อผิดพลาดในการติดต่อกับ API web Service ');
            hideContainerGraph();
            hideDataTable();

            return;
        }
        if (jsonConfirm.length == jsonNoConfirm.length) {
            for (let i = 0; i < jsonConfirm.length; i++) {
                label.push(jsonConfirm[i].year)
                labels.push(jsonConfirm[i].year)
                if (jsonConfirm[i].year == jsonNoConfirm[i].year) {
                    valueConfirm.push(jsonConfirm[i].value)
                    valueNoComfirm.push(jsonNoConfirm[i].value)
                }
                else if (jsonConfirm[i].year > jsonNoConfirm[i].year) {
                    valueConfirm.push(0)
                    valueNoComfirm.push(jsonNoConfirm[i].value)
                }
                else if (jsonConfirm[i].year < jsonNoConfirm[i].year) {
                    valueConfirm.push(jsonConfirm[i].value)
                    valueNoComfirm.push(0)
                }
            }
        }
        else if (jsonConfirm.length < jsonNoConfirm.length) {
            for (let i = 0; i < jsonNoConfirm.length; i++) {
                let indexMin;
                if ((jsonConfirm.length - i) < 0) indexMin = 0;
                else indexMin = i;

                label.push(jsonNoConfirm[i].year)
                labels.push(jsonNoConfirm[i].year)
                if (jsonConfirm[indexMin].year == jsonNoConfirm[i].year) {
                    valueConfirm.push(jsonConfirm[indexMin].value)
                    valueNoComfirm.push(jsonNoConfirm[i].value)
                }
                else if (jsonConfirm[indexMin].year > jsonNoConfirm[i].year) {
                    valueConfirm.push(0)
                    valueNoComfirm.push(jsonNoConfirm[i].value)
                }
                else if (jsonConfirm[indexMin].year < jsonNoConfirm[i].year) {
                    valueConfirm.push(jsonConfirm[indexMin].value)
                    valueNoComfirm.push(0)
                }
            }
        }
        else if (jsonConfirm.length > jsonNoConfirm.length) {
            for (let i = 0; i < jsonNoConfirm.length; i++) {
                let indexMin;
                if ((jsonConfirm.length - i) < 0) indexMin = 0;
                else indexMin = i;

                label.push(jsonConfirm[i].year)
                labels.push(jsonConfirm[i].year)
                if (jsonConfirm[i].year == jsonNoConfirm[indexMin].year) {
                    valueConfirm.push(jsonConfirm[i].value)
                    valueNoComfirm.push(jsonNoConfirm[indexMin].value)
                }
                else if (jsonConfirm[i].year > jsonNoConfirm[indexMin].year) {
                    valueConfirm.push(0)
                    valueNoComfirm.push(jsonNoConfirm[indexMin].value)
                }
                else if (jsonConfirm[i].year < jsonNoConfirm[indexMin].year) {
                    valueConfirm.push(jsonConfirm[i].value)
                    valueNoComfirm.push(0)
                }
            }
        }
        value = {
            labels: label,
            datasets: [{
                label: "จำนวนคนที่มาขึ้นเรือ",
                backgroundColor: "#2ecc71",
                data: valueConfirm
            }, {
                label: "จำนวนคนที่ไม่มาขึ้นเรือ",
                backgroundColor: "#3498db",
                data: valueNoComfirm
            }]
            // };
        }
    }
    getGraphBar(label, value);
    getGraphPie(['จำนวนคนที่มาขึ้นเรือ', 'จำนวนคนที่ไม่มาขึ้นเรือ'], value);
    getDetailGraph(['จำนวนคนที่มาขึ้นเรือ', 'จำนวนคนที่ไม่มาขึ้นเรือ'], value, 'ticketCategory');
    showContainerGraph();
    dataTableForReport(label, btnType, "confirmIdentity", labels);
}


const getDataTableConfirm = async (btnType) => {
    let fullDate;
    let date = document.getElementById('txtInput-dataTable').value;
    if (document.getElementById('txtDate') != null) {
        fullDate = document.getElementById('txtDate').value;
    }
    else {
        fullDate = 0
    }
    $(document).ready(function () {
        $('#dataTable-report').DataTable({
            "processing": true,
            "serverSide": true,
            'retrieve': false,
            "destroy": true,
            "ajax": {
                url: "model/report/confirmIdentity/aaa.php", // json datasource
                type: "post",  // method  , by default get
                "data": {
                    "date": date,
                    "btnType": btnType,
                    "fullDate": fullDate
                },
                error: function () {  // error handling
                    $(".employee-grid-error").html("");
                    $("#dataTable-TicketEdit").append('<tbody class="employee-grid-error"><tr><th colspan="3">No data found in the server</th></tr></tbody>');
                    $("#dataTable-TicketEdit_processing").css("display", "none");

                }
            }
        });

    });
}

