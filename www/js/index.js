/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
    	var self = this; 
    	this.store = new MemoryStore(function() { self.renderHomeView(); }); 
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
    
    renderHomeView: function() {
    var html =
            "<div class='header'><h1>Home</h1></div>" +
            "<div class='search-view'>" +
            "<input class='search-key'/>" +
            "<ul class='employee-list'></ul>" +
            "</div>"
    $('body').html(html);
    $('.search-key').on('keyup', $.proxy(this.findByName, this));
},
};

$(document).ready(function() { 
	$("#login_submit").click(function(event) {
		event.preventDefault(); 
		var credentials = { type:'EMAIL', username: $('#username').val(), password: $('#password').val() };
		$.ajax({
			type:"PUT",
			url:"api/auth", 
			cache:false,
			data:JSON.stringify(credentials), 
			contentType: "application/json; charset=utf-8", 
			success: function(data) { 
				//validate the response here, set variables
				//and if credentials are valid, forward to the next page
				$.mobile.changePage($('index.html')); 
					//or show an error message
			}, 
			error: function() { 
				//server couldnt be reached or other error
			}
		}); 
	}); 
}); 

$('#loginForm').submit(function(e) { 
	e.preventDefault();
	jQuery.support.cors=true;
	$.ajax({
		url:
		crossDomain: true;
		type='post',
		data= $("#loginForm").serialize(), 
		success: function(data) { 
			if(data.status == 'success') { 
				window.location.href=" " 
			}else if (data.status == 'error') { 
				alert("Authentication Invalid. Please try again."); 
				return false; 
			} 
		} 
	}); 
}); 

function showError(error)
  {
  switch(error.code) 
    {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred."
      break;
    }
  }
  
  
