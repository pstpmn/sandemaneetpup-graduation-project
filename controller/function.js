const validateDeadline = (current, deadline) => {

    if (current.getYear() < deadline.getYear()) {
        return true;
    }

    else if (current.getYear() > deadline.getYear()) {
        return false;
    }


    if (current.getMonth() < deadline.getMonth()) {
        return true;
    }
    else if (current.getMonth() > deadline.getMonth()) {
        return false;
    }

    if (current.getDate() < deadline.getDate()) {
        return true;
    }

    else if (current.getDate() > deadline.getDate()) {
        return false;
    }

    if (current.getHours() < deadline.getHours()) {
        return true;
    }
    else if (current.getHours() > deadline.getHours()) {
        return false;
    }

    if (current.getMinutes() < deadline.getMinutes()) {
        return true;
    }
    if (current.getMinutes() > deadline.getMinutes()) {
        return false;
    }

    return false;
}


const getBottomBoatSeatData = async (boatNumber, date) => {
    const response = await fetch('model/apiBoatSeat.php', {
        method: "POST",
        body: JSON.stringify({ boatNumber: boatNumber }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    const json = await response.json();
    document.getElementById("rightBottom").innerHTML = "";
    document.getElementById("leftBottom").innerHTML = "";
    document.getElementById("rightBottom").innerHTML += '<td bgcolor="#fff"><center>Right</center></td>';
    document.getElementById("leftBottom").innerHTML += '<td bgcolor="#fff"><center>Left</center></td>';
    for (let i = 0; i < json.length; i++) {
        if (json[i].floor == 'B' && json[i].boat_seat_type == 'R') {
            document.getElementById("rightBottom").innerHTML += '<td id=' + json[i].boat_seat_id + '  >' + json[i].boat_seat_number + '</td>'
            document.getElementById(json[i].boat_seat_id).setAttribute('onclick', 'checkBoatSeat(' + json[i].boat_seat_id + ',' + json[i].boat_seat_number + ')');
        }
        else if (json[i].floor == 'B' && json[i].boat_seat_type == 'L') {
            document.getElementById("leftBottom").innerHTML += '<td id=' + json[i].boat_seat_id + '>' + json[i].boat_seat_number + '</td>'
            document.getElementById(json[i].boat_seat_id).setAttribute('onclick', 'checkBoatSeat(' + json[i].boat_seat_id + ',' + json[i].boat_seat_number + ')');
        }
    }
    document.getElementById("rightBottom").innerHTML += '<td bgcolor="#fff"><center>Right</center></td>';
    document.getElementById("leftBottom").innerHTML += '<td bgcolor="#fff"><center>Left</center></td>';
    let dateToSeat = date;
    await getBottomBoatSeatStatus(dateToSeat, boatNumber);
}


const getBottomBoatSeatStatus = async (dateToSeat, boatNumber) => {
    const response = await fetch('model/apiSeatStatus.php', {
        method: "POST",
        body: JSON.stringify({
            date: dateToSeat,
            boatNumber: boatNumber
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    const json = await response.json();
    var date = new Date();

    for (let i = 0; i < json.length; i++) {
        let timeCurrent = new Date();
        let deadline = new Date(json[i].deadline_book);
        let resultDeadline = validateDeadline(timeCurrent, deadline);

        if (json[i].ticket_status_id == 1) {
            document.getElementById(json[i].boat_seat_id).innerHTML = ("<td id=" + json[i].boat_seat_id + "><i class='fas fa-check-circle'></i></td>");
            document.getElementById(json[i].boat_seat_id).setAttribute('bgcolor', '#28a745');
            document.getElementById(json[i].boat_seat_id).setAttribute('onclick', '');
        }
        else if (json[i].ticket_status_id == 2 && resultDeadline == true) {
            document.getElementById(json[i].boat_seat_id).innerHTML = ("<td id=" + json[i].boat_seat_id + "><i class='fas fa-check-circle'></i></td>");
            document.getElementById(json[i].boat_seat_id).setAttribute('bgcolor', 'yellow');
            document.getElementById(json[i].boat_seat_id).setAttribute('onclick', '');
        }
    }
}

const getTopBoatSeatData = async (boatNumber, date) => {
    const response = await fetch('model/apiBoatSeat.php', {
        method: "POST",
        body: JSON.stringify({ boatNumber: boatNumber }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    const json = await response.json();
    document.getElementById("rightTop").innerHTML = "";
    document.getElementById("leftTop").innerHTML = "";
    document.getElementById("rightTop").innerHTML += '<td bgcolor="#fff"><center>Right</center></td>';
    document.getElementById("leftTop").innerHTML += '<td bgcolor="#fff"><center>Left</center></td>';
    for (let i = 0; i < json.length; i++) {
        if (json[i].floor == 'T' && json[i].boat_seat_type == 'R') {
            document.getElementById("rightTop").innerHTML += '<td id=' + json[i].boat_seat_id + '>' + json[i].boat_seat_number + '</td>'
            document.getElementById(json[i].boat_seat_id).setAttribute('onclick', 'checkBoatSeat(' + json[i].boat_seat_id + ',' + json[i].boat_seat_number + ')');
        }
        else if (json[i].floor == 'T' && json[i].boat_seat_type == 'L') {
            document.getElementById("leftTop").innerHTML += '<td id=' + json[i].boat_seat_id + '>' + json[i].boat_seat_number + '</td>'
            document.getElementById(json[i].boat_seat_id).setAttribute('onclick', 'checkBoatSeat(' + json[i].boat_seat_id + ',' + json[i].boat_seat_number + ')');

        }
    }
    document.getElementById("rightTop").innerHTML += '<td bgcolor="#fff"><center>Right</center></td>';
    document.getElementById("leftTop").innerHTML += '<td bgcolor="#fff"><center>Left</center></td>';
    await getTopBoatSeatStatus();

}

const getTopBoatSeatStatus = async () => {
    const response = await fetch('model/apiSeatStatus.php');
    const json = await response.json();
    for (let i = 0; i < json.length; i++) {
        let timeCurrent = new Date();
        let deadline = new Date(json[i].deadline_book);
        let resultDeadline = validateDeadline(timeCurrent, deadline);
        if (json[i].ticket_status_id == 1) {
            document.getElementById(json[i].boat_seat_id).innerHTML = ("<td id=" + json[i].boat_seat_id + "><i class='fas fa-check-circle'></i></td>");
            document.getElementById(json[i].boat_seat_id).setAttribute('bgcolor', '#28a745');
            document.getElementById(json[i].boat_seat_id).setAttribute('onclick', '');
        }
        else if (json[i].ticket_status_id == 2 && resultDeadline == true) {
            document.getElementById(json[i].boat_seat_id).innerHTML = ("<td id=" + json[i].boat_seat_id + "><i class='fas fa-check-circle'></i></td>");
            document.getElementById(json[i].boat_seat_id).setAttribute('bgcolor', 'yellow');
            document.getElementById(json[i].boat_seat_id).setAttribute('onclick', '');
        }
    }
}

const checkBoatSeat = (id, number) => {
    let td = document.getElementById(id);
    if (td.getAttribute('bgcolor') == 'gray') {
        td.removeAttribute('bgcolor');
        for (let i = 0; i < listSeat.length; i++) {
            if (listSeat[i] == id) {
                listSeat.splice(i, 1);
                listSeatNumber.splice(i, 1);
                break;
            }
        }
    }
    else {
        document.getElementById(id).setAttribute('bgcolor', 'gray');
        listSeat.push(id);
        listSeatNumber.push(number);

    }
    getListSeat();
}

const getListSeat = () => {
    let numberBoatSeat = document.getElementById('number-boatseat');
    numberBoatSeat.innerHTML = listSeatNumber;
}

const saveTicketNormal = async (listSeat, listSeatNumber) => {
    let json;
    for (let i = 0; i < listSeatNumber.length; i++) {
        if (document.getElementById('genderM-' + i + '').checked == false && document.getElementById('genderF-' + i + '').checked == false) {
            return alert('กรุณา ระบุเพศของลูกค้า ที่นั่ง : ' + listSeatNumber[i])
        }
        if (document.getElementById('fristName-' + i + '').value == "") {
            return alert('กรุณา ระบุชื่อของลูกค้า ที่นั่ง : ' + listSeatNumber[i])
        }
        if (document.getElementById('lastName-' + i + '').value == "") {
            return alert('กรุณา ระบุนามสกุลของลูกค้า ที่นั่ง : ' + listSeatNumber[i])
        }
    }

    try {
        let response = await fetch('model/apiCheckTicketCode.php');
        json = await response.json();
    }
    catch (err) {
        return alert("Error Ticker Code เกิดข้อผิดพลาด !!\n " + err + "");
    }

    for (let i = 0; i < listSeatNumber.length; i++) {
        let gender;
        if (document.getElementById('genderM-' + i + '').checked == true) {
            gender = "Male";
        }
        else if (document.getElementById('genderF-' + i + '').checked == true) {
            gender = "Female";
        }

        let detailCustomer = {
            fristName: document.getElementById('fristName-' + i + '').value,
            lastName: document.getElementById('lastName-' + i + '').value,
            phoneNumber: document.getElementById('phoneNumber-' + i + '').value,
            gender: gender,
            date: date = document.getElementById('date').value,
            ticketID: listSeat[i],
            ticketStatus: 1,
            ticketCode: json
        }
        try {
            let response = await fetch('model/apiSaveTicket.php', {
                method: "POST",
                body: JSON.stringify(detailCustomer),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

            const text = await response.text();
            if (text == 'true') {
            }
            else {
                alert("บันทึกข้อมูลไม่สำเร็จ");
                return;
            }

        } catch (e) {
            alert("Error " + e);
            location.reload();
            return;
        }
    }
    alert('บันทึกสำเร็จ');
    location.reload();
}

const getLocation = async () => {
    try {
        const response = await fetch('model/apiLocation.php', {
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const json = await response.json();
        return json;
    } catch (error) {
        return error;
    }
}

const getSelectLocation = async () => {
    let location = await getLocation();
    const LOCATIONDATA = location;
    const SELECTLOCATIONSTART = document.getElementById('select-Location_start');
    const SELECTLOCATIONEND = document.getElementById('select-Location_end');


    for (let count = 0; count < location.length; count++) {
        SELECTLOCATIONSTART.innerHTML += "<option value=" + LOCATIONDATA[count].location_id + ">" + LOCATIONDATA[count].location_name + "</option>"
        SELECTLOCATIONEND.innerHTML += "<option value=" + LOCATIONDATA[count].location_id + ">" + LOCATIONDATA[count].location_name + "</option>"

    }
}

const getSearchBoat = async (origin, destination) => {
    let boatNumber = document.getElementById('boat-number');

    if (origin == destination) {
        alert('ต้นทาง และปลายทาง เหมือนกัน !!')
        return;
    }

    let responseOrigin = await fetch('model/apiSearchBoat.php', {
        method: "POST",
        body: JSON.stringify({ location: origin }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    let jsonOrgin = await responseOrigin.json();


    let responseDestination = await fetch('model/apiSearchBoat.php', {
        method: "POST",
        body: JSON.stringify({ location: destination }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    let jsonDestination = await responseDestination.json();

    let maxResponse;
    let minResponse;


    if (jsonOrgin.length == jsonDestination.length) {
        maxResponse = jsonOrgin;
        minResponse = jsonDestination;
    }
    else if (jsonOrgin.length > jsonDestination.length) {
        maxResponse = jsonOrgin;
        minResponse = jsonDestination;

    }
    else {
        maxResponse = jsonDestination;
        minResponse = jsonOrgin;
    }

    boatNumber.innerHTML = "";
    for (let countMax = 0; countMax < maxResponse.length; countMax++) {
        for (let countMin = 0; countMin < minResponse.length; countMin++) {
            if (maxResponse[countMax].boat_number == minResponse[countMin].boat_number) {
                boatNumber.innerHTML += "<option value=" + maxResponse[countMax].boat_number + " >หมายเลขเรือ : " + maxResponse[countMax].boat_number + "  เวลา : " + maxResponse[countMax].start_time + " - " + minResponse[countMin].return_time + " </option>";
            };
        }
    }
}


const getBoatSeat = (boatNumber, date, orgin, destination) => {
    if (orgin == destination) {
        alert('ต้นทาง และปลายทาง เหมือนกัน !!')
        return;
    }
    //make Empty array Boat seat
    listSeat = [];
    listSeatNumber = [];
    getListSeat();

    document.getElementById('container-boatSeat-customerData').style.display = "block";
    getBottomBoatSeatData(boatNumber, date);
    getTopBoatSeatData(boatNumber, date);
}

const getDetailCustomerFromTicketCode = async (ticketCode) => {
    try {
        let response = await fetch('model/apiGetTicket.php', {
            method: "POST",
            body: JSON.stringify({ ticketCode: ticketCode }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        let json = await response.json();
        document.getElementById('fristName-label').innerHTML = json[0].cust_first_name;
        document.getElementById('lastName-label').innerHTML = json[0].cust_last_name;
        document.getElementById('phone-label').innerHTML = json[0].phone_number;
        document.getElementById('ticketCode-label').innerHTML = json[0].ticket_code;
        document.getElementById('ticketType-label').innerHTML = json[0].ticket_category_name;
        document.getElementById('employee-label').innerHTML = json[0].username;
        document.getElementById('numberSeat-label').innerHTML = json[0].boat_seat_number;
        document.getElementById('numberSeat-label').innerHTML = json[0].boat_seat_number;
        document.getElementById('numbetBoat-label').innerHTML = json[0].boat_number;
        document.getElementById('seatType-label').innerHTML = json[0].boat_seat_type;
        document.getElementById('floor-label').innerHTML = json[0].floor;
        document.getElementById('travel-label').innerHTML = json[0].travel_date;
        document.getElementById('buyTime-label').innerHTML = json[0].time_buy_ticket;
    } catch (err) {
        alert("ค้นหาไม่พบ Ticket Code นี้")
    }

}

const setCancelTicket = async (ticketCode) => {
    try {
        let response = await fetch('model/apiSetCancelTicket.php', {
            method: "POST",
            body: JSON.stringify({ ticketCode: ticketCode }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        let json = await response.json();
        alert(json)

    }
    catch (err) {
        alert(err)
    }
}


const getConvertDateMonthYear = (date) => {
    try {
        let dateConvert = new Date(date);
        let day;
        let month;
        if(dateConvert.getDate() < 10){
            day = "0"+dateConvert.getDate();
        }
        if(dateConvert.getMonth() < 10){
            month = "0"+(dateConvert.getMonth()+1);
        }
        return dateConvert.getFullYear() + "-" + month + "-" + day;
    } catch (err) {
        return "Error ConvertDate : " + err;
    }
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
    try {
        let ButtomCheckin = getValidateSelectButtomCheckIn();
        let timeCurrent = getConvertDateMonthYear(new Date());
        let response = await fetch('model/apiGetTIcketAll.php');
        let json = await response.json();

        document.getElementById('tbody').innerHTML = "";
        for (let count = 0; count < json.length; count++) {
            let dateTicket = json[count].travel_date;
            if (ButtomCheckin == 'checkIn') {
                if (timeCurrent == dateTicket && json[count].check_in != null) {
                    let array = [json[count].ticket_code, json[count].cust_first_name, json[count].cust_last_name, json[count].boat_seat_number, json[count].floor, json[count].boat_number, json[count].check_in, json[count].check_out];
                    if (array[6] == null) {
                        array[6] = "<i class='fas fa-times-circle' ></i>";
                    }
                    else {
                        array[6] = "<i class='fas fa-check' ></i>";
                    }
                    if (array[7] == null) {
                        array[7] = "<i class='fas fa-times-circle' ></i>";
                    }
                    else {
                        array[7] = "<i class='fas fa-check' ></i>";
                    }
                    document.getElementById('tbody').innerHTML += "<tr><td>" + array[0] + "</td> <td>" + array[1] + "</td> <td>" + array[2] + "</td> <td>" + array[3] + "</td> <td>" + array[4] + "</td> <td>" + array[5] + "</td> <td>" + array[6] + "</td> <td>" + array[7] + "</td> </tr>";
                }
            }
            else if (ButtomCheckin == 'checkOut') {
                if (timeCurrent == dateTicket && json[count].check_out != null) {
                    let array = [json[count].ticket_code, json[count].cust_first_name, json[count].cust_last_name, json[count].boat_seat_number, json[count].floor, json[count].boat_number, json[count].check_in, json[count].check_out];
                    if (array[6] == null) {
                        array[6] = "<i class='fas fa-times-circle' ></i>";
                    }
                    else {
                        array[6] = "<i class='fas fa-check' ></i>";
                    }
                    if (array[7] == null) {
                        array[7] = "<i class='fas fa-times-circle' ></i>";
                    }
                    else {
                        array[7] = "<i class='fas fa-check' ></i>";
                    }
                    document.getElementById('tbody').innerHTML += "<tr><td>" + array[0] + "</td> <td>" + array[1] + "</td> <td>" + array[2] + "</td> <td>" + array[3] + "</td> <td>" + array[4] + "</td> <td>" + array[5] + "</td> <td>" + array[6] + "</td> <td>" + array[7] + "</td> </tr>";
                }
            }
        }
    } catch (err) {
        alert(err)
    }
}

const btnSelectCheckInAndOut = (dom) => {
    if (dom.id == 'btncheckIn') {
        document.getElementById('btncheckIn').setAttribute('class', 'btn btn-success');
        document.getElementById('btncheckOut').setAttribute('class', 'btn btn-warning');
        getTicketCheckIn();
    }
    else {
        document.getElementById('btncheckIn').setAttribute('class', 'btn btn-warning');
        document.getElementById('btncheckOut').setAttribute('class', 'btn btn-success');
        getTicketCheckIn();
    }
}


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

const registerCustomer = (listSeat, listSeatNumber) => {
    if (listSeatNumber.length == 0 || listSeat.length == 0) return alert('กรุณาเลือกที่นั่ง');
    $("#myModal").modal();
    document.getElementById('register-customer').innerHTML = "";
    listSeatNumber.sort(function (a, b) { return a - b });
    listSeat.sort(function (a, b) { return a - b });

    for (let i = 0; i < listSeatNumber.length; i++) {
        document.getElementById('register-customer').innerHTML += '<div id="register-customer-detail"> เลขที่นั่งเรือ : ' + listSeatNumber[i] + ''
            + '<input type="text" class="form-control" id="fristName-' + i + '" placeholder="ชื่อจริง"><br>'
            + '<input type="text" class="form-control" id="lastName-' + i + '" placeholder="นามสกุล"><br>'
            + '<input type="number" class="form-control" id="phoneNumber-' + i + '" placeholder="เบอร์โทรศัพท์"><br>'
            + '<form><input type="radio" class="form-control" id="genderM-' + i + '" name="gender" value="Male">ชาย'
            + '<input type="radio" class="form-control " id="genderF-' + i + '" name="gender" value="Female">หญิง</form>';
        document.getElementById('register-customer').innerHTML += "</div><br>"
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
                if (json[i].ticket_status_id == 2 && json[i].time_up_slip != null) {
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
                        json[i].ticket_status_id = 'รอตรวจสอบ';
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
                        json[i].ticket_status_id = 'รอตรวจสอบ';
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
                + "<td>" + json[i].cust_first_name + "</td> <td>" + json[i].cust_last_name + "</td> <td>" + json[i].phone_number + "</td> <td>" + json[i].boat_seat_number + "</td></tr>";
        }
        document.getElementById('tbody-modal').innerHTML += "<tr><td style='text-align:right;' colspan='4'>จำนวนลูกค้า : " + json.length + "</td></tr>"
        $("#dialogListCustomer").modal();
    } catch (err) {
        alert("Error Diolog Slip : " + err)
    }
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


const getImgSlip = (img) => {
    document.getElementById('modal-body-slip').innerHTML = '<img src="img/slip/' + img + '"  width="100%" height="500px"  ></img>'
    $("#myModal").modal();
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
        document.getElementById('count-slip-navbar').style.color = "white";
        document.getElementById('count-slip-navbar').style.cursor = "pointer";
    }
}

const getTicketEdit = async () => {
    try {
        let response = await fetch('model/apiGetTIcketAll.php');
        let json = await response.json();
        let domTbodyTable = document.getElementById('table-ticket-edit');
        domTbodyTable.innerHTML = ""
        for (let i = 0; i < json.length; i++) {
            let img;
            if (json[i].slip_img != null) {
                img = "<img id ='img-" + i + "' src='img/slip/" + json[i].slip_img + "'  width='120' height='120'  onclick='getImgSlip(" + json[i].slip_img + ")'></img>";
            }
            else {
                img = "<label>ไม่มีรูปภาพ</label>";
            }

            domTbodyTable.innerHTML += "<tr>"
                + "<td><p id='ticketCode-" + i + "'>" + json[i].ticket_code + "</p></td> <td><p id='ticketType-" + i + "'>" + json[i].ticket_category_name + "</p></td> <td><p id='boatNumber-" + i + "'>" + json[i].boat_number + "</p></td>"
                + "<td> <button id='btn-diolog-customer-" + i + "' class='btn btn-link'>ดูรายการ</button></td> <td ><p id='emp-" + i + "'>" + json[i].emp_first_name + "</p></td>"
                + "<td><p id='timeBuyTicket-" + i + "'>" + json[i].time_buy_ticket + "</p></td> <td <p id='travelDate-" + i + "'>" + json[i].travel_date + "</p></td> <td><p id='deadLineBook-" + i + "'>" + json[i].deadline_book + "</p></td>"
                + "<td><p id='ticketStatus-" + i + "'>" + json[i].ticket_status_name + "</p></td> <td>" + img + "</td> <td><p id='timeUpSlip-" + i + "'>" + json[i].time_up_slip + "</p></td><td><button id='btnEdit-" + i + "' class='btn btn-warning'>Edit</button> <button id='btnDelete-" + i + "' class='btn btn-danger'>Delect</button></td>"
                + "</tr>";

            //setting Event Tag <p> Use double Click 
            document.getElementById('ticketCode-' + i + '').setAttribute('ondblclick', 'getShowModalEditTicketCode("' + json[i].ticket_code + '")')
            document.getElementById('ticketType-' + i + '').setAttribute('ondblclick', 'getModalEditTicketType("' + json[i].ticket_category_name + '")')
            document.getElementById('boatNumber-' + i + '').setAttribute('ondblclick', 'setEditTicketCode("' + json[i].boat_number + '")')
            document.getElementById('emp-' + i + '').setAttribute('ondblclick', 'setEditTicketCode("' + json[i].emp_first_name + '")')
            document.getElementById('timeBuyTicket-' + i + '').setAttribute('ondblclick', 'setEditTicketCode("' + json[i].time_buy_ticket + '")')
            document.getElementById('travelDate-' + i + '').setAttribute('ondblclick', 'setEditTicketCode("' + json[i].travel_date + '")')
            document.getElementById('deadLineBook-' + i + '').setAttribute('ondblclick', 'setEditTicketCode("' + json[i].deadline_book + '")')
            document.getElementById('ticketStatus-' + i + '').setAttribute('ondblclick', 'setEditTicketCode("' + json[i].ticket_status_name + '")')
            document.getElementById('timeUpSlip-' + i + '').setAttribute('ondblclick', 'setEditTicketCode("' + json[i].time_up_slip + '")')

            //setting btn
            document.getElementById('btnDelete-' + i + '').setAttribute('onclick', 'setCancelTicket("' + json[i].ticket_code + '")');
            document.getElementById('btn-diolog-customer-' + i + '').setAttribute('onclick', 'getDialogListCustomerFromSlip("' + json[i].ticket_code + '")')
            document.getElementById('btnEdit-' + i + '').setAttribute('onclick', 'setEditTicketDialog("' + json[i].ticket_code + '","' + json[i].ticket_category_name + '","' + json[i].boat_number + '","' + json[i].emp_first_name + '","' + json[i].time_buy_ticket + '","' + json[i].travel_date + '","' + json[i].deadline_book + '","' + json[i].ticket_status_name + '","' + img + '","' + json[i].time_up_slip + '","' + json[i].time_up_slip + '",)');


        }
        $(document).ready(function () {
            $('#dataTable-TicketEdit').dataTable({
                "lengthChange": false
            });
        })
    }
    catch (err) {
        alert('Error ticket edit\n :' + err)
    }
}
// ticketCode,typeTicket,numberBoat,employeeName,buyTicket,deadline,dateTravel,statusTicket,img,timeUpSlip

const setEditTicketDialog = async (ticketCode, typeTicket, numberBoat, employeeName, buyTicket, deadline, dateTravel, statusTicket, img, timeUpSlip) => {
    document.getElementById('tbody-EditTicket-modal').innerHTML = "";
    document.getElementById('tbody-EditTicket-modal').innerHTML = "<tr><td><input type='text' value='" + ticketCode + "'></td>"
        + "<td><input type='text' value='" + typeTicket + "'></td> <td>" + numberBoat + "</td> <td><button id='btn-diolog-customer-" + ticketCode + "' class='btn btn-link'>ดูรายการ</button></td> <td>" + employeeName + "</td> <td>" + buyTicket + "</td> <td>" + deadline + "</td> <td>" + dateTravel + "</td> "
        + " <td>" + statusTicket + "</td> <td>" + img + "</td> <td>" + timeUpSlip + "</td></tr>";
    document.getElementById('btn-diolog-customer-' + ticketCode + '').setAttribute('onclick', 'getDialogListCustomerFromSlip("' + ticketCode + '")');
    $("#dialog-TicketEdit").modal();
}

const getModalEditTicketType = async (ticketType) => {
    try {
        let response = await fetch('model/apiGetTicketCatagory.php');
        let json = await response.json();
        let node = document.createElement("select");
        document.getElementById('modal-body-editTicket').innerHTML ="";
        for (let i = 0; i < json.length; i++) {
            var option = document.createElement("option");
            option.text = json[i].ticket_category_name;
            option.value = json[i].ticket_category_id;
            if(ticketType == json[i].ticket_category_name){
                option.selected = true;
            }
            node.appendChild(option);
        }
        document.getElementById('modal-body-editTicket').appendChild(node)
    } catch (err) {
        alert("Error modal get Ticket Catagory : " + err)
    }

    $("#dialog-TicketEdit").modal();
}


const getShowModalEditTicketCode = (id) => {
    document.getElementById('modal-body-editTicket').innerHTML = "";
    document.getElementById('modal-body-editTicket').innerHTML = "รหัสตั๋ว <input type='tell' class='form-control' value=" + id + ">"
    document.getElementById('modal-footer').innerHTML = "<button class='btn btn-success'>Recode</button> <button class='btn btn-warning'>Reset</button> "
    $("#dialog-TicketEdit").modal();
}

const setEditTicketCode = (id) => {

}

const setEditTicketType = async () => {

}
const setEditCustomer = async () => {

}
const setEditEmployee = async () => {

}
const setEditTimeBuyTicket = async () => {

}

const setEditDeadlineBook = async () => {

}
const setEditTravelTime = async () => {

}
const setEditTicketStatus = async () => {

}
const setEditImg = async () => {

}
const setEditUpslipTime = async () => {

}