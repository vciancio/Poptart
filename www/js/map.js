
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
  		
  		var infowindow = new google.maps.InfoWindow({
  			content: position.name
  		}); 
  		
  		google.maps.event.addListener(marker, 'click',function() { 
  			infowindow.open(map,marker); 
  		}); 
  } //end function success 

if (navigator.geolocation) {
  		navigator.geolocation.getCurrentPosition(success);
} else {
  		error('Geo Location is not supported');
}

google.maps.event.addDomListener(window, 'load', success); */


//jQuery mobile maps  
	$(document).on('pageshow','[data-role=page]',function(){   
		var mapOptions = {zoom: 5, center: new google.maps.LatLng(34,32), mapTypeId: google.maps.MapTypeId.ROADMAP};
		var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
		var myMarker1 = new google.maps.Marker({position: new google.maps.LatLng(29.979175, 31.134358), map: map });
		var myMarker2 = new google.maps.Marker({position: new google.maps.LatLng(32.483333, 44.433333), map: map });
		var myMarker3 = new google.maps.Marker({position: new google.maps.LatLng(37.95, 27.366667), map: map });
		var myMarker4 = new google.maps.Marker({position: new google.maps.LatLng(37.638, 21.63), map: map });
		var myMarker5 = new google.maps.Marker({position: new google.maps.LatLng(37.033333, 27.433333), map: map });
		var myMarker4 = new google.maps.Marker({position: new google.maps.LatLng(36.433333, 28.216667), map: map });
		var myMarker5 = new google.maps.Marker({position: new google.maps.LatLng(31.213931, 29.885661), map: map });
});
 
