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


const getBottomBoatSeatData = async (boatNumber, date, ticketCode) => {
    try {
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
        await getBottomBoatSeatStatus(dateToSeat, boatNumber, ticketCode);
    } catch (err) {
        alert('Error Get Bottom Boat Seat : ' + err)
    }
}

const getBottomBoatSeatDataForChangeBoatSeat = async (boatNumber, date, ticketCode, BoatSeatID) => {
    try {
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
                document.getElementById(json[i].boat_seat_id).setAttribute('onclick', 'checkBoatSeatForChangeBoatSeat(' + json[i].boat_seat_id + ',' + json[i].boat_seat_number + ')');
            }
            else if (json[i].floor == 'B' && json[i].boat_seat_type == 'L') {
                document.getElementById("leftBottom").innerHTML += '<td id=' + json[i].boat_seat_id + '>' + json[i].boat_seat_number + '</td>'
                document.getElementById(json[i].boat_seat_id).setAttribute('onclick', 'checkBoatSeatForChangeBoatSeat(' + json[i].boat_seat_id + ',' + json[i].boat_seat_number + ')');
            }
        }
        document.getElementById("rightBottom").innerHTML += '<td bgcolor="#fff"><center>Right</center></td>';
        document.getElementById("leftBottom").innerHTML += '<td bgcolor="#fff"><center>Left</center></td>';
        let dateToSeat = date;
        await getBottomBoatSeatStatusForChangeBoatSeat(dateToSeat, boatNumber, ticketCode, BoatSeatID);
    } catch (err) {
        alert('Error Get Bottom Boat Seat for change : ' + err)
    }
}


const getBottomBoatSeatStatus = async (dateToSeat, boatNumber, ticketCode) => {
    try {
        const response = await fetch('model/apiSeatStatus.php', {
            method: "POST",
            body: JSON.stringify({
                date: dateToSeat,
                boatNumber: boatNumber,
                floor: 'B'
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const json = await response.json();

        for (let i = 0; i < json.length; i++) {
            let timeCurrent = new Date();
            let deadline = new Date(json[i].deadline_book);
            let resultDeadline = validateDeadline(timeCurrent, deadline);

            if (json[i].ticket_status_id == 1) {
                if (ticketCode == json[i].ticket_code) {
                    document.getElementById(json[i].boat_seat_id).innerHTML = ("<td id=" + json[i].boat_seat_id + "><i class='fas fa-check-circle'></i></td>");
                    document.getElementById(json[i].boat_seat_id).setAttribute('class', 'bg-primary');
                    document.getElementById(json[i].boat_seat_id).setAttribute('onclick', '');
                    continue;
                }
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
    } catch (err) {
        // alert('Error Get Bottom Boat Seat Status : ' + err)
    }
}

const getBottomBoatSeatStatusForChangeBoatSeat = async (dateToSeat, boatNumber, ticketCode, BoatSeatID) => {
    // alert(dateToSeat  +" "+ boatNumber  +" "+ ticketCode +" "+ BoatSeatID)
    try {
        const response = await fetch('model/apiSeatStatus.php', {
            method: "POST",
            body: JSON.stringify({
                date: dateToSeat,
                boatNumber: boatNumber,
                floor: 'B'
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const json = await response.json();

        for (let i = 0; i < json.length; i++) {
            let timeCurrent = new Date();
            let deadline = new Date(json[i].deadline_book);
            let resultDeadline = validateDeadline(timeCurrent, deadline);
            if (json[i].ticket_status_id == 1) {
                if (json[i].boat_seat_id == BoatSeatID && json[i].floor == 'B') {
                    document.getElementById(json[i].boat_seat_id).innerHTML = ("<td id=" + json[i].boat_seat_id + ">" + json[i].boat_seat_number + "</td>");
                    document.getElementById(json[i].boat_seat_id).setAttribute('bgcolor', 'gray');
                    document.getElementById(json[i].boat_seat_id).setAttribute('onclick', '');
                    document.getElementById(json[i].boat_seat_id).setAttribute('onclick', 'checkBoatSeatForChangeBoatSeat(' + json[i].boat_seat_id + ',' + json[i].boat_seat_number + ')');
                    listSeat.push(json[i].boat_seat_id);
                    listSeatNumber.push(json[i].boat_seat_number);
                    continue;
                }
                if (ticketCode == json[i].ticket_code) {
                    document.getElementById(json[i].boat_seat_id).innerHTML = ("<td id=" + json[i].boat_seat_id + "><i class='fas fa-check-circle'></i></td>");
                    document.getElementById(json[i].boat_seat_id).setAttribute('class', 'bg-primary');
                    document.getElementById(json[i].boat_seat_id).setAttribute('onclick', '');
                    continue;
                }
                document.getElementById(json[i].boat_seat_id).innerHTML = ("<td id=" + json[i].boat_seat_id + "><i class='fas fa-check-circle'></i></td>");
                document.getElementById(json[i].boat_seat_id).setAttribute('bgcolor', '#28a745');
                document.getElementById(json[i].boat_seat_id).setAttribute('onclick', '');
            }
            else if (json[i].ticket_status_id == 2 && resultDeadline == true) {
                document.getElementById(json[i].boat_seat_id).innerHTML += ("<td id=" + json[i].boat_seat_id + "><i class='fas fa-check-circle'></i></td>");
                document.getElementById(json[i].boat_seat_id).setAttribute('bgcolor', 'yellow');
                document.getElementById(json[i].boat_seat_id).setAttribute('onclick', '');
            }
        }
    } catch (err) {
        alert("Error Get Bottom Boat Seat Status for change :" + err)
    }
}

const getTopBoatSeatDataForChangeBoatSeat = async (boatNumber, date, ticketCode, BoatSeatID) => {
    try {
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
                document.getElementById(json[i].boat_seat_id).setAttribute('onclick', 'checkBoatSeatForChangeBoatSeat(' + json[i].boat_seat_id + ',' + json[i].boat_seat_number + ')');
            }
            else if (json[i].floor == 'T' && json[i].boat_seat_type == 'L') {
                document.getElementById("leftTop").innerHTML += '<td id=' + json[i].boat_seat_id + '>' + json[i].boat_seat_number + '</td>'
                document.getElementById(json[i].boat_seat_id).setAttribute('onclick', 'checkBoatSeatForChangeBoatSeat(' + json[i].boat_seat_id + ',' + json[i].boat_seat_number + ')');
            }
        }
        document.getElementById("rightTop").innerHTML += '<td bgcolor="#fff"><center>Right</center></td>';
        document.getElementById("leftTop").innerHTML += '<td bgcolor="#fff"><center>Left</center></td>';
        let dateToSeat = date;
        await getTopBoatSeatStatusForChangeBoatSeat(dateToSeat, boatNumber, ticketCode, BoatSeatID);
    } catch (err) {
        alert("Error Top boat seat for change : " + err)
    }
}

const getTopBoatSeatData = async (boatNumber, date, ticketCode) => {
    try {
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
        let dateToSeat = date;
        await getTopBoatSeatStatus(dateToSeat, boatNumber, ticketCode);
    } catch (err) {
        // alert("Error Top boat seat : " + err)
    }
}

const getTopBoatSeatStatus = async (dateToSeat, boatNumber, ticketCode) => {
    try {
        const response = await fetch('model/apiSeatStatus.php', {
            method: "POST",
            body: JSON.stringify({
                date: dateToSeat,
                boatNumber: boatNumber,
                floor: 'T'
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const json = await response.json();
        for (let i = 0; i < json.length; i++) {
            let timeCurrent = new Date();
            let deadline = new Date(json[i].deadline_book);
            let resultDeadline = validateDeadline(timeCurrent, deadline);
            if (json[i].ticket_status_id == 1) {
                if (ticketCode == json[i].ticket_code && json[i].floor == 'T') {
                    document.getElementById(json[i].boat_seat_id).innerHTML = ("<td id=" + json[i].boat_seat_id + "><i class='fas fa-check-circle'></i></td>");
                    document.getElementById(json[i].boat_seat_id).setAttribute('class', 'bg-primary');
                    document.getElementById(json[i].boat_seat_id).setAttribute('onclick', '');
                    continue;
                }
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
    catch (err) {
        // alert("Error Top boatseat Status : " + err)
    }

}
const getTopBoatSeatStatusForChangeBoatSeat = async (dateToSeat, boatNumber, ticketCode, BoatSeatID) => {
    try {
        const response = await fetch('model/apiSeatStatus.php', {
            method: "POST",
            body: JSON.stringify({
                date: dateToSeat,
                boatNumber: boatNumber,
                floor: 'T'
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const json = await response.json();
        for (let i = 0; i < json.length; i++) {
            let timeCurrent = new Date();
            let deadline = new Date(json[i].deadline_book);
            let resultDeadline = validateDeadline(timeCurrent, deadline);
            if (json[i].ticket_status_id == 1) {
                if (json[i].boat_seat_id == BoatSeatID && json[i].floor == 'T') {
                    document.getElementById(json[i].boat_seat_id).innerHTML = ("<td id=" + json[i].boat_seat_id + ">" + json[i].boat_seat_number + "</td>");
                    document.getElementById(json[i].boat_seat_id).setAttribute('bgcolor', 'gray');
                    document.getElementById(json[i].boat_seat_id).setAttribute('onclick', '');
                    document.getElementById(json[i].boat_seat_id).setAttribute('onclick', 'checkBoatSeatForChangeBoatSeat(' + json[i].boat_seat_id + ',' + json[i].boat_seat_number + ')');
                    listSeat.push(json[i].boat_seat_id);
                    listSeatNumber.push(json[i].boat_seat_number);
                    continue;
                }
                if (ticketCode == json[i].ticket_code) {
                    document.getElementById(json[i].boat_seat_id).innerHTML = ("<td id=" + json[i].boat_seat_id + "><i class='fas fa-check-circle'></i></td>");
                    document.getElementById(json[i].boat_seat_id).setAttribute('class', 'bg-primary');
                    document.getElementById(json[i].boat_seat_id).setAttribute('onclick', '');
                    continue;
                }
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
    catch (err) {
        // alert("Error Get top boat seat Status for change : " + err)
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

const checkBoatSeatForChangeBoatSeat = (id, number) => {
    let td = document.getElementById(id);
    if (td.getAttribute('bgcolor') != 'gray') {
        document.getElementById(id).setAttribute('bgcolor', 'gray');
        document.getElementById(listSeat[0]).removeAttribute('bgcolor');
        listSeat = []
        listSeatNumber = []
        listSeat.push(id);
        listSeatNumber.push(number);
    }
    getListSeat();
}

const getListSeat = async () => {
    let numberBoatSeat = document.getElementById('number-boatseat');
    numberBoatSeat.innerHTML = listSeatNumber;
}

const getListSeatForChangeBoatSeat = () => {
    let numberBoatSeat = document.getElementById('number-boatseat');
    numberBoatSeat.innerHTML = listSeatNumber;
}

const saveTicketNormal = async (listSeat, listSeatNumber, orgin, destination) => {
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
            ticketCode: json,
            orgin: orgin,
            destination: destination
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
                await $('#myModal').modal('hide');
                await getShowResultBuyTicket(json);
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
}


const getShowResultBuyTicket = async (ticketCode) => {
    $('#result-buyTicket').modal({ backdrop: 'static', keyboard: false });
    document.getElementById('detail-customer').innerHTML = "";
    document.getElementById('detail-boat').innerHTML = "";

    document.getElementById('ModalHeader').setAttribute('class', 'modal-header alert alert-success');
    document.getElementById('txtModalHeader').innerHTML = "<h4>ผลลัพธ์การซื้อตั๋ว : สำเร็จ</h4>";
    document.getElementById('txtTicketCode').innerHTML = "รหัสตั๋ว : " + ticketCode;
    try {
        let response = await fetch('model/apiGetTicket.php', {
            method: "POST",
            body: JSON.stringify({ ticketCode: ticketCode }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        json = await response.json();
        document.getElementById('detail-boat').innerHTML = "<tr>"
            + "<td> หมายเลขเรือ : <u>" + json[0].boat_number + "</u></td> <td>ต้นทาง :<u> " + json[0][45] + "</u></td> <td>ปลายทาง : <u>" + json[0][47] + "</u></td> <td>วันออกเดินทาง : <u>" + json[0].travel_date + "</u></td> </tr>"

        for (let i = 0; i < json.length; i++) {
            document.getElementById('detail-customer').innerHTML += "<tr>"
                + "<td> ชื่อ : " + json[i].cust_first_name + " " + json[i].cust_last_name + "</td> <td>เบอร์โทรศัพท์ : " + json[i].phone_number + "</td>"
                + "<td>หมายเลขที่นั่งเรือ : " + json[i].boat_seat_number + "</td> <td>ชั้น : " + json[i].floor + "</td></tr>"
        }

    } catch (err) {
        document.getElementById('ModalHeader').setAttribute('class', 'modal-header alert alert-danger');
        document.getElementById('txtModalHeader').innerHTML = "<h4>ผลลัพธ์การซื้อตั๋ว : ไม่สำเร็จ</h4>";
        document.getElementById('txtTicketCode').innerHTML = "รหัสตั๋ว : ล้มเหลว";
    }

}

const getRefreshPage = () => {
    location.reload();
}

const saveTicketAddCustomer = async (listSeat, listSeatNumber, orgin, destination) => {
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
            ticketCode: document.getElementById('label-ticket-code').value,
            orgin: orgin,
            destination: destination
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

const getSelectLocationChangeBoatSeat = async () => {
    let location = await getLocation();
    const LOCATIONDATA = location;
    const SELECTLOCATIONSTART = document.getElementById('select-Location_start-changeBoatSeat');
    const SELECTLOCATIONEND = document.getElementById('select-Location_end-changeBoatSeat');


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


const getSearchBoatChangeBoatSeat = async (origin, destination) => {
    let boatNumber = document.getElementById('boat-number-changeBoatSeat');

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


const getBoatSeat = async (boatNumber, date, orgin, destination, ticketCode) => {
    if (orgin == destination) {
        alert('ต้นทาง และปลายทาง เหมือนกัน !!')
        return;
    }
    //make Empty array Boat seat
    listSeat = [];
    listSeatNumber = [];
    document.getElementById('container-boatSeat-customerData').style.display = "block";
    await getBottomBoatSeatData(boatNumber, date, ticketCode);
    await getTopBoatSeatData(boatNumber, date, ticketCode);
    await getListSeat();

}

const getBoatSeatForChangBoatSeat = async (boatNumber, date, orgin, destination, ticketCode, BoatSeatID) => {
    // alert(boatNumber+" "+date +" "+orgin+" "+ destination +" "+ticketCode +" "+ BoatSeatID)
    if (orgin == destination) {
        alert('ต้นทาง และปลายทาง เหมือนกัน !!')
        return;
    }
    //make Empty array Boat seat
    listSeat = [];
    listSeatNumber = [];



    document.getElementById('container-boatSeat-customerData').style.display = "block";
    await getBottomBoatSeatDataForChangeBoatSeat(boatNumber, date, ticketCode, BoatSeatID);
    await getTopBoatSeatDataForChangeBoatSeat(boatNumber, date, ticketCode, BoatSeatID);
    await getListSeat();
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

        $('#dialog-cancelTicket').modal({ backdrop: 'static', keyboard: false });
    } catch (err) {
        alert("ค้นหาไม่พบ Ticket Code นี้")
    }

}

const setCancelTicket = async (ticketCode) => {
    try {
        let cf = confirm('ยืนยันการยกเลิกตั๋ว : ' + ticketCode)
        if (cf == true) {
            let response = await fetch('model/apiSetCancelTicket.php', {
                method: "POST",
                body: JSON.stringify({ ticketCode: ticketCode }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            let json = await response.json();
            location.reload();
        }
    }
    catch (err) {
        alert(err)
    }
}


const getConvertDateMonthYear = (date) => {
    try {
        let dateConvert = new Date(date);
        let day = dateConvert.getDate();
        let month = dateConvert.getMonth();
        if (dateConvert.getDate() < 10) {
            day = "0" + dateConvert.getDate();
        }
        if (dateConvert.getMonth() < 10) {
            month = "0" + (dateConvert.getMonth() + 1);
        }
        return dateConvert.getFullYear() + "-" + month + "-" + day;
    } catch (err) {
        return "Error ConvertDate : " + err;
    }
}

const getConvertYMDHIS = (date) => {
    try {
        let dateConvert = new Date(date);
        let day = dateConvert.getDate();
        let month = dateConvert.getMonth();
        let hours = dateConvert.getHours();
        let minutes = dateConvert.getMinutes();
        let seconds = dateConvert.getSeconds();
        if (dateConvert.getDate() < 10) {
            day = "0" + dateConvert.getDate();
        }
        if (dateConvert.getMonth() < 10) {
            month = "0" + (dateConvert.getMonth() + 1);
        }
        if (dateConvert.getHours() < 10) {
            hours = "0" + (dateConvert.getHours().toString())
        }
        if (dateConvert.getMinutes() < 10) {
            minutes = "0" + (dateConvert.getMinutes()).toString();
        }
        if (dateConvert.getSeconds() < 10) {
            seconds = "0" + (dateConvert.getSeconds()).toString();
        }
        return dateConvert.getFullYear() + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
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

const registerCustomer = () => {
    if (listSeatNumber.length == 0 || listSeat.length == 0) return alert('กรุณาเลือกที่นั่ง');
    $("#myModal").modal({ backdrop: 'static', keyboard: false });
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
        $("#dialogListCustomer").modal({ backdrop: 'static', keyboard: false });
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
    $("#myModal").modal({ backdrop: 'static', keyboard: false });
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

const getTicketEdit = async () => {
    try {
        let listUnique = []; // array เช็ครหัสซ้ำ

        let response = await fetch('model/apiGetTIcketAll.php');
        let json = await response.json();
        let domTbodyTable = document.getElementById('table-ticket-edit');
        domTbodyTable.innerHTML = ""

        for (let i = 0; i < json.length; i++) {
            let img;
            let resultForUnique = true;
            for (let check = 0; check < listUnique.length; check++) {
                if (listUnique[check] != json[i].ticket_code) {
                    continue;
                }
                else if (listUnique[check] == json[i].ticket_code) {
                    resultForUnique = false;
                    break;
                }
            }
            if (resultForUnique == true) {
                listUnique.push(json[i].ticket_code)
                if (json[i].slip_img != null) {
                    img = "<img id ='img-" + i + "' src='img/slip/" + json[i].slip_img + "'  width='120' height='120'  onclick='getImgSlip(" + json[i].slip_img + ")'></img>";
                }
                else {
                    img = "<label>ไม่มีรูปภาพ</label>";
                }

                domTbodyTable.innerHTML += "<tr>"
                    + "<td><button class='btn btn-link' id='ticketCode-" + i + "'>" + json[i].ticket_code + "</button></td> <td><button class='btn btn-link' id='ticketType-" + i + "'>" + json[i].ticket_category_name + "</button></td> <td><p  id='boatNumber-" + i + "'>" + json[i].boat_number + "</p></td>"
                    + "<td> <button  id='btn-diolog-customer-" + i + "' class='btn btn-link'>ดูรายการ</button></td> <td ><button  class='btn btn-link' id='emp-" + i + "'>" + json[i].emp_first_name + "</button></td>"
                    + "<td><button class='btn btn-link' id='timeBuyTicket-" + i + "'>" + json[i].time_buy_ticket + "</button></td> <td <button  class='btn btn-link' id='deadLineBook-" + i + "'>" + json[i].deadline_book + "</button></td> <td><button class='btn btn-link' id='travelDate-" + i + "'>" + json[i].travel_date + "</button></td>"
                    + "<td><button class='btn btn-link' id='ticketStatus-" + i + "'>" + json[i].ticket_status_name + "</button></td> <td>" + img + "</td> <td><button class='btn btn-link' id='timeUpSlip-" + i + "'>" + json[i].time_up_slip + "</button> </td><td> <button id='btnDelete-" + i + "' class='btn btn-danger'>ลบ</button></td>"
                    + "</tr>";

                //setting Event Tag <p> Use double Click 
                document.getElementById('ticketCode-' + i + '').setAttribute('onclick', 'getShowModalEditTicketCode("' + json[i].ticket_code + '")')
                document.getElementById('ticketType-' + i + '').setAttribute('onclick', 'getModalEditTicketType("' + json[i].ticket_category_name + '","' + json[i].ticket_code + '")')
                document.getElementById('emp-' + i + '').setAttribute('onclick', 'getShowModalEditEmployee("' + json[i].emp_first_name + '","' + json[i].ticket_code + '")')
                document.getElementById('timeBuyTicket-' + i + '').setAttribute('onclick', 'getShowModalBuyTicketTime("' + json[i].ticket_code + '")')
                document.getElementById('travelDate-' + i + '').setAttribute('onclick', 'getShowModalTravelDate("' + json[i].travel_date + '","' + json[i].ticket_code + '")')
                document.getElementById('deadLineBook-' + i + '').setAttribute('onclick', 'getShowModalDeadline("' + json[i].ticket_code + '")')
                document.getElementById('ticketStatus-' + i + '').setAttribute('onclick', 'getShowModalTicketStatus("' + json[i].ticket_status_name + '","' + json[i].ticket_code + '")')
                document.getElementById('timeUpSlip-' + i + '').setAttribute('onclick', 'getShowModalTimeUpSlip("' + json[i].ticket_code + '")')

                //setting btn
                document.getElementById('btnDelete-' + i + '').setAttribute('onclick', 'setCancelTicket("' + json[i].ticket_code + '")');
                document.getElementById('btn-diolog-customer-' + i + '').setAttribute('onclick', 'getShowModalEditListCustomerFromTicket("' + json[i].ticket_code + '")')
            }

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

const getShowCustomerEdit = async () => {
    try {
        let response = await fetch('model/apiGetCustomerAll.php');
        let json = await response.json();
        let domTbodyTable = document.getElementById('table-ticket-edit');
        domTbodyTable.innerHTML = ""
        for (let i = 0; i < json.length; i++) {
            domTbodyTable.innerHTML += "<tr><td>" + json[i].cust_first_name + "</td><td>" + json[i].cust_last_name + "</td><td>" + json[i].phone_number + "</td>"
                + "<td>" + json[i].gender + "</td><td>" + json[i].register_time + "</td><td>" + json[i].count + "</td><td><button onclick='getShowModalCustomer(" + json[i].customer_id + ")' id='btn-edit' class='btn btn-warning'>แก้ไข</button> <button id='btnDelete-" + i + "' class='btn btn-danger'>ลบ</button></td></tr>"
            document.getElementById('btnDelete-' + i + '').setAttribute('onclick', 'setDeleteCustomer("' + json[i].customer_id + '","' + json[i].cust_first_name + '" , "' + json[i].cust_last_name + '")');
        }
        $(document).ready(function () {
            $('#dataTable-TicketEdit').dataTable({
                "lengthChange": false,
                destroy: true
            });
        })
    }
    catch (err) {
        alert('Error ticket edit\n :' + err)
    }
}

const getShowModalCustomer = async (ticketCode) => {
    try {
        let response = await fetch('model/apiGetCustomer.php', {
            method: "POST",
            body: JSON.stringify({ ticketCode: ticketCode }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        let json = await response.json();
        document.getElementById('text-fname').value = json[0].cust_first_name;
        document.getElementById('text-lname').value = json[0].cust_last_name;
        document.getElementById('text-gender').value = json[0].gender;
        document.getElementById('text-phone').value = json[0].phone_number;
        document.getElementById('text-registerDate').value = json[0].register_time;
        document.getElementById('text-count').value = json[0].count;
        document.getElementById('btn-saveEdit').setAttribute('onclick', 'setEditCustomer(' + json[0].customer_id + ')')

        $("#dialogListCustomer").modal({ backdrop: 'static', keyboard: false });
    } catch (err) {
        alert("a" + err)
        location.reload();
    }
}



const setDeleteCustomer = async (customerID, fName, lName) => {
    try {
        let cf = confirm("ยืนยันการลบข้อมูล Customer : " + fName + " " + lName);
        if (cf == true) {
            let response = await fetch('model/apiSetDeleteCustomer.php', {
                method: "POST",
                body: JSON.stringify({
                    customerID: customerID,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            let result = await response.text();
            if (response.status == 200) {
                if (result == 'true') {
                    location.reload();
                }
                else {
                    alert("เกิดข้อผิดพลาด")
                }
            }
            else {
                return alert('Error status : ' + response.status)
            }
        }
    } catch (err) {
        alert("Error customer delete : " + err)
    }
}

const setEditCustomer = async (customerID) => {
    try {
        let fname = document.getElementById('text-fname').value;
        let lname = document.getElementById('text-lname').value;
        let gender = document.getElementById('text-gender').value;
        let phone = document.getElementById('text-phone').value;
        let registerDate = document.getElementById('text-registerDate').value;
        let count = document.getElementById('text-count').value;
        let checkDate = new Date(registerDate).getMonth();
        if (isNaN(checkDate) == true) return alert('Date มีข้อผิดพลาด')

        let response = await fetch('model/apiSetCustomer.php', {
            method: "POST",
            body: JSON.stringify({
                customerID: customerID,
                fname: fname,
                lname: lname,
                gender: gender,
                phone: phone,
                registerDate: registerDate,
                count: count
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        let json = await response.text();
        alert(json)
        $("#dialogListCustomer").modal('hide');
        location.reload()
        // getShowCustomerEdit();
    } catch (err) {
        alert("Error set edit customer : " + err)
    }
}


const setEditTicketDialog = async (ticketCode, typeTicket, numberBoat, employeeName, buyTicket, deadline, dateTravel, statusTicket, img, timeUpSlip) => {
    document.getElementById('tbody-EditTicket-modal').innerHTML = "";
    document.getElementById('tbody-EditTicket-modal').innerHTML = "<tr><td><input type='text' value='" + ticketCode + "'></td>"
        + "<td><input type='text' value='" + typeTicket + "'></td> <td>" + numberBoat + "</td> <td><button id='btn-diolog-customer-" + ticketCode + "' class='btn btn-link'>ดูรายการ</button></td> <td>" + employeeName + "</td> <td>" + buyTicket + "</td> <td>" + deadline + "</td> <td>" + dateTravel + "</td> "
        + " <td>" + statusTicket + "</td> <td>" + img + "</td> <td>" + timeUpSlip + "</td></tr>";
    document.getElementById('btn-diolog-customer-' + ticketCode + '').setAttribute('onclick', 'getDialogListCustomerFromSlip("' + ticketCode + '")');
    $("#dialog-TicketEdit").modal({ backdrop: 'static', keyboard: false });
}



const getModalEditTicketType = async (ticketType, ticketCode) => {
    try {
        let response = await fetch('model/apiGetTicketCatagory.php');
        let json = await response.json();
        let node = document.createElement("select");
        node.setAttribute('class', 'form-control')
        node.setAttribute('id', 'select-TicketType')
        document.getElementById('modal-body-editTicket').innerHTML = "เลือกประเภทตั๋ว";
        for (let i = 0; i < json.length; i++) {
            var option = document.createElement("option");
            option.text = json[i].ticket_category_name;
            option.value = json[i].ticket_category_id;
            if (ticketType == json[i].ticket_category_name) {
                option.selected = true;
            }
            node.appendChild(option);
        }
        document.getElementById('modal-body-editTicket').appendChild(node);
        document.getElementById('modal-footer').innerHTML = "<button id='btnRecord'class='btn btn-success'>Recode</button> <button class='btn btn-warning'>Reset</button> "
        document.getElementById('btnRecord').setAttribute('onclick', 'setEditTicketType("' + ticketCode + '")')
    } catch (err) {
        alert("Error modal get Ticket Catagory : " + err)
    }
    $("#dialog-TicketEdit").modal({ backdrop: 'static', keyboard: false });
}


const getShowModalEditTicketCode = (id) => {
    document.getElementById('modal-body-editTicket').innerHTML = "";
    document.getElementById('modal-body-editTicket').innerHTML += "รหัสตั๋ว <input type='tell' id='ticketCode-modal-edit' readonly='readonly' class='form-control' value=" + id + ">"
    document.getElementById('modal-body-editTicket').innerHTML += "<button onclick='getSearchTicketCode()' id='searchTicketCode' class='btn btn-warning btn-sm'>สุ่มรหัสตั๋ว</button>";
    document.getElementById('searchTicketCode').style.margin = "10px 0px"
    document.getElementById('modal-footer').innerHTML = "<button id='btnRecode' class='btn btn-success'>Recode</button> <button class='btn btn-danger'>Reset</button> "
    document.getElementById('btnRecode').setAttribute('onclick', 'setEditTicketCode("' + id + '")')
    $("#dialog-TicketEdit").modal({ backdrop: 'static', keyboard: false });
}


const getSearchTicketCode = async () => {
    try {
        let response = await fetch('model/apiCheckTicketCode.php');
        let json = await response.json();
        document.getElementById('ticketCode-modal-edit').setAttribute('value', json)
    }
    catch (err) {
        alert("Error SearchTicket Code From Model Edit : " + err);
    }
}

const getShowModalEditEmployee = async (emp, ticketCode) => {
    try {
        let response = await fetch('model/apiGetEmployee.php');
        let json = await response.json();
        let node = document.createElement("select");
        node.setAttribute('class', 'form-control')
        node.setAttribute('id', 'select-Emp')
        document.getElementById('modal-body-editTicket').innerHTML = "เลือกประเภทตั๋ว";
        for (let i = 0; i < json.length; i++) {
            var option = document.createElement("option");
            option.text = json[i].emp_first_name;
            option.value = json[i].employee_id;
            if (emp == json[i].emp_first_name) {
                option.selected = true;
            }
            node.appendChild(option);
        }
        document.getElementById('modal-body-editTicket').appendChild(node);
        document.getElementById('modal-footer').innerHTML = "<button id='btnRecode' class='btn btn-success'>Recode</button> <button class='btn btn-warning'>Reset</button> "
        document.getElementById('btnRecode').setAttribute('onclick', 'setEditEmployee("' + ticketCode + '")')
    } catch (err) {
        alert("Error modal get Employee : " + err)
    }

    $("#dialog-TicketEdit").modal({ backdrop: 'static', keyboard: false });
}


const getShowModalBuyTicketTime = async (ticketCode) => {
    document.getElementById('modal-body-editTicket').innerHTML = "";
    document.getElementById('modal-body-editTicket').innerHTML = "วันที่ซื้อตั๋ว <input id='inputBuyTicket' type='datetime-local' class='form-control' value=''>"
    document.getElementById('modal-footer').innerHTML = "<button id='btnRecode'class='btn btn-success'>Recode</button> <button class='btn btn-warning'>Reset</button> "
    document.getElementById('btnRecode').setAttribute('onclick', 'setEditTimeBuyTicket("' + ticketCode + '")')
    $("#dialog-TicketEdit").modal({ backdrop: 'static', keyboard: false });
}

const getShowModalDeadline = async (ticketCode) => {
    document.getElementById('modal-body-editTicket').innerHTML = "";
    document.getElementById('modal-body-editTicket').innerHTML = "กำหนดเวลาจอง <input id='inputTimeDeadline'type='datetime-local' class='form-control' value=''>"
    document.getElementById('modal-footer').innerHTML = "<button id='btnRecode' class='btn btn-success'>Recode</button> <button class='btn btn-warning'>Reset</button> "
    document.getElementById('btnRecode').setAttribute('onclick', 'setEditDeadlineBook("' + ticketCode + '")')
    $("#dialog-TicketEdit").modal({ backdrop: 'static', keyboard: false });
}

const getShowModalTravelDate = async (travelTime, ticketCode) => {
    document.getElementById('modal-body-editTicket').innerHTML = "";
    document.getElementById('modal-body-editTicket').innerHTML = "วันที่ขึ้นเรือ <input id='inputDateTravel' type='date' class='form-control' value=" + travelTime + ">"
    document.getElementById('modal-footer').innerHTML = "<button id='btnRecode' class='btn btn-success'>Recode</button> <button class='btn btn-warning'>Reset</button> "
    document.getElementById('btnRecode').setAttribute('onclick', 'setEditTravelTime("' + ticketCode + '")')
    $("#dialog-TicketEdit").modal();
}

const getShowModalTicketStatus = async (ticketStatus, ticketCode) => {
    try {
        let response = await fetch('model/apiGetTicketStatus.php');
        let json = await response.json();
        let node = document.createElement("select");
        node.setAttribute('class', 'form-control')
        node.setAttribute('id', 'select-TicketStatus')
        document.getElementById('modal-body-editTicket').innerHTML = "เลือกประเภทตั๋ว";
        for (let i = 0; i < json.length; i++) {
            var option = document.createElement("option");
            option.text = json[i].ticket_status_name;
            option.value = json[i].ticket_status_id;
            if (ticketStatus == json[i].ticket_status_name) {
                option.selected = true;
            }
            node.appendChild(option);
        }
        document.getElementById('modal-body-editTicket').appendChild(node);
        document.getElementById('modal-footer').innerHTML = "<button id='btnRecode' class='btn btn-success'>Recode</button> <button class='btn btn-warning'>Reset</button> "
        document.getElementById('btnRecode').setAttribute('onclick', 'setEditTicketStatus("' + ticketCode + '")')
    } catch (err) {
        alert("Error modal get Employee : " + err)
    }

    $("#dialog-TicketEdit").modal({ backdrop: 'static', keyboard: false });
}

const getShowModalTimeUpSlip = async (ticketCode) => {
    document.getElementById('modal-body-editTicket').innerHTML = "";
    document.getElementById('modal-body-editTicket').innerHTML = "เวลาอัพสลิป <input id='inputUpSlipTime' type='datetime-local' class='form-control' value=''>"
    document.getElementById('modal-footer').innerHTML = "<button  id='btnRecode' class='btn btn-success'>Recode</button> <button class='btn btn-warning'>Reset</button> "
    document.getElementById('btnRecode').setAttribute('onclick', 'setEditUpSlipTime("' + ticketCode + '")')
    $("#dialog-TicketEdit").modal({ backdrop: 'static', keyboard: false });
}

const getShowModalEditListCustomerFromTicket = async (ticketCode) => {
    try {
        let response = await fetch('model/apiGetTicket.php', {
            method: "POST",
            body: JSON.stringify({ ticketCode: ticketCode }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        let json = await response.json();

        document.getElementById('tbody-modal').innerHTML = "";
        document.getElementById('addCustomer-TicketEdit').innerHTML = "<button class = 'btn btn-primary btn-sm'>เพิ่มลูกค้า</button>"
        document.getElementById('addCustomer-TicketEdit').style.margin = '10px 0px'
        document.getElementById('addCustomer-TicketEdit').style.textAlign = 'right'
        document.getElementById('addCustomer-TicketEdit').setAttribute('onclick', 'getShowTicketAddCustomer("' + ticketCode + '","' + json[0].boat_number + '","' + json[0].travel_date + '","' + json[0].orgin + '","' + json[0].destination + '")')

        for (let i = 0; i < json.length; i++) {
            document.getElementById('tbody-modal').innerHTML += "<tr>"
                + "<td>" + json[i].cust_first_name + "</td> <td>" + json[i].cust_last_name + "</td> <td>" + json[i].phone_number + "</td> <td>" + json[i].boat_seat_number + "</td>"
                + "<td><botton id='btnChangeBoatSeat-" + json[i].buy_ticket_id + "'class='btn btn-warning'>เปลียนที่นั่งเรือ</botton> <botton id='btnDeleteCustomerTicker-" + json[i].buy_ticket_id + "'class='btn btn-danger'>ลบ</botton> </td></tr>";
            document.getElementById('btnDeleteCustomerTicker-' + json[i].buy_ticket_id).setAttribute('onclick', 'setEditDeleteCustomer("' + json[i].buy_ticket_id + '","' + ticketCode + '")')
            document.getElementById('btnChangeBoatSeat-' + json[i].buy_ticket_id).setAttribute('onclick', 'getShowChangeBoatSeat("' + ticketCode + '","' + json[i].boat_number + '","' + json[i].travel_date + '","' + json[i].orgin + '","' + json[i].destination + '",' + json[i].boat_seat_id + ')')

        }
        document.getElementById('tbody-modal').innerHTML += "<tr><td style='text-align:right;' colspan='5'>จำนวนลูกค้า : " + json.length + "</td></tr>"
        $("#dialogListCustomer").modal({ backdrop: 'static', keyboard: false });
    } catch (err) {
        location.reload();
    }
}


const getShowTicketAddCustomer = async (ticketCode, numBerBoat, travelDate, origin, destination) => {
    document.getElementById('header-select-boatSeat').innerHTML = "เลือกที่นั่งเรือลูกค้า CODE : <data id='label-ticket-code' value='" + ticketCode + "'>" + ticketCode + "</data>";
    document.getElementById('header-addCustomer').innerHTML = " <center>เพิ่มลูกค้า รหัสตั๋ว :  " + ticketCode + "</center>"


    document.getElementById('select-Location_start').value = origin;
    document.getElementById('select-Location_end').value = destination;
    await getSearchBoat(origin, destination)
    document.getElementById('boat-number').value = numBerBoat;
    document.getElementById('date').value = travelDate;
    await getBoatSeat(numBerBoat, travelDate, origin, destination, ticketCode)
    document.getElementById('btn-save').setAttribute('onclick', 'registerCustomer()')

    document.getElementById('btn-reset').setAttribute('onclick', 'getShowTicketAddCustomer("' + ticketCode + '","' + numBerBoat + '","' + travelDate + '","' + origin + '","' + destination + '")')
    $("#dialog-showAddTicket").modal({ backdrop: 'static', keyboard: false });
}


const getShowChangeBoatSeat = async (ticketCode, numBerBoat, travelDate, origin, destination, boatSeatID) => {
    document.getElementById('header-select-boatSeat').innerHTML = "เลือกที่นั่งเรือลูกค้า CODE : <data id='label-ticket-code' value='" + ticketCode + "'>" + ticketCode + "</data>";
    document.getElementById('header-addCustomer').innerHTML = " <center>แก้ไขที่นั่งเรือ รหัสตั๋ว :  " + ticketCode + "</center>"
    document.getElementById('select-Location_start').value = origin;
    document.getElementById('select-Location_end').value = destination;
    await getSearchBoat(origin, destination)
    document.getElementById('boat-number').value = numBerBoat;
    document.getElementById('date').value = travelDate;
    await getBoatSeatForChangBoatSeat(numBerBoat, travelDate, origin, destination, ticketCode, boatSeatID)
    document.getElementById('btn-save').setAttribute('onclick', 'setBoatSeat("' + ticketCode + '","' + listSeat + '")')
    document.getElementById('btn-reset').setAttribute('onclick', 'getShowChangeBoatSeat("' + ticketCode + '","' + numBerBoat + '","' + travelDate + '","' + origin + '","' + destination + '","' + boatSeatID + '")')

    $("#dialog-showAddTicket").modal({ backdrop: 'static', keyboard: false });
}


const setEditTicketCode = async (ticketCodeOld) => {
    try {
        let ticketCodeNew = "" + document.getElementById('ticketCode-modal-edit').getAttribute('value') + "";
        let response = await fetch('model/apiSetTicketCode.php', {
            method: "POST",
            body: JSON.stringify({
                ticketCodeOld: ticketCodeOld,
                ticketCodeNew: ticketCodeNew
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        alert("Edit Success")
        location.reload();
    } catch (err) {
        alert("Error Edit Ticket Code : " + err)
    }
}

const setEditTicketType = async (ticketCode) => {
    let TicketTypeID = document.getElementById('select-TicketType').value;
    try {
        let response = await fetch('model/apiSetTicketType.php', {
            method: "POST",
            body: JSON.stringify({
                TicketTypeID: TicketTypeID,
                ticketCode: ticketCode
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        let json = await response.json();
        alert('Sucess Edit Ticket Type');
        location.reload();
    } catch (err) {
        alert("Error setTicketType : " + err);
    }
}
const setEditDeleteCustomer = async (id, ticketCode) => {
    try {
        let response = await fetch('model/apiSetDeleteListCustomerTicket.php', {
            method: "POST",
            body: JSON.stringify({
                ticketID: id
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        let json = await response.text();
        if (json == "true") {
            alert('Sucess Edit Time Buy Ticket');
            let refresh = getShowModalEditListCustomerFromTicket(ticketCode);
        }
        else {
            alert("Error : " + json)
        }
    } catch (err) {
        alert("Error setTicketType : " + err);
    }
}

const setEditEmployee = async (ticketCode) => {
    let empTicketId = document.getElementById('select-Emp').value;
    try {
        let response = await fetch('model/apiSetEmployeeTicket.php', {
            method: "POST",
            body: JSON.stringify({
                empTicketId: empTicketId,
                ticketCode: ticketCode
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        let json = await response.json();
        alert('Sucess Edit Employee Ticket');
        location.reload();
    } catch (err) {
        alert("Error setTicket emp : " + err);
    }
}
const setEditTimeBuyTicket = async (ticketCode) => {
    let timeBuyTicket = document.getElementById('inputBuyTicket').value;
    let dateConvert = getConvertYMDHIS(timeBuyTicket);
    try {
        let response = await fetch('model/apiSetTimeBuyTicket.php', {
            method: "POST",
            body: JSON.stringify({
                timeBuyTicket: dateConvert,
                ticketCode: ticketCode
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        let json = await response.text();
        if (json == "true") {
            alert('Sucess Edit Time Buy Ticket');
            location.reload();
        }
    } catch (err) {
        alert("Error setTicket Time Buy Ticket  : " + err);
    }
}

const setEditDeadlineBook = async (ticketCode) => {
    let timeDeadline = document.getElementById('inputTimeDeadline').value;
    let dateConvert = getConvertYMDHIS(timeDeadline);
    try {
        let response = await fetch('model/apiSetDeadlineBook.php', {
            method: "POST",
            body: JSON.stringify({
                timeDeadline: dateConvert,
                ticketCode: ticketCode
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        let json = await response.text();
        if (json == "true") {
            alert('Sucess Edit deadline book');
            location.reload();
        }
    } catch (err) {
        alert("Error setTicket Time deadline book  : " + err);
    }
}
const setEditTravelTime = async (ticketCode) => {
    let travelDate = document.getElementById('inputDateTravel').value;
    let dateConvert = getConvertDateMonthYear(travelDate);
    try {
        let response = await fetch('model/apiSetTravelDate.php', {
            method: "POST",
            body: JSON.stringify({
                travelDate: dateConvert,
                ticketCode: ticketCode
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        let json = await response.text();
        if (json == "true") {
            alert('Sucess Edit Travel Date');
            location.reload();
        }
        else {
            alert("Error : " + json)
        }
    } catch (err) {
        alert("Error setTicket Travel Date  : " + err);
    }
}
const setEditTicketStatus = async (ticketCode) => {
    let ticketStatus = document.getElementById('select-TicketStatus').value;
    try {
        let response = await fetch('model/apiSetTicketStatus.php', {
            method: "POST",
            body: JSON.stringify({
                ticketStatus: ticketStatus,
                ticketCode: ticketCode
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        let json = await response.text();
        if (json = "true") {
            alert('Sucess Edit ticket status');
        }
        else {
            alert('Error : ' + json);
        }
        location.reload();
    } catch (err) {
        alert("Error setTicket Status : " + err);
    }
}
const setEditImg = async () => {

}
const setEditUpSlipTime = async (ticketCode) => {
    let upSlipTime = document.getElementById('inputUpSlipTime').value;
    let dateConvert = getConvertYMDHIS(upSlipTime);
    try {
        let response = await fetch('model/apiSetUpslipTime.php', {
            method: "POST",
            body: JSON.stringify({
                upSlipTime: dateConvert,
                ticketCode: ticketCode
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        let json = await response.text();
        if (json == "true") {
            alert('Sucess Edit deadline book');
            location.reload();
        }
        else {
            alert('Error : ' + json);
        }
    } catch (err) {
        alert("Error setTicket Time deadline book  : " + err);
    }
}

const setBoatSeat = async (ticketCode, oldListSeat) => {
    try {
        if (listSeat == oldListSeat) {
            alert("ยังไม่ได้เปลียนแปลงที่นั่งเรือ");
            return;
        }
        let response = await fetch('model/apiSetChangedBoatSeat.php', {
            method: "POST",
            body: JSON.stringify({
                boatseatID: listSeat[0],
                ticketCode: ticketCode,
                oldBoatSeat: oldListSeat
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        let json = await response.text();
        if (json == 'true') {
            alert("แก้ไขข้อมูลสำเร็จ ");
            $("#dialog-showAddTicket").modal('hide');
            getShowModalEditListCustomerFromTicket(ticketCode);
        }
        else {
            alert('เกิดข้อผิดพลาดในการแก้ไข ที่นั่งเรือ : ' + json);
        }
    } catch (err) {
        alert("Error set boat seat : " + err);
    }
}