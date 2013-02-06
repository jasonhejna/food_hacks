<?php 
include "dbconnect.php";

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
      
   );
  }
$json = json_encode($results);
echo $json;
?>