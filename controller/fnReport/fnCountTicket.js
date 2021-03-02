const getGraphCountTicket = async (btnType) => {
    let date;
    let response;
    let json;
    let checkCountJson = false;
    let value = [];
    let label = [];

    if (btnType == "day") {
        date = document.getElementById('txtDate').value;
        label = document.getElementById('txtWeek').value;
        try {
            response = await fetch('model/report/countTicket/apiGetReportCountTicketD.php', {
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
            hideContainerGraph();
            return;
        }
        if (label == 1) {
            label = ['วันที่ 1', 'วันที่ 2', 'วันที่ 3', 'วันที่ 4', 'วันที่ 5', 'วันที่ 6', 'วันที่ 7'];
        }
        else if (label == 2) {
            label = ['วันที่ 8', 'วันที่ 9', 'วันที่ 10', 'วันที่ 11', 'วันที่ 12', 'วันที่ 13', 'วันที่ 14'];
        }
        else if (label == 3) {
            label = ['วันที่ 15', 'วันที่ 16', 'วันที่ 17', 'วันที่ 18', 'วันที่ 19', 'วันที่ 20', 'วันที่ 21'];
        }
        else if (label == 4) {
            label = ['วันที่ 22', 'วันที่ 23', 'วันที่ 24', 'วันที่ 25', 'วันที่ 26', 'วันที่ 27', 'วันที่ 28'];
        }
        else if (label == 5) {
            label = ['วันที่ 29', 'วันที่ 30', 'วันที่ 31'];
        }
        value.push(json[0].day1);
        value.push(json[0].day2)
        value.push(json[0].day3)
        value.push(json[0].day4)
        value.push(json[0].day5)
        value.push(json[0].day6)
        value.push(json[0].day7)
    }
    else if (btnType == "month") {
        let checkCountJson = false;
        date = document.getElementById('txtDate').value;
        label = ['เดือน 1', 'เดือน 2', 'เดือน 3', 'เดือน 4', 'เดือน 5', 'เดือน 6', 'เดือน 7', 'เดือน 8', 'เดือน 9', 'เดือน 10', 'เดือน 11', 'เดือน 12'];
        try {
            response = await fetch('model/report/countTicket/apiGetReportCountTicketM.php', {
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
            hideContainerGraph();
            return;
        }
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
    }
    else if (btnType == "week") {
        date = document.getElementById('txtDate').value;
        label = ['สัปดาห์ 1', 'สัปดาห์ 2', 'สัปดาห์ 3', 'สัปดาห์ 4', 'สัปดาห์ 5'];


        try {
            response = await fetch('model/report/countTicket/apiGetReportCountTicketW.php', {
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
            alert("ไม่มีข้อมูลรายการ");
            hideContainerGraph();
            return;
        }
        value.push(json[0].week1);
        value.push(json[0].week2)
        value.push(json[0].week3)
        value.push(json[0].week4)
        value.push(json[0].week5)
    }
    else if (btnType == "year") {
        try {
            response = await fetch('model/report/countTicket/apiGetReportCountTicketY.php', {
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

            json = await response.json();
        } catch (err) {
            alert('เกิดข้อผิดพลาดในการติดต่อกับ API web Service ');
            hideContainerGraph();
            return;
        }
        if (json.length <= 0) {
            alert("ไม่มีข้อมูลรายการ");
            hideContainerGraph();
            return;
        }

        for (let i = 0; i < json.length; i++) {
            value.push(json[i].value);
            label.push(json[i].year);
        }
    }
    getGraphBar(label, value);
    getGraphPie(label, value);
    getDetailGraph(label, value, 'countTicket');
    showContainerGraph();
}