/*
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
  
 */
