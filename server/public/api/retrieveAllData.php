<?php

require_once("functions.php");
require_once("db_connection.php");
set_exception_handler("error_handler");
startUp();

$query = "SELECT * FROM `2020` ORDER BY date DESC";

$result = mysqli_query($conn, $query);

if (!$result) {
  throw new Exception('error with query: ' . mysqli_error($conn));
};


$allData = [];

// $allData[] = [
//   "query" => $query
// ];

while ($row = mysqli_fetch_assoc($result)) {
  $allData[] = $row;
};

if ($allData === []) {
  print("[]");
  exit();
} else {
  print(json_encode($allData));
};

?>
