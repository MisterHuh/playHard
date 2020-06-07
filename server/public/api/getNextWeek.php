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
