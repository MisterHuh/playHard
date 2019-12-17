<?php

print("hello world 1");

require_once("functions.php");
require_once("db_connection.php");
set_exception_handler("error_handler");
startUp();

$bodyData = getBodyData();

// var_dump($bodyData["category"]);
// var_dump($bodyData);

print("hello world 2");

/* not necessary, because these are dropdown and have default value */
if ($bodyData["date"]) {
  $date = $bodyData["date"];
} else {
  throw new Exception("date required");
};

/* not necessary, because these are dropdown and have default value */
if ($bodyData["category"]) {
  $category = $bodyData["category"];
} else {
  throw new Exception("category required");
};

/* not necessary, because these are dropdown and have default value */
if ($bodyData["subCategory"]) {
  $subCategory = $bodyData["subCategory"];
} else {
  throw new Exception("subCategory required");
};

/* not necessary, because these are dropdown and have default value */
if ($bodyData["cc"]) {
  $cc = $bodyData["cc"];
} else {
  throw new Exception("cc required");
};

/* input */
if ($bodyData["amount"]) {
  $amount = $bodyData["amount"];
  if (gettype($amount) !== "number") {
    throw new Exception("amount cannot contain a letter");
  };
} else {
  throw new Exception("amount required");
};

/* input */
if ($bodyData["where"]) {
  $where = $bodyData["where"];
} else {
  throw new Exception("where required");
};

/* input */
if ($bodyData["notes"]) {
  $notes = $bodyData["notes"];
} else {
  $notes = "";
  // throw new Exception("notes required");
};

$query = "INSERT INTO `spendings`
          SET `date` = '$date',
              `category` = '$category',
              `subCategory` = '$subCategory',
              `cc` = '$cc',
              `amount` = '$amount',
              `store` = '$store',
              `notes` = '$notes'";

$result = mysqli_query($conn, $query);

if (!$result) {
  throw new Exception("error with query " . mysqli_error($conn));
}


?>
