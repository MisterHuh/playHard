<?php

require_once("functions.php");
require_once("db_connection.php");
set_exception_handler("error_handler");
startUp();

$bodyData = getBodyData();

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

/* inputs are sanitized on add.jsx & here as well. necessary to sanitize twice? */
if ($bodyData["amount"]) {
  $amount = $bodyData["amount"];
  if (!is_numeric($amount)) {
    throw new Exception("amount must be a number");
  };
} else {
  throw new Exception("amount required");
};

/* inputs are sanitized on add.jsx & here as well. necessary to sanitize twice? */
if ($bodyData["where"]) {
  $where = $bodyData["where"];
} else {
  throw new Exception("where required");
};

/* inputs are sanitized on add.jsx & here as well. necessary to sanitize twice? */
if ($bodyData["notes"]) {
  $notes = $bodyData["notes"];
} else {
  $notes = "";
};


$query = "INSERT INTO `2020`
          SET `date` = '$date',
              `category` = '$category',
              `subCategory` = '$subCategory',
              `cc` = '$cc',
              `amount` = '$amount',
              `store` = '$where',
              `notes` = '$notes'";

// $subQuery = "SET `date` = '$date',
//               `category` = '$category',
//               `subCategory` = '$subCategory',
//               `cc` = '$cc',
//               `amount` = '$amount',
//               `store` = '$where',
//               `notes` = '$notes'";

// switch($category) {
//   case "Spendings":
//     $query = "INSERT INTO `spendings` " . $subQuery;
//     break;
//   case "Fixed":
//     $query = "INSERT INTO `fixed` " . $subQuery;
//     break;
//   case "Credit":
//     $query = "INSERT INTO `credits` " . $subQuery;
//     break;
// }

$result = mysqli_query($conn, $query);

if (!$result) {
  throw new Exception("error with query " . mysqli_error($conn));
}


?>
