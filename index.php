<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Bite Browser</title>
        <meta name="description" content="New York City Food & Drink Search Engine">
		<meta name="keywords" content="food, restaurant, search, find, New York City, NYC">
		<meta name="author" content="Jason Hejna">
        <link rel="stylesheet" href="css/960_24_col.css" />

        <link rel="stylesheet" href="css/style.css" />
        <link rel="shortcut icon" href="images/favicon.ico">
  		<link rel="icon" href="images/favicon.ico">
        <link href='http://fonts.googleapis.com/css?family=Rambla:400,700|Roboto+Condensed:400,700' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" media="screen and (max-device-width: 570px)" href="narrow.css" />
        <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?sensor=true"></script>
        
		<link href="jquery/css/custom-smoothness/jquery-ui-1.10.0.custom.css" rel="stylesheet">
		<script src="jquery/js/jquery-1.9.0.js"></script>
		<script src="jquery/js/jquery-ui-1.10.0.custom.js"></script>
		<script type="text/javascript" src="web_location.js"></script>
        <script type="text/javascript" src="search_auto.js"></script>
        <script type="text/javascript">
        //jquery form objects
        $(document).ready(function(){
        	$( "#travelmode" ).buttonset();
        	document.getElementById("tmode").innerHTML = "WALKING";
        	$("#radio1").click(function(){
				document.getElementById("tmode").innerHTML = 'WALKING';
				var curreaddress = document.getElementById('currentMarkerAddr').innerHTML;
		        calcRoute(curreaddress);
	  		});
	  		$("#radio2").click(function(){
				document.getElementById("tmode").innerHTML = 'TRANSIT';
				var curaddress = document.getElementById('currentMarkerAddr').innerHTML;
		        calcRoute(curaddress);
	  		});
	  		$("#radio3").click(function(){
				document.getElementById("tmode").innerHTML = 'DRIVING';
				var curaddress = document.getElementById('currentMarkerAddr').innerHTML;
		        calcRoute(curaddress);
	  		});
	  		
        	$("#radio4").click(function(){
				document.getElementById("tmode").innerHTML = 'BICYCLING';
				var curaddress = document.getElementById('currentMarkerAddr').innerHTML;
		        calcRoute(curaddress);
	  		});
	  		
	  		$( "#sort-radios" ).buttonset();
	  		
	  		$("#radio5").click(function(){
	    		
	  		});
	  		
	  		
	  		$("#radio6").click(function(){
	    		
	  		});
	  		$("#radio7").click(function(){
	    		
	  		});
	  		$("#filter-options-button").button({
              icons: {
                primary: 'ui-icon-gear'
              }
            });
            $('#filter-options-button').click(function() {
                $('#filteroptions').show();
            });

	  		$("#search-submit").button({
			  icons: {
			    primary: 'ui-icon-search'
			  }
			});
			//enter key event triggert click function
			$('#searchobject').keypress(function(e) {
			 if (e.which == 13) {
			  $('#search-submit').click();
			  return false;
			 }
			});
			$('#search-submit').click(function() {
				var searchtxt = document.getElementById("searchobject").value;
			  //alert(searchtxt);
			  $.ajax({
			    type: 'POST', // type of request either Get or Post
			    url: 'search_autocomplete.php', // Url of the page where to post data and receive response 
			    data: {searchtxt: searchtxt}, // data to be post
			    success: function(data){ //function to be called on successful reply from server
			    //do something
			    //alert(data); 
			    document.getElementById("searchresults").innerHTML = '<div id="searchresult-bg"></div><span id="search-title">' + "search results pending" + '... ' + "write the php" + '</span><br>';
			    }
				});
			});
        });
        </script>
    </head>
<body onload="initialize()">
	<!--background map -->
    <div id="map_canvas"></div> 
	<div id="currentMarkerAddr" hidden></div>
	<div id="markerlatlng"></div>
	<div id="tmode" hidden></div>

	<div id="encapsulating_width">
    <div id="logo-image">
    	<img src="images/bitebrowser-logo.png" />
    </div>
		<span id="search-form-bg"></span>
    <div id="search-form">

    <input type="text" id="addresstextbox" value="Update address..." size="35" maxlength="120" tabindex="1" onfocus="(this.value = '')" />
    
    
	<div id="travelmode">
		<input type="radio" id="radio1" name="radio"><label for="radio1" value="WALKING" checked="checked"><img src="images/walk.png"></label>
		<input type="radio" id="radio2" name="radio"><label for="radio2" value="TRANSIT"><img src="images/transit.png"></label>
		<input type="radio" id="radio3" name="radio"><label for="radio3" value="DRIVING"><img src="images/drive.png"></label>
		<input type="radio" id="radio4" name="radio"><label for="radio4" value="BICYCLING"><img src="images/bike.png"></label>
	</div>
	
	
    <br>
    </div>

    
<span id="directions-bg"></span>
<div id="directions">
<div id="directionsPanel"></div>
</div>

    <div id="search-sidebar-bg"></div>
    <div id="search-sidebar">
	<input type="text" id="searchobject" value="Search..." size="85" maxlength="127" onfocus="(this.value = '')">
	<button id="filter-options-button"></button><button id="search-submit"></button>
	
	<div id="searchresults"></div>
    </div>
        <div id="filteroptions">
        <input type="text" id="low-price" value="$1.79" size="6" maxlength="8" onfocus="(this.value = '$')">
        <input type="text" id="high-price" value="$30.00" size="6" maxlength="8" onfocus="(this.value = '$')">
        <br>
        <div id="sort-radios">
            <input type="radio" id="radio5" name="radio2" checked="checked"><label for="radio5">Price</label>
            <input type="radio" id="radio6" name="radio2"><label for="radio6">Distance</label>
            <input type="radio" id="radio7" name="radio2"><label for="radio7">Price & Rating</label>
            <input type="radio" id="radio8" name="radio2"><label for="radio8">Rating</label>
        </div>
    </div>
</div> <!-- end encapsulating_width div -->
</body>
</html>