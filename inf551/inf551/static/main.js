$(document).ready(function(){
	$('#search_button').click(function(){
		search_key = $("#search_key").val();
		if(search_key.length == 0){
			$(".alert").removeClass('fade');
		}
		else{ 
			$.ajax({
	         url: "/search?key=" + search_key,
	         type: "GET",
	         success: function(result) {
	            if(result.api_success){
	            	if(result.count == 0){
	            		$("#alert_msg").text("No Result Found")
	              		$(".alert").removeClass('fade');
	            	}
	            	else{
	            		$("#alert_msg").text(result.msg)
	              		$(".alert").removeClass('fade');
	            	}
	            }else{
	              $("#alert_msg").text(result.msg)
	              $(".alert").removeClass('fade');
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
		$(".alert").addClass('fade');
	});
});