// For desktop 
const validateDeadline = (current, deadline) => {

    if (current.getYear() < deadline.getYear()) {
        return true;
    } else if (current.getYear() > deadline.getYear()) {
        return false;
    }


    if (current.getMonth() < deadline.getMonth()) {
        return true;
    } else if (current.getMonth() > deadline.getMonth()) {
        return false;
    }

    if (current.getDate() < deadline.getDate()) {
        return true;
    } else if (current.getDate() > deadline.getDate()) {
        return false;
    }

    if (current.getHours() < deadline.getHours()) {
        return true;
    } else if (current.getHours() > deadline.getHours()) {
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

const getLocation = async() => {
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

const getSelectLocation = async() => {
    let location = await getLocation();
    const LOCATIONDATA = location;
    const SELECTLOCATIONSTART = document.getElementById('select-Location_start');
    const SELECTLOCATIONEND = document.getElementById('select-Location_end');


    for (let count = 0; count < location.length; count++) {
        SELECTLOCATIONSTART.innerHTML += "<option value=" + LOCATIONDATA[count].location_id + ">" + LOCATIONDATA[count].location_name + "</option>"
        SELECTLOCATIONEND.innerHTML += "<option value=" + LOCATIONDATA[count].location_id + ">" + LOCATIONDATA[count].location_name + "</option>"

    }
}

const getSearchBoat = async(origin, destination) => {
    let boatNumber = document.getElementById('boat-number');

    if (origin == destination) {
        alert('ต้นทาง และ ปลายทาง เหมือนกัน !!')
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
    } else if (jsonOrgin.length > jsonDestination.length) {
        maxResponse = jsonOrgin;
        minResponse = jsonDestination;

    } else {
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

// For Responsive


const getSelectLocationForResponsive = async() => {
    let location = await getLocation();
    const LOCATIONDATA = location;
    const SELECTLOCATIONSTART = document.getElementById('select-Location_start-responsive');
    const SELECTLOCATIONEND = document.getElementById('select-Location_end-responsive');


    for (let count = 0; count < location.length; count++) {
        SELECTLOCATIONSTART.innerHTML += "<option value=" + LOCATIONDATA[count].location_id + ">" + LOCATIONDATA[count].location_name + "</option>"
        SELECTLOCATIONEND.innerHTML += "<option value=" + LOCATIONDATA[count].location_id + ">" + LOCATIONDATA[count].location_name + "</option>"

    }
}


const getSearchBoatForResponsive = async(origin, destination) => {
    let boatNumber = document.getElementById('boat-number-responsive');

    if (origin == destination) {
        alert('ต้นทาง และ ปลายทาง เหมือนกัน !!')
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
    } else if (jsonOrgin.length > jsonDestination.length) {
        maxResponse = jsonOrgin;
        minResponse = jsonDestination;

    } else {
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

// index_page_2

const getBoatSeat = (boatNumber, date, orgin, destination) => {
    if (orgin == destination) {
        alert('ต้นทาง และ ปลายทาง เหมือนกัน !!')
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

// index_page_2

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

const getListSeat = async() => {
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

const getBottomBoatSeatData = async(boatNumber, date, ticketCode) => {
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
            } else if (json[i].floor == 'B' && json[i].boat_seat_type == 'L') {
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



const getBottomBoatSeatStatus = async(dateToSeat, boatNumber, ticketCode) => {
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
            } else if (json[i].ticket_status_id == 2 && resultDeadline == true) {
                document.getElementById(json[i].boat_seat_id).innerHTML = ("<td id=" + json[i].boat_seat_id + "><i class='fas fa-check-circle'></i></td>");
                document.getElementById(json[i].boat_seat_id).setAttribute('bgcolor', 'yellow');
                document.getElementById(json[i].boat_seat_id).setAttribute('onclick', '');
            }
        }
    } catch (err) {
        // alert('Error Get Bottom Boat Seat Status : ' + err)
    }
}


const getTopBoatSeatData = async(boatNumber, date, ticketCode) => {
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
            } else if (json[i].floor == 'T' && json[i].boat_seat_type == 'L') {
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

const getTopBoatSeatStatus = async(dateToSeat, boatNumber, ticketCode) => {
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
            } else if (json[i].ticket_status_id == 2 && resultDeadline == true) {
                document.getElementById(json[i].boat_seat_id).innerHTML = ("<td id=" + json[i].boat_seat_id + "><i class='fas fa-check-circle'></i></td>");
                document.getElementById(json[i].boat_seat_id).setAttribute('bgcolor', 'yellow');
                document.getElementById(json[i].boat_seat_id).setAttribute('onclick', '');
            }
        }
    } catch (err) {
        // alert("Error Top boatseat Status : " + err)
    }

}

// index_page_2