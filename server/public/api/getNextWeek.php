<?php

require_once("functions.php");
require_once("db_connection.php");
set_exception_handler("error_handler");
startUp();

$jsonBody = getBodyData();

if ($jsonBody["startDate"]) {
  $startDate = $jsonBody["startDate"];
} else {
  throw new Exception("startDate required");
};

if ($jsonBody["endDate"]) {
  $endDate = $jsonBody["endDate"];
} else {
  throw new Exception("endDate required");
};

$query = "SELECT * FROM `2020`
	        WHERE date between '$startDate' and '$endDate'
          ORDER BY date DESC";

          echo $query;


// $query = "SELECT * FROM `2020`

//             -- WHERE YEARWEEK(`date`, 1) = YEARWEEK( CURDATE() - INTERVAL 1 WEEK, 1)
//             -- WHERE date < CURDATE() + INTERVAL 7 DAY
//             -- WHERE date < DATE_ADD(CURDATE(), INTERVAL 7 DAY)
//             -- WHERE YEARWEEK(date)=YEARWEEK(NOW())

//             WHERE date >= curdate() - INTERVAL DAYOFWEEK(curdate())+6 DAY
//             AND date < curdate() - INTERVAL DAYOFWEEK(curdate())-1 DAY

//             ORDER BY date DESC";

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
