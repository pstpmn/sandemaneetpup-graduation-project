const getBookTime = async () => {
    try {
        let response = await fetch('model/apiGetBookTime.php');
        let tbodyTable = document.getElementById('table-bookTime');
        if (response.status == 200) {
            let json = await response.json();
            for (let i = 0; i < json.length; i++) {
                tbodyTable.innerHTML += "<tr>"
                    + "<td>" + json[i].book_day + " วัน</td>"
                    + "<td>" + json[i].book_hour + " ชั่วโมง</td>"
                    + "<td>" + json[i].book_minute + " นาที</td>"
                    + "<td><button id='btnEdit-" + i + "' class='btn btn-warning'>แก้ไข</button> "
                    + "</tr>"
                document.getElementById('btnEdit-' + i).setAttribute('onclick', 'getShowModalEditBookTime("' + json[i].book_day + '","' + json[i].book_hour + '",' + json[i].book_minute + ')');
            }
        }
    } catch (err) {
        alert("Error manage boat system : " + err);
    }
}

const getShowModalEditBookTime = async (day, hour, minute) => {
    document.getElementById('text-day').value = day;
    document.getElementById('text-hour').value = hour;
    document.getElementById('text-minute').value = minute;
    $("#modal-bookTime").modal();
}

const setBookTime = async () => {
    try {
        let days = document.getElementById('text-day').value;
        let hours = document.getElementById('text-hour').value;
        let minutes = document.getElementById('text-minute').value;
        let response = await fetch('model/apiSetBookTime.php', {
            method: "POST",
            body: JSON.stringify({
                days: days,
                minutes: minutes,
                hours, hours
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        let json = await response.json();
        if(json == true){
            alert("แก้ไขสำเร็จ");
            location.reload()
        }
        else{
            alert('เกิดข้อผิดพลาด');
        }
    } catch (err) {
        alert('Error Set Book Time : '+err);
    }
}
