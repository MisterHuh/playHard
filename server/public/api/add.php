<?php

// class CrashLanding
// {

//   public function __construct()
//   {
//     echo ("the constructor ran");
//   }

//   public function error_handler($error)
//   {
//     $output = array(
//       "success" => "false",
//       "error" => $error->getMessage()
//     );

//     http_response_code(500);
//     $json_output = json_encode($output);
//     print($json_output);
//   }

//   public function startup()
//   {
//     header("Content-Type: application/json");
//   }

//   public function getBodyData()
//   {
//     $json = file_get_contents('php://input');
//     $data = json_decode($json, true);
//     return $data;
//   }
// }

// $function = new CrashLanding;

require_once("functions.php");
require_once("db_connection.php");

// $function->error_handler("error_handler");
/* this function throws an error when it gets to getMessage() in OOP */
set_exception_handler("error_handler");

// $function->startup();
startUp();

// $bodyData = $function->getBodyData();
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

$result = mysqli_query($conn, $query);

if (!$result) {
  throw new Exception("error with query " . mysqli_error($conn));
}


?>
