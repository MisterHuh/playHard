<?php

class CrashLanding{

  public function __construct() {
    echo("the constructor ran");
  }

  public function error_handler($error)
  {
    $output = array(
      "success" => "false",
      "error" => $error->getMessage()
    );

    http_response_code(500);
    $json_output = json_encode($output);
    print($json_output);
  }

  public function startup()
  {
    header("Content-Type: application/json");
  }

  public function getBodyData()
  {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    return $data;
  }

}

// function error_handler($error) {
//   $output = array(
//     "success" => "false",
//     "error" => $error->getMessage()
//   );

//   http_response_code(500);
//   $json_output = json_encode($output);
//   print($json_output);
// }

// function startup() {
//   header("Content-Type: application/json");
// }

// function getBodyData() {
//   $json = file_get_contents('php://input');
//   $data = json_decode($json, true);
//   return $data;
// }

?>
