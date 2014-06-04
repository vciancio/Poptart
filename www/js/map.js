
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
          success(object); 
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
  } //end function success 

if (navigator.geolocation) {
  		navigator.geolocation.getCurrentPosition(success);
} else {
  		error('Geo Location is not supported');
}

google.maps.event.addDomListener(window, 'load', success);

//default google maps function
/*function success(position) {
  							var mapcanvas = document.createElement('div');
  							mapcanvas.id = 'mapcontainer';
  							mapcanvas.style.height = '400px';
  							mapcanvas.style.width = '600px';

  							document.querySelector('article').appendChild(mapcanvas);

  							var coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  							var cowell = new google.maps.LatLng(37.348169,-121.935693);
  							
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

							var coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  							var marker = new google.maps.Marker({
      							position: coords,
      							map: map,
      							title:"You are here!"
  							});
  							
  							var infowindow2 = new google.maps.InfoWindow({ 
  								content: '<div> <h1> Here! </h1></div>'
  							});
  							
  							google.maps.event.addListener(marker,'click',function() { 
  								infowindow2.open(map,marker); 
  							}); 
  							
  							var cowell = new google.maps.LatLng(37.348169,-121.935693);
  							var marker2 = new google.maps.Marker({
  								position: cowell,
  								map: map,
  								title: "Cowell"
  							}); 
  							
  							var infowindow = new google.maps.InfoWindow({
  								content: '<div> <h1> Cowell Health Center</h1></div>'
  							});
  							
  							google.maps.event.addListener(marker2,'click',function() { 
  								infowindow.open(map,marker2); 
  							}); 
						} //end function success 

						if (navigator.geolocation) {
  							navigator.geolocation.getCurrentPosition(success);
						} else {
  							error('Geo Location is not supported');
						}*/
