const getListCountFloor = async (boatNumber) => {
    try {
        listCountFloor = [];
        let responseFloor = await fetch('model/apiGetFloorBoat.php', {
            method: "POST",
            body: JSON.stringify({ boatNumber: boatNumber }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        let jsonFloor = await responseFloor.json();
        listFloorData = jsonFloor;
        return jsonFloor;
    } catch (error) {
        alert("Error count floor : " + error)
    }
}



const getBoatSeatForChangeSeat = async (boatNumber, date, orgin, destination, ticketCode, numbetSeatId) => {
    if (orgin == destination) {
        alert('ต้นทาง และปลายทาง เหมือนกัน !!')
        return;
    }
    let checkDayOff = await CheckDayOff(date);
    if (checkDayOff == true) {
        return;
    }

    try {
        //make Empty array Boat seat
        listSeat = [];
        listSeatNumber = [];

        let countR = 0;
        let countL = 0;
        let statusTable = 'display';
        await getListCountFloor(boatNumber);


        document.getElementById('tableFromBoatSeat').innerHTML = "";
        document.getElementById('container-btnFloor').innerHTML = "";

        const responseBoatSeat = await fetch('model/apiBoatSeat.php', {
            method: "POST",
            body: JSON.stringify({ boatNumber: boatNumber }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        let jsonBoatSeat = await responseBoatSeat.json();

        for (let i = 0; i < listFloorData.length; i++) {
            countR = 0;
            countL = 0;
            document.getElementById('tableFromBoatSeat').innerHTML += "<table id='table-" + (i + 1) + "'class='table table-bordered table-primary' style='display:" + statusTable + "' >  "
                + "<tr id='right-" + listFloorData[i].floor + "'>"
                + "<td bgcolor='#fff' id='td-right-" + listFloorData[i].floor + "' ><center>right</center></td>"
                + "</tr>"
                + "<tr>"
                + "<td colspan='999' bgcolor='#fff'><center>ที่นั่งเรือ</center></td>"
                + "</tr>"
                + "<tr id='left-" + listFloorData[i].floor + "'>"
                + "<td bgcolor='#fff' id='td-left-" + listFloorData[i].floor + "' ><center>Left</center></td>"
                + "</tr>"
                + "</table>";

            for (let n = 0; n < jsonBoatSeat.length; n++) {
                if (jsonBoatSeat[n].floor == listFloorData[i].floor && jsonBoatSeat[n].boat_seat_type == 'R') {
                    document.getElementById("right-" + listFloorData[i].floor + "").innerHTML += '<td class="onmouse" id=' + jsonBoatSeat[n].boat_seat_id + '  >' + jsonBoatSeat[n].boat_seat_number + '</td>'
                    document.getElementById(jsonBoatSeat[n].boat_seat_id).setAttribute('onclick', 'checkBoatSeatForChangeBoatSeat(' + jsonBoatSeat[n].boat_seat_id + ',' + jsonBoatSeat[n].boat_seat_number + ')');
                    countR++;
                }
                else if (jsonBoatSeat[n].floor == listFloorData[i].floor && jsonBoatSeat[n].boat_seat_type == 'L') {
                    document.getElementById("left-" + listFloorData[i].floor + "").innerHTML += '<td class="onmouse"  id=' + jsonBoatSeat[n].boat_seat_id + '>' + jsonBoatSeat[n].boat_seat_number + '</td>'
                    document.getElementById(jsonBoatSeat[n].boat_seat_id).setAttribute('onclick', 'checkBoatSeatForChangeBoatSeat(' + jsonBoatSeat[n].boat_seat_id + ',' + jsonBoatSeat[n].boat_seat_number + ')');
                    countL++;
                }
            }
            // จัดการตำแหน่งที่นั่งให้เท่ากัน
            if (countR > countL) {
                let difCount = countR - countL;
                for (let k = 0; k < difCount; k++) {
                    document.getElementById("left-" + listFloorData[i].floor + "").innerHTML += "<td ></td>";

                }
            }
            else if (countL > countR) {
                let difCount = countL - countR;
                for (let k = 0; k < difCount; k++) {
                    document.getElementById("right-" + listFloorData[i].floor + "").innerHTML += "<td ></td>";
                }
            }
            // ----------------------

            document.getElementById("right-" + listFloorData[i].floor + "").innerHTML += '<td bgcolor="#fff"><center>Right</center></td>';
            document.getElementById("left-" + listFloorData[i].floor + "").innerHTML += '<td bgcolor="#fff"><center>Left</center></td>';

            //สร้าง btn ชั้นที่นั่ง
            if (statusTable == 'display') {
                document.getElementById('container-btnFloor').innerHTML += "<button id='btn-" + (i + 1) + "'  class='btn btn-success'>ชั้น " + listFloorData[i].floor + "</button>  ";
                statusTable = 'none';
            }
            else {
                document.getElementById('container-btnFloor').innerHTML += "<button id='btn-" + (i + 1) + "'  class='btn btn-warning'>ชั้น " + listFloorData[i].floor + "</button>  ";
            }

            listCountFloor.push("btn-" + (i + 1));
            document.getElementById('btn-' + (i + 1)).setAttribute('onclick', 'btnChangBoatFloor("btn-' + (i + 1) + '")')
        }
        document.getElementById('container-boatSeat-customerData').style.display = "block";

        await getBoatSeatStatus(date, boatNumber, ticketCode, numbetSeatId);
    } catch (err) {
        alert(err)
    }
    // await getBottomBoatSeatData(boatNumber, date, ticketCode);
    // await getTopBoatSeatData(boatNumber, date, ticketCode);
    // await getListSeat();
}

const getBoatSeat1 = async (boatNumber, date, orgin, destination, ticketCode, numbetSeatId) => {
    if (orgin == destination) {
        alert('ต้นทาง และปลายทาง เหมือนกัน !!')
        return;
    }
    let checkDayOff = await CheckDayOff(date);
    if (checkDayOff == true) {
        return;
    }

    try {
        //make Empty array Boat seat
        listSeat = [];
        listSeatNumber = [];

        let countR = 0;
        let countL = 0;
        let statusTable = 'display';
        await getListCountFloor(boatNumber);


        document.getElementById('tableFromBoatSeat').innerHTML = "";
        document.getElementById('container-btnFloor').innerHTML = "";

        const responseBoatSeat = await fetch('model/apiBoatSeat.php', {
            method: "POST",
            body: JSON.stringify({ boatNumber: boatNumber }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        let jsonBoatSeat = await responseBoatSeat.json();

        for (let i = 0; i < listFloorData.length; i++) {
            countR = 0;
            countL = 0;
            document.getElementById('tableFromBoatSeat').innerHTML += "<table id='table-" + (i + 1) + "'class='table table-bordered table-primary' style='display:" + statusTable + "' >  "
                + "<tr id='right-" + listFloorData[i].floor + "'>"
                + "<td bgcolor='#fff' id='td-right-" + listFloorData[i].floor + "' ><center>right</center></td>"
                + "</tr>"
                + "<tr>"
                + "<td colspan='999' bgcolor='#fff'><center>ที่นั่งเรือ</center></td>"
                + "</tr>"
                + "<tr id='left-" + listFloorData[i].floor + "'>"
                + "<td bgcolor='#fff' id='td-left-" + listFloorData[i].floor + "' ><center>Left</center></td>"
                + "</tr>"
                + "</table>";

            for (let n = 0; n < jsonBoatSeat.length; n++) {
                if (jsonBoatSeat[n].floor == listFloorData[i].floor && jsonBoatSeat[n].boat_seat_type == 'R') {
                    document.getElementById("right-" + listFloorData[i].floor + "").innerHTML += '<td class="onmouse" id=' + jsonBoatSeat[n].boat_seat_id + '  >' + jsonBoatSeat[n].boat_seat_number + '</td>'
                    document.getElementById(jsonBoatSeat[n].boat_seat_id).setAttribute('onclick', 'checkBoatSeat(' + jsonBoatSeat[n].boat_seat_id + ',' + jsonBoatSeat[n].boat_seat_number + ')');
                    countR++;
                }
                else if (jsonBoatSeat[n].floor == listFloorData[i].floor && jsonBoatSeat[n].boat_seat_type == 'L') {
                    document.getElementById("left-" + listFloorData[i].floor + "").innerHTML += '<td class="onmouse"  id=' + jsonBoatSeat[n].boat_seat_id + '>' + jsonBoatSeat[n].boat_seat_number + '</td>'
                    document.getElementById(jsonBoatSeat[n].boat_seat_id).setAttribute('onclick', 'checkBoatSeat(' + jsonBoatSeat[n].boat_seat_id + ',' + jsonBoatSeat[n].boat_seat_number + ')');
                    countL++;
                }
            }
            // จัดการตำแหน่งที่นั่งให้เท่ากัน
            if (countR > countL) {
                let difCount = countR - countL;
                for (let k = 0; k < difCount; k++) {
                    document.getElementById("left-" + listFloorData[i].floor + "").innerHTML += "<td ></td>";

                }
            }
            else if (countL > countR) {
                let difCount = countL - countR;
                for (let k = 0; k < difCount; k++) {
                    document.getElementById("right-" + listFloorData[i].floor + "").innerHTML += "<td ></td>";
                }
            }
            // ----------------------

            document.getElementById("right-" + listFloorData[i].floor + "").innerHTML += '<td bgcolor="#fff"><center>Right</center></td>';
            document.getElementById("left-" + listFloorData[i].floor + "").innerHTML += '<td bgcolor="#fff"><center>Left</center></td>';

            //สร้าง btn ชั้นที่นั่ง
            if (statusTable == 'display') {
                document.getElementById('container-btnFloor').innerHTML += "<button id='btn-" + (i + 1) + "'  class='btn btn-success'>ชั้น " + listFloorData[i].floor + "</button>  ";
                statusTable = 'none';
            }
            else {
                document.getElementById('container-btnFloor').innerHTML += "<button id='btn-" + (i + 1) + "'  class='btn btn-warning'>ชั้น " + listFloorData[i].floor + "</button>  ";
            }

            listCountFloor.push("btn-" + (i + 1));
            document.getElementById('btn-' + (i + 1)).setAttribute('onclick', 'btnChangBoatFloor("btn-' + (i + 1) + '")')
        }
        document.getElementById('container-boatSeat-customerData').style.display = "block";

        await getBoatSeatStatus(date, boatNumber, ticketCode, numbetSeatId);
    } catch (err) {
        alert(err)
    }
    // await getBottomBoatSeatData(boatNumber, date, ticketCode);
    // await getTopBoatSeatData(boatNumber, date, ticketCode);
    // await getListSeat();
}


const getBoatSeatStatus = async (dateToSeat, boatNumber, ticketCode, BoatSeatID) => {
    try {
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
        for (let countFloor = 0; countFloor < listFloorData.length; countFloor++) {
            for (let i = 0; i < json.length; i++) {
                if (listFloorData[countFloor].floor == json[i].floor) {
                    let timeCurrent = new Date();
                    let deadline = new Date(json[i].deadline_book);
                    let resultDeadline = validateDeadline(timeCurrent, deadline);
                    //ตรวจสอบหาที่นั่งเดิมของลูกค้าสำหรับเปลียนที่นั่ง
                    if (json[i].boat_seat_id == BoatSeatID && json[i].floor == listFloorData[countFloor].floor) {
                        document.getElementById(json[i].boat_seat_id).innerHTML = ("<td id=" + json[i].boat_seat_id + ">" + json[i].boat_seat_number + "</td>");
                        document.getElementById(json[i].boat_seat_id).setAttribute('bgcolor', 'gray');
                        document.getElementById(json[i].boat_seat_id).setAttribute('onclick', '');
                        document.getElementById(json[i].boat_seat_id).setAttribute('onclick', 'checkBoatSeatForChangeBoatSeat(' + json[i].boat_seat_id + ',' + json[i].boat_seat_number + ')');
                        listSeat.push(json[i].boat_seat_id);
                        listSeatNumber.push(json[i].boat_seat_number);
                        continue;
                    }
                    if (json[i].ticket_status_id == 1) {
                        if (ticketCode == json[i].ticket_code) {
                            document.getElementById(json[i].boat_seat_id).innerHTML = ("<td id=" + json[i].boat_seat_id + "><i class='fas fa-check-circle'></i></td>");
                            document.getElementById(json[i].boat_seat_id).setAttribute('class', 'bg-primary');
                            document.getElementById(json[i].boat_seat_id).setAttribute('onclick', '');
                            document.getElementById(json[i].boat_seat_id).setAttribute('title', 'ชื่อ : ' + json[i].cust_first_name + " " + json[i].cust_last_name + '\nรหัสตั๋ว : ' + json[i].ticket_code + '');
                            continue;
                        }
                        document.getElementById(json[i].boat_seat_id).innerHTML = ("<td id=" + json[i].boat_seat_id + "><i class='fas fa-check-circle'></i></td>");
                        document.getElementById(json[i].boat_seat_id).setAttribute('bgcolor', '#28a745');
                        document.getElementById(json[i].boat_seat_id).setAttribute('onclick', '');
                        document.getElementById(json[i].boat_seat_id).setAttribute('class', '');
                        document.getElementById(json[i].boat_seat_id).setAttribute('title', 'ชื่อ : ' + json[i].cust_first_name + " " + json[i].cust_last_name + '\nรหัสตั๋ว : ' + json[i].ticket_code + '');
                    }
                    else if (json[i].ticket_status_id == 2 && resultDeadline == true) {
                        document.getElementById(json[i].boat_seat_id).innerHTML = ("<td id=" + json[i].boat_seat_id + "><i class='fas fa-check-circle'></i></td>");
                        document.getElementById(json[i].boat_seat_id).setAttribute('bgcolor', 'yellow');
                        document.getElementById(json[i].boat_seat_id).setAttribute('class', '');
                        document.getElementById(json[i].boat_seat_id).setAttribute('onclick', '');
                        document.getElementById(json[i].boat_seat_id).setAttribute('title', 'ชื่อ : ' + json[i].cust_first_name + " " + json[i].cust_last_name + '\nรหัสตั๋ว : ' + json[i].ticket_code + '');
                    }
                    else if (json[i].ticket_status_id == 4) {
                        document.getElementById(json[i].boat_seat_id).innerHTML = ("<td id=" + json[i].boat_seat_id + "><i class='fas fa-check-circle'></i></td>");
                        document.getElementById(json[i].boat_seat_id).setAttribute('bgcolor', 'yellow');
                        document.getElementById(json[i].boat_seat_id).setAttribute('class', '');
                        document.getElementById(json[i].boat_seat_id).setAttribute('onclick', '');
                        document.getElementById(json[i].boat_seat_id).setAttribute('title', 'ชื่อ : ' + json[i].cust_first_name + " " + json[i].cust_last_name + '\nรหัสตั๋ว : ' + json[i].ticket_code + '');
                    }
                }
            }
        }

    } catch (err) {
        // alert('Error Get Bottom Boat Seat Status : ' + err)
    }
}


const btnChangBoatFloor = (btnId) => {
    for (let i = 0; i < listCountFloor.length; i++) {
        if (btnId == listCountFloor[i]) {
            document.getElementById('btn-' + (i + 1)).setAttribute('class', 'btn btn-success');
            document.getElementById('table-' + (i + 1)).style.display = 'table';

        }
        else {
            document.getElementById('btn-' + (i + 1)).setAttribute('class', 'btn btn-warning');
            document.getElementById('table-' + (i + 1)).style.display = 'none';

        }
    }
}

const setResetBoatSeatAll = async () => {
    //Clear Boat Seat to click <td>
    for (let count = 0; count < listSeat.length; count++) {
        let td = document.getElementById(listSeat[count]);
        td.removeAttribute('bgcolor');
    }

    listSeat = []; //List Boat Seat ID
    listSeatNumber = []; //List Boat Seat Number
    await getListSeat();
    document.getElementById('priceSum').innerHTML = ticketPrice * listSeat.length;
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
                boatNumber.innerHTML += "<option value=" + maxResponse[countMax].boat_number + " >หมายเลขเรือ : " + maxResponse[countMax].boat_number + "  เวลา : " + maxResponse[countMax].start_time.substring(0, 5) + " - " + minResponse[countMin].return_time.substring(0, 5) + " น. </option>";
            };
        }
    }
}