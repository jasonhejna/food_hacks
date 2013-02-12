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

    <div id="logo-image">
    	<img src="images/bitebrowser-logo.png" />
    </div>
		<span id="search-form-bg"></span>
    <div id="search-form">

    <input id="address" type="text" id="addresstextbox" value="Update address..." size="35" maxlength="120" onkeydown="if (event.keyCode == 13) document.getElementById('addressupdatebutton').click()">
    <br><br>
	<button id="walkbutton">Walk</button>
	<button id="drivebutton">Drive</button>
	<button id="transitbutton">public Transit</button>


    </div>
    <span id="left_filters-bg"></span>
    <div id="left-filters">
    	<div id="cheader">Sort:</div>
		<select id="left-filter-right">
		  <option value="Price:ASC">Price:ASC</option>
		  <option value="Price + Rating">Price + Rating</option>
		  <option value="Location:ASC">Location:ASC</option>
          <option value="Distance:ASC">Distance:ASC</option>
		</select>
    </div>



    <div id="search-sidebar-bg"></div>
    <div id="search-sidebar">

    </div>
</body>
</html>