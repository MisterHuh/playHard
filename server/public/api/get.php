<?php

require_once("functions.php");
require_once("db_connection.php");
set_exception_handler("error_handler");
startUp();

// $sunday = date('Y-m-d', strtotime('sunday this week'));
// print("sunday is: " . $sunday);

$spndingQuery =  "SELECT * FROM spendings
                    WHERE YEARWEEK(date)=YEARWEEK(NOW())
                    ORDER BY date ASC";

$result = mysqli_query($conn, $spndingQuery);

if (!$result) {
  throw new Exception('error with query: ' . mysqli_error($conn));
};

$currentData = [];
while ($row = mysqli_fetch_assoc($result)) {
  $currentData[] = $row;
};

$creditsQuery =  "SELECT * FROM credits
                    WHERE YEARWEEK(date)=YEARWEEK(NOW())
                    ORDER BY date ASC";

$result = mysqli_query($conn, $creditsQuery);

if (!$result) {
  throw new Exception('error with query: ' . mysqli_error($conn));
};

while ($row = mysqli_fetch_assoc($result)) {
  $currentData[] = $row;
};

$fixedQuery =  "SELECT * FROM fixed
                    WHERE YEARWEEK(date)=YEARWEEK(NOW())
                    ORDER BY date ASC";

$result = mysqli_query($conn, $fixedQuery);

if (!$result) {
  throw new Exception('error with query: ' . mysqli_error($conn));
};

while ($row = mysqli_fetch_assoc($result)) {
  $currentData[] = $row;
};

if ($currentData === []) {
  print("[]");
  exit();
} else {
  print(json_encode($currentData));
}


?>
