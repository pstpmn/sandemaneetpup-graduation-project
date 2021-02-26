const btnSelectCheckInAndOut = (dom) => {
    if (dom.id == 'btncheckIn') {
        document.getElementById('btncheckIn').setAttribute('class', 'btn btn-success');
        document.getElementById('btncheckOut').setAttribute('class', 'btn btn-warning');
    }
    else {
        document.getElementById('btncheckIn').setAttribute('class', 'btn btn-warning');
        document.getElementById('btncheckOut').setAttribute('class', 'btn btn-success');
    }
}

const setReset = () => {
    document.getElementById('barcode').value = "";
}

const getValidateSelectButtomCheckIn = () => {
    let checkIn_or_checkout;
    if (document.getElementById('btncheckIn').getAttribute('class') == 'btn btn-success') {
        checkIn_or_checkout = 'checkIn';
    }
    else {
        checkIn_or_checkout = 'checkOut';
    }
    return checkIn_or_checkout;
}


const getTicketCheckIn = async () => {
    $('#dataTable-Ticket').DataTable({
        "processing": true,
        "serverSide": true,
        'retrieve': false,
        'destroy': true,
        "ajax": {
            url: "model/apiGetCheckInToday.php", // json datasource
            type: "post", // method  , by default get
            error: function () { // error handling
                $(".employee-grid-error").html("");
                $("#dataTable-TicketEdit").append('<tbody class="employee-grid-error"><tr><th colspan="3">No data found in the server</th></tr></tbody>');
                $("#dataTable-TicketEdit_processing").css("display", "none");

            }
        }
    });
}


const getListTicketCode = async (ticketCode) => {
    if (ticketCode == "") {
        alert('กรุณาพิมพ์ Ticket Code');
        return;
    }
    let checkIn_or_checkout;
    if (document.getElementById('btncheckIn').getAttribute('class') == 'btn btn-success') {
        checkIn_or_checkout = 'checkIn';
    }
    else {
        checkIn_or_checkout = 'checkOut';
    }
    let data = {
        ticketCode: ticketCode
    };
    try {
        let response = await fetch('model/apiGetTicket.php', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        let json = await response.json();
        if (json[0].ticket_status_id == 2) return alert('รหัสการจองนี้ มีสถานะการจอง !!');
        if (json[0].ticket_status_id == 4) return alert('รหัสการจองนี้ มีสถานะการจอง !!');
        if (json[0].ticket_status_id == 3) return alert('รหัสการจองนี้ มีสถานะถูกยกเลิก !!');

        document.getElementById('display-bookingID').innerHTML = json[0].ticket_book_code;
        document.getElementById('display-boatNumber').innerHTML = json[0].boat_number;

        document.getElementById('tbody-modal').innerHTML = "";
        let countCustomerFound = [];
        if (json.length > 1) {
            for (let count = 0; count < json.length; count++) {
                if (checkIn_or_checkout == "checkIn") {
                    if (json[count].check_in == null) {
                        document.getElementById('tbody-modal').innerHTML += "<tr><th scope='row'><input type='checkbox' id='checkbox-" + json[count].buy_ticket_id + "' value='" + json[count].buy_ticket_id + "'></th>"
                            + "<td>" + json[count].ticket_code + "</td>"
                            + "<td>" + json[count].cust_first_name + " " + json[count].cust_last_name + "</td>"
                            + "<td>" + json[count].boat_seat_number + "</td>"
                            + "<td>" + json[count].floor + "</td></tr>"
                        countCustomerFound.push(json[count].buy_ticket_id);
                    }
                }
                else if (checkIn_or_checkout == "checkOut") {
                    if (json[count].check_out == null) {
                        document.getElementById('tbody-modal').innerHTML += "<tr><th scope='row'><input type='checkbox' id='checkbox-" + json[count].buy_ticket_id + "' value='" + json[count].buy_ticket_id + "'></th>"
                            + "<td>" + json[count].ticket_code + "</td>"
                            + "<td>" + json[count].cust_first_name + "</td>"
                            + "<td>" + json[count].boat_seat_number + "</td>"
                            + "<td>" + json[count].floor + "</td></tr>"
                        countCustomerFound.push(json[count].buy_ticket_id);
                    }
                }
            }
            document.getElementById('btn-checkIn-checkOut').setAttribute('onclick', 'checkBoxListCustomer(' + countCustomerFound + ')');
            $("#myModal").modal();
        }
        else if (json.length == 1) {
            if (checkIn_or_checkout == "checkIn") {
                if (json[0].check_in != null) {
                    alert("มีการเช็คอินแล้วววว")
                    return;
                }
                let resultCheck = setCheckInTicketCode(json[0].buy_ticket_id);
                if (resultCheck == false) {
                    alert("fail check in");
                }
                else {
                    alert("check in success");
                }

            }
            else if (checkIn_or_checkout == "checkOut") {
                if (json[0].check_out != null) {
                    alert("มีการเช็คเอ้าแล้วววว")
                    return;
                }
                let resultCheck = setCheckOutTicketCode(json[0].buy_ticket_id)
                if (resultCheck == false) {
                    alert("fail check out");
                }
                else {
                    alert("check out success");
                }
            }
        }
    } catch (err) {
        alert('ไม่พบบาร์รหัสนี้')
    }
    getTicketCheckIn();
    document.getElementById('barcode').value = '';

}

function checkBoxListCustomer() {
    let checkIn_or_checkout;
    if (document.getElementById('btncheckIn').getAttribute('class') == 'btn btn-success') {
        checkIn_or_checkout = 'checkIn';
    }
    else {
        checkIn_or_checkout = 'checkOut';
    }

    if (checkIn_or_checkout == 'checkIn') {
        for (let i = 0; i < arguments.length; i++) {
            let checkbox = document.getElementById('checkbox-' + arguments[i] + '')
            if (checkbox.checked == true) {
                let resultCheck = setCheckInTicketCode(checkbox.value);
                if (resultCheck == false) {
                    return alert("เกิดข้อผิดพลาดในการเช็คอิน")
                }
            }
        }
        alert("check in success");
        getTicketCheckIn();
        $("#myModal").modal('hide');
    }
    else {
        for (let i = 0; i < arguments.length; i++) {
            let checkbox = document.getElementById('checkbox-' + arguments[i] + '')
            if (checkbox.checked == true) {
                let resultCheck = setCheckOutTicketCode(checkbox.value);
                if (resultCheck == false) {
                    return alert("เกิดข้อผิดพลาดในการเช็คเอาท์")
                }
            }
        }
        alert("check out success");
        getTicketCheckIn();
        $("#myModal").modal('hide');
    }

}

const setCheckOutTicketCode = async (ticketID) => {
    try {
        let response = await fetch('model/apiSetCheckOut.php', {
            method: "POST",
            body: JSON.stringify({
                ticketID: ticketID
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    } catch (err) {
        alert('เกิดข้อผิดพลาด' + err)
        return false;
    }
}