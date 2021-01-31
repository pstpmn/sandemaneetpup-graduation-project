const getListDayOff = async () => {
    try {
        let response = await fetch('model/apiGetDayOffAll.php');
        let tbodyTable = document.getElementById('table-dayOff');
        let dayOff;
        if (response.status == 200) {
            let json = await response.json();
            for (let i = 0; i < json.length; i++) {
                tbodyTable.innerHTML += "<tr><td>" + (i + 1) + "</td>"
                    + "<td>" + json[i].dayOff + "</td>"
                    + "<td>" + json[i].dayOff_cause + "</td>"
                    + "<td>" + json[i].dayOff_status_name + "</td>"
                    + "<td><button id='btnEdit-" + i + "' class='btn btn-warning'>แก้ไขข้อมูล</button> "
                    + "<button  id='btnDelte-" + i + "'  class='btn btn-danger'>ลบ</button> </td></tr>"
                document.getElementById('btnEdit-' + i).setAttribute('onclick', 'getShowModalEditDayOff("' + json[i].dayOff_id + '","' + json[i].dayOff + '","' + json[i].dayOff_cause + '",' + json[i].dayOff_status_id + ')');
                document.getElementById('btnDelte-' + i).setAttribute('onclick', 'setDelectDayOff("' + json[i].dayOff_id + '","'+json[i].dayOff+'")');
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


const setDelectDayOff = async (id,dayOff) => {
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

const getShowModalEditDayOff = async (id,dayOff, cause, status) => {
    document.getElementById('text-cause').value = cause;
    document.getElementById('implemant').innerHTML = "";
    if(status == 2){
        let input = document.createElement("input");
        input.type = "date";
        input.id = "text-dayOff";
        document.getElementById('implemant').appendChild(input)
        document.getElementById('btnSaveEdit').setAttribute('onclick','setAddDayOff("2")');
    }
    else if (status == 1) {
        let daysThai = ["วันอาทิตย์", "วันจันทร์", "วันอังคาร", "วันพุทธ", "พฤหัสบดี", "วันศุกร์", "วันเสาร์"];
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
        document.getElementById('btnSaveEdit').setAttribute('onclick','setAddDayOff("1")');
    }
    
    document.getElementById('tr-foot').innerHTML = "<td><b>Status</b></td><td>"
    +"<select id='text-status'><option value='1' >วันหยุดประจำ</option> <option value='2' >วันหยุดพิเศษ</option></select></td>";
    document.getElementById('text-status').value = status;
    document.getElementById('text-dayOff').value = dayOff;
    document.getElementById('btnSaveEdit').innerHTML = 'Save';
    document.getElementById('btnSaveEdit').setAttribute('onclick','setEditDayOff("'+id+'")');


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
                id:id
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
        let daysThai = ["วันอาทิตย์", "วันจันทร์", "วันอังคาร", "วันพุทธ", "พฤหัสบดี", "วันศุกร์", "วันเสาร์"];
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
        document.getElementById('btnSaveEdit').setAttribute('onclick','setAddDayOff("1")');
    }
    else if (DayOffCategory == "special") {
        let input = document.createElement("input");
        input.type = "date";
        input.id = "text-dayOff";
        document.getElementById('implemant').appendChild(input)
        document.getElementById('btnSaveEdit').setAttribute('onclick','setAddDayOff("2")');
    }
    await $('#modal-dayOff').modal();

}

const setAddDayOff = async (status) => {
    let dayOff = document.getElementById('text-dayOff').value;
    let cause = document.getElementById('text-cause').value;

    if (dayOff == "") {
        alert('กรุณากรอกข้อมูล วันหยุด')
        return;
    }
    if (cause == "") {
        alert('กรุณาพิมพ์ สาเหตุวันหยุด')
        return;
    }

    try {
        let response = await fetch('model/apiSetAddDayOff.php', {
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

        if (response.status == 200) {
            let json = await response.text();
            if (json == 'true') {
                alert('เพิ่มสำเร็จแล้ว')
                location.reload();
            }
            else {
                alert("เกิดข้อผิดพลาดในการเพิ่ม วันหยุด : "+json);
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