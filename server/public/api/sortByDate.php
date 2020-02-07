<?php

require_once("functions.php");
require_once("db_connection.php");
set_exception_handler("error_handler");
startUp();

// echo "sortByDate.php fired";

$item = file_get_contents('php://input');
$jsonBody = getBodyData();

// echo "before jsonBody function to grab query";

if ($jsonBody["query"]) {
  return $query = $jsonBody["query"];
} else {
  throw new Exception("query required");
};

// echo "got the query";
// var_dump($query);

// if ($category == "All") {
//   $query = "SELECT * FROM `2020`
// 	        WHERE Date between '$startDate' and '$endDate'
//           ORDER BY date DESC";
// } else {
//   $query = "SELECT * FROM `2020`
// 	        WHERE `category` = '$category'
// 	        and Date between '$startDate' and '$endDate'
// 	        ORDER BY date DESC";
// }

// $query = "SELECT * FROM `2020` ORDER BY DATE ASC";


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
