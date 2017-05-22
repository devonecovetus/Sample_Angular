<!--Start : Header-->    
<?php include 'include/header.php' ?>
<!--End : Header-->

    <section class="slider-block">
    <div id="carousel-example-generic" class="carousel slide">
        <div class="carousel-inner" role="listbox">
        <div class="item active"> <img src="images/slider-1.jpg" alt="" class="img-fluid">
            <div class="carousel-caption text-uppercase text-nowrap">
            <h3 data-animation="animated bounceInUp delay-250">Find the best</h3>
            <h3 data-animation="animated bounceInUp delay-500" class="theme-red">restaurants, cafés</h3>
            <h3 data-animation="animated bounceInUp delay-750">and bars in</h3>
            <h3 data-animation="animated bounceInUp delay-1000">your city</h3>
          </div>
          </div>
        <!-- /.item -->
        
        <div class="item"> <img src="images/slider-2.jpg" alt="" class="img-fluid">
            <div class="carousel-caption text-uppercase text-nowrap">
            <h3 data-animation="animated bounceInDown delay-250">Find the best</h3>
            <h3 data-animation="animated bounceInRight delay-500" class="theme-red">restaurants, cafés</h3>
            <h3 data-animation="animated bounceInUp delay-750">and bars in</h3>
            <h3 data-animation="animated bounceInLeft delay-1000">your city</h3>
          </div>
          </div>
        <!-- /.item --> 
        <div class="item"> <img src="images/slider-3.jpg" alt="" class="img-fluid">
            <div class="carousel-caption text-uppercase text-nowrap">
            <h3 data-animation="animated bounceInUp delay-250">Find the best</h3>
            <h3 data-animation="animated bounceInUp delay-500" class="theme-red">restaurants, cafés</h3>
            <h3 data-animation="animated bounceInUp delay-750">and bars in</h3>
            <h3 data-animation="animated bounceInUp delay-1000">your city</h3>
          </div>
          </div>
        <!-- /.item --> 
        
      </div>
        <!-- /.carousel-inner --> 
        
        <!-- Controls --> 
        <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">&#xf104</a> <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">&#xf105</a> </div>
    <!-- /.carousel --> 
  </section><!--Slider-->
  
  	<section class="today-menu">
    	<div class="container">
        	<div class="title"><h1>Today's Menu</h1></div>
        	<div class="row" ng-modal='todaymenu'>
            	<div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-12" ng-repeat="menus in todayMenus | limitTo : 4">
                	<div class="dishe-box">
                    	<figure>
                        	<img src="images/{{menus.image}}" alt="" class="img-fluid" >
                        </figure>
                        <div class="name-place">
                        	<a href="#">{{menus.name}}</a>
                            <span>{{menus.places}} Places</span>
                        </div>
                    </div>
                </div><!--Dishe-Grid-->                
            </div>
            
            <a href="detail.php" class="btn btn-primary btn-center">View All</a>
            
        </div>
    </section><!--Today's Menu-->
    
    <section class="Toprestaurants">
    	<div class="container">
        	<div class="title"><h1>Top restaurant’s</h1></div>
            
        	<div class="restaurant-box {{toprestaurents[0].class}}" ng-modal="restaumodal">
            	<div class="row">
                	<div class="col-sm-6 col-xs-12 pull-xs-right">
                    	<figure><img src="images/{{toprestaurents[0].image}}" alt="" class="img-fluid" ></figure>
                    </div>
                    <div class="col-sm-6 col-xs-12 ">
                    	<div class="text">
                        	<div class="title"><h1>{{toprestaurents[0].name}}</h1></div>                            
                            <p>{{toprestaurents[0].des}}</p>                            
                            <a href="detail.php" class="btn">More</a>                            
                        </div>
                    </div>
                </div>
            </div><!--restaurant-box-->
            
            <div class="restaurant-box {{toprestaurents[1].class}}">
            	<div class="row">
                	<div class="col-sm-8 col-xs-12">
                    	<figure><img src="images/{{toprestaurents[1].image}}" alt="" class="img-fluid" ></figure>
                    </div>
                    <div class="col-sm-4 col-xs-12 ">
                    	<div class="text">
                        	<div class="title"><h1>{{toprestaurents[1].name}}</h1></div>                            
                            <p>{{toprestaurents[1].des}}</p>                            
                            <a href="detail.php" class="btn">More</a>                            
                        </div>
                    </div>
                </div>
            </div><!--restaurant-box-->
            
            <div class="restaurant-box {{toprestaurents[2].class}}" ng-modal="restaumodal">
            	<div class="row">
                	<div class="col-sm-6 col-xs-12 pull-xs-right">
                    	<figure><img src="images/{{toprestaurents[2].image}}" alt="" class="img-fluid" ></figure>
                    </div>
                    <div class="col-sm-6 col-xs-12 ">
                    	<div class="text">
                        	<div class="title"><h1>{{toprestaurents[2].name}}</h1></div>                            
                            <p>{{toprestaurents[2].des}}</p>                            
                            <a href="detail.php" class="btn">More</a>                            
                        </div>
                    </div>
                </div>
            </div><!--restaurant-box-->
            
            <a href="listing.php" class="btn btn-primary btn-center">View All</a>
        </div>
    </section><!--Top Restautant's-->
    
    
<!--Start : Footer-->    
<?php include 'include/footer.php' ?>
<!--End : Footer-->