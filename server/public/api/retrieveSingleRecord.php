<?php

require_once("pdo.php");
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
<<<<<<< HEAD
print(json_encode($singleRecord));

// $query = "SELECT * FROM `2020` WHERE id = ?";
// $stmt = $pdo->prepare($query);
// $stmt->execute([$id]);
// $result = $stmt->fetch();
// $test = json_encode($result);
=======
print (json_encode($singleRecord));

// $query = "SELECT * FROM `2020` WHERE id = ?";
// $stmt = $pdo->prepare($query);
// $stmt -> execute([$id]);
// $result = $stmt->fetch();
// $test = json_encode($result);

// return $test;
>>>>>>> 17c0ec503e35c94af08cd17e5792c4c963a5f440
// var_dump($test);
