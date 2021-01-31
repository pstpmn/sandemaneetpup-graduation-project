const getDetailCustomerFromTicketCode = async (ticketCode) => {
    try {
        let response = await fetch('model/apiGetTicket.php', {
            method: "POST",
            body: JSON.stringify({ ticketCode: ticketCode }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        let json = await response.json();
        document.getElementById('fristName-label').setAttribute('onclick','getDialogListCustomerFromSlip("'+ticketCode+'")');
        // document.getElementById('lastName-label').innerHTML = json[0].cust_last_name;
        // document.getElementById('phone-label').innerHTML = json[0].phone_number;
        document.getElementById('ticketCode-label').innerHTML = json[0].ticket_code;
        document.getElementById('ticketType-label').innerHTML = json[0].ticket_category_name;
        document.getElementById('employee-label').innerHTML = json[0].username;
        // document.getElementById('numberSeat-label').innerHTML = json[0].boat_seat_number;
        // document.getElementById('numberSeat-label').innerHTML = json[0].boat_seat_number;
        document.getElementById('numbetBoat-label').innerHTML = json[0].boat_number;
        // document.getElementById('seatType-label').innerHTML = json[0].boat_seat_type;
        // document.getElementById('floor-label').innerHTML = json[0].floor;
        document.getElementById('travel-label').innerHTML = getFormatYearDMY(json[0].travel_date);
        document.getElementById('buyTime-label').innerHTML = getFormatYearDMYHIS(json[0].time_buy_ticket);

        $('#dialog-cancelTicket').modal({ backdrop: 'static', keyboard: false });
    } catch (err) {
        alert("ค้นหาไม่พบ Ticket Code นี้")
    }

}

const setCancelTicket = async (ticketCode) => {
    try {
        let cf = confirm('ยืนยันการยกเลิกตั๋ว : ' + ticketCode)
        if (cf == true) {
            let response = await fetch('model/apiSetCancelTicket.php', {
                method: "POST",
                body: JSON.stringify({ ticketCode: ticketCode }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            let json = await response.json();
            location.reload();
        }
    }
    catch (err) {
        alert(err)
    }
}