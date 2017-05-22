<!--Start : Header-->    
<?php include 'include/head.php' ?>
<!--End : Header-->

	<header>
    	<div class="container">
        	<div class="row">
            	<div class="col-sm-3 header-left">
                	<a href="index.php" title="NCC Food" class="logo" ><img src="images/logo.png" alt="NCC Food" class="img-fluid" ></a>
                </div>
                <div class="col-sm-9 header-right">                	
                    <div class="top-links">
                    	<ul class="list-inline">
                        	<li role="location"><a href="#"><i class="fa fa-map-marker"></i> <span id="locationText">Location</span></a></li>                            
                            <li role="language" class="language">
                            	<select class="form-control" ng-modal='language'>
                                	<option ng-repeat="option in languages" value="{{option}}">{{option}}</option>
                                </select>
                            </li>                            
                            <li role="menu"><a href="javascript:;"><i class="fa fa-bars"></i></a></li>
                            
                        </ul>
                    </div>
                    <div class="search-block">
                    	<form>
                        	<div class="form-group">
                            	<div class="row">
                                	<div class="col-sm-4">
                                    	<select class="form-control" ng-modal='location' id="mylocation">
                                        	<option>Location</option>
                                            <option ng-repeat="option in locations" value="{{option}}">{{option}}</option>
                                        </select>
                                    </div>
                                    <div class="col-sm-8">
                                    	<input ng-model="searchText" ng-change="change(searchdata)" type="text" id="search" class="form-control" placeholder="Search..." autocomplete="off" >
                                        <input type="submit" value="&#xf002" class="btn" >
                                        <div id="search-suggestion" class="suggestion-box" ng-modal='searchSuggestion'>
                                        	<ul>
                                            	<li ng-repeat='result in searchRes | filter:searchText' data-value='{{result}}'>{{result}}</li>
                                            </ul>
                                        </div>                                        
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div><!--Search-->
                </div>
            </div>
        </div>
    </header><!--Header-->