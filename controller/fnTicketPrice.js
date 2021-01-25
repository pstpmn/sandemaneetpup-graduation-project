const getListTicketPrice = async () => {
    try {
        let response = await fetch('model/apiGetTicketCatagory.php');
        let tbodyTable = document.getElementById('table-ticketPrice');
        if (response.status == 200) {
            let json = await response.json();
            for (let i = 0; i < json.length; i++) {
                tbodyTable.innerHTML += "<tr><td>" + (i + 1) + "</td>"
                    + "<td>" + json[i].ticket_category_name + "</td>"
                    + "<td>" + json[i].ticket_category_price + "</td>"
                    + "<td><button id='btnEdit-" + i + "' class='btn btn-warning'>เปลียนราคา</button> "
                    + "</tr>"
                document.getElementById('btnEdit-' + i).setAttribute('onclick', 'getShowModalEditTicketPrice("' + json[i].ticket_category_id + '","' + json[i].ticket_category_name + '",' + json[i].ticket_category_price + ')');
            }
        }
    } catch (err) {
        alert("Error manage boat system : " + err);
    }
}

const getShowModalEditTicketPrice = async (id, ticketCategory, ticketPrice) => {
    document.getElementById('text-ticketCategory').value = ticketCategory;
    document.getElementById('text-ticketPrice').value = ticketPrice;
    document.getElementById('btnSaveEdit').setAttribute('onclick', 'setUpdateTicketPrice(' + id + ')')
    $("#modal-ticketPrice").modal();
}

const setUpdateTicketPrice = async (id) => {
    try {
        let priceToUpdate = document.getElementById('text-ticketPrice').value;
        let response = await fetch('model/apiSetTicketPrice.php', {
            method: "POST",
            body: JSON.stringify({
                priceToUpdate: priceToUpdate,
                id: id
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        let json = await response.json();
        if(json == true){
            alert("แก้ไขเสร็จสิ้น")
            location.reload();
        }
        else{
            alert("เกิดข้อผิดพลาด")
        }
    } catch (err) {
        alert(err)
    }
}

