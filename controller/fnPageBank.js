const getModalAddBank = () => {
    $('#modal-bank').modal();
}

const getModalEditStatusBank = (id) => {
    let bankId = id;
    $('#modal-bank-status').modal();
    document.getElementById('btnSaveEdit').setAttribute("onclick", "setStatusBank(" + bankId + ")")
}

const setAddBank = async (bank, account, nameOwner, status) => {
    if (bank == "") return alert("โปรดใส่ข้อมูล Bank");
    else if (account == "") return alert("โปรดใส่ข้อมูล หมายเลขบัญชี");
    else if (nameOwner == "") return alert("โปรดใส่ข้อมูล ชื่อเจ้าของบัญชี");
    else if (status == "") return alert("โปรดใส่ข้อมูล สถานะบัญชี");

    try {
        let response = await fetch('model/bank/apiSetAddBank.php', {
            method: "POST",
            body: JSON.stringify({
                bank: bank,
                account: account,
                nameOwner: nameOwner,
                status: status
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        let json = await response.json();
        if (json == true) {
            alert("การเพิ่มบัญชีธนาคารสำเร็จ \nระบบจะทำการ Refrash หน้าเว็บหลังจากนี้ ...")
            location.reload();
        }
        else {
            alert("เกิดข้อผิดพลาดไม่สามารถเพิ่ม บัญชีธนาคารได้ !!")
        }
    }
    catch (err) {
        alert(err)
    }
}

const setStatusBank = async (bankId) => {
    let status = document.getElementById('text-edit-status').value;

    try {
        let response = await fetch('model/bank/apiSetUpdateStatusBank.php', {
            method: "POST",
            body: JSON.stringify({
                status: status,
                bankId: bankId
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        let json = await response.json();
        if (json == true) {
            alert("การเปลียนแปลงสำเร็จ \nระบบจะทำการ Refrash หน้าเว็บหลังจากนี้ ...")
            location.reload();
        }
        else {
            alert("เกิดข้อผิดพลาดไม่สามารถเปลียนแปลงได้ !!")
        }
    }
    catch (err) {
        alert(err)
    }
}

const setDeleteBank = async (bankId) => {
    try {
        let cf = confirm('ยืนยันการลบเลขบัญชี\nกด OK เมื่อต้องการจะลบ');
        if (cf == true) {
            let response = await fetch('model/bank/apiSetDeleteBank.php', {
                method: "POST",
                body: JSON.stringify({ bankId: bankId }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            let json = await response.json();
            if (json == true) {
                alert("การลบสำเร็จ \nระบบจะทำการ Refrash หน้าเว็บหลังจากนี้ ...")
                location.reload();
            }
            else {
                alert("เกิดข้อผิดพลาดไม่สามารถลบได้ !!")
            }
            location.reload();
        }
    }
    catch (err) {
        alert(err)
    }
}