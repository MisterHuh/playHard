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


$singleRecord = json_encode(mysqli_fetch_assoc($result));
echo $singleRecord;

// $query = "SELECT * FROM `2020` WHERE id = ?";
// $stmt = $PDO->prepare($query);
// $stmt -> execute($id);
// $result = $statement->fetch();

// echo $result;
