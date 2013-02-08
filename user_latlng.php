<?php 
include "dbconnect.php";

//if post isset, then do this. else, do this but get get lat and lng from session

foreach($_POST as $key => $value)
{
    switch($key)
    {
        case "lat":
            $lat = $value;
        break;
        case "lng":
            $lng = $value;
        break;
    }
}

//print_r($_POST);
$radius = "23";
$result = mysql_query("SELECT
    *,
    ( 6371 * acos( cos( radians({$lat}) ) * cos( radians( `lat` ) ) * cos( radians( `lng` ) - radians({$lng}) ) + sin( radians({$lat}) ) * sin( radians( `lat` ) ) ) ) AS distance
FROM `restaurants`
HAVING distance <= {$radius}
ORDER BY distance ASC");

while($row = mysql_fetch_array($result))
  {
  $results[] = array(
      'lat' => $row['lat'],
      'lng' => $row['lng'],
      'address' => $row['address'],
      'restaurant_name' => $row['restaurant_name'],

   );
  }
$json = json_encode($results);
echo $json;
?>