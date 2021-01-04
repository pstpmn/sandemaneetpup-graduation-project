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
    await getBottomBoatSeatStatus(date, boatNumber);
}


const getBottomBoatSeatStatus = async (date, boatNumber) => {
    const response = await fetch('model/apiSeatStatus.php', {
        method: "POST",
        body: JSON.stringify({
            date: date,
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
        if (document.getElementById('phoneNumber-' + i + '').value == "") {
            return alert('กรุณา ระบุเบอร์โทรศัพท์ของลูกค้า ที่นั่ง : ' + listSeatNumber[i])
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
        const response = await fetch('model/apiLocation.php');
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

const getTicketCheckIn = async () => {
    try {
        let response = await fetch('model/apiGetTicketAll.php');
        let json = await response.json();
        document.getElementById('tbody').innerHTML = "";
        for (let count = 0; count < json.length; count++) {
            if (json[count].check_in != null || json[count].check_out != null) {
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
    } catch (err) {
        alert(err)
    }
}

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