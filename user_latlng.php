<?php 

//if post isset, then do this. else, do this but get get lat and lng from session


foreach($_POST as $key => $value)
{
    switch($key)
    {
        case "lat":
            $lat = $value;
            //if radius* is POST, then use it in the +, and - equations
            $lat_big = $lat + '.1';
            $lat_small = $lat - '.1';
        break;
        case "lng":
            $lng = $value;
            $lng_big = $lng + '.1';
            $lng_small = $lng - '.1';
        break;
    }
}

include "pdoconn.php";


$stmt=$db->prepare("SELECT * FROM restaurants WHERE lat > :latsmall AND lat < :latbig AND lng > :lngsmall AND lng < :lngbig");
$stmt->bindValue(':latsmall', $lat_small, PDO::PARAM_STR);
$stmt->bindValue(':latbig', $lat_big, PDO::PARAM_STR);
$stmt->bindValue(':lngsmall', $lng_small, PDO::PARAM_STR);
$stmt->bindValue(':lngbig', $lng_big, PDO::PARAM_STR);


$stmt->execute();
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
$json=json_encode($rows);
echo $json;
?>