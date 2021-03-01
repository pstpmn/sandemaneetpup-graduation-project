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


    if (document.getElementById('btnDay').getAttribute('class') == 'btn btn-success') {
        date = document.getElementById('txtDate').value;
        getGraphBarCountCustomerD(date, document.getElementById('txtWeek').value);
        getGraphPieCountCustomerD(date, document.getElementById('txtWeek').value);
    }
    else if (document.getElementById('btnMonth').getAttribute('class') == 'btn btn-success') {
        date = document.getElementById('txtDate').value;
        getGraphBarCountCustomerM(date);
        getGraphPieCountCustomerM(date);
    }
    else if (document.getElementById('btnWeek').getAttribute('class') == 'btn btn-success') {
        date = document.getElementById('txtDate').value;
        getGraphBarCountCustomerW(date);
        getGraphPieCountCustomerW(date);

    }
    else if (document.getElementById('btnYear').getAttribute('class') == 'btn btn-success') {
        getGraphBarCountCustomerY();
        getGraphPieCountCustomerY();
    }

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