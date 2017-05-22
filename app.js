(function () {
    'use strict';

    var stillUnfold=angular.module('stillunfold', ['ngRoute','ngAria','ngAnimate','ngMaterial','ngMessages','vcRecaptcha','infinite-scroll','angular-inview'],['$interpolateProvider', function($interpolateProvider) {
		$interpolateProvider.startSymbol('<%');
		$interpolateProvider.endSymbol('%>');
		
	}]);
	// main controllers--///
	stillUnfold.controller('SUController',['$scope','$http','$window','$compile','$location','$sce',function($scope,$http,$window,$compile,$location,$sce){
		$scope.lang=lang;
		//for like or dislike post
		//console.log($scope.likeStatus);
		$scope.changeLikes=function(id){
			
			$http.post(APPPATH+"/likePost", {id:id,status:$scope.likeStatus})
			.success(function (data, status, headers) {
				//console.log($scope.likeStatus);
				if(data.status=='1'){
					$scope.likeCount=data.post_like;
					$scope.likeStatus=data.likeStatus;
				}else{
					//console.log(data);
				}
			})
			.error(function (data, status, header) {
				alert("Something went wrong");
				window.location.reload(0);
			});
		}
		
		//subscription
		$scope.userSubscription=function(id,$event){
			//alert($scope.subStatus);
			if(id.trim()!=''){
				$http.post(APPPATH+"/subscription", {id:id,status:$scope.subStatus})
				.success(function (data, status, headers) {
				//console.log(data);
					if(data.status=='1'){
						if(data.classs){
							angular.element($event.target).addClass('subscribed').text('Subscribed');
							$scope.subStatus=false;
						}else{
							angular.element($event.target).removeClass('subscribed').text('Subscribe');
							$scope.subStatus=true;
						}
						alert(data.msg);
					}else{
						alert(data.msg);
					}
					
				})
				.error(function (data, status, header) {
					alert("Something went wrong");
					//window.location.reload(0);
				});
			
			}
		}
		
		//end here
	}]);
	// end main controllers--///
	// post controllers--///
    stillUnfold.controller('SUHomeController',['$scope','$http',function($scope,$http){
    	$scope.home={};
    	$scope.lang=lang;
    	var getHomeData=APPPATH+"/getHomeData?lang="+$scope.lang;
    	var loadPostListPath=APPPATH+"/post/ajaxLoadList";
		$scope.busyHomePost = false;
		$scope.homeListCount=1;
		$scope.stopHomePost = false;
    	$http.get(getHomeData).success(function(data, status, headers) {
		    $scope.home = data;
		    if(data.main_posts.length==10){
		    	$scope.stopHomePost = true;
		    }
		});

		$scope.loadHomePosts=function(){
			if ($scope.busyHomePost) return;
			$scope.busyHomePost = true;
			var sendData={cat:'',page:$scope.homeListCount,lang:$scope.lang};
			if($scope.stopHomePost){
				$http.post(loadPostListPath, sendData)
				.success(function (data, status, headers) {
					if(data.status=='1'){
						var items = data.msg.main;
						for (var i = 0; i < items.length; i++) {
					        $scope.home.main_posts.push(items[i]);
					    }
						//var loaddiv=angular.element(".homepost");
						//loaddiv.append($sce.trustAsHtml(data.msg.main).valueOf());
						$scope.homeListCount++;
						$scope.busyHomePost = false;
						$scope.stopHomePost = data.stop;
					}
				})
				.error(function (data, status, header) {
					console.log(data);
				});
			}
		}
    }]);

    stillUnfold.controller('SUCatController',["$scope", "$http", "$interval",function($scope, $http,$interval) {
    	$scope.storyListCount=1;
    	$scope.home={};
    	$scope.lang=lang;
    	var getCatListData=APPPATH+"/getCatListData";
    	var loadPostListPath=APPPATH+"/post/ajaxLoadList";
    	var slidesTimeIntervalInMs = 3000; 
		$scope.busyList = false;
		$scope.stopList = false;
		$scope.slideshow = false;
		$scope.cat=document.getElementById("cat_value").value;
    	$http.post(getCatListData,{slug:$scope.cat,lang:$scope.lang}).success(function(data, status, headers) {
		    $scope.home = data;
		    if(data.posts.length==10){
		    	$scope.stopList = true;
		    }
		    if(data.latest_posts.length>5){
		    	$scope.slideshow = true;
		    }
		});
		$scope.loadMorePostList = function() {
			if ($scope.busyList) return;
			$scope.busyList = true;
			var sendData={cat:$scope.cat,page:$scope.storyListCount,lang:$scope.lang};
			if($scope.stopList){
				$http.post(loadPostListPath, sendData)
				.success(function (data, status, headers) {
					if(data.status=='1'){
						var items = data.msg.main;
						for (var i = 0; i < items.length; i++) {
					        $scope.home.posts.push(items[i]);
					    }
					    $scope.busyList = false;
						$scope.stopList = data.stop;
						$scope.storyListCount++;
						
					}
				})
				.error(function (data, status, header) {
					//console.log('error');
					//window.location.reload(0);
				});
			}
		};

		$interval(function() {
			if(!$scope.slideshow) return;
			/*var elem=document.getElementsByClassName("post-floating");
			//console.log(elem[0].classList);
			var r =elem[0].classList.add("remove");
			console.log(r);*/
			var items = $scope.home.latest_posts;
			var temp1=items[0];
			items.splice(0, 1);
			items.push(temp1);
		},slidesTimeIntervalInMs);
    }]);

    stillUnfold.controller('SUDetailsController',["$scope", "$http", "$timeout","$sce","$window",function($scope, $http,$timeout,$sce,$window) {
    	$scope.home={};
    	$scope.lang=lang;
    	$scope.morepost=false;
    	$scope.nomorepost=false;
    	$scope.id=document.getElementById("post_id").value;
    	$scope.cat=document.getElementById("cat_id").value;
    	var getDetailData=APPPATH+"/getDetailData";
    	var loadPostPath=APPPATH+"/post/ajaxLoadPage";
    	$scope.busy = false;
		$scope.stop = true;
    	$scope.slideshow = false;
    	$scope.storyListCountMain = 1;
    	$http.post(getDetailData,{post_id:$scope.id,cat:$scope.cat,lang:$scope.lang}).success(function(data, status, headers) {
		    $scope.home = data;
		    if($scope.home.moreposts.length==6){
		    	$scope.morepost=true;
		    }
		    if($scope.home.moreposts.length==0){
		    	$scope.nomorepost=true;
		    }
		    if($scope.home.post_media.length>0){
		    	for(var i =0; i<$scope.home.post_media.length;i++){
		    		$scope.home.post_media[i].iframe_src = $sce.trustAsResourceUrl($scope.home.post_media[i].iframe_src);
					$scope.home.post_media[i].media_url = $sce.trustAsHtml($scope.home.post_media[i].media_url);
					$scope.home.post_media[i].post_media_description = $sce.trustAsHtml($scope.home.post_media[i].post_media_description);
		    	}
		    }
		    $timeout(function(){
		    	if($window.instgrm){
		    		$window.instgrm.Embeds.process();		
		    	}
			  	if($window.twttr){
		    		$window.twttr.widgets.load();		
		    	}
			},400);
		});
		$scope.loadMorePost = function($window) {
			if ($scope.busy) return;
			$scope.busy = true;
			
			var sendData={cat:$scope.cat,post_id:$scope.id,mainpage:$scope.storyListCountMain,lang:$scope.lang};
			if($scope.stop){
			$http.post(loadPostPath, sendData)
			.success(function (data, status, headers) {
				console.log(data);
				if(data.status=='1'){
					var items = data.msg.main;
					for (var i = 0; i < items.length; i++) {
				        $scope.home.moreposts.push(items[i]);
				    }
				    if($scope.msg.main.length==6){
				    	$scope.morepost=true;
				    }
				    
					$scope.storyListCountMain++;
					$scope.busy = false;
					$scope.stop = data.stop;
					
				}else{
					
				}
				
			})
			.error(function (data, status, header) {
				
			});
			}
		};
    }]);
    // end post controllers--///
    // news controllers--///
    stillUnfold.controller('SUHomeNewsController',['$scope','$http',function($scope,$http){
    	$scope.home={};
    	$scope.lang=lang;
    	var getNewsHomeData=APPPATH+"/getNewsHomeData?lang="+$scope.lang;
    	var loadNewsListPath=APPPATH+"/news/ajaxLoadList";
		$scope.stopHomeNews = false;
		$scope.noMoreNews = false;
		$scope.newsListCount=1;
		$scope.busyHomeNews = false;
    	$http.get(getNewsHomeData).success(function(data, status, headers) {
		    $scope.home = data;
		    if(data.main_news.length==0){
		    	$scope.noMoreNews = true;
		    }
		    if(data.main_news.length==10){
		    	$scope.stopHomeNews = true;
		    }
		});

		$scope.loadMoreNewsList=function(){
			if ($scope.busyHomeNews) return;
			$scope.busyHomeNews = true;
			var sendData={page:$scope.newsListCount,cat:'',lang:$scope.lang};
			if($scope.stopHomeNews){
				$http.post(loadNewsListPath, sendData)
				.success(function (data, status, headers) {
					if(data.status=='1'){
						var items = data.msg.main_news;
						for (var i = 0; i < items.length; i++) {
					        $scope.home.main_news.push(items[i]);
					    }
						//var loaddiv=angular.element(".homepost");
						//loaddiv.append($sce.trustAsHtml(data.msg.main).valueOf());
						$scope.newsListCount++;
						$scope.busyHomeNews = false;
						$scope.stopHomeNews = data.stop;
					}
				})
				.error(function (data, status, header) {
					console.log(data);
				});
			}
		}
    }]);

    stillUnfold.controller('SUCatNewsController',["$scope", "$http", "$interval",function($scope, $http,$interval) {
    	$scope.newsListCount=1;
    	$scope.home={};
    	$scope.lang=lang;
    	var getNewsCatListData=APPPATH+"/getNewsCatListData";
    	var loadNewsListPath=APPPATH+"/news/ajaxLoadList";
    	var slidesTimeIntervalInMs = 3000; 
		$scope.busyList = false;
		$scope.stopList = false;
		$scope.slideshow = false;
		$scope.noMoreNews = false;
		$scope.cat=document.getElementById("cat_value").value;
    	$http.post(getNewsCatListData,{slug:$scope.cat,lang:$scope.lang}).success(function(data, status, headers) {
		    $scope.home = data;
		    if(data.main_news.length==10){
		    	$scope.stopList = true;
		    }
		    if(data.main_news.length==0){
		    	$scope.noMoreNews = true;
		    }
		    if(data.latest_news.length>5){
		    	$scope.slideshow = true;
		    }
		});
		$scope.loadMoreNewsList=function(){
			if ($scope.busyList) return;
			$scope.busyList = true;
			var sendData={page:$scope.newsListCount,cat:$scope.cat,lang:$scope.lang};
			if($scope.stopList){
				$http.post(loadNewsListPath, sendData)
				.success(function (data, status, headers) {
					if(data.status=='1'){
						var items = data.msg.main_news;
						for (var i = 0; i < items.length; i++) {
					        $scope.home.main_news.push(items[i]);
					    }
						//var loaddiv=angular.element(".homepost");
						//loaddiv.append($sce.trustAsHtml(data.msg.main).valueOf());
						$scope.newsListCount++;
						$scope.busyList = false;
						$scope.stopList = data.stop;
					}
				})
				.error(function (data, status, header) {
					console.log(data);
				});
			}
		}
    }]);

    stillUnfold.controller('SUDetailsNewsController',["$scope", "$http", "$timeout","$sce","$window",function($scope, $http,$timeout,$sce,$window) {
    	$scope.home={};
    	$scope.lang=lang;
    	$scope.morenewsflag=false;
    	$scope.nomorenews=false;
    	$scope.id=document.getElementById("news_id").value;
    	$scope.cat=document.getElementById("cat_id").value;
    	var getDetailData=APPPATH+"/getDetailNewsData";
    	var loadNewsPath=APPPATH+"/news/ajaxLoadPage";
    	$scope.busyNews = false;
		$scope.stopNews = true;
    	$scope.slideshow = false;
    	$scope.newsListCountMain = 1;
    	$http.post(getDetailData,{news_id:$scope.id,cat:$scope.cat,lang:$scope.lang}).success(function(data, status, headers) {
		    $scope.home = data;
		    if($scope.home.morenews.length==6){
		    	$scope.morenewsflag=true;
		    }
		    if($scope.home.morenews.length==0){
		    	$scope.nomorenews=true;
		    }
		    if($scope.home.news_media.length>0){
		    	for(var i =0; i<$scope.home.news_media.length;i++){
		    		$scope.home.news_media[i].iframe_src = $sce.trustAsResourceUrl($scope.home.news_media[i].iframe_src);
					$scope.home.news_media[i].media_url = $sce.trustAsHtml($scope.home.news_media[i].media_url);
					$scope.home.news_media[i].news_media_description = $sce.trustAsHtml($scope.home.news_media[i].news_media_description);
		    	}
		    }
		    $timeout(function(){
		    	if($window.instgrm){
		    		$window.instgrm.Embeds.process();		
		    	}
			  	if($window.twttr){
		    		$window.twttr.widgets.load();		
		    	}
			  
			},400);
		});
		$scope.loadMoreNews = function($window) {
			//console.log('satyyasfsf');
			if ($scope.busyNews) return;
			$scope.busyNews = true;
			var sendData={cat:$scope.cat,news_id:$scope.id,mainpage:$scope.newsListCountMain,lang:$scope.lang};
			if($scope.stopNews){
				$http.post(loadNewsPath, sendData)
				.success(function (data, status, headers) {
					console.log(data);
					if(data.status=='1'){
						var items = data.msg.main;
						for (var i = 0; i < items.length; i++) {
					        $scope.home.morenews.push(items[i]);
					    }
					    if($scope.msg.main.length==6){
					    	$scope.morenewsflag=true;
					    }
						$scope.newsListCountMain++;
						$scope.busyNews = false;
						$scope.stopNews = data.stop;
						
					}else{
						
					}
					
				})
				.error(function (data, status, header) {
					//window.location.reload(0);
				});
			}
		};
    }]);

    ///------news controllers----------///

    //profile controller -- ///
    stillUnfold.controller('SUProfileController',["$scope", "$http","$sce","$window",function($scope, $http,$sce,$window) {
    	
    	var getDetailData=APPPATH+"/ajaxLoadYourList";
    	var ajaxLoadPage=APPPATH+"/profile/ajaxLoadPage";
    	$scope.home={};
    	$scope.showmorepost=false;
    	$scope.showmorenews=false;
    	$scope.showtopwriter=false;
    	$scope.showyourpost=true;
    	$scope.showyournews=true;
    	$scope.showexpertisestory=true;
    	$scope.showexpertisenews=true;
    	$scope.listpostcount=1;
    	$scope.listnewscount=1;
    	$scope.id=document.getElementById("uid").value;
    	$scope.busyPost = false;
    	$scope.busyNews = false;
		$scope.stopPost = true;
		$scope.stopNews = true;
    	$http.post(getDetailData,{id:$scope.id}).success(function(data, status, headers){
		    $scope.home = data;
		    console.log($scope.home);
		    if($scope.home.post.length==10){
		    	$scope.showmorepost=true;
		    }
		    if($scope.home.news.length==10){
		    	$scope.showmorenews=true;
		    }
		    if($scope.home.top_writers.length>0){
		    	$scope.showtopwriter=true;
		    }
		    if($scope.home.post.length>0){
		    	$scope.showyourpost=false;
		    }
		    if($scope.home.news.length>0){
		    	$scope.showyournews=false;
		    } 
		    if($scope.home.postexpertize.length>0){
		    	$scope.showexpertisestory=false;
		    }
		    if($scope.home.newsexpertize.length>0){
		    	$scope.showexpertisenews=false;
		    } 
		});
		$scope.loadMorePost = function() {
			if ($scope.busyPost) return;
			$scope.busyPost = true;
			$scope.showmorepost=false;
			var sendData={id:$scope.id,type:'post',lang:document.getElementById("post_lang").value,page:$scope.listpostcount};
			if($scope.stopPost){
				$http.post(ajaxLoadPage, sendData)
				.success(function (data, status, headers) {
					if(data.status=='1'){
						var items = data.msg;
						for (var i = 0; i < items.length; i++) {
					        $scope.home.post.push(items[i]);
					    }
					    if(data.msg.length==10){
					    	$scope.showmorepost=true;
					    }				
						$scope.busyPost = false;
						$scope.stopPost = data.stop;
						$scope.listpostcount++;
					}else{
						//window.location.reload(0);
					}
					
				})
				.error(function (data, status, header) {
					//console.log('error');
					//window.location.reload(0);
				});
			}
		};
		$scope.changelangpost = function() {
			if ($scope.busyPost) return;
			$scope.busyPost = true;
			$scope.listpostcount=1;
			$scope.showmorepost=false;
			var sendData={id:$scope.id,type:'post',lang:document.getElementById("post_lang").value,page:$scope.listpostcount};
			if($scope.stopPost){
				$http.post(ajaxLoadPage, sendData)
				.success(function (data, status, headers) {
					console.log(data);
					if(data.status=='1'){
						$scope.home.post = data.msg;
					    if(data.msg.length==10){
					    	$scope.showmorepost=true;
					    }				
						$scope.busyPost = false;
						$scope.stopPost = data.stop;
						$scope.listpostcount++;
					}else{
						//window.location.reload(0);
					}
					
				})
				.error(function (data, status, header) {
					//console.log('error');
					//window.location.reload(0);
				});
			}
		};
		$scope.loadMoreNews = function() {
			if ($scope.busyNews) return;
			$scope.busyNews = true;
			$scope.showmorenews=false;
			var sendData={id:$scope.id,type:'news',lang:document.getElementById("news_lang").value,page:$scope.listnewscount};
			if($scope.stopNews){
				$http.post(ajaxLoadPage, sendData)
				.success(function (data, status, headers) {
					if(data.status=='1'){
						var items = data.msg;
						for (var i = 0; i < items.length; i++) {
					        $scope.home.news.push(items[i]);
					    }
					    if(data.msg.length==10){
					    	$scope.showmorenews=true;
					    }				
						$scope.busyNews = false;
						$scope.stopNews = data.stop;
						$scope.listnewscount++;
					}else{
						//window.location.reload(0);
					}
					
				})
				.error(function (data, status, header) {
					//console.log('error');
					//window.location.reload(0);
				});
			}
		};
		$scope.changelangnews = function() {
			$scope.listnewscount=1;
			if ($scope.busyNews) return;
			$scope.busyNews = true;
			$scope.showmorenews=false;
			var sendData={id:$scope.id,type:'news',lang:document.getElementById("news_lang").value,page:$scope.listnewscount};
			if($scope.stopNews){
				$http.post(ajaxLoadPage, sendData)
				.success(function (data, status, headers) {
					console.log(data);
					if(data.status=='1'){
						$scope.home.news = data.msg;
					    if(data.msg.length==10){
					    	$scope.showmorenews=true;
					    }				
						$scope.busyNews = false;
						$scope.stopNews = data.stop;
						$scope.listnewscount++;
					}else{
						//window.location.reload(0);
					}
					
				})
				.error(function (data, status, header) {
					//console.log('error');
					//window.location.reload(0);
				});
			}
		};
		
    }]);
		
	//end profile controller--///

	// start Biography //
	stillUnfold.controller('SUBioController',["$scope", "$http","$sce","$window",function($scope, $http,$sce,$window) {
		var ajaxBioPage=APPPATH+"/biography/ajaxBioPage";
		var loadmoreajaxBioPage=APPPATH+"/biography/loadmoreajaxBioPage";
		var loadBioPath=APPPATH+"/biography/ajaxLoadPage";
		$scope.home = {};
		$scope.morebio = false;
		$scope.morebioactor = false;
		$scope.morebiopoliticians = false;
		$scope.morebiosport_person = false;
		$scope.busybioList = false;
		$scope.stopbioList = true;
		$scope.biographyCount_all = 1;
		$scope.biographyCount_actor = 1;
		$scope.biographyCount_sport_person = 1;
		$scope.biographyCount_politicians = 1;

		$http.post(ajaxBioPage).success(function(data, status, headers){
			console.log(data);
			$scope.home=data;
			if($scope.home.all_bio.length==12){
				$scope.morebio=true;
			}
			if($scope.home.actor.length==12){
				$scope.morebioactor=true;
			}
			if($scope.home.politicians.length==12){
				$scope.morebiopoliticians=true;
			}
			if($scope.home.sport_person.length==12){
				$scope.morebiosport_person=true;
			}
		});
		$scope.checkIfEnterKeyWasPressed = function($event){
		    var keyCode = $event.which || $event.keyCode;
		    if (keyCode === 13) {
		        $http.post(loadmoreajaxBioPage,{keyword:$scope.searchbio}).success(function(data, status, headers){
					console.log(data);
					$scope.home.all_bio=data.all_bio;
					$scope.home.actor=data.actor;
					$scope.home.politicians=data.politicians;
					$scope.home.sport_person=data.sport_person;
				});
		    }

		};
		$scope.loadMoreBiographyList = function(type='all') {
			if ($scope.busybioList) return;
			$scope.busybioList = true;
			var name=document.getElementById("searchKey").value;
			var countpage='';
			switch(type) {
			    case 'actor':
			        countpage=$scope.biographyCount_actor;
			        break;
			    case 'sport person':
			        countpage=$scope.biographyCount_sport_person;
			        break;
			    case 'politicians':
			        countpage=$scope.biographyCount_politicians;
			        break;
			    default:
			        countpage=$scope.biographyCount_all;
			}
			var sendData={page:countpage,name:name,category:type};
			if($scope.stopbioList){
				$http.post(loadBioPath, sendData)
				.success(function (data, status, headers) {
					console.log(data);
					if(data.status=='1'){
						var items = data.msg;
						switch(type) {
						    case 'actor':
						    	for (var i = 0; i < items.length; i++) {
							        $scope.home.actor.push(items[i]);
							    }
						        $scope.biographyCount_actor++;
						        if(items.length<12){
									$scope.morebioactor=false;
								}
						        break;
						    case 'sport person':
						    	for (var i = 0; i < items.length; i++) {
							        $scope.home.sport_person.push(items[i]);
							    }
						        $scope.biographyCount_sport_person++;
						        console.log(items.length+" length");
						        if(items.length<12){
									$scope.morebiosport_person=false;
								}
						        break;
						    case 'politicians':
						    	for (var i = 0; i < items.length; i++) {
							        $scope.home.politicians.push(items[i]);
							    }
						        $scope.biographyCount_politicians++;
						        if(items.length<12){
									$scope.morebiopoliticians=false;
								}
						        break;
						    default:
						    	for (var i = 0; i < items.length; i++) {
							        $scope.home.all_bio.push(items[i]);
							    }
						        $scope.biographyCount_all++;
						        if(items.length<12){
									$scope.morebio=false;
								}
						}
						$scope.busybioList = false;
						$scope.stopbioList = data.stop;
					}else{
						//window.location.reload(0);
					}
					
				})
				.error(function (data, status, header) {
					//console.log('error');
					//window.location.reload(0);
				});
			}
		};
	}]);
	stillUnfold.controller('SUBioDetails',["$scope", "$http","$sce","$window",function($scope, $http,$sce,$window) {
		var ajaxBioDetailsPage=APPPATH+"/biography/ajaxBioDetailsPage";
		$scope.home={};
		$scope.id=document.getElementById("uid").value;
		$http.post(ajaxBioDetailsPage,{id:$scope.id}).success(function(data, status, headers){
			$scope.home=data;
			console.log($scope.home);
		});
	}]);
	// end biography //
	// start Searching //
	stillUnfold.controller('SUSearchPage',["$scope", "$http","$sce","$window",function($scope, $http,$sce,$window) {
		$scope.home = {};
		$scope.showtabpost=true;
    	$scope.showtabnews=true;
    	$scope.showtabbio=true;
    	$scope.showmorepost=false;
    	$scope.showmorenews=false;
    	$scope.showmorebio=false;
		$scope.searchPostListCount=1;
		$scope.searchNewsListCount=1;
		$scope.searchBioListCount=1;
		$scope.searchkeyword = document.getElementById('searchkey').value;
		$scope.busySearchPostList = false;
		$scope.stopSearchPostList = true;
		$scope.busySearchNewsList = false;
		$scope.stopSearchNewsList = true;
		$scope.busySearchBioList = false;
		$scope.stopSearchBioList = true;
		var loadPostSearchPath=APPPATH+"/search/ajaxLoadList";
		var loadmoreajaxSerach=APPPATH+"/search/loadmoreajaxSerach";
		var loadMoreUnSerach=APPPATH+"/search/loadMoreUnSerach";
		$http.post(loadPostSearchPath, {q:$scope.searchkeyword})
		.success(function (data, status, headers) {
			console.log(data);
			$scope.home=data;
	    	if($scope.home.post.length==10){
				$scope.showmorepost=true;
	    	}
	    	if($scope.home.news.length==10){
				$scope.showmorenews=true;
	    	}
	    	if($scope.home.biography.length==12){
				$scope.showmorebio=true;
	    	}
	    	if($scope.home.post.length>0){
				$scope.showtabpost=false;
	    	}
	    	if($scope.home.news.length>0){
				$scope.showtabnews=false;
	    	}
	    	if($scope.home.biography.length>0){
				$scope.showtabbio=false;
	    	}
		});
		$scope.checkIfEnterKeyWasPressed = function($event){
		    var keyCode = $event.which || $event.keyCode;
		    if (keyCode === 13) {
		        $http.post(loadmoreajaxSerach,{q:$scope.searchkeyword}).success(function(data, status, headers){
					console.log(data);
					$scope.home.post=data.post;
					$scope.home.news=data.news;
					$scope.home.biography=data.biography;
			    	if($scope.home.post.length==10){
						$scope.showmorepost=true;
			    	}
			    	if($scope.home.news.length==10){
						$scope.showmorenews=true;
			    	}
			    	if($scope.home.biography.length==10){
						$scope.showmorebio=true;
			    	}
			    	if($scope.home.post.length==0){
						$scope.showtabpost=true;
			    	}
			    	if($scope.home.news.length==0){
						$scope.showtabnews=true;
			    	}
			    	if($scope.home.biography.length==0){
						$scope.showtabbio=true;
			    	}
				});
		    }
		};
		$scope.loadMorePostList = function($window) {
			if ($scope.busySearchPostList) return;
			$scope.busySearchPostList = true;
			var sendData={q:$scope.searchkeyword,page:$scope.searchPostListCount,type:'post',filter:$scope.post_lang};
			if($scope.stopSearchPostList){
				$http.post(loadMoreUnSerach, sendData)
				.success(function (data, status, headers) {
					console.log(data);
					var items=data.msg;
					for (var i = 0; i < items.length; i++) {
				        $scope.home.post.push(items[i]);
				    }
				    if(items.length==10){
						$scope.showmorepost=true;
			    	}
					$scope.stopSearchPostList=data.status;
					$scope.searchPostListCount++;
					$scope.busySearchPostList = false;
				})
				.error(function (data, status, header) {
					//console.log('error');
					//window.location.reload(0);
				});
			}
		};
		$scope.loadMoreNewsList = function($window) {
			if ($scope.busySearchNewsList) return;
			$scope.busySearchNewsList = true;
			var sendData={q:$scope.searchkeyword,page:$scope.searchNewsListCount,type:'news',filter:$scope.news_lang};
			if($scope.stopSearchNewsList){
				$http.post(loadMoreUnSerach, sendData)
				.success(function (data, status, headers) {
					console.log(data);
					var items=data.msg;
					for (var i = 0; i < items.length; i++) {
				        $scope.home.news.push(items[i]);
				    }
				    if(items.length==10){
						$scope.showmorenews=true;
			    	}
					$scope.stopSearchNewsList=data.status;
					$scope.searchNewsListCount++;
					$scope.busySearchNewsList = false;
				})
				.error(function (data, status, header) {
					//console.log('error');
					//window.location.reload(0);
				});
			}
		};
		$scope.loadMoreBioList = function($window) {
			if ($scope.busySearchBioList) return;
			$scope.busySearchBioList = true;
			var sendData={q:$scope.searchkeyword,page:$scope.searchBioListCount,type:'bio',filter:$scope.bio_cat};
			if($scope.stopSearchBioList){
				$http.post(loadMoreUnSerach, sendData)
				.success(function (data, status, headers) {
					console.log(data);
					var items=data.msg;
					for (var i = 0; i < items.length; i++) {
				        $scope.home.biography.push(items[i]);
				    }
				    if(items.length==10){
						$scope.showmorebio=true;
			    	}
					$scope.stopSearchBoiList=data.status;
					$scope.searchBioListCount++;
					$scope.busySearchBioList = false;
				})
				.error(function (data, status, header) {
					//console.log('error');
					//window.location.reload(0);
				});
			}
		};
		$scope.changelangpost=function($window){
			if ($scope.busySearchPostList) return;
			$scope.busySearchPostList = true;
			$scope.searchPostListCount=1;
			var sendData={q:$scope.searchkeyword,page:$scope.searchPostListCount,type:'post',filter:$scope.post_lang};
			if($scope.stopSearchPostList){
				$http.post(loadMoreUnSerach, sendData)
				.success(function (data, status, headers) {
					console.log(data);
					if(data.msg.length==10){
						$scope.showmorepost=true;
			    	}
				    $scope.home.post=data.msg;
					$scope.stopSearchPostList=data.status;
					$scope.searchPostListCount++;
					$scope.busySearchPostList = false;
				})
				.error(function (data, status, header) {
					//console.log('error');
					//window.location.reload(0);
				});
			}
		}
		$scope.changelangnews=function($window){
			if ($scope.busySearchNewsList) return;
			$scope.busySearchNewsList = true;
			$scope.searchNewsListCount=1;
			var sendData={q:$scope.searchkeyword,page:$scope.searchNewsListCount,type:'news',filter:$scope.news_lang};
			if($scope.stopSearchNewsList){
				$http.post(loadMoreUnSerach, sendData)
				.success(function (data, status, headers) {
					console.log(data);
					if(data.msg.length==10){
						$scope.showmorenews=true;
			    	}
				    $scope.home.news=data.msg;
					$scope.stopSearchNewsList=data.status;
					$scope.searchNewsListCount++;
					$scope.busySearchNewsList = false;
				})
				.error(function (data, status, header) {
					//console.log('error');
					//window.location.reload(0);
				});
			}
		}
		$scope.changelangbio=function($window){
			if ($scope.busySearchBioList) return;
			$scope.busySearchBioList = true;
			$scope.searchBioListCount=1;
			var sendData={q:$scope.searchkeyword,page:$scope.searchBioListCount,type:'bio',filter:$scope.bio_cat};
			if($scope.stopSearchBioList){
				$http.post(loadMoreUnSerach, sendData)
				.success(function (data, status, headers) {
					console.log(data);
					if(data.msg.length==10){
						$scope.showmorebio=true;
			    	}
					$scope.home.biography=data.msg;
					$scope.stopSearchBoiList=data.status;
					$scope.searchBioListCount++;
					$scope.busySearchBioList = false;
				})
				.error(function (data, status, header) {
					//console.log('error');
					//window.location.reload(0);
				});
			}
		}
	}]);
	// end Searching //
	stillUnfold.controller('submitLoginFormCtrl',["$scope", "$http", function($scope, $http) {
		
		var loginpath=APPPATH+"/root/login";
		$scope.isLoading = true;
		$scope.isloginError = true;
		$scope.submitLoginForm = function() {
			$scope.isLoading = false;
			$scope.isloginError = true;
			$("#responseMsg").html('').removeClass('alert-danger alert-success');			
			
			  $http.post(loginpath, $scope.user)
			  .success(function (data, status, headers) {
				$scope.isLoading = true;
			//console.log(data);
				if(data.status==='1'){
					window.location.reload(0);
					//window.location.href=APPPATH+"/root";
				}else{
					//alert(data.msg);
					$scope.isloginError=false;
					$("#responseMsg").addClass("alert-"+data.type).html('<strong>Warning!</strong> '+data.msg).show();
				}
			  })
			  .error(function (data, status, header) {
				$scope.isLoading = true;
				$scope.isloginError=false;//console.log(data);
				alert("Something went wrong");
				window.location.reload(0);
			  });
		};
	}]);
	stillUnfold.controller('submitRegistrationFormCtrl',["$scope", "$http","vcRecaptchaService", function($scope,$http,vcRecaptchaService){
		var regpath=APPPATH+"/root/register";
		$scope.issignError = true;
		$scope.publicKey = "6LcckCYTAAAAAIZGy7eCbKzsEqL1tqk1t0A7M8v5";
		
		//console.log(loginpath);
		$scope.isRegistReg = true;
		$scope.submitSignupForm = function() {
			$scope.isRegistReg = false;
			$scope.issignError = true;
			if(vcRecaptchaService.getResponse() === ""){ //if string is empty
        
				$("#responseSignMsg").addClass("alert-danger").html('<strong>Warning!</strong> Please resolve the captcha and submit');
            }else {
				var post_data = {  //prepare payload for request
                    'name':$scope.user.name,
                    'email':$scope.user.mail,
                    'password':$scope.user.pass,
                    '_token':$("input[name='submit_token']").val(),
                    'g-recaptcha-response':vcRecaptchaService.getResponse()  //send g-captcah-reponse to our server
                }
				
				//console.log(post_data);
				$("#responseSignMsg").html('').removeClass('alert-danger alert-success');
				$http.post(regpath, post_data)
				
				.success(function (data, status, headers) {
					$scope.isRegistReg = true;
					$scope.issignError = false;
					//console.log(data);
					if(data.status==='1'){
						$("#responseSignMsg").addClass("alert-"+data.type).html('<strong>Success!</strong> '+data.msg);
						setTimeout( function(){ window.location.href=APPPATH; },2500);
					}else{
						$("#responseSignMsg").addClass("alert-"+data.type).html('<strong>Warning!</strong> '+data.msg);
					}
				})
				.error(function (data, status, header) {
				//console.log(data);
					$scope.isRegistReg = true;
					$scope.issignError = false;
					alert("Something went wrong");
					//window.location.reload(0);
				}); 
                
            }
			
			
			
			
		}; 
	}]); 		
	
	//end here
	
	//for image lazy loadings
	// -------------------------------------------------- //
        // -------------------------------------------------- //
        // I lazily load the images, when they come into view.
    stillUnfold.directive('bnLazySrc', ['$window', '$document', function($window, $document){
		var doc = $document[0],
			body = doc.body,
			win = $window,
			$win = angular.element(win),
			uid = 0,
			elements = {};

		function getUid(el){
			var __uid = el.data("__uid");
			if (! __uid) {
				el.data("__uid", (__uid = '' + ++uid));
			}
			return __uid;
		}

		function getWindowOffset(){
			var t,
				pageXOffset = (typeof win.pageXOffset == 'number') ? win.pageXOffset : (((t = doc.documentElement) || (t = body.parentNode)) && typeof t.ScrollLeft == 'number' ? t : body).ScrollLeft,
				pageYOffset = (typeof win.pageYOffset == 'number') ? win.pageYOffset : (((t = doc.documentElement) || (t = body.parentNode)) && typeof t.ScrollTop == 'number' ? t : body).ScrollTop;
			return {
				offsetX: pageXOffset,
				offsetY: pageYOffset
			};
		}

		function isVisible(iElement){
			var elem = iElement[0],
				elemRect = elem.getBoundingClientRect(),
				windowOffset = getWindowOffset(),
				winOffsetX = windowOffset.offsetX,
				winOffsetY = windowOffset.offsetY,
				elemWidth = elemRect.width,
				elemHeight = elemRect.height,
				elemOffsetX = elemRect.left + winOffsetX,
				elemOffsetY = elemRect.top + winOffsetY,
				viewWidth = Math.max(doc.documentElement.clientWidth, win.innerWidth || 0),
				viewHeight = Math.max(doc.documentElement.clientHeight, win.innerHeight || 0),
				xVisible,
				yVisible;

			if(elemOffsetY <= winOffsetY){
				if(elemOffsetY + elemHeight >= winOffsetY){
					yVisible = true;
				}
			}else if(elemOffsetY >= winOffsetY){
				if(elemOffsetY <= winOffsetY + viewHeight){
					yVisible = true;
				}
			}

			if(elemOffsetX <= winOffsetX){
				if(elemOffsetX + elemWidth >= winOffsetX){
					xVisible = true;
				}
			}else if(elemOffsetX >= winOffsetX){
				if(elemOffsetX <= winOffsetX + viewWidth){
					xVisible = true;
				}
			}

			return xVisible && yVisible;
		};

		function checkImage(){
			Object.keys(elements).forEach(function(key){
				var obj = elements[key],
					iElement = obj.iElement,
					$scope = obj.$scope;
				if(isVisible(iElement)){
					iElement.attr('src', $scope.bnLazySrc);
				}
			});
		}
		
		$win.bind('scroll', checkImage);
		$win.bind('resize', checkImage);

		function onLoad(){
			var $el = angular.element(this),
				uid = getUid($el);

			$el.css('opacity', 1);

			if(elements.hasOwnProperty(uid)){
				delete elements[uid];
			}
		}

		return {
			restrict: 'A',
			scope: {
				bnLazySrc: '@',
				animateVisible: '@',
				animateSpeed: '@'
			},
			link: function($scope, iElement){

				iElement.bind('load', onLoad);

				$scope.$watch('bnLazySrc', function(){
					var speed = "1s";
					if ($scope.animateSpeed != null) {
						speed = $scope.animateSpeed;
					}
					if(isVisible(iElement)){
						if ($scope.animateVisible) {
							iElement.css({
								'background-color': '#fff',
								'opacity': 0,
								'-webkit-transition': 'opacity ' + speed,
								'transition': 'opacity ' + speed
							});
						}
						iElement.attr('src', $scope.bnLazySrc);
					}else{
						var uid = getUid(iElement);
						iElement.css({
							'background-color': '#fff',
							'opacity': 0,
							'-webkit-transition': 'opacity ' + speed,
							'transition': 'opacity ' + speed
						});
						elements[uid] = {
							iElement: iElement,
							$scope: $scope
						};
					}
				});

				$scope.$on('$destroy', function(){
					iElement.unbind('load');
					var uid = getUid(iElement);
					if(elements.hasOwnProperty(uid)){
						delete elements[uid];
					}
				});
			}
		};
	}]);
	
	//end here

})();
$(function(){
	$("#resetForm").submit(function(){
        var cur=$(this);
		$.ajax({
			type: "POST",
			url: APPPATH+'/checkMail',
			data: {'mail':cur.find('input[name="email"]').val(),'_token':cur.find('input[name="_token"]').val()},
			beforeSend: function () {
			   
			},
			success: function (a) {
				cur.find('#msg').html('<div>'+a.msg+'</div>');
				if(a.status=='0'){
					cur.find('#msg').addClass('alert alert-danger').show();
				}else{
					cur.find('#msg').addClass('alert alert-success').show();
					setTimeout(function(){ window.location.reload()},'2000');
				}
			}
		});
		return false;
	});	
	$("#su-login").on("click",function(){
		$(".alert").html('').hide();
		$('form').find("input[type=text], input[type=email], input[type=password], textarea").val("");
	});
});