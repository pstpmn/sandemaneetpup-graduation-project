const getGraphTicketCategory = async (btnType) => {
    let date;
    let responseForNormal;
    let responseForOnline;
    let jsonOnline;
    let jsonNormal;
    let checkCountJson = false;
    let value = [];
    let label = [];
    let labels = [];


    if (btnType == "day") {
        date = document.getElementById('txtDate').value;
        label = document.getElementById('txtWeek').value;
        try {
            response = await fetch('model/report/ticketCategory/apiGetReportTicketCategoryD.php', {
                method: "POST",
                body: JSON.stringify({
                    date: date,
                    week: label
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            json = await response.json();
        } catch (err) {
            alert('เกิดข้อผิดพลาดในการติดต่อกับ API web Service ' + err);
            hideContainerGraph();
            hideDataTable();
            return;
        }
        //check data
        
        if (json.length == 0) {
            alert("ไม่มีข้อมูลรายการสัปดาห์นี้");
            hideContainerGraph();
            hideDataTable();
            return;
        }
        for (let i = 0; i < 7; i++) {
            if (json[0][i] > 0 && json[0][i] != null) {
                checkCountJson = true;
                break;
            }
        }
        if (checkCountJson != true) {
            alert("ไม่มีข้อมูลรายการสัปดาห์นี้");
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

        if (json.length == 1) {
            let nameLabel = null;
            if (json[0][0] == "ปกติ") {
                nameLabel = "ตั๋วปกติ";
            }
            else {
                nameLabel = "ตั๋วออนไลน์";
            }
            value = {
                labels: labels,
                datasets: [{
                    label: nameLabel,
                    backgroundColor: "#2ecc71",
                    data: [json[0].day1, json[0].day2, json[0].day3, json[0].day4, json[0].day5, json[0].day6, json[0].day7]
                }]
            };
        } else {
            value = {
                labels: labels,
                datasets: [{
                    label: "ตั๋วปกติ",
                    backgroundColor: "#2ecc71",
                    data: [json[0].day1, json[0].day2, json[0].day3, json[0].day4, json[0].day5, json[0].day6, json[0].day7]
                }, {
                    label: "ตั๋วออนไลน์",
                    backgroundColor: "#3498db",
                    data: [json[1].day1, json[1].day2, json[1].day3, json[1].day4, json[1].day5, json[1].day6, json[1].day7]
                }]
            };
        }


    }
    else if (btnType == "month") {
        let checkCountJson = false;
        date = document.getElementById('txtDate').value;
        labels = ['เดือน 1', 'เดือน 2', 'เดือน 3', 'เดือน 4', 'เดือน 5', 'เดือน 6', 'เดือน 7', 'เดือน 8', 'เดือน 9', 'เดือน 10', 'เดือน 11', 'เดือน 12'];
        label = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        try {
            response = await fetch('model/report/ticketCategory/apiGetReportTicketCategoryM.php', {
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
            hideContainerGraph();
            hideDataTable();
            return;
        }
        //check data
        if (json.length == 0) {
            alert("ไม่มีข้อมูลรายการของเดือนนี้");
            hideContainerGraph();
            hideDataTable();
            return;
        }

        for (let i = 0; i < 5; i++) {
            if (json[0][i] > 0 && json[0][i] != null) {
                checkCountJson = true;
                break;
            }
        }
        if (checkCountJson != true) {
            alert('ไม่พบข้อมูลของปีนี้')
            hideContainerGraph();
            hideDataTable();
            return;
        }


        if (json.length == 1) {
            let nameLabel = null;
            if (json[0][0] == "ปกติ") {
                nameLabel = "ตั๋วปกติ";
            }
            else {
                nameLabel = "ตั๋วออนไลน์";
            }
            value = {
                labels: labels,
                datasets: [{
                    label: nameLabel,
                    backgroundColor: "#2ecc71",
                    data: [json[0].month1, json[0].month2, json[0].month3, json[0].month4, json[0].month5, json[0].month6, json[0].month7, json[0].month8, json[0].month9, json[0].month10, json[0].month11, json[0].month12]
                }]
            };
        } else {
            value = {
                labels: label,
                datasets: [{
                    label: "ตั๋วปกติ",
                    backgroundColor: "#2ecc71",
                    data: [json[0].month1, json[0].month2, json[0].month3, json[0].month4, json[0].month5, json[0].month6, json[0].month7, json[0].month8, json[0].month9, json[0].month10, json[0].month11, json[0].month12]
                }, {
                    label: "ตั๋วออนไลน์",
                    backgroundColor: "#3498db",
                    data: [json[1].month1, json[1].month2, json[1].month3, json[1].month4, json[1].month5, json[1].month6, json[1].month7, json[1].month8, json[1].month9, json[1].month10, json[1].month11, json[1].month12]
                }]
            };
        }
    }
    else if (btnType == "week") {
        date = document.getElementById('txtDate').value;
        labels = ['สัปดาห์ 1', 'สัปดาห์ 2', 'สัปดาห์ 3', 'สัปดาห์ 4', 'สัปดาห์ 5'];
        label = [1,2,3,4,5];



        try {
            response = await fetch('model/report/ticketCategory/apiGetReportTicketCategoryW.php', {
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
            hideContainerGraph();
            hideDataTable();
            return;
        }
        //check data

        if (json.length == 0) {
            alert("ไม่มีข้อมูลรายการของเดือนนี้");
            hideContainerGraph();
            hideDataTable();
            return;
        }

        for (let i = 0; i < 5; i++) {
            if (json[0][i] > 0 && json[0][i] != null) {
                checkCountJson = true;
                break;
            }
        }
        if (checkCountJson != true) {
            alert("ไม่มีข้อมูลรายการ");
            hideContainerGraph();
            hideDataTable();
            return;
        }

        if (json.length == 1) {
            let nameLabel = null;
            if (json[0][0] == "ปกติ") {
                nameLabel = "ตั๋วปกติ";
            }
            else {
                nameLabel = "ตั๋วออนไลน์";
            }
            value = {
                labels: labels,
                datasets: [{
                    label: nameLabel,
                    backgroundColor: "#2ecc71",
                    data: [json[0].week1, json[0].week2, json[0].week3, json[0].week4, json[0].week5]
                }]
            };
        } else {
            value = {
                labels: labels,
                datasets: [{
                    label: "ตั๋วปกติ",
                    backgroundColor: "#2ecc71",
                    data: [json[0].week1, json[0].week2, json[0].week3, json[0].week4, json[0].week5]
                }, {
                    label: "ตั๋วออนไลน์",
                    backgroundColor: "#3498db",
                    data: [json[1].week1, json[1].week2, json[1].week3, json[1].week4, json[1].week5]
                }]
            };
        }
    }
    else if (btnType == "year") {
        let valueMin = [];
        let valueMax = [];


        try {
            responseForNormal = await fetch('model/report/ticketCategory/apiGetReportTicketCategoryYforNormal.php', {
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

            responseForOnline = await fetch('model/report/ticketCategory/apiGetReportTicketCategoryYforOnline.php', {
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

            jsonNormal = await responseForNormal.json();
            jsonOnline = await responseForOnline.json();

        } catch (err) {
            alert('เกิดข้อผิดพลาดในการติดต่อกับ API web Service ');
            hideContainerGraph();
            hideDataTable();
            return;
        }
        if (jsonNormal.length >= jsonOnline.length) {
            for (let i = 0; i < jsonNormal.length; i++) {
                label.push(jsonNormal[i].year);
                labels.push(jsonNormal[i].year);
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
            responseForNormal = valueMax;
            responseForOnline = valueMin;
        } else if (jsonNormal.length < jsonOnline.length) {
            for (let i = 0; i < jsonOnline.length; i++) {
                label.push(jsonOnline[i].year);
                labels.push(jsonOnline[i].year);

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
                responseForNormal = valueMin;
                responseForOnline = valueMax;
            }
        }
        value = {
            labels: label,
            datasets: [{
                label: "ตั๋วปกติ",
                backgroundColor: "#2ecc71",
                data: responseForNormal
            }, {
                label: "ตั๋วออนไลน์",
                backgroundColor: "#3498db",
                data: responseForOnline
            }]
        }
    }
    getGraphBar(labels, value);
    getGraphPie(['ตั๋วปกติ', 'ตั๋วออนไลน์'], value);
    getDetailGraph(['ตั๋วปกติ', 'ตั๋วออนไลน์'], value, 'ticketCategory');
    showContainerGraph();
    dataTableForReport(label, btnType, "ticketCategory",labels);
}

const getDataTableTicketCategory = async (btnType) => {
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
                url: "model/report/ticketCategory/ddd.php", // json datasource
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