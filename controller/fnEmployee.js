const getListEmployee = async () => {
    try {
        let response = await fetch('model/apiGetEmployeeAll.php');
        let tbodyTable = document.getElementById('table-ticket-edit');
        if (response.status == 200) {
            let json = await response.json();
            for (let i = 0; i < json.length; i++) {
                tbodyTable.innerHTML += "<tr><td>" + (i + 1) + "</td> <td>" + json[i].username + "</td>"
                    + "<td>" + json[i].password + "</td> <td>" + json[i].emp_first_name + "</td> <td>" + json[i].emp_last_name + "</td> "
                    + " <td>" + json[i].gender + "</td> <td>" + json[i].employee_category_name + "</td>"
                    + " <td><button id='btnEdit-" + i + "' class='btn btn-warning'>แก้ไข</button>  <button  id='btnDelte-" + i + "'  class='btn btn-danger'>ลบ</button> </td></tr>"
                document.getElementById('btnEdit-' + i).setAttribute('onclick', 'getShowModalEditEmp("' + json[i].employee_id + '","' + json[i].username + '","' + json[i].password + '"'
                    + ',"' + json[i].emp_first_name + '","' + json[i].emp_last_name + '","' + json[i].gender + '",' + json[i].employee_category_id + ')');
                document.getElementById('btnDelte-' + i).setAttribute('onclick', 'setDelectEmployee("' + json[i].username + '")');
            }
        }

        $(document).ready(function () {
            $('#dataTable-employee').dataTable({
                "lengthChange": false
            });
        })
    } catch (err) {
        alert("Error manage employee system : " + err);
    }
}


const setDelectEmployee = async (UserEmp) => {
    try {
        let cf = confirm('ยืนยันลบพนักงาน : ' + UserEmp);
        if (cf == true) {
            let response = await fetch('model/apiSetDeleteEmp.php', {
                method: "POST",
                body: JSON.stringify({
                    UserEmp: UserEmp
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

const getShowModalEditEmp = async (id, user, pass, fname, lname, gender, category) => {
    document.getElementById('text-id').value = id;
    document.getElementById('text-user').value = user;
    document.getElementById('text-pass').value = pass;
    document.getElementById('text-fname').value = fname;
    document.getElementById('text-lname').value = lname;
    document.getElementById('select-gender').value = gender;
    document.getElementById('select-category').value = category;
    setBtnEditEmp();
    await $('#modal-Employee').modal();
}


const getEmpCategory = async () => {
    try {
        let response = await fetch('model/apiGetEmpCategory.php');
        let node = document.createElement("select");
        node.setAttribute('id', 'select-category')
        if (response.status == 200) {
            let json = await response.json();
            for (let i = 0; i < json.length; i++) {
                let option = document.createElement("option");
                option.value = json[i].employee_category_id;
                option.text = json[i].employee_category_name;
                node.appendChild(option);
            }
            document.getElementById('contrainer-category').appendChild(node)

        }
    } catch (err) {
        alert('Error emp category : ' + err)
    }
}

const setEditEmp = async () => {
    let id = document.getElementById('text-id').value;
    let user = document.getElementById('text-user').value;
    let pass = document.getElementById('text-pass').value;
    let fname = document.getElementById('text-fname').value;
    let lname = document.getElementById('text-lname').value;
    let gender = document.getElementById('select-gender').value;
    let categoryEmp = document.getElementById('select-category').value;
    try {
        let response = await fetch('model/apiSetEmployee.php', {
            method: "POST",
            body: JSON.stringify({
                id: id,
                user: user,
                pass: pass,
                fname: fname,
                lname: lname,
                gender: gender,
                categoryEmp: categoryEmp
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

const getShowModalAddEmp = async () => {
    document.getElementById('text-id').value = "";
    document.getElementById('text-user').value = "";
    document.getElementById('text-pass').value = "";
    document.getElementById('text-fname').value = "";
    document.getElementById('text-lname').value = "";

    document.getElementById('header-Employee').innerHTML = 'เพิ่มข้อมูลพนักงาน';
    document.getElementById('btnSaveEdit').innerHTML = 'Save';
    document.getElementById('btnSaveEdit').setAttribute('onclick', 'setAddEmp()');
    await $('#modal-Employee').modal();
}

const setAddEmp = async () => {
    let user = document.getElementById('text-user').value;
    let pass = document.getElementById('text-pass').value;
    let fname = document.getElementById('text-fname').value;
    let lname = document.getElementById('text-lname').value;
    let gender = document.getElementById('select-gender').value;
    let categoryEmp = document.getElementById('select-category').value;

    if (user == "") {
        alert('กรุณาพิมพ์ Username')
        return;
    }
    if (pass == "") {
        alert('กรุณาพิมพ์ Password')
        return;
    }
    if (fname == "") {
        alert('กรุณาพิมพ์ First Name')
        return;
    }
    if (lname == "") {
        alert('กรุณาพิมพ์ Last Name')
        return;
    }

    try {
        let response = await fetch('model/apiSetAddEmp.php', {
            method: "POST",
            body: JSON.stringify({
                user: user,
                pass: pass,
                fname: fname,
                lname: lname,
                gender: gender,
                categoryEmp: categoryEmp
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
                alert("เกิดข้อผิดพลาดในการเพิ่มพนักงาน");
            }
        }
    } catch (err) {
        alert('Error add Employee : ' + err)
    }
}


const setBtnEditEmp = () => {
    document.getElementById('header-Employee').innerHTML = 'แก้ไขข้อมูลพนักงาน';
    document.getElementById('btnSaveEdit').innerHTML = 'Edit';
    document.getElementById('btnSaveEdit').setAttribute('onclick', 'setEditEmp()');
}