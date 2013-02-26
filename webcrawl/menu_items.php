<?php
//include "../pdoconn.php";

$file = file_get_contents('http://www.menupages.com/restaurants/favela-cubana/menu');

preg_match('~title1respage" >(.*?)</h1>~',$file,$restaurant_name);
echo $restaurant_name[1];
//print_r($restaurant_name);

preg_match('~price-key pricerange">(.*?)</acronym>~',$file,$priceavg);
echo $priceavg[1];

preg_match('~cuisine category">(.*?)</li>~',$file,$tags);
echo $tags[1];

preg_match('~addr street-address">(.*?)</span>~',$file,$address1);
echo $address1[1];

preg_match('~locality">(.*?)</span>~',$file,$address2);
echo $address2[1];

preg_match('~region hide-microformat">(.*?)</span>~',$file,$address3);
echo $address3[1];

preg_match('~postal-code">(.*?)</span>~',$file,$address4);
echo $address4[1];

preg_match('~cross-street">(.*?)</li>~',$file,$crossstreet);
echo $crossstreet[1];

preg_match('~latitude">(.*?)</span>~',$file,$latitude);
echo $latitude[1];

preg_match('~longitude">(.*?)</span>~',$file,$longitude);
echo $longitude[1];

preg_match('~Phone: <strong>(.*?)</strong>~',$file,$phone);
echo $phone[1];
	echo "<br>";

//start menu items parse
preg_match_all('~<h2>(.*?)</h2>(?!<h3>)(.*?)</table>~',$file,$altmenutype);
	foreach ($altmenutype[0] as $key => $altmenucatvalue) {
		//echo $altmenucatvalue;

		preg_match('~<h2>(.*?)</h2>~',$altmenucatvalue,$altmenutype);
		//itemparsetwo($altmenucatvalue,0,$altmenutype[1]);
		
}

//add case hree
preg_match_all('~<h2(?! class="null")>(.*?)<h2(?! class="null")>(?<h3>)~',$file,$eachmenu);
foreach ($eachmenu[0] as $key => $bvalue) {

	itemparse($bvalue);
//echo $bvalue;
}

function itemparse($bvalue){
	//<h2> followed by table. special case
	
	preg_match('~<h2(?! class="null")>(.*?)</h2>(?<h3>)~',$bvalue,$menutype);
	echo $menutype[1];
	echo "<br>";

	preg_match_all('~<h3>(.*?)<h3>~',$bvalue,$menucatagory);
	foreach ($menucatagory[0] as $key => $menucatvalue) {

		itemparsetwo($menucatvalue,1,0);
	}

}

function itemparsetwo($menucatvalue,$where,$altmenutype){
	//nested loop for tr
	preg_match_all('~<tr>(.*?)</tr>~',$menucatvalue,$tablerow);
		foreach ($tablerow[0] as $key => $trvalue) {
				echo "<br>";
			//echo $trvalue;
		if ($where == 1){
		preg_match('~<h3>(.*?)</h3>~',$menucatvalue,$menucatagory);
		echo $menucatagory[1];
		}
		elseif ($where == 0 AND $where != 1) {
			echo $altmenutype;
		}
		preg_match('~<cite>(.*?)</cite>~',$trvalue,$itemtitle);
		echo $itemtitle[1];
		preg_match('~</cite>(.*?)</th>~',$trvalue,$itemdesc);
		echo $itemdesc[1];
			
		}
	echo "<br><br><br><br><br><br><br>";
	//echo $menucatvalue;
}

?>