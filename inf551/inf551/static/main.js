$(document).ready(function(){
	$('#search_button').click(function(){
		search_key = $("#search_key").val();
		if(search_key.length == 0){
			$("#search_content").html('')
			$("#alert_msg").text('Search key is empty')
			$(".alert").removeClass('fade');
		}
		else{ 
			$.ajax({
	         url: "/search?key=" + search_key,
	         type: "GET",
	         success: function(result) {
	            if(result.api_success){
	            	if(result.count == 0){
	            		$("#search_content").html('')
	            		$("#alert_msg").text("No Result Found")
	              		$(".alert").removeClass('fade');
	            	}
	            	else{
	            		$("#alert_msg").text(result.msg)
	              		$(".alert").removeClass('fade');
	              		html = "<h4 style='padding-top: 10px;'>" + result.count + " results found for " + search_key +"</h4>"
	              		for(var i=0;i<result.data.length;i++)
	              		{
	              			song = result.data[i]
	              			html = html + '<div class="row">' + 
                    			   		'<div class="col-md-12" style="margin-top: 10px">' + 
                      						'<h3>' + song.TITLE + '</h3>' +
                      						'<h4>By ' + song.ARTIST + '</h4>' +
                      						'<h6>' + song.TITLE + ' composed by '+ song.COMPOSER + ' from the album ' + song.ALBUM +'.</h6>' +
                      						'<hr>' +
                    					'</div>' +
                  					'</div>' 
	              		}
	              		$("#search_content").html(html);
	            	}
	            }else{
	              $("#search_content").html('')
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



	$('.facet').click(function(){
		$('.facet').css('text-decoration', "")
		$('.facet').css('font-size', '1rem');
		$(this).css('text-decoration', 'underline');
		$(this).css('font-size', '15px');
		search_field = $(this).attr('data-type')
		search_key = $(this).attr('data-value')
		
		$.ajax({
         url: "/search?key=" + search_key + "&field=" + search_field,
         type: "GET",
         success: function(result) {
            if(result.api_success){
            	if(result.count == 0){
            		$("#search_content").html('')
            		$("#alert_msg").text("No Result Found")
              		$(".alert").removeClass('fade');
            	}
            	else{
            		$("#alert_msg").text(result.msg)
              		$(".alert").removeClass('fade');
              		html = "<h4 style='padding-top: 10px;'>" + result.count + " results found for " + search_key +"</h4>"
              		for(var i=0;i<result.data.length;i++)
              		{
              			song = result.data[i]
              			// url = song.TITLE.split(" ").join('+')
              			html = html + '<div class="row">' + 
                  			   		'<div class="col-md-12" style="margin-top: 10px">' + 
                    						'<h3>' + song.TITLE + '</h3>' +
                    						'<h4>By ' + song.ARTIST + '</h4>' +
                    						'<h6>' + song.TITLE + ' composed by '+ song.COMPOSER + ' from the album ' + song.ALBUM +'.</h6>' +
                    						// '<h6>Download: <a target="_blank" href="https://s3.amazonaws.com/inf551-project/Songs-II/01+-++' + url + '.mp3">'+ song.TITLE +'</a></h6>' +  
                    						'<hr>' +
                  					'</div>' +
                					'</div>' 
              		}
              		$("#search_content").html(html);
            	}
            }else{
              $("#search_content").html('')
              $("#alert_msg").text(result.msg)
              $(".alert").removeClass('fade');
            }
         },
         error: function(xhr, ajaxOptions, thrownError) {
             console.log("status " + xhr.status);
             console.log("error " + thrownError);
         }
        });
	});
});