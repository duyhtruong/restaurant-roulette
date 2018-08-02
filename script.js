/*	This web app returns random restaurants around the user's current location.
	Restaurants returned will be dependent on user's chosen parameters for price point,
	distance, and number of responses.

	Location services must be enabled for the program to work	*/



//using geolocation to get user's current location
if (navigator.geolocation){
	navigator.geolocation.getCurrentPosition(function(position){
  		latt = position.coords.latitude;
  		longg = position.coords.longitude;

  		var pos = {
  			lat: position.coords.latitude,
  			lng: position.coords.longitude
  		};

  	})
 }



//declaring user parameters
var priceChoice;
var distanceChoice;
var numberChoice;



//functions to set user parameters based on buttons clicked
function setPrice(pricepoint){
	priceChoice = pricepoint;
}

function setDistance(distantpoint){
	distanceChoice = distantpoint;
}

function activeColor(activate){
	if (document.getElementById(activate).classList.contains('active')){
		document.getElementById(activate).classList.remove('active')
	}
	else{
		document.getElementById(activate).classList.add('active')
	}
}

function setNumber(numberpoint){
	numberChoice = numberpoint;
}

function toCapitalize(word){
	return word.charAt(0).toUpperCase() + word.slice(1);
}


//click event to initialize map and run program
document.getElementById('go').addEventListener("click", initMap);


function initMap() {
	var pyrmont = {lat: latt, lng: longg};
	map = new google.maps.Map(document.getElementById('map'), {
    	center: pyrmont,
    	zoom: 10
  	});


	//pinning current user location on map
	var infowindow;
  	infowindow = new google.maps.InfoWindow();
  	infowindow.setPosition(pyrmont);
 	infowindow.setContent('You are here');
 	infowindow.open(map);
  	map.setCenter(pyrmont);


  	locationObj = new google.maps.LatLng({lat: latt, lng: longg});
  	

  	//making call to services library based on user parameter request
	var service = new google.maps.places.PlacesService(map);
  	service.nearbySearch({
		location: locationObj, 
		radius: distanceChoice,
		keyword: 'restaurant',
		minPriceLevel: priceChoice,
		maxPriceLevel: priceChoice
		}, callback);
  	
  	//pinning restaurants
    function createMarker(place) {
    	var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
        	map: map,
          	position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
        	infowindow.setContent(place.name);
          	infowindow.open(map, this);
        });
    }


    //callback function to deal with services results
	function callback(results, status){
		if(status === google.maps.places.PlacesServiceStatus.OK) {
			var resultList = [];
			var listRandom = [];
			
			//randomizing results
			for(var j=0;j<numberChoice;j++){
				var randomNum = Math.floor(Math.random()* (results.length - 0 + 1)) + 0;
				if (listRandom.includes(randomNum)){
					j -= 1;
				}
				else{
					listRandom.push(randomNum);
				}
			}
		
			//placing results in cards
			for(var i = 0;i<listRandom.length;i++){
				createMarker(results[listRandom[i]])
				var html = '<div class="card fade-in">';
					html += '<div class="restName">' + results[listRandom[i]].name + '</div>';
					
					//star rating based on percentage
					var ratingNum = (results[listRandom[i]].rating / 5) * 100;
					
					html += '<div class="star-rating">';
					html += '<div class="back-stars">';
					html +=	'<i class="fa fa-star" aria-hidden="true"></i>' +
								'<i class="fa fa-star" aria-hidden="true"></i>' + 
								'<i class="fa fa-star" aria-hidden="true"></i>' + 
								'<i class="fa fa-star" aria-hidden="true"></i>' +
								'<i class="fa fa-star" aria-hidden="true"></i>';
					html += '<div class="front-stars" style="width: ' + ratingNum +'%' + '">';
					html += '<i class="fa fa-star" aria-hidden="true"></i>' +
								'<i class="fa fa-star" aria-hidden="true"></i>' +
								'<i class="fa fa-star" aria-hidden="true"></i>' +
								'<i class="fa fa-star" aria-hidden="true"></i>' +
								'<i class="fa fa-star" aria-hidden="true"></i>';
					html += '</div>' + '</div>' + '</div>' + '<br>';







					html += '<div class="type">' + toCapitalize(results[listRandom[i]].types[0]) + ', ' 
							+ toCapitalize(results[listRandom[i]].types[1]) + '</div>';

					html += '<div class="address">' + results[listRandom[i]].vicinity + '</div>' + '</div>';
					resultList += '<div class="container">' + html + '</div>';
					document.getElementById('test').innerHTML = resultList;
			}
		}
		else{
			alert(status);
		}
	}
}













