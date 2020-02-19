<?php

require_once("functions.php");
require_once("db_connection.php");
set_exception_handler("error_handler");
startUp();

$query = "SELECT * FROM `2020`
            WHERE date < DATE_ADD(CURDATE(), INTERVAL 7 DAY)
            -- WHERE YEARWEEK(date)=YEARWEEK(NOW())
            ORDER BY date ASC";

            // WHERE YEARWEEK(date) = YEARWEEK( DATESUB( NOW(), INTERVAL 1 WEEK))

//             "NOW()" back 1 week
// "DATE_SUB(NOW(), '1 week')


// $query = "SELECT * FROM `2020` WHERE YEARWEEK(date) = YEARWEEK( DATESUB( NOW(), INTERVAL 1 week)) ORDER BY date ASC";

$result = mysqli_query($conn, $query);

if (!$result) {
  throw new Exception('error with query: ' . mysqli_error($conn));
};

$currentData = [];
while ($row = mysqli_fetch_assoc($result)) {
  $currentData[] = $row;
};

if ($currentData === []) {
  print("[]");
  exit();
} else {
  print(json_encode($currentData));
};
