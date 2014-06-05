
$.ajax({
  url: "http://162.243.138.94:6543/api/clinic/get?zipcode=95050&callback=jsonp",
  jsonp: "callback",
  dataType: "jsonp",
  success: function( data ){
      var items = [];

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
     });//.appendTo("body");
  }
});

//custom google maps function
function success(position) {
  var coords = new google.maps.LatLng(position.latitude, position.longitude); 
  var options = {
    zoom: 10,
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

