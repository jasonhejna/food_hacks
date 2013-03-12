 //don't forget to store lat lon as DOM object

/* start of html5 geolocation getter */
function initialize()
    {
    if (navigator.geolocation)
      {
      navigator.geolocation.getCurrentPosition(showPosition,showError);
      }
    else{x.innerHTML="Geolocation is not supported by this browser.";}
    geo_address();

google.maps.event.addListener(marker, "click", function() {
   alert("marker gotclicked");
});
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
var pinColor = "0099CC";
    var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
        new google.maps.Size(21, 34),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));
    var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
        new google.maps.Size(40, 37),
        new google.maps.Point(0, 0),
        new google.maps.Point(12, 35));


  $.ajax({
    type: 'POST', // type of request either Get or Post
    url: '../user_latlng.php', // Url of the page where to post data and receive response 
    data: {lat: lat, lng: lng}, // data to be post
    success: function(data){ //function to be called on successful reply from server
    //get all restaurant info from json, use data to add pins to gmaps 
    //alert(data);
  var icon = new google.maps.MarkerImage("images/blue-dot.png");
  i=0;
  $.each($.parseJSON(data), function() {
        var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
        new google.maps.Size(40, 37),
        new google.maps.Point(0, 0),
        new google.maps.Point(12, 35));

        var min = 0;
        var max = 3;
        // make random number to create differnt map markers at random
        var random = Math.floor(Math.random() * (max - min + 1)) + min;
        if (random == 0){ var icon = new google.maps.MarkerImage("images/purple-dot.png"); }
        if (random == 1){ var icon = new google.maps.MarkerImage("images/blue-dot.png"); }
        if (random == 2){ var icon = new google.maps.MarkerImage("images/green-dot.png"); }
        if (random == 3){ var icon = new google.maps.MarkerImage("images/yellow-dot.png"); }
        marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.lat, this.lng),
        anchor: marker,
        icon: icon,
        shadow: pinShadow,
        map: map,
        title: this.restaurant_name,
        animation:google.maps.Animation.DROP,
        });

        i++;
        //make info window content
        var marker_content = '<div id="marker-restaurant-name">' + this.restaurant_name + '</div><div id="marker-name-subtitle">' + this.name_subtitle + '</div><div id="marker-phonewebsite">' + this.phone + '&nbsp&nbsp&nbsp<a href="http://' + this.website + '" target="_blank">' + this.website + '</a></div>';
          addInfoWindow(marker,marker_content);

        });
     
  }//end success func
});

} //end ajax func

function addInfoWindow(marker, message) {
            var info = message;

            var infoWindow = new google.maps.InfoWindow({
                content: message
            });

            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.open(map, marker);
            });
        }
        
function showError(error)
    {
    switch(error.code) 
      {
      case error.PERMISSION_DENIED:
        x.innerHTML="User denied the request for Geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        x.innerHTML="Location information is unavailable."
        break;
      case error.TIMEOUT:
        x.innerHTML="The request to get user location timed out."
        break;
      case error.UNKNOWN_ERROR:
        x.innerHTML="An unknown error occurred."
        break;
      }
    }
    /* end of html5 geolcation getter */

/* start of map getter and update address text box */
var geocoder;
var map;
var marker;
function getmap(lat,lon) {  
  $(function() {
    $("#address").autocomplete({
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
      }
    });
  });
        
		//MAP
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
          panControl: true,
          panControlOptions: {
              position: google.maps.ControlPosition.LEFT_BOTTOM
          },
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
              
        //GEOCODER
        geocoder = new google.maps.Geocoder();
              
        var marker = new google.maps.Marker({
          position: map.getCenter(),
          map: map,
          draggable: true
        });
                      

    }
    //end of address finder

//start of search radius
function search_radius(input) {
  var set_radius = input.options[input.selectedIndex].value;
  if (set_radius >= 0 && set_radius <= 25) 
  {
    map.setZoom(set_radius);
  }
  else 
  {
    alert("a fatal error occured, please refresh the page.");
  }
}

