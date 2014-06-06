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

//Display Google Maps
function displayMap(currentPosition,nodes) {
  var options = {
    zoom: 15,
    center: currentPosition,
    mapTypeControl: false,
    navigationControlOptions: {
      style: google.maps.NavigationControlStyle.SMALL
    },
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById("mapcontainer"), options);
//  map.addEventListener("mousemove", throttle_events, true);
  var lastOpened = -1;
  var markers = [];
  $.each(nodes,function(key, node){
    console.log(node);
    var coords = new google.maps.LatLng(node.latitude, node.longitude);
    var marker = new google.maps.Marker({
      position: coords,
      map: map,
      title: node.name
    });
    markers.push(marker);
    var infoContent =
      '<div id="map-info-window">'+
        '<div id="siteNotice">'+'</div>'+
        '<h1>'+node.name+'</h1>'+
        '<div >'+node.description+'</div>'+
      '</div>';
    var infoWindow = new google.maps.InfoWindow({
      content: infoContent
    });
    google.maps.event.addListener(marker, 'click', function() {
      if(lastOpened >= 0 && lastOpened != key){
        infoWindow.close(map,markers[lastOpened]);
        alert(markers[lastOpened]);
      }
      else if(lastOpened == key){
        infoWindow.close(map, key);
        lastOpened = -1;
      }
      else{
        infoWindow.open(map,marker);
        map.setCenter(marker.position);
        lastOpened = key;
      }
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
        $.each( object, function(key, val){
          items.push("<li class=ui-li id='" + key + "'>" + key + ": " + val + "</li>");
        });
//        success(nodes);
      });
      navigator.geolocation.getCurrentPosition(
        function(position){
          var myCoords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          displayMap(myCoords, nodes);
        }
      );
      var myCoords = new google.maps.LatLng(37.3492,-121.9381);
//      displayMap(myCoords, nodes);
/*      $("<ul/>", {
        "data-role": "listview",
        "data-inset": "true", 
        "class":"ui-listview ui-listview-inset",
        "id":"map-list",
        "data-theme": "b",
        html: items.join("")
      });//.appendTo("body");
*/
  }
});
