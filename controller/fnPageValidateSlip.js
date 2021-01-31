const btnSelectSlip = async (dom) => {
    if (dom.id == 'btnSlipNoValidated') {
        document.getElementById('btnSlipNoValidated').setAttribute('class', 'btn btn-success');
        document.getElementById('btnSlipValidated').setAttribute('class', 'btn btn-warning');
        await getSlipTranferMoney();
    }
    else {
        document.getElementById('btnSlipNoValidated').setAttribute('class', 'btn btn-warning');
        document.getElementById('btnSlipValidated').setAttribute('class', 'btn btn-success');
        await getSlipTranferMoney();
    }
}

const getSlipTranferMoney = async () => {
    let btnSlip = getBtnValidateSlip();
    let ListSlipUnique = [];
    try {
        let response = await fetch('model/apiSlipAll.php');
        let json = await response.json();
        let domTbody = document.getElementById('tbody-slip');
        if (btnSlip == 'Validate') {
            domTbody.innerHTML = "";
            for (let i = 0; i < json.length; i++) {
                let unique;
                if (json[i].ticket_status_id == 4 && json[i].time_up_slip != null) {
                    if (ListSlipUnique.length == 0) {
                        ListSlipUnique.push(json[i].ticket_code);
                        json[i].ticket_status_id = 'รอตรวจสอบ';
                        domTbody.innerHTML += "<tr><td>" + json[i].ticket_code + "</td> <td><button id='btn-diolog-customer-" + ListSlipUnique.length + "' class='btn btn-link'>ดูรายชื่อ</button></td>"
                            + "<td>" + json[i].boat_number + "</td>"
                            + "<td>" + json[i].payment_time + "</td><td>" + json[i].time_up_slip + "</td>"
                            + "<td>" + json[i].payment_bank + "</td> <td>" + json[i].payment_amount + "</td> <td>" + '<img id ="img-' + i + '" src="img/slip/' + json[i].slip_img + '"  width="120" height="120"  ></img>' + "</td> <td>" + json[i].ticket_status_id + ""
                            + "<td><button id='confirm-slip-" + i + "' class='btn btn-success'>ผ่าน</button>   <button id='cancel-slip-" + i + "' class='btn btn-danger'>ไม่ผ่าน</button></td></tr>"
                        document.getElementById('img-' + i).setAttribute('onclick', 'getImgSlip("' + json[i].slip_img + '")')
                        document.getElementById('img-' + i).style.cursor = 'zoom-in';
                        document.getElementById('confirm-slip-' + i).setAttribute('onclick', 'setConfirmSlip("' + json[i].ticket_code + '")')
                        document.getElementById('cancel-slip-' + i).setAttribute('onclick', 'setCancelSlip("' + json[i].ticket_code + '")')
                        document.getElementById('btn-diolog-customer-' + ListSlipUnique.length + '').setAttribute('onclick', 'getDialogListCustomerFromSlip("' + json[i].ticket_code + '")')
                        continue;
                    }

                    for (let count = 0; count < ListSlipUnique.length; count++) {
                        if (ListSlipUnique[count] != json[i].ticket_code) {
                            unique = true;
                            continue;
                        }
                        else if (ListSlipUnique[count] == json[i].ticket_code) {
                            unique = false;
                            break;
                        }
                    }
                    if (unique == true) {
                        ListSlipUnique.push(json[i].ticket_code);
                        json[i].ticket_status_id = 'รอตรวจสอบ';
                        domTbody.innerHTML += "<tr><td>" + json[i].ticket_code + "</td> <td><button id='btn-diolog-customer-" + ListSlipUnique.length + "' class='btn btn-link'>ดูรายชื่อ</button></td>"
                            + "<td>" + json[i].boat_number + "</td>"
                            + "<td>" + json[i].payment_time + "</td><td>" + json[i].time_up_slip + "</td>"
                            + "<td>" + json[i].payment_bank + "</td> <td>" + json[i].payment_amount + "</td> <td>" + '<img id ="img-' + i + '" src="img/slip/' + json[i].slip_img + '"  width="120" height="120"  ></img>' + "</td> <td>" + json[i].ticket_status_id + ""
                            + "<td><button id='confirm-slip-" + i + "' class='btn btn-success'>ผ่าน</button>   <button id='cancel-slip-" + i + "' class='btn btn-danger'>ไม่ผ่าน</button></td></tr>"
                        document.getElementById('img-' + i).setAttribute('onclick', 'getImgSlip("' + json[i].slip_img + '")')
                        document.getElementById('img-' + i).style.cursor = 'zoom-in';
                        document.getElementById('confirm-slip-' + i).setAttribute('onclick', 'setConfirmSlip("' + json[i].ticket_code + '")')
                        document.getElementById('cancel-slip-' + i).setAttribute('onclick', 'setCancelSlip("' + json[i].ticket_code + '")')
                        document.getElementById('btn-diolog-customer-' + ListSlipUnique.length + '').setAttribute('onclick', 'getDialogListCustomerFromSlip("' + json[i].ticket_code + '")')
                    }
                }
            }
        } else if (btnSlip == 'NoValidate') {
            domTbody.innerHTML = "";
            for (let i = 0; i < json.length; i++) {
                if (json[i].ticket_status_id == 1 && json[i].time_up_slip != null) {
                    let unique;
                    if (ListSlipUnique.length == 0) {
                        ListSlipUnique.push(json[i].ticket_code);
                        json[i].ticket_status_id = 'ผ่านการตรวจสอบ';
                        domTbody.innerHTML += "<tr><td>" + json[i].ticket_code + "</td> <td><button id='btn-diolog-customer-" + ListSlipUnique.length + "' class='btn btn-link'>ดูรายการ</button></td>"
                            + "<td>" + json[i].boat_number + "</td>"
                            + "<td>" + json[i].payment_time + "</td><td>" + json[i].time_up_slip + "</td>"
                            + "<td>" + json[i].payment_bank + "</td> <td>" + json[i].payment_amount + "</td> <td>" + '<img id ="img-' + i + '" src="img/slip/' + json[i].slip_img + '"  width="120" height="120"  ></img>' + "</td> <td>" + json[i].ticket_status_id + ""
                            + "<td></td></tr>"
                        document.getElementById('img-' + i).setAttribute('onclick', 'getImgSlip("' + json[i].slip_img + '")')
                        document.getElementById('img-' + i).style.cursor = 'zoom-in';
                        document.getElementById('btn-diolog-customer-' + ListSlipUnique.length + '').setAttribute('onclick', 'getDialogListCustomerFromSlip("' + json[i].ticket_code + '")')
                        continue;
                    }

                    for (let count = 0; count < ListSlipUnique.length; count++) {
                        if (ListSlipUnique[count] != json[i].ticket_code) {
                            unique = true;
                            continue;
                        }
                        else if (ListSlipUnique[count] == json[i].ticket_code) {
                            unique = false;
                            break;
                        }
                    }
                    if (unique == true) {
                        ListSlipUnique.push(json[i].ticket_code);
                        json[i].ticket_status_id = 'ผ่านการตรวจสอบ';
                        domTbody.innerHTML += "<tr><td>" + json[i].ticket_code + "</td> <td><button id='btn-diolog-customer-" + ListSlipUnique.length + "'class='btn btn-link'>ดูรายการ</button></td>"
                            + "<td>" + json[i].boat_number + "</td>"
                            + "<td>" + json[i].payment_time + "</td><td>" + json[i].time_up_slip + "</td>"
                            + "<td>" + json[i].payment_bank + "</td> <td>" + json[i].payment_amount + "</td> <td>" + '<img id ="img-' + i + '" src="img/slip/' + json[i].slip_img + '"  width="120" height="120"  ></img>' + "</td> <td>" + json[i].ticket_status_id + ""
                            + "<td></td></tr>"
                        document.getElementById('img-' + i).setAttribute('onclick', 'getImgSlip("' + json[i].slip_img + '")')
                        document.getElementById('img-' + i).style.cursor = 'zoom-in';
                        document.getElementById('btn-diolog-customer-' + ListSlipUnique.length + '').setAttribute('onclick', 'getDialogListCustomerFromSlip("' + json[i].ticket_code + '")')
                    }
                }
            }
        }

    } catch (err) {
        return;
    }
}
const getImgSlip = (img) => {
    document.getElementById('modal-body-slip').innerHTML = '<img src="img/slip/' + img + '"  width="100%" height="500px"  ></img>'
    $("#myModal").modal({ backdrop: 'static', keyboard: false });
}

const setConfirmSlip = async (ticketCode) => {
    try {
        let response = await fetch('model/apiConfirmSlip.php', {
            method: "POST",
            body: JSON.stringify({ ticketCode: ticketCode }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        let json = await response.json();
        if (json == true) {
            getSlipTranferMoney();
            getCountSlipNoValidate()
        }
        else {
            alert('Error เกิดข้อผิดพลาด');
        }
    }
    catch (err) {
        alert('Error การตรวจสอบสลิป : ' + err);
    }
}

const setCancelSlip = async (ticketCode) => {
    try {
        let response = await fetch('model/apiCancelSlip.php', {
            method: "POST",
            body: JSON.stringify({ ticketCode: ticketCode }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        let json = await response.json();
        if (json == true) {
            getSlipTranferMoney();
            getCountSlipNoValidate()
        }
        else {
            alert('Error เกิดข้อผิดพลาด');
        }
    }
    catch (err) {
        alert('Error การยกเลิกสลิป : ' + err);
    }
}

const getDialogListCustomerFromSlip = async (ticketCode) => {
    try {
        let response = await fetch('model/apiGetTicket.php', {
            method: "POST",
            body: JSON.stringify({ ticketCode: ticketCode }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        let json = await response.json();
        document.getElementById('dialog-ticketCode').innerHTML = "รายชื่อลูกค้า CODE : " + ticketCode;
        document.getElementById('tbody-modal').innerHTML = "";
        for (let i = 0; i < json.length; i++) {
            document.getElementById('tbody-modal').innerHTML += "<tr>"
                + "<td>" + json[i].cust_first_name + "</td> <td>" + json[i].cust_last_name + "</td> <td>" + json[i].phone_number + "</td> <td>" + json[i].boat_seat_number + "</td><td>" + json[i].floor + "</td></tr>";
        }
        document.getElementById('tbody-modal').innerHTML += "<tr><td style='text-align:right;' colspan='5'>จำนวนลูกค้า : " + json.length + "</td></tr>"
        $("#dialogListCustomer").modal({ backdrop: 'static', keyboard: false });
    } catch (err) {
        alert("Error Diolog Slip : " + err)
    }
}

const getCountSlipNoValidate = async () => {
    try {
        let response = await fetch('model/apiGetCountSlipNoValidate.php');
        let json = await response.json();
        if (json.length > 0) {
            document.getElementById('count-slip-navbar').innerHTML = "สลิปโอนเงิน <sup>" + json.length + " <i class='fas fa-envelope'></i></sup>";
            document.getElementById('count-slip-navbar').style.color = "yellow"
            document.getElementById('count-slip-navbar').style.cursor = "pointer";
            document.getElementById('count-slip-navbar').onmouseover = function () {
                document.getElementById('count-slip-navbar').innerHTML = "สลิปโอนเงิน <sup>" + json.length + " <i class='fas fa-envelope-open'></i></sup>";
            }
            document.getElementById('count-slip-navbar').onmouseout = function () {
                document.getElementById('count-slip-navbar').innerHTML = "สลิปโอนเงิน <sup>" + json.length + " <i class='fas fa-envelope'></i></sup>";
            }
        }
    } catch (err) {
        document.getElementById('count-slip-navbar').innerHTML = "สลิปโอนเงิน";
        document.getElementById('count-slip-navbar').style.color = "#7ba1cb";
        document.getElementById('count-slip-navbar').style.cursor = "pointer";
    }
}

const getBtnValidateSlip = () => {
    let checkIn_or_checkout;
    if (document.getElementById('btnSlipNoValidated').getAttribute('class') == 'btn btn-success') {
        checkIn_or_checkout = 'Validate';
    }
    else {
        checkIn_or_checkout = 'NoValidate';
    }
    return checkIn_or_checkout;
}