// const getBoatSeat = (boatNumber, date, orgin, destination) => {
//     if (orgin == destination) {
//         alert('ต้นทาง และ ปลายทาง เหมือนกัน !!')
//         return;
//     }
//     //make Empty array Boat seat
//     listSeat = [];
//     listSeatNumber = [];
//     getListSeat();

//     document.getElementById('container-boatSeat-customerData').style.display = "block";
//     getBottomBoatSeatData(boatNumber, date);
//     getTopBoatSeatData(boatNumber, date);
// }
const getBottomBoatSeatData = async(boatNumber, date) => {
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
        } else if (json[i].floor == 'B' && json[i].boat_seat_type == 'L') {
            document.getElementById("leftBottom").innerHTML += '<td id=' + json[i].boat_seat_id + '>' + json[i].boat_seat_number + '</td>'
            document.getElementById(json[i].boat_seat_id).setAttribute('onclick', 'checkBoatSeat(' + json[i].boat_seat_id + ',' + json[i].boat_seat_number + ')');
        }
    }
    document.getElementById("rightBottom").innerHTML += '<td bgcolor="#fff"><center>Right</center></td>';
    document.getElementById("leftBottom").innerHTML += '<td bgcolor="#fff"><center>Left</center></td>';
    let dateToSeat = date;
    await getBottomBoatSeatStatus(dateToSeat, boatNumber);
}

const getBottomBoatSeatStatus = async(dateToSeat, boatNumber) => {
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
        } else if (json[i].ticket_status_id == 2 && resultDeadline == true) {
            document.getElementById(json[i].boat_seat_id).innerHTML = ("<td id=" + json[i].boat_seat_id + "><i class='fas fa-check-circle'></i></td>");
            document.getElementById(json[i].boat_seat_id).setAttribute('bgcolor', 'yellow');
            document.getElementById(json[i].boat_seat_id).setAttribute('onclick', '');
        }
    }
}

const getTopBoatSeatData = async(boatNumber, date) => {
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
        } else if (json[i].floor == 'T' && json[i].boat_seat_type == 'L') {
            document.getElementById("leftTop").innerHTML += '<td id=' + json[i].boat_seat_id + '>' + json[i].boat_seat_number + '</td>'
            document.getElementById(json[i].boat_seat_id).setAttribute('onclick', 'checkBoatSeat(' + json[i].boat_seat_id + ',' + json[i].boat_seat_number + ')');

        }
    }
    document.getElementById("rightTop").innerHTML += '<td bgcolor="#fff"><center>Right</center></td>';
    document.getElementById("leftTop").innerHTML += '<td bgcolor="#fff"><center>Left</center></td>';
    await getTopBoatSeatStatus();

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
    } else {
        document.getElementById(id).setAttribute('bgcolor', 'gray');
        listSeat.push(id);
        listSeatNumber.push(number);

    }
    getListSeat();
}

const getListSeat = async () => {
    let numberBoatSeat = document.getElementById('number-boatseat');
    numberBoatSeat.innerHTML = listSeatNumber;
}

const registerCustomer = (listSeat, listSeatNumber) => {
    if (listSeatNumber.length == 0 || listSeat.length == 0) return alert('กรุณาเลือกที่นั่ง');
    $("#myModal").modal();
    document.getElementById('register-customer').innerHTML = "";
    listSeatNumber.sort(function(a, b) { return a - b });
    listSeat.sort(function(a, b) { return a - b });

    for (let i = 0; i < listSeatNumber.length; i++) {
        document.getElementById('register-customer').innerHTML += '<div id="register-customer-detail"> เลขที่นั่งเรือ : ' + listSeatNumber[i] + '' +
            '<input type="text" class="form-control" id="fristName-' + i + '" placeholder="ชื่อจริง"><br>' +
            '<input type="text" class="form-control" id="lastName-' + i + '" placeholder="นามสกุล"><br>' +
            '<input type="number" class="form-control" id="phoneNumber-' + i + '" placeholder="เบอร์โทรศัพท์"><br>' +
            '<form><input type="radio" class="form-control" id="genderM-' + i + '" name="gender" value="Male">ชาย' +
            '<input type="radio" class="form-control " id="genderF-' + i + '" name="gender" value="Female">หญิง</form>';
        document.getElementById('register-customer').innerHTML += "</div><br>"
    }
}