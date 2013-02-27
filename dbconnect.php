<?php


// CONNECT TO THE DATABASE
$DB_NAME = '';
$DB_HOST = '';
$DB_USER = '';
$DB_PASS = '';
$mysqli = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
if (mysqli_connect_errno()) {
printf("Connect failed: %s\n", mysqli_connect_error()); //remove print in production
exit();
}
?>
