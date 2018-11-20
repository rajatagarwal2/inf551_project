$(document).ready(function(){
	$('#search_button').click(function(){
		search_key = $("#search_key").val();
		if(search_key.length == 0){
			$(".alert").toggleClass('fade ""'); 
		}
		else{ 
			$.ajax({
	         url: "/search",
	         type: "POST",
	         contentType: "application/json; charset=utf-8",
	         data: JSON.stringify({"key": search_key}),
	         success: function(result) {
	            if(result.api_success){
	               // alertWindowFn('success', 'topCenter', '<b>' + result.msg + '</b>');
	            }else{
	              // alertWindowFn('error', 'topCenter', '<b>' + result.msg + '</b>');
	            }
	         },
	         error: function(xhr, ajaxOptions, thrownError) {
	             console.log("status " + xhr.status);
	             console.log("error " + thrownError);
	         }
	        });
		}
	});

	$('.alert_close').click(function(){
		$(".alert").toggleClass('fade ""');
	});
});