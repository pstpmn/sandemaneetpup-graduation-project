const getShowChangeBoatSeat = async (ticketCode, numBerBoat, travelDate, origin, destination, boatSeatID) => {
    document.getElementById('header-select-boatSeat').innerHTML = "เลือกที่นั่งเรือลูกค้า CODE : <data id='label-ticket-code' value='" + ticketCode + "'>" + ticketCode + "</data>";
    document.getElementById('header-addCustomer').innerHTML = " <center>แก้ไขที่นั่งเรือ รหัสตั๋ว :  " + ticketCode + "</center>"
    document.getElementById('select-Location_start').value = origin;
    document.getElementById('select-Location_end').value = destination;
    await getSearchBoat(origin, destination)
    document.getElementById('boat-number').value = numBerBoat;
    document.getElementById('date').value = travelDate;
    // await getBoatSeatForChangBoatSeat(numBerBoat, travelDate, origin, destination, ticketCode, boatSeatID)
    await getBoatSeatForChangeSeat(numBerBoat, travelDate, origin, destination, ticketCode, boatSeatID)

    document.getElementById('btn-save').setAttribute('onclick', 'setBoatSeat("' + ticketCode + '","' + listSeat + '")')
    document.getElementById('btn-reset').setAttribute('onclick', 'getShowChangeBoatSeat("' + ticketCode + '","' + numBerBoat + '","' + travelDate + '","' + origin + '","' + destination + '","' + boatSeatID + '")')

    $("#dialog-showAddTicket").modal({ backdrop: 'static', keyboard: false });
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
                if (json[i].time_up_slip != null) {
                    json[i].time_up_slip = getFormatYearDMYHIS(json[i].time_up_slip);
                }

                domTbodyTable.innerHTML += "<tr>"
                    + "<td><button class='btn btn-link' id='ticketCode-" + i + "'>" + json[i].ticket_code + "</button></td> <td><button class='btn btn-link' id='ticketType-" + i + "'>" + json[i].ticket_category_name + "</button></td> <td><p  id='boatNumber-" + i + "'>" + json[i].boat_number + "</p></td>"
                    + "<td> <button  id='btn-diolog-customer-" + i + "' class='btn btn-link'>ดูรายการ</button></td> <td ><button  class='btn btn-link' id='emp-" + i + "'>" + json[i].emp_first_name + "</button></td>"
                    + "<td><button class='btn btn-link' id='timeBuyTicket-" + i + "'>" + getFormatYearDMYHIS(json[i].time_buy_ticket) + "</button></td> <td <button  class='btn btn-link' id='deadLineBook-" + i + "'>" + getFormatYearDMYHIS(json[i].deadline_book) + "</button></td> <td><button class='btn btn-link' id='travelDate-" + i + "'>" + getFormatYearDMYHIS(json[i].travel_date) + "</button></td>"
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


const getShowModalEditTicketCode = (id) => {
    document.getElementById('modal-body-editTicket').innerHTML = "";
    document.getElementById('modal-body-editTicket').innerHTML += "รหัสตั๋ว <input type='tell' id='ticketCode-modal-edit' readonly='readonly' class='form-control' value=" + id + ">"
    document.getElementById('modal-body-editTicket').innerHTML += "<button onclick='getSearchTicketCode()' id='searchTicketCode' class='btn btn-warning btn-sm'>สุ่มรหัสตั๋ว</button>";
    document.getElementById('searchTicketCode').style.margin = "10px 0px"
    document.getElementById('modal-footer').innerHTML = "<button id='btnRecode' class='btn btn-success'>Recode</button> <button class='btn btn-danger'>Reset</button> "
    document.getElementById('btnRecode').setAttribute('onclick', 'setEditTicketCode("' + id + '")')
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

const getShowModalEditEmployee = async (emp, ticketCode) => {
    try {
        let response = await fetch('model/apiGetEmployee.php');
        let json = await response.json();
        let node = document.createElement("select");
        node.setAttribute('class', 'form-control')
        node.setAttribute('id', 'select-Emp')
        document.getElementById('modal-body-editTicket').innerHTML = "เลือกพนักงาน";
        for (let i = 0; i < json.length; i++) {
            var option = document.createElement("option");
            option.text = json[i].emp_first_name +"  "+ json[i].emp_last_name;
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
        document.getElementById('modal-body-editTicket').innerHTML = "เลือกประเภทสถานะ";
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

const setEditTicketDialog = async (ticketCode, typeTicket, numberBoat, employeeName, buyTicket, deadline, dateTravel, statusTicket, img, timeUpSlip) => {
    document.getElementById('tbody-EditTicket-modal').innerHTML = "";
    document.getElementById('tbody-EditTicket-modal').innerHTML = "<tr><td><input type='text' value='" + ticketCode + "'></td>"
        + "<td><input type='text' value='" + typeTicket + "'></td> <td>" + numberBoat + "</td> <td><button id='btn-diolog-customer-" + ticketCode + "' class='btn btn-link'>ดูรายการ</button></td> <td>" + employeeName + "</td> <td>" + buyTicket + "</td> <td>" + deadline + "</td> <td>" + dateTravel + "</td> "
        + " <td>" + statusTicket + "</td> <td>" + img + "</td> <td>" + timeUpSlip + "</td></tr>";
    document.getElementById('btn-diolog-customer-' + ticketCode + '').setAttribute('onclick', 'getDialogListCustomerFromSlip("' + ticketCode + '")');
    $("#dialog-TicketEdit").modal({ backdrop: 'static', keyboard: false });
}

const getListSeatForChangeBoatSeat = () => {
    let numberBoatSeat = document.getElementById('number-boatseat');
    numberBoatSeat.innerHTML = listSeatNumber;
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