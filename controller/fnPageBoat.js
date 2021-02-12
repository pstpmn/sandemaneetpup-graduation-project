const getListBoat = async () => {
    try {
        let response = await fetch('model/apiGetBoatAll.php');
        let tbodyTable = document.getElementById('table-ticket-edit');
        if (response.status == 200) {
            let json = await response.json();
            for (let i = 0; i < json.length; i++) {
                tbodyTable.innerHTML += "<tr><td>" + (i + 1) + "</td> <td>" + json[i].boat_number + "</td>"
                    + "<td>" + json[i].boat_name + "</td>"
                    + "<td><form action='boatSeat.php'><button name='btnBoatSeat' value='" + json[i].boat_number + "' class='btn btn-info'>เปิด</button></form></td>"
                    + "<td><form action='boatSchedule.php'><button name='btnBoat' value='" + json[i].boat_number + "' class='btn btn-info'>เปิด</button></form></td>"

                    + "<td><button id='btnEdit-" + i + "' class='btn btn-warning'>แก้ไขข้อมูล</button> "
                    + "<button  id='btnDelte-" + i + "'  class='btn btn-danger'>ลบ</button> </td></tr>"
                document.getElementById('btnEdit-' + i).setAttribute('onclick', 'getShowModalEditBoat("' + json[i].boat_number + '","' + json[i].boat_name + '")');
                document.getElementById('btnDelte-' + i).setAttribute('onclick', 'setDelectBoat("' + json[i].boat_number + '")');
            }
        }
        $(document).ready(function () {
            $('#dataTable-employee').dataTable({
                "lengthChange": false
            });
        })
    } catch (err) {
    }
}


const setDelectBoat = async (boatNumber) => {
    try {
        let cf = confirm('ยืนยันการลบเรือหมายเลข : ' + boatNumber + "\nคำเตือน : เมือเรือถูกลบจะทำการลบตั๋วที่เคยซื้อกับเรือไปด้วย");
        if (cf == true) {
            let response = await fetch('model/apiSetDeleteBoat.php', {
                method: "POST",
                body: JSON.stringify({
                    boatNumber: boatNumber
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            let json = await response.json();
            if (json == true) {
                location.reload();
            }
        }
    } catch (err) {

    }
}

const getShowModalEditBoat = async (boatNumber, boatName) => {
    document.getElementById('text-boatNumber').value = boatNumber;
    document.getElementById('text-boatNumber').disabled = true;

    document.getElementById('text-boatName').value = boatName;
    setBtnEditBoat();
    await $('#modal-Employee').modal();
}



const setEditBoat = async () => {
    let boatNumber = document.getElementById('text-boatNumber').value;
    let boatName = document.getElementById('text-boatName').value;

    try {
        let response = await fetch('model/apiSetBoat.php', {
            method: "POST",
            body: JSON.stringify({
                boatNumber: boatNumber,
                boatName: boatName
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        if (response.status == 200) {
            let json = await response.text();
            if (json == 'true') {
                alert('แก้ไขสำเร็จ')
                location.reload();
            }
        }
    } catch (err) {

    }
}

const getShowModalAddBoat = async () => {
    document.getElementById('text-boatNumber').value = "";
    document.getElementById('text-boatName').value = "";
    document.getElementById('text-boatNumber').disabled = false;


    document.getElementById('header-Employee').innerHTML = 'เพิ่มข้อมูลเรือ';
    document.getElementById('btnSaveEdit').innerHTML = 'บันทึก';
    document.getElementById('btnSaveEdit').setAttribute('onclick', 'setAddBoat()');
    await $('#modal-Employee').modal();
}

const setAddBoat = async () => {
    let boatNumber = document.getElementById('text-boatNumber').value;
    let boatName = document.getElementById('text-boatName').value;

    if (boatNumber == "") {
        alert('กรุณาพิมพ์ หมายเลขเรือ')
        return;
    }
    if (boatName == "") {
        alert('กรุณาพิมพ์ ชื่อเรือ')
        return;
    }

    try {
        let response = await fetch('model/apiSetAddBoat.php', {
            method: "POST",
            body: JSON.stringify({
                boatNumber: boatNumber,
                boatName: boatName
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        if (response.status == 200) {
            let json = await response.text();
            if (json == 'true') {
                alert('เพิ่มสำเร็จแล้ว')
                location.reload();
            }
            else {
                alert("เกิดข้อผิดพลาดในการเพิ่มเรือ");
            }
        }
    } catch (err) {
        alert('Error add Boat : ' + err)
    }
}


const setBtnEditBoat = () => {
    document.getElementById('header-Employee').innerHTML = 'แก้ไขข้อมูลเรือ';
    document.getElementById('btnSaveEdit').innerHTML = 'แก้ไข';
    document.getElementById('btnSaveEdit').setAttribute('onclick', 'setEditBoat()');
}

const getShowDataTableBoatSeat = async (boatNumber) => {
    try {
        let tableBoatSeat = document.getElementById('table-boatSeat');
        tableBoatSeat.innerHTML = "";
        let response = await fetch('model/apiBoatSeat.php', {
            method: "POST",
            body: JSON.stringify({ boatNumber: boatNumber }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        if (response.status == 200) {
            let json = await response.json();
            for (let i = 0; i < json.length; i++) {
                tableBoatSeat.innerHTML += "<tr><td>" + json[i].boat_seat_number + "</td>"
                    + "<td>" + json[i].boat_seat_type + "</td><td>" + json[i].floor + "</td>"
                    + "<td><button id='btnEdit-" + i + "' class='btn btn-warning'>แก้ไข</button> <button id='btnDelete-" + i + "' class='btn btn-danger'>ลบ</button></td></tr>"
                document.getElementById("btnEdit-" + i).setAttribute('onclick', 'getModalEditBoatSeat("' + json[i].boat_seat_id + '","' + json[i].boat_seat_number + '","' + json[i].boat_seat_type + '","' + json[i].floor + '","' + json[i].boat_number + '")')
                document.getElementById("btnDelete-" + i).setAttribute('onclick', 'setDeleteBoatSeat("' + json[i].boat_seat_id + '")')

            }
        }
        $(document).ready(function () {
            $('#dataTable-boatSeat').dataTable({
                pageLength: 25,
                destroy: true
            });
        })
    } catch (err) {

    }
}


const getModalAddBoatSeatMultipleRows = (boatNumber) => {
    let modalBody = document.getElementById('modal-body');

    modalBody.innerHTML = "<table class='table table-bordered'>"
        + "<thead>"
        + "<tr><td scope='col' width='30%' ><b>เลขที่นั่งเริ่มต้น</b></td>"
        + "<td><input id='txt-seatStart' type='number'></td></tr>"
        + "<tr><td scope='col' width='30%' ><b>เลขที่นั่งสิ้นสุด</b></td>"
        + "<td><input id='txt-seatEnd' type='number'></td></tr>"
        + "<tr><td scope='col' width='30%'><b>ชั้น</b></td>"
        + "<td><input type='number' id='txt-floor'></td></tr>"
        + "<tr><td scope='col' width='30%'><b>ตำแหน่ง</b></td>"
        + "<td><select id='txt-type'><option value='L'>ซ้าย</option><option value='R'>ขวา</option></select></td></tr>"
        + "<tr><td scope='col' width='30%' ><b>จำนวนที่นั่ง</b></td>"
        + "<td><label id='txt-count'></label></td></tr>"
        + "</thead></table>"

    document.getElementById('btnAdd').setAttribute('onclick', 'setAddBoatSeatMultiRow("' + boatNumber + '")')
    document.getElementById('txt-seatStart').setAttribute('onchange', 'onchangeCountBoatSeatAdd()')
    document.getElementById('txt-seatEnd').setAttribute('onchange', 'onchangeCountBoatSeatAdd()')
    document.getElementById('btnAdd').innerHTML = "Add";

    $('#modal-addBoatSeat').modal();
}


const getModalAddBoatSeatOne = (boatNumber) => {
    let modalBody = document.getElementById('modal-body');

    modalBody.innerHTML = "<table class='table table-bordered'>"
        + "<thead>"
        + "<tr><td scope='col' width='30%' ><b>เลขที่นั่งเรือ</b></td>"
        + "<td><input id='txt-seat' type='number'></td></tr>"
        + "<tr><td scope='col' width='30%'><b>ชั้น</b></td>"
        + "<td><input type='number' id='txt-floor'></td></tr>"
        + "<tr><td scope='col' width='30%'><b>ตำแหน่ง</b></td>"
        + "<td><select id='txt-type'><option value='L'>ซ้าย</option><option value='R'>ขวา</option></select></td></tr>"
        + "</thead></table>"

    document.getElementById('btnAdd').setAttribute('onclick', 'setAddBoatSeatOne("' + boatNumber + '")')
    document.getElementById('btnAdd').innerHTML = "Add";
    $('#modal-addBoatSeat').modal();
}

const getModalEditBoatSeat = (id, seatNumber, boatType, floor, boatNumber) => {
    let modalBody = document.getElementById('modal-body');

    modalBody.innerHTML = "<table class='table table-bordered'>"
        + "<thead>"
        + "<tr><td scope='col' width='30%' ><b>เลขที่นั่งเรือ</b></td>"
        + "<td><input id='txt-seat' type='number'></td></tr>"
        + "<tr><td scope='col' width='30%'><b>ชั้น</b></td>"
        + "<td><input type='number' id='txt-floor'></td></tr>"
        + "<tr><td scope='col' width='30%'><b>ตำแหน่ง</b></td>"
        + "<td><select id='txt-type'><option value='L'>ซ้าย</option><option value='R'>ขวา</option></select></td></tr>"
        + "</thead></table>"

    document.getElementById('btnAdd').innerHTML = "Edit";
    document.getElementById('txt-floor').value = floor;
    document.getElementById('txt-type').value = boatType;
    document.getElementById('txt-seat').value = seatNumber;
    document.getElementById('btnAdd').setAttribute('onclick', 'setEditBoatSeat("' + id + '")');
    $('#modal-addBoatSeat').modal();
}

const getBoatSeatOnly = async (boatNumber) => {
    document.getElementById('tableFromBoatSeat').innerHTML = "";
    document.getElementById('container-btnFloor').innerHTML = "";


    let countR = 0;
    let countL = 0;
    let statusTable = 'display';
    await getListCountFloor(boatNumber);

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
                // document.getElementById(jsonBoatSeat[n].boat_seat_id).setAttribute('onclick', 'checkBoatSeatForChangeBoatSeat(' + jsonBoatSeat[n].boat_seat_id + ',' + jsonBoatSeat[n].boat_seat_number + ')');
                countR++;
            }
            else if (jsonBoatSeat[n].floor == listFloorData[i].floor && jsonBoatSeat[n].boat_seat_type == 'L') {
                document.getElementById("left-" + listFloorData[i].floor + "").innerHTML += '<td class="onmouse"  id=' + jsonBoatSeat[n].boat_seat_id + '>' + jsonBoatSeat[n].boat_seat_number + '</td>'
                // document.getElementById(jsonBoatSeat[n].boat_seat_id).setAttribute('onclick', 'checkBoatSeatForChangeBoatSeat(' + jsonBoatSeat[n].boat_seat_id + ',' + jsonBoatSeat[n].boat_seat_number + ')');
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
}

const setAddBoatSeatMultiRow = async (boatNumber) => {
    try {
        let floor = document.getElementById('txt-floor').value;
        let start = document.getElementById('txt-seatStart').value;
        let end = document.getElementById('txt-seatEnd').value;
        let SeatType = document.getElementById('txt-type').value;
        let response;
        let differ = parseInt(end) - parseInt(start);

        if (floor == "") {
            alert("โปรดใส่ข้อมูล Floor");
            return;
        }
        if (start == "") {
            alert("โปรดใส่ข้อมูล เริ่มต้นเลขที่นั่ง");
            return;
        }
        if (end == "") {
            alert("โปรดใส่ข้อมูล สิ้นสุดเลขที่นั่ง");
            return;
        }

        for (let i = 0; i <= differ; i++) {
            response = await fetch('model/apiSetAddBoatSeat.php', {
                method: "POST",
                body: JSON.stringify({
                    boatNumber: boatNumber,
                    start: start,
                    floor: floor,
                    SeatType: SeatType
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            start++;
        }
        let json = await response.json();
        if (json == true) {
            alert('เพิ่มเสร็จสิ้น');
            location.reload();
        }
        else {
            alert('เกิดข้อผิดพลาด')
        }

    } catch (err) {
        alert(err)
    }
}

const setAddBoatSeatOne = async (boatNumber) => {
    try {
        let floor = document.getElementById('txt-floor').value;
        let start = document.getElementById('txt-seat').value;
        let SeatType = document.getElementById('txt-type').value;

        if (floor == "") {
            alert("โปรดใส่ข้อมูล Floor");
            return;
        }
        if (start == "") {
            alert("โปรดใส่ข้อมูล หมายเลขที่นั่ง");
            return;
        }
        let response = await fetch('model/apiSetAddBoatSeat.php', {
            method: "POST",
            body: JSON.stringify({
                boatNumber: boatNumber,
                start: start,
                floor: floor,
                SeatType: SeatType
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        let json = await response.json();
        if (json == true) {
            alert('เพิ่มเสร็จสิ้น');
            location.reload();
        }
        else {
            alert('เกิดข้อผิดพลาด')
        }
    } catch (err) {
        alert(err)
    }
}




const setEditBoatSeat = async (id) => {
    try {
        let floor = document.getElementById('txt-floor').value;
        let seatType = document.getElementById('txt-type').value;
        let numbetSeat = document.getElementById('txt-seat').value;

        if (floor == "") {
            alert("โปรดใส่ข้อมูล Floor");
            return;
        }
        if (numbetSeat == "") {
            alert("โปรดใส่ข้อมูล หมายเลขที่นั่ง");
            return;
        }

        let response = await fetch('model/apiSetEditBoatSeat.php', {
            method: "POST",
            body: JSON.stringify({
                floor: floor,
                seatType: seatType,
                numbetSeat: numbetSeat,
                boatSeatId: id
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        let json = await response.json();
        if (json == true) {
            alert('แก้ไขเสร็จสิ้น');
            location.reload();
        }
        else {
            alert('เกิดข้อผิดพลาด')
        }
    } catch (err) {
        alert(err)
    }
}


const setDeleteBoatSeat = async (id) => {
    try {
        let cf = confirm("คำเตือน : เมือลบที่นั่งเรือแล้ว จะทำการลบตั๋วที่เคยซื้อที่นั่งเรือนั้นไปด้วย");
        if (cf == true) {
            let response = await fetch('model/apiSetDelectBoatSeat.php', {
                method: "POST",
                body: JSON.stringify({
                    id: id,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            if (response.status == 200) {
                let result = await response.text();
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


const getModalAddBoatSchedule = async (boatNumber) => {
    document.getElementById('txt-type-start').checked = false;
    document.getElementById('txt-time').value = "";
    document.getElementById('txt-type-return').checked = false;
    document.getElementById('txt-location').value = 1;

    document.getElementById('btnSaveEdit').setAttribute('onclick', 'setAddBoatSchedule(' + boatNumber + ')');
    $('#modal-addBoatSchedule').modal();
}


const setAddBoatSchedule = async (boatNumber) => {
    let txtType;
    if (document.getElementById('txt-type-start').checked == true) {
        txtType = 'start';
    }
    else if (document.getElementById('txt-type-return').checked == true) {
        txtType = 'return';
    }
    else {
        return alert('โปรดระบุ ประเภท รอบไป / รอบกลับ !!');
    }

    let txtLocation = document.getElementById('txt-location').value;
    let txtTime = document.getElementById('txt-time').value;

    if (txtLocation == "") return alert('โปรดระบุ location !!')
    if (txtTime == "") return alert('โปรดระบุ เวลา !!')

    try {
        let response = await fetch('model/apiSetAddBoatSchedule.php', {
            method: "POST",
            body: JSON.stringify({
                boatNumber: boatNumber,
                txtLocation: txtLocation,
                txtTime: txtTime,
                txtType: txtType
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        let json = await response.json();
        if (json == true) {
            alert('การเพิ่มเส้นทางเรือ สำเร็จ')
            location.reload();
        }
        else {
            alert('เกิดข้อผิดพลาดในการเพิ่มเส้นทาง !!')
        }
    } catch (err) {
        alert('เกิดข้อผิดพลาดในการเพิ่มเส้นทางเรือ !!')
    }
}

const getModalEditBoatSchedule = async (id) => {
    try {
        let response = await fetch('model/apiGetBoatScheduleRowId.php', {
            method: "POST",
            body: JSON.stringify({
                id: id
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        let json = await response.json();
        if (json.length > 0) {
            if (json[0].start_time != null) {
                document.getElementById('txt-type-start').checked = true;
                document.getElementById('txt-time').value = json[0].start_time;
            }
            else {
                document.getElementById('txt-type-return').checked = true;
                document.getElementById('txt-time').value = json[0].return_time;
            }
            document.getElementById('txt-location').value = json[0].location_id;
            document.getElementById('btnSaveEdit').setAttribute('onclick', 'setEditBoatSchedule(' + id + ')');
            $('#modal-addBoatSchedule').modal();
        }
        else {
            alert('เกิดข้อผิดพลาด')
        }
    } catch (err) {

    }
}


const setEditBoatSchedule = async (id) => {
    let txtType;
    if (document.getElementById('txt-type-start').checked == true) {
        txtType = 'start';
    }
    else if (document.getElementById('txt-type-return').checked == true) {
        txtType = 'return';
    }
    else {
        return alert('โปรดระบุ ประเภท รอบไป / รอบกลับ !!');
    }

    let txtLocation = document.getElementById('txt-location').value;
    let txtTime = document.getElementById('txt-time').value;

    if (txtLocation == "") return alert('โปรดระบุ location !!')
    if (txtTime == "") return alert('โปรดระบุ เวลา !!')

    try {
        let response = await fetch('model/apiSetEditBoatSchedule.php', {
            method: "POST",
            body: JSON.stringify({
                id: id,
                txtLocation: txtLocation,
                txtTime: txtTime,
                txtType: txtType
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        let json = await response.json();
        if (json == true) {
            alert('การเพิ่มเส้นทางเรือ สำเร็จ')
            location.reload();
        }
        else {
            alert('เกิดข้อผิดพลาดในการเพิ่มเส้นทาง !!')
        }
    } catch (err) {
        alert('เกิดข้อผิดพลาดในการเพิ่มเส้นทางเรือ !!')
    }
}

const setDelectBoatSchedule = async (id) => {
    try {
        let cf = confirm('ยืนยันการลบตารางเดินเรือ !! ');
        if (cf == true) {
            let response = await fetch('model/apiSetDelectBoatSchedule.php', {
                method: "POST",
                body: JSON.stringify({
                    id: id
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            let json = await response.json();
            if (json == true) {
                location.reload();
            }
            else {
                alert('เกิดข้อผิดพลาดในการลบ !!')
            }
        }

    } catch (err) {

    }
}