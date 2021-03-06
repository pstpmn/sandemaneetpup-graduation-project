const getGraphConfirmIdentity = async (btnType) => {
    let date;
    let responseForNormal;
    let responseForOnline;
    let jsonOnline;
    let jsonNormal;
    let value = [];
    let label = [];

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
            return;
        }

        // alert(JSON.stringify(jsonForConfirm))
        // alert(JSON.stringify(jsonForNoConfirm))

        // if (jsonForConfirm[0].day1 == null) return;
        // if (jsonForConfirm[0].day7 == null) return;
        // if (jsonForConfirm[0].day2 == null) return;
        // if (jsonForConfirm[0].day3 == null) return;
        // if (jsonForConfirm[0].day4 == null) return;
        // if (jsonForConfirm[0].day5 == null) return;
        // if (jsonForConfirm[0].day6 == null) return;


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

        // alert(JSON.stringify(jsonForConfirm))
        // alert(JSON.stringify(jsonForNoConfirm))

        for (let i in jsonForConfirm[0]) {
            if (jsonForConfirm[0][i] > 0 || jsonForConfirm[0][i] != null) {
                checkValueForConfirm = true;
                break;
            }
        }

        for (let i in jsonForNoConfirm[0]) {
            if (jsonForNoConfirm[0][i] > 0 || jsonForNoConfirm[0][i] != null) {
                checkValueForNoConfirm = true;
                break;
            }
        }
        if (checkValueForConfirm == false && checkValueForNoConfirm == false) return alert("ไม่พบข้อมูลนี้ !!");
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
            return;
        }
        label = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
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
            return;
        }
        //check data

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
        label = [1, 2, 3, 4, 5];


    }
    else if (btnType == "year") {
        let valueMin = [];
        let valueMax = [];


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

            jsonNormal = await responseForNormal.json();
            jsonOnline = await responseForOnline.json();

        } catch (err) {
            alert('เกิดข้อผิดพลาดในการติดต่อกับ API web Service ');
            hideContainerGraph();
            return;
        }

        if (jsonNormal.length >= jsonOnline.length) {
            for (let i = 0; i < jsonNormal.length; i++) {
                label.push(jsonNormal[i].year);
                for (let n = 0; n < jsonOnline.length; n++) {

                    if (jsonNormal[i].year > jsonOnline[n].year) {
                        valueMax.push(jsonNormal[i].value);
                        valueMin.push(0);
                    }
                    else if (jsonNormal[i].year < jsonOnline[n].year) {
                        valueMax.push(0);
                        valueMin.push(jsonOnline[n].value);
                    }
                    else if (jsonNormal[i].year == jsonOnline[n].year) {
                        valueMax.push(jsonNormal[i].value);
                        valueMin.push(jsonOnline[n].value);
                    }
                }
            }

        } else if (jsonNormal.length < jsonOnline.length) {
            for (let i = 0; i < jsonOnline.length; i++) {
                label.push(jsonOnline[i].year);
                for (let n = 0; n < jsonNormal.length; n++) {
                    if (jsonNormal[n].year > jsonOnline[i].year) {
                        valueMax.push(jsonNormal[n].value);
                        valueMin.push(0);
                    }
                    else if (jsonNormal[n].year < jsonOnline[i].year) {
                        valueMax.push(0);
                        valueMin.push(jsonOnline[i].value);
                    }
                    else if (jsonNormal[n].year == jsonOnline[i].year) {
                        valueMax.push(jsonNormal[n].value);
                        valueMin.push(jsonOnline[i].value);
                    }
                }
            }
        }

        value = {
            labels: label,
            datasets: [{
                label: "จำนวนคนที่มาขึ้นเรือ",
                backgroundColor: "#2ecc71",
                data: valueMax
            }, {
                label: "จำนวนคนที่ไม่มาขึ้นเรือ",
                backgroundColor: "#3498db",
                data: valueMin
            }]
            // };
        }
    }
    getGraphBar(label, value);
    getGraphPie(['ตั๋วปกติ', 'ตั๋วออนไลน์'], value);
    getDetailGraph(['ตั๋วปกติ', 'ตั๋วออนไลน์'], value, 'ticketCategory');
    showContainerGraph();
    dataTableForReport(label, btnType, "confirmIdentity");
}


const getDataTableConfirm = async (btnType) => {
    let date = document.getElementById('txtInput-dataTable').value;
    document.getElementById('dataTable-tbody').innerHTML = "";
    let responseForConfirm;
    let responseForNoConfirm;
    let jsonForConfirm;
    let jsonForNoConfirm;
    let fullDate;
    if(document.getElementById('txtDate') != null){
        fullDate = document.getElementById('txtDate').value;
    }
    else{
        fullDate = 0
    }

    responseForConfirm = await fetch('model/report/confirmIdentity/apiGetDataTableConfirm.php', {
        method: "POST",
        body: JSON.stringify({
            date: date,
            btnType: btnType,
            fullDate: fullDate

        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });

    responseForNoConfirm = await fetch('model/report/confirmIdentity/apiGetDataTableNoConfirm.php', {
        method: "POST",
        body: JSON.stringify({
            date: date,
            btnType: btnType,
            fullDate: fullDate
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    jsonForConfirm = await responseForConfirm.json();
    jsonForNoConfirm = await responseForNoConfirm.json();



    for (let i = 0; i < jsonForConfirm.length; i++) {

        document.getElementById('dataTable-tbody').innerHTML += "<tr><td>" + jsonForConfirm[i].ticket_code + "</td>"
            + "<td>" + jsonForConfirm[i].cust_first_name + " " + jsonForConfirm[i].cust_last_name + "</td>"
            + "<td>มาขึ้นเรือ</td></tr>";
    }

    for (let i = 0; i < jsonForNoConfirm.length; i++) {

        document.getElementById('dataTable-tbody').innerHTML += "<tr><td>" + jsonForNoConfirm[i].ticket_code + "</td>"
            + "<td>" + jsonForNoConfirm[i].cust_first_name + " " + jsonForNoConfirm[i].cust_last_name + "</td>"
            + "<td>ไม่มาขึ้นเรือ</td></tr>";
    }
}

