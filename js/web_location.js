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
  //$.each(data, function(index, element) {
/*  var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });
    alert(data); }*/
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
          position: google.maps.ControlPosition.BOTTOM_CENTER
          },
          panControl: true,
          panControlOptions: {
              position: google.maps.ControlPosition.LEFT_TOP
          },
          streetViewControl: true,
          streetViewControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP
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

