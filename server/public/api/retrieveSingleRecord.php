<?php

require_once("functions.php");
require_once("db_connection.php");
set_exception_handler("error_handler");
startUp();

$bodyData = getBodyData();

if ($bodyData["id"]) {
  $id = $bodyData["id"];
} else {
  throw new Exception("id required");
};

$query = "SELECT * FROM `2020` WHERE id = " . $id;

$result = mysqli_query($conn, $query);

if (!$result) {
  throw new Exception('error with query: ' . mysqli_error($conn));
};


$singleRecord = mysqli_fetch_assoc($result);
echo "here";
print(json_encode($singleRecord));

// $currentData = [];
// while ($row = mysqli_fetch_assoc($result)) {
//   $currentData[] = $row;
// };

// if ($currentData === []) {
//   print("[]");
//   exit();
// } else {
//   print(json_encode($currentData));
// };
