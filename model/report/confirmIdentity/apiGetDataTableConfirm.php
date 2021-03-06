<?php
require '../../../controller/database.php';
require '../../confix.php';

$database = new database(IP, DBNAME, USER, PASS);
$input = json_decode(file_get_contents('php://input'), true);



if ($input['btnType'] == "year") {
    $qeueryData = $database->select("SELECT buy_ticket.ticket_code , customer.cust_first_name , customer.cust_last_name, ticket_category.ticket_category_name
    from buy_ticket
    join ticket_book on ticket_book.ticket_book_id = buy_ticket.ticket_book_id
    join ticket_category on ticket_book.ticket_category_id = ticket_category.ticket_category_id
    join customer on buy_ticket.customer_id = customer.customer_id
    where year(time_buy_ticket) = '" . $input['date'] . "' and (buy_ticket.check_in is not null OR buy_ticket.check_out is not null)
    ORDER BY  year(time_buy_ticket) ASC");
} else if ($input['btnType'] == "month") {
    $qeueryData = $database->select("SELECT buy_ticket.ticket_code , customer.cust_first_name , customer.cust_last_name, ticket_category.ticket_category_name
    from buy_ticket
    join ticket_book on ticket_book.ticket_book_id = buy_ticket.ticket_book_id
    join ticket_category on ticket_book.ticket_category_id = ticket_category.ticket_category_id
    join customer on buy_ticket.customer_id = customer.customer_id
    where (time_buy_ticket LIKE '" . $input['fullDate'] . "%') and MONTH(time_buy_ticket) = '" . $input['date'] . "' and (buy_ticket.check_in is not null OR buy_ticket.check_out is not null)");
} else if ($input['btnType'] == "week") {
    if ($input['date'] == 1) {
        $qeueryData = $database->select("SELECT buy_ticket.ticket_code , customer.cust_first_name , customer.cust_last_name, ticket_category.ticket_category_name
    from buy_ticket
    join ticket_book on ticket_book.ticket_book_id = buy_ticket.ticket_book_id
    join ticket_category on ticket_book.ticket_category_id = ticket_category.ticket_category_id
    join customer on buy_ticket.customer_id = customer.customer_id
    where (time_buy_ticket LIKE '" . $input['fullDate'] . "%') and (DAY(time_buy_ticket) >= 1 AND DAY(time_buy_ticket) <= 7) and (buy_ticket.check_in is not null OR buy_ticket.check_out is not null)");
    } else if ($input['date'] == 2) {
        $qeueryData = $database->select("SELECT buy_ticket.ticket_code , customer.cust_first_name , customer.cust_last_name, ticket_category.ticket_category_name
        from buy_ticket
        join ticket_book on ticket_book.ticket_book_id = buy_ticket.ticket_book_id
        join ticket_category on ticket_book.ticket_category_id = ticket_category.ticket_category_id
        join customer on buy_ticket.customer_id = customer.customer_id
        where (time_buy_ticket LIKE '" . $input['fullDate'] . "%') and (DAY(time_buy_ticket) >= 8 AND DAY(time_buy_ticket) <= 14) and (buy_ticket.check_in is not null OR buy_ticket.check_out is not null)");
    } else if ($input['date'] == 3) {
        $qeueryData = $database->select("SELECT buy_ticket.ticket_code , customer.cust_first_name , customer.cust_last_name, ticket_category.ticket_category_name
        from buy_ticket
        join ticket_book on ticket_book.ticket_book_id = buy_ticket.ticket_book_id
        join ticket_category on ticket_book.ticket_category_id = ticket_category.ticket_category_id
        join customer on buy_ticket.customer_id = customer.customer_id
        where (time_buy_ticket LIKE '" . $input['fullDate'] . "%') and (DAY(time_buy_ticket) >= 15 AND DAY(time_buy_ticket) <= 21) and (buy_ticket.check_in is not null OR buy_ticket.check_out is not null)");
    } else if ($input['date'] == 4) {
        $qeueryData = $database->select("SELECT buy_ticket.ticket_code , customer.cust_first_name , customer.cust_last_name, ticket_category.ticket_category_name
        from buy_ticket
        join ticket_book on ticket_book.ticket_book_id = buy_ticket.ticket_book_id
        join ticket_category on ticket_book.ticket_category_id = ticket_category.ticket_category_id
        join customer on buy_ticket.customer_id = customer.customer_id
        where (time_buy_ticket LIKE '" . $input['fullDate'] . "%') and (DAY(time_buy_ticket) >= 22 AND DAY(time_buy_ticket) <= 28) and (buy_ticket.check_in is not null OR buy_ticket.check_out is not null)");
    } else if ($input['date'] == 5) {
        $qeueryData = $database->select("SELECT buy_ticket.ticket_code , customer.cust_first_name , customer.cust_last_name, ticket_category.ticket_category_name
        from buy_ticket
        join ticket_book on ticket_book.ticket_book_id = buy_ticket.ticket_book_id
        join ticket_category on ticket_book.ticket_category_id = ticket_category.ticket_category_id
        join customer on buy_ticket.customer_id = customer.customer_id
        where (time_buy_ticket LIKE '" . $input['fullDate'] . "%') and (DAY(time_buy_ticket) >= 29 AND DAY(time_buy_ticket) <= 31) and (buy_ticket.check_in is not null OR buy_ticket.check_out is not null)");
    }
} else if ($input['btnType'] == "day") {
    $qeueryData = $database->select("SELECT buy_ticket.ticket_code , customer.cust_first_name , customer.cust_last_name, ticket_category.ticket_category_name
    from buy_ticket
    join ticket_book on ticket_book.ticket_book_id = buy_ticket.ticket_book_id
    join ticket_category on ticket_book.ticket_category_id = ticket_category.ticket_category_id
    join customer on buy_ticket.customer_id = customer.customer_id
    where (time_buy_ticket LIKE '" . $input['fullDate'] . "%') and (DAY(time_buy_ticket) = '" . $input['date'] . "') and (buy_ticket.check_in is not null OR buy_ticket.check_out is not null)");
}
echo json_encode($qeueryData);
$pdo = null; //close connection