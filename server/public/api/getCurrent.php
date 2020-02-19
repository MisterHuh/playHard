<?php

require_once("functions.php");
require_once("db_connection.php");
set_exception_handler("error_handler");
startUp();

$query = "SELECT * FROM `2020`
            -- WHERE YEARWEEK(date)=YEARWEEK(NOW())
            WHERE date BETWEEN 2020-02-02 and 2020-02-08
            ORDER BY date ASC";

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
