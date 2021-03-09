const getGraphCustomer = async (btnType) => {
    let date;
    let response;
    let json;
    let checkCountJson = false;
    let value = [];
    let label = [];
    let labels = [];

    if (btnType == "day") {
        date = document.getElementById('txtDate').value;
        label = document.getElementById('txtWeek').value;
        try {
            response = await fetch('model/report/newCustomer/apiGetReportNewCustomerD.php', {
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
        for (let i = 0; i < 7; i++) {
            if (json[0][i] != 0) {
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
        label = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        labels = ['เดือน 1', 'เดือน 2', 'เดือน 3', 'เดือน 4', 'เดือน 5', 'เดือน 6', 'เดือน 7', 'เดือน 8', 'เดือน 9', 'เดือน 10', 'เดือน 11', 'เดือน 12'];
        try {
            response = await fetch('model/report/newCustomer/apiGetReportNewCustomerM.php', {
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
        for (let i = 0; i < 5; i++) {
            if (json[0][i] != 0) {
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
        labels = ['สัปดาห์ 1', 'สัปดาห์ 2', 'สัปดาห์ 3', 'สัปดาห์ 4', 'สัปดาห์ 5'];
        label = [1, 2, 3, 4, 5];


        try {
            response = await fetch('model/report/newCustomer/apiGetReportNewCustomerW.php', {
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
        for (let i = 0; i < 5; i++) {
            if (json[0][i] != 0) {
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
        value.push(json[0].week1);
        value.push(json[0].week2)
        value.push(json[0].week3)
        value.push(json[0].week4)
        value.push(json[0].week5)
    }
    else if (btnType == "year") {
        try {
            response = await fetch('model/report/newCustomer/apiGetReportNewCustomerY.php', {
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
            value.push(json[i].yearValue);
            label.push(json[i].yearName);
            labels.push(json[i].yearName);
        }

    }
    getGraphBar(labels, value);
    getGraphPie(labels, value);
    getDetailGraph(label, value, 'newCustomer');
    showContainerGraph();
    dataTableForReport(label, btnType, "newCustomer",labels);
}


const getDataTableNewCustomer = async (btnType) => {
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
                url: "model/report/newCustomer/apiDataTableServerSideNewCustomer.php", // json datasource
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

    // let date = document.getElementById('txtInput-dataTable').value;
    // document.getElementById('dataTable-tbody').innerHTML = "";
    // let response;
    // let json;
    // let fullDate;
    // if (document.getElementById('txtDate') != null) {
    //     fullDate = document.getElementById('txtDate').value;
    // }
    // else {
    //     fullDate = 0
    // }

    // response = await fetch('model/report/newCustomer/apiGetDataTableNewCustomer.php', {
    //     method: "POST",
    //     body: JSON.stringify({
    //         date: date,
    //         btnType: btnType,
    //         fullDate: fullDate

    //     }),
    //     headers: {
    //         "Content-type": "application/json; charset=UTF-8"
    //     }
    // });

    // json = await response.json();

    // for (let i = 0; i < json.length; i++) {
    //     document.getElementById('dataTable-tbody').innerHTML += "<tr>"
    //         + "<td>" + json[i].cust_first_name + " " + json[i].cust_last_name + "</td>"
    //         +"<td>"+ json[i].gender +"</td>"
    //         +"<td>"+ json[i].phone_number +"</td>"
    //         + "</tr>";
    // }
}
