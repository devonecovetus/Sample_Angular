// Define App
"use strict";

var foodApp = angular.module('foodApp', []);

/*Home*/

/*Location*/
function mylocation($scope){
	$scope.locations = ['Kuwait City', 'Kaifan', 'Khaldiya', 'Shamiya', 'Faiha', 'Abdullah Al-Salem', 'Mansouriya', 'Rawda', 'Qadsiya', 'Nuzha'];
}
/*Location change*/
$("#mylocation").change(function(e) {
	var myplace = $(this).select().val();
	$("#locationText").html(myplace);	
});


/*Language*/
function Applanguages($scope){
	$scope.languages = ['En', 'Fr', 'De', 'Nl'];
}
/*Search Result*/
function searchSugg($scope){
	$scope.searchRes = ['American', 'Burgers', 'Frozen Yogurt', 'Iranian', 'Lebanese', 'Shawarma & Doner', 'Arabic', 'Cafe', 'Grocery', 'Italian', 'Mexican', 'Thai', 'Asian', 'Chinese', 'Healthy Food', 'Japanese', 'Pizzas', 'Egyptian', 'Indian', 'International', 'Kuwaiti', 'Shuwaikh', 'Kuwait City', 'Kaifan', 'Khaldiya', 'Shamiya', 'Faiha', 'Abdullah Al-Salem', 'Mansouriya', 'Rawda', 'Qadsiya', 'Nuzha', 'Adailiya', 'Daiya', 'Surra', 'Qortuba', 'Yarmouk', 'Dasma', 'Bneid Al Qar', 'Doha', 'Sharq', 'Dasman', 'Qibla', 'Salhiya', 'Mirqab', 'Ghornata', 'Sulaibikhat', 'Mubarakiya Camps', 'Nahda', 'Pizza Hut', 'Domino`s Pizza', 'Burger King', 'Johnny Rockets', 'KFC', 'Hardees', 'Papa John`s', 'Smashburger', 'Taco Bell', 'Rock House Sliders', 'Pastamania', 'Pinkberry', 'Applebee`s', 'Mais Alghanim', 'Maki', 'Ruby Tuesday', 'Nino', 'Casper & Gambinis', 'Pizza Express', 'Health Stop', 'Saso', 'Coffee Republic', 'Naif Chicken Restaurant', 'Enjoy', 'Proper Sliders', 'Zafran', 'China Garden', 'Awtar Libnan'];
}
/*hide suggestion*/
$(document).click(function(e) {
	e.stopPropagation();
    $("#search-suggestion").slideUp();
});

/*Today Menu's*/
function todayMenu($scope){
	$scope.todayMenus = [{image:'dishe-1.jpg', name:'North Indian', places:'10'}, {image:'dishe-2.jpg', name:'Chinese', places:'20'}, {image:'dishe-3.jpg', name:'South Indian', places:'05'}, {image:'dishe-4.jpg', name:'Desserts', places:'50'}];
}

/*Top Restaurents*/
function TopRestau($scope){
	$scope.toprestaurents = [
		{
			image:'restaurant-1.jpg',
			name:'restaurant Name',
			des:'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting',
			class:'red'
		},
		{
			image:'restaurant-2.jpg',
			name:'restaurant Name',
			des:'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting',
			class:'yello'
		},
		{
			image:'restaurant-3.jpg',
			name:'restaurant Name',
			des:'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting',
			class:'green'
		}
	];
}

/*Browse By*/
function browseBy($scope){
	
	$scope.bowseCuisine = ['American', 'Burgers', 'Frozen Yogurt', 'Iranian', 'Lebanese', 'Shawarma & Doner', 'Arabic', 'Cafe', 'Grocery', 'Italian', 'Mexican', 'Thai', 'Asian', 'Chinese', 'Healthy Food', 'Japanese', 'Pizzas', 'Egyptian', 'Indian', 'International', 'Kuwaiti'];
	
	$scope.bowseArea = ['Shuwaikh', 'Kuwait City', 'Kaifan', 'Khaldiya', 'Shamiya', 'Faiha', 'Abdullah Al-Salem', 'Mansouriya', 'Rawda', 'Qadsiya', 'Nuzha', 'Adailiya', 'Daiya', 'Surra', 'Qortuba', 'Yarmouk', 'Dasma', 'Bneid Al Qar', 'Doha', 'Sharq', 'Dasman', 'Qibla', 'Salhiya', 'Mirqab', 'Ghornata', 'Sulaibikhat', 'Mubarakiya Camps', 'Nahda'];
	
	$scope.bowseRestaurant = ['Pizza Hut', 'Domino`s Pizza', 'Burger King', 'Johnny Rockets', 'KFC', 'Hardees', 'Papa John`s', 'Smashburger', 'Taco Bell', 'Rock House Sliders', 'Pastamania', 'Pinkberry', 'Applebee`s', 'Mais Alghanim', 'Maki', 'Ruby Tuesday', 'Nino', 'Casper & Gambinis', 'Pizza Express', 'Health Stop', 'Saso', 'Coffee Republic', 'Naif Chicken Restaurant', 'Enjoy', 'Proper Sliders', 'Zafran', 'China Garden', 'Awtar Libnan'];

}

/*Get In Touch*/
function getintouch($scope){	
	$scope.getintouch = [
		{
			text:'+1 - 180234-346567',
			icon:'fa-phone'
		},
		{
			text:'Order@nccfood.com',
			icon:'fa-envelope'
		}
	];
}

/*Social*/
function footsocial($scope){	
	$scope.footsocial = [
		{
			url:'facebook.com',
			icon:'fa-facebook-f'
		},
		{
			url:'google.com',
			icon:'fa-google-plus'
		}
		,
		{
			url:'twitter.com',
			icon:'fa-twitter'
		}
	];
}

/*Social*/
function footmenu($scope){	
	$scope.footmenu = [
		{
			url:'#',
			text:'Privacy'
		},
		{
			url:'#',
			text:'Terms'
		},
		{
			url:'#',
			text:'Code of Conduct'
		},
		{
			url:'#',
			text:'Feedback'
		},
		{
			url:'#',
			text:'Security'
		},
		{
			url:'#',
			text:'Sitemap'
		}
	];
}

foodApp.controller('homeController', function($scope, $http) {	
	mylocation($scope);
	Applanguages($scope);	
	todayMenu($scope);
	TopRestau($scope);
	browseBy($scope);
	getintouch($scope);
	footsocial($scope);
	footmenu($scope);
	
	/*Search*/
	$scope.searchText = null;
	$scope.change = function(searchdata) {
		searchSugg($scope);
		$("#search-suggestion").css("display", "block");
		/*Add value*/
		$("#search-suggestion ul li").click(function(e) {
			e.preventDefault();
			var searchValue = $(this).data('value');
			$("#search").val(searchValue);
		});
	};
	
});