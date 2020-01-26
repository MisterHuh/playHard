<?php

require_once("functions.php");
require_once("db_connection.php");
set_exception_handler("error_handler");
startUp();

$query = "SELECT * FROM `2020`
	        WHERE `category` = 'Fixed'
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
