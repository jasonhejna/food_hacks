
<?php


// CONNECT TO THE DATABASE
$DB_NAME = 'foodhacker';
$DB_HOST = 'foodhacker.db.8532513.hostedresource.com';
$DB_USER = 'foodhacker';
$DB_PASS = 'g4%Gb7S%88@i2#';
$mysqli = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
if (mysqli_connect_errno()) {
printf("Connect failed: %s\n", mysqli_connect_error()); //remove print in production
exit();
}
?>