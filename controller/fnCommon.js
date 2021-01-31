const getListCountFloor = async (boatNumber) => {
    try {
        listCountFloor = [];
        let responseFloor = await fetch('model/apiGetFloorBoat.php', {
            method: "POST",
            body: JSON.stringify({ boatNumber: boatNumber }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        let jsonFloor = await responseFloor.json();
        listFloorData = jsonFloor;
        return jsonFloor;
    } catch (error) {

    }
}

const getLocation = async () => {
    try {
        const response = await fetch('model/apiLocation.php', {
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const json = await response.json();
        return json;
    } catch (error) {
        return error;
    }
}



const getFormatYearDMY = (date) => {
    let dmy = new Date(date);
    return dmy.getDate() + "/" + ((dmy.getMonth()) + 1) + "/" + dmy.getFullYear();
}

const getFormatHI = (time) => {
    let timeHI = new Date("2020-01-01 "+time);
    return timeHI.getHours() + ":" + timeHI.getMinutes() +" น.";
}

const getFormatYearDMYHIS = (date) => {
    let dmyhis = new Date(date);
    return dmyhis.getDate() + "/" + ((dmyhis.getMonth()) + 1) + "/" + dmyhis.getFullYear() + " " + dmyhis.getHours() + ":" + dmyhis.getMinutes() + ":" + dmyhis.getSeconds();
}

const CheckDayOff = async (date) => {
    try {
        let makeObjectDate = new Date(date);
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let dayName = days[makeObjectDate.getDay()];
        let response = await fetch('model/apiGetDayOff.php', {
            method: "POST",
            body: JSON.stringify({
                date: date,
                dayName: dayName
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        let json = await response.json();
        alert("ปิดการใช้งานวันที่ลูกค้าเลือก สาเหตุ : " + json[0].dayOff_cause)
        return true;
    } catch (err) {
        return false;
    }
}

const getConvertDateMonthYear = (date) => {
    try {
        let dateConvert = new Date(date);
        let day = dateConvert.getDate();
        let month = dateConvert.getMonth();
        if (dateConvert.getDate() < 10) {
            day = "0" + dateConvert.getDate();
        }
        if (dateConvert.getMonth() < 10) {
            month = "0" + (dateConvert.getMonth() + 1);
        }
        return dateConvert.getFullYear() + "-" + month + "-" + day;
    } catch (err) {
        return "Error ConvertDate : " + err;
    }
}

const getConvertYMDHIS = (date) => {
    try {
        let dateConvert = new Date(date);
        let day = dateConvert.getDate();
        let month = dateConvert.getMonth();
        let hours = dateConvert.getHours();
        let minutes = dateConvert.getMinutes();
        let seconds = dateConvert.getSeconds();
        if (dateConvert.getDate() < 10) {
            day = "0" + dateConvert.getDate();
        }
        if (dateConvert.getMonth() < 10) {
            month = "0" + (dateConvert.getMonth() + 1);
        }
        if (dateConvert.getHours() < 10) {
            hours = "0" + (dateConvert.getHours().toString())
        }
        if (dateConvert.getMinutes() < 10) {
            minutes = "0" + (dateConvert.getMinutes()).toString();
        }
        if (dateConvert.getSeconds() < 10) {
            seconds = "0" + (dateConvert.getSeconds()).toString();
        }
        return dateConvert.getFullYear() + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    } catch (err) {
        return "Error ConvertDate : " + err;
    }
}


const validateDeadline = (current, deadline) => {

    if (current.getYear() < deadline.getYear()) {
        return true;
    }

    else if (current.getYear() > deadline.getYear()) {
        return false;
    }


    if (current.getMonth() < deadline.getMonth()) {
        return true;
    }
    else if (current.getMonth() > deadline.getMonth()) {
        return false;
    }

    if (current.getDate() < deadline.getDate()) {
        return true;
    }

    else if (current.getDate() > deadline.getDate()) {
        return false;
    }

    if (current.getHours() < deadline.getHours()) {
        return true;
    }
    else if (current.getHours() > deadline.getHours()) {
        return false;
    }

    if (current.getMinutes() < deadline.getMinutes()) {
        return true;
    }
    if (current.getMinutes() > deadline.getMinutes()) {
        return false;
    }
    return false;
}

const getRefreshPage = () => {
    location.reload();
}