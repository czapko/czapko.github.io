jQuery(document).ready(function($) {
	//Append a div with hover class to all the LI
	$('#nav ul li ').append('<div class="hover"><\/div>');
	$('#nav ul li').hover(
			
		//Mouseover, fadeIn the hidden hover class	
		function() {
			$(this).children('div').fadeIn('5000');	
		}, 
		
		//Mouseout, fadeOut the hover class
		function() {
			$(this).children('div').fadeOut('5000');	
	}).click (function () {
		
		//Add selected class if user clicked on it
		$(this).addClass('selected');
		
	});

	$("#dropmenu ul").css({display: "none"}); // Opera Fix   
	$("#dropmenu li").hover(function(){          
		$(this).find('ul:first').css({visibility: "visible",display: "none"}).show(268);          
		},function(){           
		$(this).find('ul:first').css({visibility: "hidden"});   
		});  
});