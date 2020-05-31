<?php

require_once("functions.php");
require_once("db_connection.php");
set_exception_handler("error_handler");
startUp();

// $query = "SELECT * FROM `2020`
//             -- WHERE YEARWEEK(date)=YEARWEEK(NOW())
//             WHERE
//             ORDER BY date DESC";


$query = "SELECT * FROM `2020`
WHERE date BETWEEN '2020-05-10' AND '2020-05-16'
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
