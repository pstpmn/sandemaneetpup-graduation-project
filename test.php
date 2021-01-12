<!DOCTYPE html>
<html>

<body>

    <?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "project_db";

    $array = array();
    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    $sql = "SELECT * FROM buy_ticket where ticket_code = '664962787'";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        // output data of each row
        while ($row = mysqli_fetch_assoc($result)) {
            echo "id: " . $row["buy_ticket_id"] . " - Name: " . $row["buy_ticket_id"] . " " . $row["buy_ticket_id"] . "<br>";
            array_push($array,$row["buy_ticket_id"]);
        }

        echo"<br> ".count($array);
    } else {
        echo "0 results";
    }

    mysqli_close($conn);
    ?>

</body>

</html>