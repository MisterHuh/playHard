<?php

require_once("functions.php");
require_once("db_connection.php");
set_exception_handler("error_handler");
startUp();

// $bodyData = getBodyData();

// if ($bodyData["entryId"]) {
//   $id = $bodyData["entryId"];
// } else {
//   throw new Exception("entry id required");
// };

$query = "UPDATE `2020`
            SET `date` = '2020-08-06',
            `category` = 'Spendings',
            `subcategory` = 'Groceries',
            `cc` = 'Sapphire',
            `amount` = 90.99,
            `store` = 'Test',
            `notes` = 'Test'
          WHERE `2020`.`id` = 448";

$result = mysqli_query($conn, $query);

if (!$result) {
  throw new Exception('error with query: ' . mysqli_error($conn));
};
