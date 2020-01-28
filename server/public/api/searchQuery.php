<?php

require_once("functions.php");
require_once("db_connection.php");
set_exception_handler("error_handler");
startUp();

// $item = file_get_contents('php://input');
$jsonBody = getBodyData();

/* this is the category query for all 4 GET requests */
if ($jsonBody["category"]) {
  $category = $jsonBody["category"];
} else {
  throw new Exception("category required");
};

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
	        WHERE `category` = '$category'
	        and Date between '$startDate' and '$endDate'
	        ORDER BY date ASC";

$result = mysqli_query($conn, $query);

if (!$result) {
  throw new Exception('error with query: ' . mysqli_error($conn));
};

$spendingsData = [];
while ($row = mysqli_fetch_assoc($result)) {
  $spendingsData[] = $row;
};

if ($spendingsData === []) {
  print("[]");
  exit();
} else {
  print(json_encode($spendingsData));
};
