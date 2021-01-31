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

const getTicketPrice = async (ticketCategoryId) => {
    try {
        let response = await fetch('model/apiGetTicketPrice.php', {
            method: "POST",
            body: JSON.stringify({ ticketCategoryId: ticketCategoryId }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        let json = await response.json();
        ticketPrice = json[0].ticket_category_price;
    } catch (Error) {

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



const getBoatSeat = async (boatNumber, date, orgin, destination, ticketCode, numbetSeatId) => {
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

const getListSeat = async () => {
    let numberBoatSeat = document.getElementById('number-boatseat');
    numberBoatSeat.innerHTML = listSeatNumber;
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

const saveTicketNormal = async (listSeat, listSeatNumber, orgin, destination,employeeId) => {
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
            date: document.getElementById('date').value,
            ticketID: listSeat[i],
            ticketStatus: 1,
            ticketCode: json,
            orgin: orgin,
            destination: destination,
            empId: employeeId
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
            + "<td> หมายเลขเรือ : <u>" + json[0].boat_number + "</u></td> <td>ต้นทาง :<u> " + json[0][45] + "</u></td> <td>ปลายทาง : <u>" + json[0][47] + "</u></td> <td>วันออกเดินทาง : <u>" + getFormatYearDMY(json[0].travel_date) + "</u></td> </tr>"

        for (let i = 0; i < json.length; i++) {
            document.getElementById('detail-customer').innerHTML += "<tr>"
                + "<td> ชื่อ : " + json[i].cust_first_name + " " + json[i].cust_last_name + "</td> <td>เบอร์โทรศัพท์ : " + json[i].phone_number + "</td>"
                + "<td>หมายเลขที่นั่งเรือ : " + json[i].boat_seat_number + "</td> <td>ชั้น : " + json[i].floor + "</td></tr>"
        }

        document.getElementById('result-CountCustomer').innerHTML = listSeat.length
        document.getElementById('result-priceSum').innerHTML = (ticketPrice*listSeat.length)


    } catch (err) {
        document.getElementById('ModalHeader').setAttribute('class', 'modal-header alert alert-danger');
        document.getElementById('txtModalHeader').innerHTML = "<h4>ผลลัพธ์การซื้อตั๋ว : ไม่สำเร็จ</h4>";
        document.getElementById('txtTicketCode').innerHTML = "รหัสตั๋ว : ล้มเหลว";
    }
    await $('#result-buyTicket').modal({ backdrop: 'static', keyboard: false });
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
    document.getElementById('priceSum').innerHTML = ticketPrice * listSeat.length;
    getListSeat();
}

const onchangeCountBoatSeatAdd = () => {
    let seatStart = document.getElementById('txt-seatStart').value;
    let seatEnd = document.getElementById('txt-seatEnd').value;
    if (seatStart != "" && seatEnd != "") {
        document.getElementById('txt-count').innerHTML = ((parseInt(seatEnd) - parseInt(seatStart)+1) + " ที่นั่ง");
    }
}