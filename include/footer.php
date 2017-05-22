<section class="browse-by">
    	<div class="container">
        	<div class="title"><h1>Browse by</h1></div>            
            <div class="browse-tab">
              <!-- Nav tabs -->
              <ul class="nav nav-tabs" role="tablist">
                <li role="presentation" class="active"><a href="#cuisine" aria-controls="Cuisine" role="tab" data-toggle="tab">Cuisine</a></li>
                <li role="presentation"><a href="#area" aria-controls="Area" role="tab" data-toggle="tab">Area</a></li>
                <li role="presentation"><a href="#restaurant" aria-controls="Restaurant" role="tab" data-toggle="tab">Restaurant</a></li>
              </ul>            
              <!-- Tab panes -->
              <div class="tab-content">
                <div role="tabpanel" class="tab-pane fade in active" id="cuisine">
                
                	<ul class="browse-list" ng-modal='cuisine'>
                    	<li ng-repeat="list in bowseCuisine"><a href="{{list}}">{{list}}</a></li>
                    </ul>
                    <a href="#" class="btn btn-primary btn-center">View All</a>
                    
                </div>
                <div role="tabpanel" class="tab-pane fade" id="area">
                	<ul class="browse-list" ng-modal='area'>
                    	<li ng-repeat="list in bowseArea"><a href="{{list}}">{{list}}</a></li>
                    </ul>                     
                     <a href="#" class="btn btn-primary btn-center">View All</a>
                     
                </div>
                <div role="tabpanel" class="tab-pane fade" id="restaurant">
                	<ul class="browse-list" ng-modal='restau'>
                    	<li ng-repeat="list in bowseRestaurant"><a href="{{list}}">{{list}}</a></li>
                    </ul>                    
                    <a href="#" class="btn btn-primary btn-center">View All</a>
                    
                </div>
              </div>
            
            </div>
            
        </div>
    </section><!--Browse by-->
    
    <section class="getTouch">
    	<div class="container">
        	<div class="title"><h1>Get In Touch</h1></div>
            <ul ng-modal='getin'>
            	<li><i class="fa {{getintouch[0].icon}}"></i> <a href="tel:{{getintouch[0].text}}">{{getintouch[0].text}}</a></li>
                <li><i class="fa {{getintouch[1].icon}}"></i> <a href="mailto:{{getintouch[1].text}}">{{getintouch[1].text}}</a></li>
            </ul>
            
        </div>
    </section><!--Get In Touch-->
    <footer>
    	<div class="container">
        	<div class="top">
            	<a class="logo" href="index.html"><img src="images/logo.png" alt="" class="img-fluid" ></a>
                <ul class="social" ng-modal='social'>
                	<li ng-repeat="social in footsocial"><a class="fa {{social.icon}}" href="{{social.url}}"></a></li>                    
                </ul>
            </div>
            <div class="bottom">
            	<p>Copy© 2016. All Rights Reserved</p>
                <ul class="link" ng-modal='footmenu'>
                	<li ng-repeat="footlink in footmenu"><a href="{{footlink.url}}">{{footlink.text}}</a></li>
                </ul>
            </div>
        </div>
    </footer>
    
    
<!--Start : Header-->    
<?php include 'include/foot.php' ?>
<!--End : Header-->