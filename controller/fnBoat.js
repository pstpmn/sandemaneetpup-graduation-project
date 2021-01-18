const getListBoat = async () => {
    try {
        let response = await fetch('model/apiGetBoatAll.php');
        let tbodyTable = document.getElementById('table-ticket-edit');
        if (response.status == 200) {
            let json = await response.json();
            for (let i = 0; i < json.length; i++) {
                tbodyTable.innerHTML += "<tr><td>" + (i + 1) + "</td> <td>" + json[i].boat_number + "</td>"
                    + "<td>" + json[i].boat_name + "</td>"
                    + " <td><button id='btnEdit-" + i + "' class='btn btn-warning'>แก้ไข</button>  <button  id='btnDelte-" + i + "'  class='btn btn-danger'>ลบ</button> </td></tr>"
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
        alert("Error manage boat system : " + err);
    }
}


const setDelectBoat = async (boatNumber) => {
    try {
        let cf = confirm('ยืนยันลบเรือ : ' + boatNumber);
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
            let json = await response.text();
            if (json == 'true') {
                location.reload();
            }
        }
    } catch (err) {

    }
}

const getShowModalEditBoat = async (boatNumber, boatName) => {
    document.getElementById('text-boatNumber').value = boatNumber;
    document.getElementById('text-boatName').value = boatName;
    setBtnEditEmp();
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


    document.getElementById('header-Employee').innerHTML = 'เพิ่มข้อมูลเรือ';
    document.getElementById('btnSaveEdit').innerHTML = 'Save';
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


const setBtnEditEmp = () => {
    document.getElementById('header-Employee').innerHTML = 'แก้ไขข้อมูลเรือ';
    document.getElementById('btnSaveEdit').innerHTML = 'Edit';
    document.getElementById('btnSaveEdit').setAttribute('onclick', 'setEditBoat()');
}