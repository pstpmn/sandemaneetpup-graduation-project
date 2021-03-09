const getDataTableCheckIn = async () => {
    let chose = document.getElementById('txtInput-dataTable').value;
    let fullDate;
    let date = document.getElementById('txtInput-dataTable').value;
    if (document.getElementById('txtDate') != null) {
        fullDate = document.getElementById('txtDate').value;
    }
    else {
        fullDate = 0
    }
    if(fullDate == "")return alert("กรุณาใส่วันทีก่อน !!");
    $('#dataTable-report').DataTable({
        "processing": true,
        "serverSide": true,
        'retrieve': false,
        "destroy": true,
        "ajax": {
            url: "model/report/checkIn/apiDataTableServerSideCheckIn.php", // json datasource
            type: "post",  // method  , by default get
            "data": {
                "date": date,
                "btnType": chose,
                "fullDate": fullDate
            },
            error: function () {  // error handling
                $(".employee-grid-error").html("");
                $("#dataTable-TicketEdit").append('<tbody class="employee-grid-error"><tr><th colspan="3">No data found in the server</th></tr></tbody>');
                $("#dataTable-TicketEdit_processing").css("display", "none");

            }
        }
    });
}