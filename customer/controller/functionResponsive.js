const getSelectLocationForResponsive = async() => {
    let location = await getLocation();
    const LOCATIONDATA = location;
    const SELECTLOCATIONSTART = document.getElementById('select-Location_start-responsive');
    const SELECTLOCATIONEND = document.getElementById('select-Location_end-responsive');


    for (let count = 0; count < location.length; count++) {
        SELECTLOCATIONSTART.innerHTML += "<option value=" + LOCATIONDATA[count].location_id + ">" + LOCATIONDATA[count].location_name + "</option>"
        SELECTLOCATIONEND.innerHTML += "<option value=" + LOCATIONDATA[count].location_id + ">" + LOCATIONDATA[count].location_name + "</option>"

    }
}


const getSearchBoatForResponsive = async(origin, destination) => {
    let boatNumber = document.getElementById('boat-number-responsive');

    if (origin == destination) {
        alert('ต้นทาง และปลายทาง เหมือนกัน !!')
        return;
    }

    let responseOrigin = await fetch('model/apiSearchBoat.php', {
        method: "POST",
        body: JSON.stringify({ location: origin }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    let jsonOrgin = await responseOrigin.json();


    let responseDestination = await fetch('model/apiSearchBoat.php', {
        method: "POST",
        body: JSON.stringify({ location: destination }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    let jsonDestination = await responseDestination.json();

    boatNumber.innerHTML = "";
    for (let countMax = 0; countMax < jsonOrgin.length; countMax++) {
        for (let countMin = 0; countMin < jsonDestination.length; countMin++) {
            if (jsonOrgin[countMax].boat_number == jsonDestination[countMin].boat_number &&
                (jsonOrgin[countMax].start_time != null && jsonDestination[countMin].start_time != null)
                && (jsonOrgin[countMax].boat_schedule_id < jsonDestination[countMin].boat_schedule_id)) {
                boatNumber.innerHTML += "<option value=" + jsonOrgin[countMax].boat_number + " >หมายเลขเรือ : " + jsonOrgin[countMax].boat_number + "  เวลา : " + jsonOrgin[countMax].start_time.substring(0, 5) + " - " + jsonDestination[countMin].start_time.substring(0, 5) + " น. (รอบเรือเดินทางไป) </option>";
            }
            else if (jsonOrgin[countMax].boat_number == jsonDestination[countMin].boat_number &&
                (jsonOrgin[countMax].return_time != null && jsonDestination[countMin].return_time != null)
                && (jsonOrgin[countMax].boat_schedule_id < jsonDestination[countMin].boat_schedule_id)) {
                boatNumber.innerHTML += "<option value=" + jsonOrgin[countMax].boat_number + " >หมายเลขเรือ : " + jsonOrgin[countMax].boat_number + "  เวลา : " + jsonOrgin[countMax].return_time.substring(0, 5) + " - " + jsonDestination[countMin].return_time.substring(0, 5) + " น. (รอบเรือเดินทางกลับ) </option>";
            }
        }
    }
    
    // let boatNumber = document.getElementById('boat-number-responsive');

    // if (origin == destination) {
    //     alert('ต้นทาง และ ปลายทาง เหมือนกัน !!')
    //     return;
    // }

    // let responseOrigin = await fetch('model/apiSearchBoat.php', {
    //     method: "POST",
    //     body: JSON.stringify({ location: origin }),
    //     headers: {
    //         "Content-type": "application/json; charset=UTF-8"
    //     }
    // });
    // let jsonOrgin = await responseOrigin.json();


    // let responseDestination = await fetch('model/apiSearchBoat.php', {
    //     method: "POST",
    //     body: JSON.stringify({ location: destination }),
    //     headers: {
    //         "Content-type": "application/json; charset=UTF-8"
    //     }
    // });
    // let jsonDestination = await responseDestination.json();

    // let maxResponse;
    // let minResponse;


    // if (jsonOrgin.length == jsonDestination.length) {
    //     maxResponse = jsonOrgin;
    //     minResponse = jsonDestination;
    // } else if (jsonOrgin.length > jsonDestination.length) {
    //     maxResponse = jsonOrgin;
    //     minResponse = jsonDestination;

    // } else {
    //     maxResponse = jsonDestination;
    //     minResponse = jsonOrgin;
    // }

    // boatNumber.innerHTML = "";
    // for (let countMax = 0; countMax < maxResponse.length; countMax++) {
    //     for (let countMin = 0; countMin < minResponse.length; countMin++) {
    //         if (maxResponse[countMax].boat_number == minResponse[countMin].boat_number) {
    //             boatNumber.innerHTML += "<option value=" + maxResponse[countMax].boat_number + " >หมายเลขเรือ : " + maxResponse[countMax].boat_number + "  เวลา : " + maxResponse[countMax].start_time + " - " + minResponse[countMin].return_time + " </option>";
    //         };
    //     }
    // }
}