// This is a main app file with angular js method functions
var app = angular.module("nycRestaurants", ['angularUtils.directives.dirPagination', 'ui.bootstrap']);

//triggers when website is loaded
//all the functions below take request from browser and sends it to node js server

app.controller("myController", function ($scope, $http, $location, $anchorScroll) {

//function that loads all the pre defined borough, cuisine and grade data
	$scope.loadData = function () {
	    $http.get('/borough').success(function (data) {
            $scope.borough = data;
	    });
	    $http.get('/cuisine').success(function (data) {
            $scope.cuisines = data;
	    });
	    $http.get('/grades').success(function (data) {
            $scope.grades = data;
	    });
	};

	//function that loads the data in table and plot markers for it on map(this data is default set to donut cuisine in brooklyn borough)
	$scope.loadTable = function () {
		$scope.currentPage = 1;
		$scope.pageSize = 20;
		$http.get('/initialList?borough=Brooklyn&cuisine=Donuts').success(function (data) {
            $scope.restaurants = data;
            $(document).ready(function () { //Adding the markers to the Google Maps Map. Map should be loaded first.
                var i, coords;
                for (i = 0; i < data.length; i += 1) {
                    coords = (data[i].address.coord).split(",");
                    addMarker(parseFloat(coords[1]).toFixed(6), parseFloat(coords[0]).toFixed(6), data[i].name, data[i]._id);
	            }
            });
	    });
	};
	$scope.loadData();
	$scope.loadTable();
	$scope.history = [];

	//function that apply different search filters and than when search is clicked plot on map accordingly the filtered results

	$scope.applyFilters = function () {
		$scope.currentPage = 1;
		var url = "";
        if ($scope.dropdownBorough) {
            url = url + "&borough=" + $scope.dropdownBorough;
	    }
        if ($scope.dropdownCuisines) {
            url = url + "&cuisine=" + $scope.dropdownCuisines;
	    }
        if ($scope.dropdownGrades) {
            url = url + "&grade=" + $scope.dropdownGrades;
	    }
        if ($scope.search) {
            url = url + "&search=" + $scope.search;
	    }

        $http.get('http://localhost:3000/initialList?filter=true' + url).success(function (data) {
            var i, coords;
            for (i = 0; i < markersArray.length; i += 1) {
                markersArray[i].setMap(null); //markersArray is in the file custom.js.
			}
            redrawMap(); //Just re-centering and re-zooming the map.
            for (i = 0; i < data.length; i += 1) {
                coords = (data[i].address.coord).split(",");
                addMarker(parseFloat(coords[1]).toFixed(6), parseFloat(coords[0]).toFixed(6), data[i].name);
            }
            $scope.$evalAsync(function () {
                $scope.restaurants = data;
            });
        });
    };
//function to delete restaurant from the database
	$scope.deleteRestaurant = function (id) {
		if (confirm("Confirm the deletion of this restaurant?")) {
			$http({url : 'delete', method : 'DELETE',
                   data: {id : id},
                   headers: {
                    "Content-Type": "application/json;charset=utf-8"
                }
                  }).then(function (res) {
                //console.log(res.data);
                $scope.loadData();
                $scope.loadTable();

                //window.alert("The restaurant was deleted successfully.");
            }, function (error) {
                console.log(error);
            });
        }
    };
//function to display more information about the restaurant
	$scope.loveRestaurant = function (id) {
		//window.alert(id);
		$http.get('/addFavourite?id=' + id).success(function (data) {
            //window.alert(data);
            $('.tab3').addClass('active').siblings().removeClass('active');
            $('.nav-tabs li:eq(2) a').tab('show'); 
            $http.get('/favorites').success(function (data) {
                $scope.favoriterestaurants = data;
                // console.log(data);
                //$scope.favoriterestaurants.splice(id, 1)
            });
	    });
	};

	//fucntion to get the review of resturants from the database
    $scope.reviewRestaurant = ''
    $scope.reviews = []
    $scope.getReview = function(id){
        $scope.reviews = id.reviews
        $scope.reviewRestaurant = id.name
        $('.tab4').addClass('active').siblings().removeClass('active');
    }
    //function to submit the review of a particular resturant and update it in database too
    $scope.submitReview = function(id){
        // var data = {
        //     "usname" : ($scope.reviewerName != '') ? $scope.reviewerName : 'Anonymus',
        //     "reviews" :'said:' + $scope.review
        // }
        // $scope.reviews.push(data);
        // $scope.reviewerName = 'mohaned';
        var name = document.getElementById('reviewerName').value;
        var review = document.getElementById('review').value;
        var data = { name, review };        
        $scope.reviews.push(data);
        var request = $http({method: "post", url: "/addReview", data: {id,data}}).success(function (text, status) {
			if (text) {
				//window.alert(text);
				$http.get('/favorites').success(function (data) {
                    $scope.favoriterestaurants = data;
                    // console.log(data);
                    //$scope.favoriterestaurants.splice(id, 1)
                });
			}
		});
    }

	//function to add new resaturant to database
	$scope.addRestaurant = function () {
		var postData = {
			'name' : $scope.name,
			'building' : $scope.building,
			'lat' : $scope.lat,
			'long' : $scope.long,
			'street' : $scope.street,
			'zipcode' : $scope.zipcode,
			'borough' : $scope.add_borough,
			'cuisine' : $scope.add_cuisine
        };
        var request = $http({method: "post", url: "/addNew", data: postData}).success(function (data, status) {
			if (data) {
				//window.alert(data);
				window.location.reload();
			}
		});
	};
});


