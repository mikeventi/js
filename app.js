// Some Parallex effect work with jQuery
// Set the height/width of background images
function resizeBg() {
    var $bg = $('.bgimage'), winH = $(window).height(), winW = $(window).width(), aspectRatio = $bg.width() / $bg.height();
    if ((winW / winH) < aspectRatio) {
        $bg.height(winH);
    } else {
        $bg.width(winW);
    }
}

function setPanels() {
 
    var width = $(window).width(), height = $(window).height();
       
    $('#work').css({width: width, height: height});
		
		$('#work-slides').css({width: width*2, height: height});
		
		$('div.works').each(function(index){
			$(this).css({width: width, height: height});
		});
		
}
$(function(){
	$('#nav, #people-wrapper').scrollTo(0);
	$.scrollTo(0);	
});

$(window).load(function() {
    $(window).resize(function() {
			  setPanels();
        resizeBg();
    }).trigger("resize");
});


$(document).ready(function() {
	
	$("#nav").localScroll({ duration: 900 });
	$("#nav a").click(function(){
		$("#nav a").removeClass("active");
		$(this).addClass("active");
	});

	$('#nav li a img').each(function() {
		var srcs = $(this).attr('src');
		$(this).hover(function(e){
			$(this).attr('src','img/'+$(this).attr('rel').toString() +'.png');
		},function(){
			$(this).attr('src',srcs);
		}
		);
	});

	//
	// People Slide
	var totalPeople = $('.person').size();
	var currentPerson = 0;
	var lastPerson = totalPeople-1;
		
	$('#prevperson').click(function(){
		if (currentPerson != 0) {
		  	$("#people-wrapper").scrollTo($('.person').eq(currentPerson-1),500);
				currentPerson--;
		} else {
				$("#people-wrapper").scrollTo($('.person').eq(lastPerson),500);
				currentPerson = lastPerson;
		}	
  	return false;
	});
	
	$('#nextperson').click(function(){
		if (currentPerson == lastPerson) {
			$("#people-wrapper").scrollTo($('.person').eq(0),500);
			currentPerson = 0;
		} else {
			$("#people-wrapper").scrollTo($('.person').eq(currentPerson+1),500);
			currentPerson++;
		}
  	return false;
	});
	
	$('ul.names li a').each(function(index){
		$(this).click(function(event){
			event.preventDefault();
			var personIndex = $(this).attr('class');
			$("#people-wrapper").scrollTo($('.person').eq(personIndex),500);
			currentPerson = personIndex;
		});
	});


	// 
	// Work Slide
	// $('img#prevwork').click(function(){
	//   	$("#work-slides").scrollTo({top: 0, left: -$(window).width()},500);
	//   	return false;
	// });
	// 
	// $('img#nextwork').click(function(){
	//   	$("#work-slides").scrollTo({top: 0, left: $(window).width()},500);
	//   	return false;
	// });
	
	var $window = $(window);
	var $homeBG = $('#home');
	var $historyBG = $('#history');
	var $servicesBG = $('#services');
	var $studioBG = $('#studio');
	// var $workBG = $('#work');
	var $peopleBG = $('#people');
	var $connectBG = $('#connect');
		
	var windowHeight = $window.height(); //get the height of the window
	
	//apply the class "inview" to a section that is in the viewport
	$("#home, #history, #services, #people, #work, #studio, #connect").bind("inview", function (event, visible) {
			if (visible) {
			$(this).addClass("inview");
			} else {
			$(this).removeClass("inview");
			}
		});
	
	//function that is called for every pixel the user scrolls. Determines the position of the background
	/*arguments: 
		x = horizontal position of background
		windowHeight = height of the viewport
		pos = position of the scrollbar
		adjuster = adjust the position of the background
		inertia = how fast the background moves in relation to scrolling
	*/
	function newPos(x, windowHeight, pos, adjuster, inertia){
		return x + "% " + (-((windowHeight + pos) - adjuster) * inertia)  + "px";
	}
	
	//function to be called whenever the window is scrolled or resized
	function Move(){ 
		var pos = $window.scrollTop(); //position of the scrollbar
				// 
				// if($homeBG.hasClass("inview")){
				// 	//call the newPos function and change the background position
				// 	$homeBG.css({'backgroundPosition': newPos(50, windowHeight, pos, 900, 0.3)}); 
				// 	//call the newPos function and change the secnond background position
				// 	//homesprite.css({'backgroundPosition': newPos(50, windowHeight, pos, 1143, 0.6)});
				// }
				// 
				// if($historyBG.hasClass("inview")){
				// 	//call the newPos function and change the background position
				// 	$historyBG.css({'backgroundPosition': newPos(50, windowHeight, pos, 1960, 0.3)});
				// 	$('#history .label').css({'backgroundPosition': newPos(29, windowHeight, pos, 2280, 0.7)});
				// 	$('#history .sublabel').css({'backgroundPosition': newPos(24, windowHeight, pos, 2310, 0.8)});
				// 	$('#history .sprite-image').css({'backgroundPosition': newPos(15, windowHeight, pos, 2350, 0.9)});
				// }
				// 
				// if($servicesBG.hasClass("inview")){
				// 	//call the newPos function and change the background position
				// 	$servicesBG.css({'backgroundPosition': newPos(50, windowHeight, pos, 3000, 0.3)}); 
				// 	//call the newPos function and change the secnond background position
				// 	$('#services .label').css({'backgroundPosition': newPos(50, windowHeight, pos, 3670, 0.7)});
				// 	$('#services .sublabel').css({'backgroundPosition': newPos(50, windowHeight, pos, 3520, 0.8)});
				// }
				// 
				// if($peopleBG.hasClass("inview")){
				// 	//call the newPos function and change the background position
				// 	$peopleBG.css({'backgroundPosition': newPos(50, windowHeight, pos, 4060, 0.3)}); 
				// 	$('#people .label').css({'backgroundPosition': newPos(25, windowHeight, pos, 4474, 0.7)});
				// 	$('#people .sublabel').css({'backgroundPosition': newPos(20, windowHeight, pos, 4494, 0.8)});
				// 
				// }
				// 
				// if($workBG.hasClass("inview")){
				// 	// $workBG.css({'backgroundPosition': newPos(30, windowHeight, pos, 5150, 0.4)}); 
				// 	$('#work .label').css({'backgroundPosition': newPos(95, windowHeight, pos, 5400, 0.6)});
				// 	$('#work .sublabel').css({'backgroundPosition': newPos(95, windowHeight, pos, 5425, 0.8)});
				// 
				// 
				// }
				// 
				// if($studioBG.hasClass("inview")){
				// 	//call the newPos function and change the background position
				// 	$studioBG.css({'backgroundPosition': newPos(20, windowHeight, pos, 6010, 0.3)}); 
				// 	$('#studio .label').css({'backgroundPosition': newPos(20, windowHeight, pos, 6590, 0.7)});
				// 	$('#studio .sublabel').css({'backgroundPosition': newPos(20, windowHeight, pos, 6595, 0.8)});
				// }
				// 
				// if($connectBG.hasClass("inview")){
				// 	//call the newPos function and change the background position
				// 	$connectBG.css({'backgroundPosition': newPos(50, windowHeight, pos, 7100, 0.3)});
				// 	$('#connect .label').css({'backgroundPosition': newPos(50, windowHeight, pos, 7600, 0.7)});
				// 	$('#connect .sublabel').css({'backgroundPosition': newPos(50, windowHeight, pos, 7620, 0.8)});
				// 	
				// }
		

		
	}
	
  var ua = navigator.userAgent;
  function is_touch_device() { 
      try {  
          document.createEvent("TouchEvent");  
          return true;  
      } catch (e) {  
          return false;  
      }  
  }
	
  if ((is_touch_device()) || ua.match(/(iPhone|iPod|iPad)/) 
  || ua.match(/BlackBerry/) || ua.match(/Android/)) {
		return;
  } else {
		$window.resize(function(){ //if the user resizes the window...
			Move(); //move the background images in relation to the movement of the scrollbar
		});		
	
		$window.bind('scroll', function(){ //when the user is scrolling...
			Move(); //move the background images in relation to the movement of the scrollbar
		});

  }
	


		
});
