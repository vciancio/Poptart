var map;
var markers     = [];
var nodes       = [];
var lastOpened  = -1;
var infoContent = "";
var infoWindow  = new google.maps.InfoWindow({
  content: infoContent
});

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

function goToMarker(key){
  var infoContent =
    '<div id="map-info-window">'+
    '<div id="siteNotice">'+'</div>'+
    '<h1>'+nodes[key].name+'</h1>'+
    '<div >'+nodes[key].description+'</div>'+
    '</div>';

  infoWindow.setContent(infoContent);

  if(lastOpened >= 0 && lastOpened != key){
    infoWindow.close(map,markers[lastOpened]);
  }
  else if(lastOpened == key){
    infoWindow.close(map, key);
    lastOpened = -1;
  }
  else{
    infoWindow.open(map,markers[key]);
    map.setCenter(markers[key].position);
    lastOpened = key;
  }
}

//Display Google Maps
function displayMap(currentPosition,nodeArray) {
  nodes = nodeArray;
  var options = {
    zoom: 15,
    center: currentPosition,
    mapTypeControl: false,
    navigationControlOptions: {
      style: google.maps.NavigationControlStyle.SMALL
    },
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById("mapcontainer"), options);
//  map.addEventListener("mousemove", throttle_events, true);

  $.each(nodes,function(key, node){
    console.log(node);
    var coords = new google.maps.LatLng(node.latitude, node.longitude);
    var marker = new google.maps.Marker({
      position: coords,
      map: map,
      title: node.name
    });
    markers.push(marker);
    google.maps.event.addListener(marker, 'click', function() {
      goToMarker(key);
    });
  });

  setTimeout(function() {
        google.maps.event.trigger(map, 'resize');
  },500);

} //end function success

$.ajax({
  url: "http://162.243.138.94:6543/api/clinic/get?zipcode=95050&callback=jsonp",
  jsonp: "callback",
  dataType: "jsonp",
  success: function( data ){
      var items = [];
      var nodes = [];
      $.each(data.nodes, function(key, object){
        console.log(object);
        nodes.push(object);
          items.push("<li class='ui-li listview-item' id='location-"+key+"' data-rel='close' onclick='goToMarker("+key+")'>" + object.name + "</li>");
      });
      navigator.geolocation.getCurrentPosition(
        function(position){
          var myCoords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          displayMap(myCoords, nodes);
        }
      );
      var myCoords = new google.maps.LatLng(37.3492,-121.9381);
      displayMap(myCoords, nodes);
      $("<ul/>", {
        "data-role": "listview",
        "data-inset": "true",
        "class":"ui-listview",//ui-listview-inset",
        "data-autodividers":"true",
        "id":"map-list",
//      "data-theme": "b",
        html: items.join("")
      }).appendTo("#locations-list-container");
  }
});
