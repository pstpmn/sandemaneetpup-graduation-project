const getShowCustomerEdit = async () => {
    try {
        let response = await fetch('model/apiGetCustomerAll.php');
        let json = await response.json();
        let domTbodyTable = document.getElementById('table-ticket-edit');
        domTbodyTable.innerHTML = ""
        for (let i = 0; i < json.length; i++) {
            domTbodyTable.innerHTML += "<tr><td>" + json[i].cust_first_name + "</td><td>" + json[i].cust_last_name + "</td><td>" + json[i].phone_number + "</td>"
                + "<td>" + json[i].gender + "</td><td>" + getFormatYearDMYHIS(json[i].register_time) + "</td><td>" + json[i].count + "</td><td><button onclick='getShowModalCustomer(" + json[i].customer_id + ")' id='btn-edit' class='btn btn-warning'>แก้ไข</button> <button id='btnDelete-" + i + "' class='btn btn-danger'>ลบ</button></td></tr>"
            document.getElementById('btnDelete-' + i + '').setAttribute('onclick', 'setDeleteCustomer("' + json[i].customer_id + '","' + json[i].cust_first_name + '" , "' + json[i].cust_last_name + '")');
        }
        $(document).ready(function () {
            $('#dataTable-TicketEdit').dataTable({
                "lengthChange": false,
                destroy: true
            });
        })
    }
    catch (err) {
    }
}


const setDeleteCustomer = async (customerID, fName, lName) => {
    try {
        let cf = confirm("ยืนยันการลบข้อมูล Customer : " + fName + " " + lName);
        if (cf == true) {
            let response = await fetch('model/apiSetDeleteCustomer.php', {
                method: "POST",
                body: JSON.stringify({
                    customerID: customerID,
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            let result = await response.text();
            if (response.status == 200) {
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

const getShowModalCustomer = async (ticketCode) => {
    try {
        let response = await fetch('model/apiGetCustomer.php', {
            method: "POST",
            body: JSON.stringify({ ticketCode: ticketCode }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        let json = await response.json();
        document.getElementById('text-fname').value = json[0].cust_first_name;
        document.getElementById('text-lname').value = json[0].cust_last_name;
        document.getElementById('text-gender').value = json[0].gender;
        document.getElementById('text-phone').value = json[0].phone_number;
        document.getElementById('text-registerDate').value = json[0].register_time;
        document.getElementById('text-count').value = json[0].count;
        document.getElementById('btn-saveEdit').setAttribute('onclick', 'setEditCustomer(' + json[0].customer_id + ')')

        $("#dialogListCustomer").modal({ backdrop: 'static', keyboard: false });
    } catch (err) {
        alert("a" + err)
        location.reload();
    }
}

const setEditCustomer = async (customerID) => {
    try {
        let fname = document.getElementById('text-fname').value;
        let lname = document.getElementById('text-lname').value;
        let gender = document.getElementById('text-gender').value;
        let phone = document.getElementById('text-phone').value;
        let registerDate = document.getElementById('text-registerDate').value;
        let count = document.getElementById('text-count').value;
        let checkDate = new Date(registerDate).getMonth();
        if (isNaN(checkDate) == true) return alert('Date มีข้อผิดพลาด')

        let response = await fetch('model/apiSetCustomer.php', {
            method: "POST",
            body: JSON.stringify({
                customerID: customerID,
                fname: fname,
                lname: lname,
                gender: gender,
                phone: phone,
                registerDate: registerDate,
                count: count
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        let json = await response.text();
        alert(json)
        $("#dialogListCustomer").modal('hide');
        location.reload()
        // getShowCustomerEdit();
    } catch (err) {
        alert("Error set edit customer : " + err)
    }
}

const setCheckInTicketCode = async (ticketID) => {
    try {
        let response = await fetch('model/apiSetCheckIn.php', {
            method: "POST",
            body: JSON.stringify({
                ticketID: ticketID
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    } catch (err) {
        alert('เกิดข้อผิดพลาด' + err)
        return false;
    }
}