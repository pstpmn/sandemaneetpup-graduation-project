const getListDayOff = async () => {
    try {
        let response = await fetch('model/apiGetDayOffAll.php');
        let tbodyTable = document.getElementById('table-dayOff');
        let dateToday = new Date(new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getDate());
        if (response.status == 200) {
            let json = await response.json();
            for (let i = 0; i < json.length; i++) {
                let dateJson = new Date(json[i].dayOff);
                if (json[i].dayOff_status_name == 'วันหยุดพิเศษ' && (new Date(dateToday).getTime() >= new Date(dateJson).getTime())) {
                    continue;
                }
                if (json[i].dayOff_status_id == 2) {
                    json[i].dayOff = getFormatYearDMY(json[i].dayOff);
                }
                tbodyTable.innerHTML += "<tr><td>" + (i + 1) + "</td>"
                    + "<td>" + json[i].dayOff + "</td>"
                    + "<td>" + json[i].dayOff_cause + "</td>"
                    + "<td>" + json[i].dayOff_status_name + "</td>"
                    + "<td><button id='btnEdit-" + i + "' class='btn btn-warning'>แก้ไขข้อมูล</button> "
                    + "<button  id='btnDelte-" + i + "'  class='btn btn-danger'>ลบ</button> </td></tr>"
                document.getElementById('btnEdit-' + i).setAttribute('onclick', 'getShowModalEditDayOff("' + json[i].dayOff_id + '","' + json[i].dayOff + '","' + json[i].dayOff_cause + '",' + json[i].dayOff_status_id + ')');
                document.getElementById('btnDelte-' + i).setAttribute('onclick', 'setDelectDayOff("' + json[i].dayOff_id + '","' + json[i].dayOff + '")');
            }
        }
        $(document).ready(function () {
            $('#dataTable-dayOff').dataTable({
                "lengthChange": false
            });
        })
    } catch (err) {
    }
}


const setDelectDayOff = async (id, dayOff) => {
    try {
        let cf = confirm('ยืนยันลบ : ' + dayOff);
        if (cf == true) {
            let response = await fetch('model/apiSetDeleteDayOff.php', {
                method: "POST",
                body: JSON.stringify({
                    id: id
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            let json = await response.text();
            if (json == 'true') {
                location.reload();
            }
        }
    } catch (err) {

    }
}

const getShowModalEditDayOff = async (id, dayOff, cause, status) => {
    document.getElementById('text-cause').value = cause;
    document.getElementById('implemant').innerHTML = "";
    if (status == 2) {
        let input = document.createElement("input");
        input.type = "date";
        input.id = "text-dayOff";
        document.getElementById('implemant').appendChild(input)
        document.getElementById('btnSaveEdit').setAttribute('onclick', 'setAddDayOff("2")');
        document.getElementById('EngDate').innerHTML = "";

    }
    else if (status == 1) {
        let daysThai = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"];
        let daysEng = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let select = document.createElement("select");
        select.id = "text-dayOff";
        for (let i = 0; i < daysThai.length; i++) {
            let option = document.createElement("option");
            option.value = daysEng[i];
            option.text = daysThai[i];
            select.appendChild(option);
        }
        document.getElementById('EngDate').innerHTML = "";
        document.getElementById('implemant').appendChild(select);
        document.getElementById('btnSaveEdit').setAttribute('onclick', 'setAddDayOff("1")');
    }

    document.getElementById('tr-foot').innerHTML = "<td><b>Status</b></td><td>"
        + "<select id='text-status'><option value='1' >วันหยุดประจำ</option> <option value='2' >วันหยุดพิเศษ</option></select></td>";
    document.getElementById('text-status').value = status;
    document.getElementById('text-dayOff').value = dayOff;
    document.getElementById('btnSaveEdit').innerHTML = 'Save';
    document.getElementById('btnSaveEdit').setAttribute('onclick', 'setEditDayOff("' + id + '")');
    await $('#modal-dayOff').modal();
}



const setEditDayOff = async (id) => {
    let dayOff = document.getElementById('text-dayOff').value
    let cause = document.getElementById('text-cause').value
    let status = document.getElementById('text-status').value
    try {
        let response = await fetch('model/apiSetEditDayOff.php', {
            method: "POST",
            body: JSON.stringify({
                dayOff: dayOff,
                cause: cause,
                status: status,
                id: id
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

const getShowModalAddDayOff = async (DayOffCategory) => {
    document.getElementById('header-Employee').innerHTML = 'เพิ่มวันหยุด';
    document.getElementById('btnSaveEdit').innerHTML = 'Save';
    document.getElementById('implemant').innerHTML = "";
    document.getElementById('tr-foot').innerHTML = "";
    if (DayOffCategory == "regular") {
        document.getElementById('EngDate').innerHTML = "";
        let daysThai = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"];
        let daysEng = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let select = document.createElement("select");
        select.id = "text-dayOff";
        for (let i = 0; i < daysThai.length; i++) {
            let option = document.createElement("option");
            option.value = daysEng[i];
            option.text = daysThai[i];
            select.appendChild(option);
        }
        document.getElementById('implemant').appendChild(select);
        document.getElementById('btnSaveEdit').setAttribute('onclick', 'setAddDayOff("1")');
    }
    else if (DayOffCategory == "special") {
        let input = document.createElement("input");
        input.type = "date";
        input.id = "text-dayOff";
        document.getElementById('implemant').appendChild(input)

        document.getElementById('EngDate').innerHTML = '<td scope="col" width="30%"><b>หยุดจนถึง<br>(ถ้าหยุดมากกว่า 1 วัน)</b></td>'
            + '<td><input id="text-dayOff-End" type="date"></td>';
        document.getElementById('btnSaveEdit').setAttribute('onclick', 'setAddDayOff("2")');
    }
    await $('#modal-dayOff').modal();

}

const setAddDayOff = async (status) => {

    let dayOff = document.getElementById('text-dayOff').value;
    let cause = document.getElementById('text-cause').value;
    let DayOffToEnd;
    let diffDays = 0;

    if (status == 2) {
        DayOffToEnd = document.getElementById('text-dayOff-End').value;
        if (DayOffToEnd != "") {
            let dateS = new Date(dayOff);
            let dateE = new Date(DayOffToEnd);
            let diffTime = dateE - dateS;
            if (diffTime <= 0) {
                alert('วันหยุดเริ่ม ต้องน้อยกว่า วันหยุดสิ้นสุด !!');
                return;
            }
            diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        }
    }

    if (dayOff == "") {
        alert('กรุณากรอกข้อมูล วันหยุด')
        return;
    }
    if (cause == "") {
        alert('กรุณาพิมพ์ สาเหตุวันหยุด')
        return;
    }

    try {
        let response;
        for (let i = 0; i <= diffDays; i++) {
            response = await fetch('model/apiSetAddDayOff.php', {
                method: "POST",
                body: JSON.stringify({
                    dayOff: dayOff,
                    cause: cause,
                    status: status
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            if (DayOffToEnd != "") {
                dayOff = new Date(dayOff);
                let addDate = new Date(dayOff.setDate(dayOff.getDate() + 1));
                let month = (addDate.getMonth() + 1);
                if (month < 10) {
                    month = "0" + (addDate.getMonth() + 1);
                }
                dayOff = addDate.getFullYear() + "-" + month + "-" + addDate.getDate();
            }
        }

        if (response.status == 200) {
            let json = await response.text();
            if (json == 'true') {
                alert('เพิ่มสำเร็จแล้ว')
                location.reload();
            }
            else {
                alert("เกิดข้อผิดพลาดในการเพิ่ม วันหยุด : " + json);
            }
        }
    } catch (err) {
        alert('Error add day off : ' + err)
    }
}


const setBtnEditDayOff = () => {
    document.getElementById('header-Employee').innerHTML = 'แก้ไขข้อมูลเรือ';
    document.getElementById('btnSaveEdit').innerHTML = 'Edit';
    document.getElementById('btnSaveEdit').setAttribute('onclick', 'setEditBoat()');
}