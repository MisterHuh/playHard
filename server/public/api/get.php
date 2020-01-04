<?php

require_once("functions.php");
require_once("db_connection.php");
set_exception_handler("error_handler");
startUp();

$sunday = date('Y-m-d', strtotime('sunday this week'));
print($sunday);

$query =  "SELECT * FROM spendings ORDER BY date ASC";

$result = mysqli_query($conn, $query);

if (!$result) {
  throw new Exception('error with query: ' . mysqli_error($conn));
};

$output = [];
while ($row = mysqli_fetch_assoc($result)) {
  $output[] = $row;
};

if ($output === []) {
  print("[]");
  exit();
} else {
  print(json_encode($output));
}


?>
