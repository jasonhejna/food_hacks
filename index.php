<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>New Web Project</title>
        <meta name="description" content="New Web Project">
		<meta name="keywords" content="food, restaurant, search, engine">
		<meta name="author" content="Jason Hejna">
        <link rel="stylesheet" href="css/960_24_col.css" />

        <link rel="stylesheet" href="css/style.css" />
        <link href='http://fonts.googleapis.com/css?family=Rambla:400,700|Roboto+Condensed:400,700' rel='stylesheet' type='text/css'>
        <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=true"></script>
        <script type="text/javascript" src="js/web_location.js"></script>
		<link href="jquery/css/smoothness/jquery-ui-1.10.0.custom.css" rel="stylesheet">
		<script src="jquery/js/jquery-1.9.0.js"></script>
		<script src="jquery/js/jquery-ui-1.10.0.custom.js"></script>

    </head>
<body onload="initialize()">
	<!--background map -->
    <div id="map_canvas"></div>

    <div class="container_24">
	<div class="grid_9 prefix_5">.
    <div id="search-form">

    <input id="address" type="text" id="addresstextbox" value="Current Address. &nbsp eg. Sydney, NSW" size="35" maxlength="120" onkeydown="if (event.keyCode == 13) document.getElementById('addressupdatebutton').click()">


    <select name="search_radius" onchange="search_radius(this)">
		<option value="2">2km</option>
		<option value="4">4km</option>
		<option value="6">6km</option>
		<option value="8">8km</option>
		<option value="10">10km</option>
		<option value="12">12km</option>
		<option value="15">15km</option>
		<option value="25">25km</option
	</select>
    </div>
</div>
<div class="clear"></div>
</div>
</body>
</html>