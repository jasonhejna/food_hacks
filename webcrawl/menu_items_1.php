<?php
//include "../pdoconn.php";

$file = file_get_contents('http://www.menupages.com/restaurants/favela-cubana/menu');

$create_array = array();

/*preg_match_all('~<h2>(.*?)</h2>~',$file,$h2);
$i = 0;
	foreach ($h2[0] as $key => $h2) {
		
		$i++;
		echo $i;
		echo "<br>";
		echo $h2;
}*/

preg_match_all('~(.{0,24})<h3>(.*?)</h3>~',$file,$h3);
$i = 0;
	foreach ($h3[0] as $key => $h3val) {
		//echo $h3val;

		preg_match('~(.{0,8})<h3>~', $h3val, $prefix_headr_check);
		echo "<br>";
		echo $prefix_headr_check[1];
		echo "<br>";
		if ($prefix_headr_check[0] != "sp;") {

		$check = substr($prefix_headr_check[0], -5, -8);
		echo $check;
		echo "<br>";
		if($check == "</h2>") {
			preg_match('~<h2>(.*?)</h2>~', $h3val, $prefix_headr_title);

			 echo $i;
			 echo "<br>2h2h2h2h2h";
			 echo $prefix_headr_title[0];
			 
			 //$i = 0;
			 
			 echo "<br>";
		}
		}
			preg_match('~<h3>(.*?)</h3>~', $h3val, $prefix_headr_srch);
			echo $prefix_headr_srch[1];
echo "<br>";
$i++;
echo $i;
echo "<br>";
}

/*preg_match_all('~(?! "</h2>")<h3>(.*?)</h3>~',$file,$h3);
$i = 0;
	foreach ($h3[0] as $key => $h3) {
		echo $h3;
		$i++;
		echo $i;
		echo "<br>";
}*/

preg_match_all('~<table class="prices-three">(.*?)</table>~',$file,$table);
$i = 0;
	foreach ($table[0] as $key => $table) {
		
		$i++;

		echo $i;
		echo "<br>";
		echo $table;
}
?>