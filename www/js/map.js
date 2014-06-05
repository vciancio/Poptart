function throttle_events(event) {
    var now = new Date();
    var distance = Math.sqrt(Math.pow(event.clientX - last.x, 2) + Math.pow(event.clientY - last.y, 2));
    var time = now.getTime() - last.time.getTime();
    if (distance * time < space * period) {    //event arrived too soon or mouse moved too little or both
        console.log("event stopped");
        if (event.stopPropagation) { // W3C/addEventListener()
            event.stopPropagation();
        } else { // Older IE.
            event.cancelBubble = true;
        };
    } else {
        console.log("event allowed: " + now.getTime());
        last.time = now;
        last.x    = event.clientX;
        last.y    = event.clientY;
    };
};

//custom google maps function
function success(position) {
  var coords = new google.maps.LatLng(position.latitude, position.longitude);
  var options = {
    zoom: 8,
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
  map.addEventListener("mousemove", throttle_events, true);
} //end function success 

if (navigator.geolocation) {
//  navigator.geolocation.getCurrentPosition(success);
} else {
  error('Geo Location is not supported');
}

$.ajax({
  url: "http://162.243.138.94:6543/api/clinic/get?zipcode=95050&callback=jsonp",
  jsonp: "callback",
  dataType: "jsonp",
  success: function( data ){
      var items = [];

      $.each(data.nodes, function(key, object){
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
    setTimeout(function() {
      google.maps.event.trigger(map, 'resize');
    },500);
  }
});
