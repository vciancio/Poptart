
$.ajax({
  url: "http://162.243.138.94:6543/api/clinic/get?zipcode=95050&callback=jsonp",
  jsonp: "callback",
  dataType: "jsonp",
  success: function( data ){
      var items = [];
      console.log(data['nodes'][0])

      $.each(data['nodes'], function(key, object){
        console.log(object);
        $.each( object, function(key, val){
          items.push("<li class=ui-li id='" + key + "'>" + key + ": " + val + "</li>");
          //success(object); 
        });
     });
     $("<ul/>", {
     	"data-role": "listview",
     	"data-inset": "true", 
        "class":"ui-listview ui-listview-inset",
        "id":"map-list",
        "data-theme": "b",
        html: items.join("")
     })//.appendTo("body");
  }
});

/*
//custom google maps function
function success(position) {
  	
  		var coords = new google.maps.LatLng(position.latitude, position.longitude); 
  		var options = {
    			zoom: 15,
    			center: coords,
    			mapTypeControl: false,
    			navigationControlOptions: {
    				style: google.maps.NavigationControlStyle.SMALL
    			},
    			mapTypeId: google.maps.MapTypeId.ROADMAP
  		};
  		
  		var map = new google.maps.Map(document.getElementById("mapcontainer"), options);

		var marker = new google.maps.Marker({
      		position: coords,
      		map: map,
      		title: "marker" 
  		});
}

if (navigator.geolocation) {
  		navigator.geolocation.getCurrentPosition(success);
} else {
  		error('Geo Location is not supported');
}

google.maps.event.addDomListener(window, 'load', success); 

*/
$(document).on( "pageinit", "#map-page", function() {
    var defaultLatLng = new google.maps.LatLng(34.0983425, -118.3267434);  // Default to Hollywood, CA when no geolocation support
    if ( navigator.geolocation ) {
        function success(pos) {
            // Location found, show map with these coordinates
            drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        }
        function fail(error) {
            drawMap(defaultLatLng);  // Failed to find location, show default map
        }
        // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
        navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});
    } else {
        drawMap(defaultLatLng);  // No geolocation support, show default map
    }
    function drawMap(latlng) {
        var myOptions = {
            zoom: 10,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
        // Add an overlay to the map of current lat/lng
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "Greetings!"
        });
    }
});

