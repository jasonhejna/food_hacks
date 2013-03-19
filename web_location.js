 //don't forget to store lat lon as DOM object
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
 /* start of html5 geolocation getter */
  function initialize()
    {
    if (navigator.geolocation)
      {
      navigator.geolocation.getCurrentPosition(showPosition,showError);
      }
    else
      {
    	//alert("Geolocation is not supported by this browser.");
    	var lat="40.7697";
	    var lon="-73.9735";
	    getmap(lat,lon);
	    ajax_find(lat,lon);
      }
    }
    function showError(error)
    {
    switch(error.code) 
      {
      case error.PERMISSION_DENIED:
        //alert("User denied the request for Geolocation.");
        var lat="40.7697";
	    var lon="-73.9735";
	    getmap(lat,lon);
	    ajax_find(lat,lon);
        break;
      case error.POSITION_UNAVAILABLE:
        //alert("Location information is unavailable.");
        var lat="40.7697";
	    var lon="-73.9735";
	    getmap(lat,lon);
	    ajax_find(lat,lon);
        break;
      case error.TIMEOUT:
        //alert("The request to get user location timed out.");
        var lat="40.7697";
	    var lon="-73.9735";
	    getmap(lat,lon);
	    ajax_find(lat,lon);
        break;
      case error.UNKNOWN_ERROR:
        //alert("An unknown error occurred.");
        var lat="40.7697";
	    var lon="-73.9735";
	    getmap(lat,lon);
	    ajax_find(lat,lon);
        break;
      }
	}

  function showPosition(position)
    {

    var lat=position.coords.latitude;
    var lon=position.coords.longitude;
    getmap(lat,lon);
    ajax_find(lat,lon);
    
    }

//setTimeout(loctime,800);
function ajax_find(lat,lng){
  $.ajax({
    type: 'POST', // type of request either Get or Post
    url: 'user_latlng.php', // Url of the page where to post data and receive response 
    data: {lat: lat, lng: lng}, // data to be post
    success: function(data){ //function to be called on successful reply from server
    //get all restaurant info from json, use data to add pins to gmaps 
    //alert(data);

  i=0;
  var madeSearchResults = new Array();
  $.each($.parseJSON(data), function() {

		//madeSearchResults[i] = '<span id="search-title">' + this.restaurant_name + '</span>';
		document.getElementById("searchresults").innerHTML += '<div id="searchresult-bg"></div><span id="search-title">' + this.restaurant_name + '... ' + this.subtitle + '</span>';

  		//document.getElementById("searchresults").innerHTML= parsedData;
		//document.getElementById(searchresults).innerHTML = this.restaurant_name;  	
        var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
        new google.maps.Size(40, 37),
        new google.maps.Point(0, 0),
        new google.maps.Point(12, 35));

        var min = 0;
        var max = 5;
        // make random number to create differnt map markers at random
        var random = Math.floor(Math.random() * (max - min + 1)) + min;
        if (random == 0){ var icon = new google.maps.MarkerImage("images/purple-dot.png"); }
        if (random == 1){ var icon = new google.maps.MarkerImage("images/blue-dot.png"); }
        if (random == 2){ var icon = new google.maps.MarkerImage("images/yellow-dot.png"); }
        if (random == 3){ var icon = new google.maps.MarkerImage("images/ltblue-dot.png"); }
        if (random == 4){ var icon = new google.maps.MarkerImage("images/orange-dot.png"); }
        if (random == 5){ var icon = new google.maps.MarkerImage("images/red-dot.png"); }
        
        marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.lat, this.lng),
        anchor: marker,
        icon: icon,
        shadow: pinShadow,
        map: map,
        title: this.restaurant_name,
        animation:google.maps.Animation.DROP,

        });

        //make info window content
        var marker_content = '<div id="marker-restaurant-name">' + this.restaurant_name 
        + '</div><div id="marker-name-subtitle">' 
        + this.name_subtitle + '</div><div id="marker-address">' + this.address + '</div><div id="marker-phonewebsite">' + this.phone 
        + '&nbsp&nbsp&nbsp<a href="http://' + this.website + '" target="_blank">' + this.website 
        + '</a></div>';
        
          addInfoWindow(marker,marker_content,this.address);
        });

     	i++;
  }//end success func
});

} //end ajax func
function addInfoWindow(marker, message, address) {
            var info = message;

            var infoWindow = new google.maps.InfoWindow({
                content: message
            });

            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.open(map, marker);
				document.getElementById("currentMarkerAddr").innerHTML = this.address;
                calcRoute(address);
                
            });
            
}

function calcRoute(address) {
  var start = document.getElementById("markerlatlng").value;
  var end = address;
  var selectedMode = document.getElementById("tmode").innerHTML;
  var request = {
    origin:start,
    destination:end,
    travelMode: google.maps.TravelMode[selectedMode],
	
  };
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {

      directionsDisplay.setDirections(result);
      document.getElementById("currentMarkerAddr").innerHTML = address;
    }
    
  });
  
}

/* end of html5 geolcation getter */


/* start of map getter and update address text box */




var geocoder;
var map;
var marker;


function getmap(lat,lon) {  
  $(function() {
    $("#addresstextbox").autocomplete({
      //This bit uses the geocoder to fetch address values
      source: function(request, response) {
        geocoder.geocode( {'address': request.term }, function(results, status) {
          response($.map(results, function(item) {
            return {
              label:  item.formatted_address,
              value: item.formatted_address,
              latitude: item.geometry.location.lat(),
              longitude: item.geometry.location.lng()
            }
          }));
        })
      },
      //This bit is executed upon selection of an address
      select: function(event, ui) {
        $("#latitude").val(ui.item.latitude);
        $("#longitude").val(ui.item.longitude);
        var location = new google.maps.LatLng(ui.item.latitude, ui.item.longitude);
        marker.setPosition(location);
        map.setCenter(location);
        //call calc route function
        document.getElementById("markerlatlng").value = location;
        adasd = document.getElementById("currentMarkerAddr").innerHTML;
        calcRoute(adasd);
      }
    });
  });
        
      //MAP
      //directionsDisplay = new google.maps.DirectionsRenderer();
      directionsDisplay = new google.maps.DirectionsRenderer({draggable: true, preserveViewport: true,});
        var latlng = new google.maps.LatLng(lat,lon);
        var options = {
          zoom: 16,
          maxzoom: 18,
          zoomControl: false,
          scaleControl: true,
          scrollwheel: true,
          scaleControl: false,
          mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: google.maps.ControlPosition.BOTTOM_LEFT
          },
          panControl: false,
          streetViewControl: true,
          streetViewControlOptions: {
            position: google.maps.ControlPosition.BOTTOM_LEFT
          },
          disableDoubleClickZoom: true,
          center: latlng,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          position: google.maps.ControlPosition.BOTTOM

        };

              
        map = new google.maps.Map(document.getElementById("map_canvas"), options);
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById("directionsPanel"));
        
        //GEOCODER
        geocoder = new google.maps.Geocoder();
              
        var marker = new google.maps.Marker({
          position: map.getCenter(),
          map: map,
          icon: new google.maps.MarkerImage("images/user_marker.png"),
          title: "You are here",
          draggable: true,
        });
        
        document.getElementById('markerlatlng').value = map.getCenter();
                      
	    google.maps.event.addListener(marker,'drag',function(event) {
	        //document.getElementById('markerlat').value = event.latLng.lat();
	        //document.getElementById('markerlng').value = event.latLng.lng();
	        document.getElementById('markerlatlng').value = event.latLng.lat() + ',' + event.latLng.lng();
	        var curaddress = document.getElementById('currentMarkerAddr').value;
	        //document.getElementById('addresstextbox').value = curaddress.value;
	        calcRoute(curaddress);
	    });
	
	    google.maps.event.addListener(marker,'dragend',function(event) {
	        document.getElementById('markerlatlng').value = event.latLng.lat() + ',' + event.latLng.lng();
	        var curaddress = document.getElementById('currentMarkerAddr').value;
	        //document.getElementById('addresstextbox').value = curaddress.value; 
	        calcRoute(curaddress);
	    });
    }
    //end of address finder




