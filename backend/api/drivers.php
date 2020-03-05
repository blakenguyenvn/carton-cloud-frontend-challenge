<?php
$drivers = json_decode(file_get_contents('../data/drivers.json'));

$response = [];

$errors = [];

$body = json_decode(file_get_contents('php://input'));

// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if (isset($_GET['id'])) {
            $id = $_GET['id'];

            if (empty($id) || !is_numeric($id) || !isset($drivers->items->{$id})) {
                $errors['id'] = 'Invalid delivery ID';
            }

            if (0 == count($errors)) {
                $response = $drivers->items->{$id};
            }
        } else {
            $response = $drivers->items;
        }

        break;
    default:
        header('HTTP/1.0 405 Method Not Allowed');

        exit;
}

if (count($errors) > 0) {
    header('HTTP/1.0 400 Bad Request');

    $response['errors'] = $errors;
}

header('Content-Type: application/json');

echo json_encode($response);
