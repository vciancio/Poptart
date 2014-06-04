jQuery.ajax({
        url: "http://162.243.138.94:6543/api/clinic/get?zipcode=95050",
        datatype: 'JSONP',
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        success: function(data) {
        	console.log(data);
        },
    	error : function() { 
    		alert('error'); 
    	}
            /*$.getJSON( "http://162.243.138.94:6543/api/clinic/get?zipcode=95050", function( data ) {
 			alert("got data");
  			items = data['nodes']; 
  			markers = [];
  			cursors = [];
  			infoWindows = [];
    
  			for (var i=0; i<items.length; i++){
  				var coords = new google.maps.LatLng(data[i]['latitude'], data[i]['longitude']);
  	
				var marker = new google.maps.Marker({
    			position: coords,
      			map: map,
      			title:data[i]['name']
  			});
  							
  			var infoWindow = new google.maps.InfoWindow({ 
  				content: '<div> <h1> ' + data[i]['description'] + ' </h1></div>'
  			});
  							
  			infoWindows.push(infoWindow);
  							
  			google.maps.event.addListener(marker,'click',function() { 
  				infoWindows[i].open(map,marker[i]); 
  			});
  	
  			markers.push(marker);

  			} */
  	}); 