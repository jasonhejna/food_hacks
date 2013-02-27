<?php
//include "../pdoconn.php";

$file = file_get_contents('http://www.menupages.com/restaurants/1-garden-chinese/menu');

preg_match_all('~(.{0,256})<table(.*?)</table>~',$file,$table);

	foreach ($table[1] as $key => $tableval) {
	$checkval = substr($tableval, 0, 56);
	echo $checkval;
	echo "................................................................................";
}
?>