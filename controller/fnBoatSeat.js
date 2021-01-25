const getBottomBoatSeatData = async (boatNumber, date, ticketCode) => {
    try {
        const response = await fetch('model/apiBoatSeat.php', {
            method: "POST",
            body: JSON.stringify({ boatNumber: boatNumber }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const contentLength = response.headers.get('content-length');
        const json = await response.json();
        document.getElementById("rightBottom").innerHTML = "";
        document.getElementById("leftBottom").innerHTML = "";
        document.getElementById("rightBottom").innerHTML += '<td bgcolor="#fff"><center>Right</center></td>';
        document.getElementById("leftBottom").innerHTML += '<td bgcolor="#fff"><center>Left</center></td>';
        let countR = 0;
        let countL = 0;
        for (let i = 0; i < json.length; i++) {
            if (json[i].floor == 'B' && json[i].boat_seat_type == 'R') {
                document.getElementById("rightBottom").innerHTML += '<td  id=' + json[i].boat_seat_id + '  >' + json[i].boat_seat_number + '</td>'
                document.getElementById(json[i].boat_seat_id).setAttribute('onclick', 'checkBoatSeat(' + json[i].boat_seat_id + ',' + json[i].boat_seat_number + ')');
                countR ++ ;
            }
            else if (json[i].floor == 'B' && json[i].boat_seat_type == 'L') {
                document.getElementById("leftBottom").innerHTML += '<td  id=' + json[i].boat_seat_id + '>' + json[i].boat_seat_number + '</td>'
                document.getElementById(json[i].boat_seat_id).setAttribute('onclick', 'checkBoatSeat(' + json[i].boat_seat_id + ',' + json[i].boat_seat_number + ')');
                countL ++ ;
            }
        }

        //จัดการตำแหน่งที่นั่งให้เท่ากัน
        if(countR > countL){
            let difCount = countR - countL;
            for(let i = 0;i<difCount;i++){
                document.getElementById("leftBottom").innerHTML += "<td bgcolor='white'></td>";
            } 
        }
        else if(countL > countR){
            let difCount = countL - countR;
            for(let i = 0;i<difCount;i++){
                document.getElementById("rightBottom").innerHTML += "<td bgcolor='white'></td>";
            } 
        }
       

        document.getElementById("rightBottom").innerHTML += '<td bgcolor="#fff"><center>Right</center></td>';
        document.getElementById("leftBottom").innerHTML += '<td bgcolor="#fff"><center>Left</center></td>';
        let dateToSeat = date;
        await getBottomBoatSeatStatus(dateToSeat, boatNumber, ticketCode);
    } catch (err) {
        alert('Error Get Bottom Boat Seat : ' + err)
    }
}


const getTopBoatSeatData = async (boatNumber, date, ticketCode) => {
    try {
        const response = await fetch('model/apiBoatSeat.php', {
            method: "POST",
            body: JSON.stringify({ boatNumber: boatNumber }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const json = await response.json();
        document.getElementById("rightTop").innerHTML = "";
        document.getElementById("leftTop").innerHTML = "";
        document.getElementById("rightTop").innerHTML += '<td bgcolor="#fff"><center>Right</center></td>';
        document.getElementById("leftTop").innerHTML += '<td bgcolor="#fff"><center>Left</center></td>';
        let countR = 0;
        let countL = 0;

        for (let i = 0; i < json.length; i++) {
            if (json[i].floor == 'T' && json[i].boat_seat_type == 'R') {
                document.getElementById("rightTop").innerHTML += '<td id=' + json[i].boat_seat_id + '>' + json[i].boat_seat_number + '</td>'
                document.getElementById(json[i].boat_seat_id).setAttribute('onclick', 'checkBoatSeat(' + json[i].boat_seat_id + ',' + json[i].boat_seat_number + ')');
                countR ++ ;
            }
            else if (json[i].floor == 'T' && json[i].boat_seat_type == 'L') {
                document.getElementById("leftTop").innerHTML += '<td id=' + json[i].boat_seat_id + '>' + json[i].boat_seat_number + '</td>'
                document.getElementById(json[i].boat_seat_id).setAttribute('onclick', 'checkBoatSeat(' + json[i].boat_seat_id + ',' + json[i].boat_seat_number + ')');
                countL ++;
            }
        }

        if(countR > countL){
            let difCount = countR - countL;
            for(let i = 0;i<difCount;i++){
                document.getElementById("leftTop").innerHTML += "<td bgcolor='white'></td>";
            } 
        }
        else if(countL > countR){
            let difCount = countL - countR;
            for(let i = 0;i<difCount;i++){
                document.getElementById("rightTop").innerHTML += "<td bgcolor='white'></td>";
            } 
        }
        document.getElementById("rightTop").innerHTML += '<td bgcolor="#fff"><center>Right</center></td>';
        document.getElementById("leftTop").innerHTML += '<td bgcolor="#fff"><center>Left</center></td>';
        let dateToSeat = date;
        await getTopBoatSeatStatus(dateToSeat, boatNumber, ticketCode);
    } catch (err) {
        // alert("Error Top boat seat : " + err)
    }
}