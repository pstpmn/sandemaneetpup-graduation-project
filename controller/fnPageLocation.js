const getListLocation = async () => {
    try {
        let response = await fetch('model/apiLocation.php');
        let tbodyTable = document.getElementById('table-ticket-edit');
        if (response.status == 200) {
            let json = await response.json();
            for (let i = 0; i < json.length; i++) {
                tbodyTable.innerHTML += "<tr><td>" + (i + 1) + "</td> <td>" + json[i].location_name + "</td>"
                    + " <td><button id='btnEdit-" + i + "' class='btn btn-warning'>แก้ไข</button>  <button  id='btnDelte-" + i + "'  class='btn btn-danger'>ลบ</button> </td></tr>"
                document.getElementById('btnEdit-' + i).setAttribute('onclick', 'getShowModalEditLocation(' + json[i].location_id + ',"' + json[i].location_name + '")');
                document.getElementById('btnDelte-' + i).setAttribute('onclick', 'setDelectLocation("' + json[i].location_id + '","' + json[i].location_name + '")');
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

const setDelectLocation = async (locationId,locationName) => {
    try {
        let cf = confirm('ยืนยันลบ location : ' + locationName);
        if (cf == true) {
            let response = await fetch('model/apiSetDeleteLocation.php', {
                method: "POST",
                body: JSON.stringify({
                    locationId: locationId
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

const getShowModalEditLocation = async (locationId, locationName) => {
    getBtnEditLocation();
    document.getElementById('text-id').value = locationId;
    document.getElementById('text-locationName').value = locationName;
    await $('#modal-Employee').modal();
}


const setEditLocation = async () => {
    let locationId = document.getElementById('text-id').value;
    let locationName = document.getElementById('text-locationName').value;
    try {
        let response = await fetch('model/apiSetLocation.php', {
            method: "POST",
            body: JSON.stringify({
                locationId: locationId,
                locationName: locationName
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

const getShowModalAddLocation = async () => {
    document.getElementById('text-id').value = "";
    document.getElementById('text-locationName').value = "";

    document.getElementById('header-Employee').innerHTML = 'เพิ่มข้อมูล Location';
    document.getElementById('btnSaveEdit').innerHTML = 'Save';
    document.getElementById('btnSaveEdit').setAttribute('onclick', 'setAddLocation()');
    await $('#modal-Employee').modal();
}


const getBtnEditLocation = () => {
    document.getElementById('header-Employee').innerHTML = 'แก้ไขข้อ Location';
    document.getElementById('btnSaveEdit').innerHTML = 'Edit';
    document.getElementById('btnSaveEdit').setAttribute('onclick', 'setEditLocation()');
}


const setAddLocation = async () => {
    let locationName = document.getElementById('text-locationName').value;
    if (locationName == "") {
        alert('กรุณาพิมพ์ location name')
        return;
    }

    try {
        let response = await fetch('model/apiSetAddLocation.php', {
            method: "POST",
            body: JSON.stringify({
                locationName: locationName
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
                alert("เกิดข้อผิดพลาด");
            }
        }
    } catch (err) {
        alert('Error add Employee : ' + err)
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