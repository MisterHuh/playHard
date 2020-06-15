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

$query = "DELETE FROM `2020` WHERE id = " . $id;

$result = mysqli_query($conn, $query);

if (!$result) {
  throw new Exception('error with query: ' . mysqli_error($conn));
};
