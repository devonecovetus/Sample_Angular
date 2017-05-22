(function( $ ) {

	//Function to animate slider captions 
	function doAnimations( elems ) {
		//Cache the animationend event in a variable
		var animEndEv = 'webkitAnimationEnd animationend';
		
		elems.each(function () {
			var $this = $(this),
				$animationType = $this.data('animation');
			$this.addClass($animationType).one(animEndEv, function () {
				$this.removeClass($animationType);
			});
		});
	}
	
	//Variables on page load 
	var $myCarousel = $('#carousel-example-generic'),
		$firstAnimatingElems = $myCarousel.find('.item:first').find("[data-animation ^= 'animated']");
		
	//Initialize carousel 
	$myCarousel.carousel({
		interval:10000,
		cycle: true
		});
	
	//Animate captions in first slide on page load 
	doAnimations($firstAnimatingElems);
	
	//Pause carousel  
	//$myCarousel.carousel('pause');
	
	
	//Other slides to be animated on carousel slide event 
	$myCarousel.on('slide.bs.carousel', function (e) {
		var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
		doAnimations($animatingElems);
	});  
	
})(jQuery);

/*Sticky Menu*/

var stickyMenu = function(){
var stickyMenuWidth = $('.menu-wrapp ul').width();
var scrollTop = $(window).scrollTop();
if (scrollTop > (stickyMenuTop - 100) && scrollTop < ( $(".menu-category-body").innerHeight() + 250) ) { 
	$('.onepageNav').onePageNav();
    $('.menu-wrapp').addClass('fixed');
	$('.menu-wrapp > ul').css("width", stickyMenuWidth);
	$(".restau-menu").css("padding-top", 30);
} else {
    $('.menu-wrapp').removeClass('fixed'); 
	$(".restau-menu").css("padding-top", 0);
}
};
var url = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);	
if (url == "detail.php"){
	var stickyMenuTop = $('.menu-wrapp').offset().top;
	stickyMenu();
	
}

//stickyMenu();

var stickyNavTop = $('header').offset().top; 
var stickyNav = function(){
var scrollTop = $(window).scrollTop();
if (scrollTop > 0) { 
    $('header').addClass('fixed');
} else {
    $('header').removeClass('fixed'); 
}
};
stickyNav();


$(window).scroll(function() {
    stickyNav();	
	var url = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);	
	if (url == "detail.php"){
		stickyMenu();
	}
	
});
$(window).load(function() {
    stickyNav();	
	
	var url = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);	
	if (url == "detail.php"){
		stickyMenu();
	}

});

/*Onepage Menu Scroll*/
$('.onepageNav').onePageNav();


/*Menu Open*/

$(".card-open").click(function(e) {
	$(".restau-menu-card").removeClass("close-card");	
	$(this).next(".restau-menu-card").addClass("open");	
});
$(".card-close").click(function(e) {
	$(".restau-menu-card").removeClass("open");
	$(this).parents(".restau-menu-card").addClass("close-card");	
});

/*Meny category Hover*/
$(".menu-category > li > a").click(function(e) {
	$(this).parents(".menu-category").children("li").removeClass("active");
	$(this).parent("li").addClass("active");
});
$(".menu-category > li > a").hover( function (){
	var element = $(this);
	var leftPos = element.offset().left;
	var eleWidth = element.width();
	var eleparent = element.parents(".menu-category");
	var parentPos = element.parents(".menu-category").offset().left;
	eleparent.children(".scroller-menu").css({
		width: eleWidth,
		left : leftPos - parentPos
	});
}, 
function (){
	var element = $(this);
	var eleActive = element.parents(".menu-category").children(".active").children("a");
	var leftPos = eleActive.offset().left;
	var eleWidth = eleActive.width();
	var parentPos = element.parents(".menu-category").offset().left;
	var eleparent = element.parents(".menu-category");
	eleparent.children(".scroller-menu").css({
		width: eleWidth,
		left : leftPos - parentPos
	});
	
});
$(window).load(function(e) {
    hoverOut();
});
$(window).scroll(function(e) {
    hoverOut();
});
function hoverOut(){	
	var eleActive = $(".menu-category > li.active > a");	
	var leftPos = eleActive.offset().left;
	var eleWidth = eleActive.width();
	var eleparent = eleActive.parents(".menu-category");
	var parentPos = $(".menu-category").offset().left;
	eleparent.children(".scroller-menu").css({
		width: eleWidth,
		left : leftPos - parentPos
	});
		
}

/*Cart*/
var floatCartPos = $('.cart-checkout').offset().top; 
var floatCart = function(){
var floatCartTop = $(window).scrollTop();      
if (floatCartTop > floatCartPos) { 
    $('.floating-cart').addClass('open');
} else {
    $('.floating-cart').removeClass('open'); 
}
}; 
floatCart(); 
$(window).scroll(function() {
  floatCart();
});

/*Popup Image*/
$('.gallery').magnificPopup({
  delegate: 'a',
  type: 'image'  
});