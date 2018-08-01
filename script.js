 if (navigator.geolocation){
  	navigator.geolocation.getCurrentPosition(function(position){
  		latt = position.coords.latitude;
  		longg = position.coords.longitude;

  		var pos = {
  			lat: position.coords.latitude,
  			lng: position.coords.longitude
  		};
  		/*var map;
  		var infowindow;
  		infowindow = new google.maps.InfoWindow();
  		map = new google.maps.Map(document.getElementById('map'));

  		infowindow.setPosition(pos);
 		infowindow.setContent('Location found.');
 		infowindow.open(map);
  		map.setCenter(pos);
*/
  	})
 }
/*
document.getElementById('priceid').addEventListener("click", function(){
	if(document.getElementById('priceid').classList.contains('active')) {
		document.getElementById('priceid').classList.remove('active')
	}
	else{
		document.getElementById('priceid').classList.add('active')
	}

})
*/
document.getElementById('go').addEventListener("click", initMap);

//var map;
//var infowindow;

//lattest = -33.867;
//lngtest = 151.195;
//var pyrmont = {lat: lattest, lng: lngtest};

function initMap() {

	var pyrmont = {lat: latt, lng: longg};
	map = new google.maps.Map(document.getElementById('map'), {
    	center: pyrmont,
    	zoom: 10
  		});

//	infowindow = new google.maps.InfoWindow();

		var infowindow;
  		infowindow = new google.maps.InfoWindow();
  		

  		infowindow.setPosition(pyrmont);
 		infowindow.setContent('You are here');
 		infowindow.open(map);
  		map.setCenter(pyrmont);


  	locationObj = new google.maps.LatLng({lat: latt, lng: longg});
  	
  	/*request = {
		location: locationObj, 
		radius: 500,
		type: ['restaurant']
		};
*/
  	var service = new google.maps.places.PlacesService(map);
  	service.nearbySearch({
		location: locationObj, 
		radius: distanceChoice,
		keyword: 'restaurant',
		minPriceLevel: priceChoice,
		maxPriceLevel: priceChoice
		}, callback);
  	
  	
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





	function callback(results, status){
		if(status === google.maps.places.PlacesServiceStatus.OK) {
			
			var resultList = [];
			
			
			var listRandom = [];
			for(var j=0;j<numberChoice;j++){
				var randomNum = Math.floor(Math.random()* (results.length - 0 + 1)) + 0;
				if (listRandom.includes(randomNum)){
					j -= 1;
				}
				else{
					listRandom.push(randomNum);
				}
				
			}
		

			for(var i = 0;i<listRandom.length;i++){
				createMarker(results[listRandom[i]])
				
				var html = '<div class="card">';
				html += '<div class="restName">' + results[listRandom[i]].name + '</div>'+ '<br>';
				html += '<div class="rating">' +'Rating: ' + results[listRandom[i]].rating + ' / 5.0' + '</div>';
				html += '<div class="type">' + toCapitalize(results[listRandom[i]].types[0]) + ', ' + toCapitalize(results[listRandom[i]].types[1]) + '</div>';
				html += '<div class="address">' + results[listRandom[i]].vicinity + '</div>' + '</div>';
				
				resultList += '<div class="container">' + html + '</div>';
				document.getElementById('test').innerHTML = resultList;
			
			}
/*
			for (var i=0;i<4;i++) {
				var html = '<div class="card">';
				html += '<div class="restName">' + results[i].name + '</div>'+ '<br>';
				html += 'Rating: ' + results[i].rating + '<br>';
				html += results[i].vicinity + '</div>';
				
				resultList += '<div class="container">' + html + '</div>' + '<br>';
				document.getElementById('test').innerHTML = resultList;
				document.getElementById('pricecheck').innerHTML = priceChoice;
				document.getElementById('distancecheck').innerHTML = distanceChoice;
			}*/
			//document.getElementById('test').innerHTML = JSON.stringify(results[0].name);
		}
		else{
			alert(status);
		}
	}
  	


}
var priceChoice;
function setPrice(pricepoint){
	priceChoice = pricepoint;
}

var distanceChoice;
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

var numberChoice;
function setNumber(numberpoint){
	numberChoice = numberpoint;
}

function toCapitalize(word){
	return word.charAt(0).toUpperCase() + word.slice(1);
}











