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
    	zoom: 15
  		});

//	infowindow = new google.maps.InfoWindow();

  	locationObj = new google.maps.LatLng({lat: latt, lng: longg});
  	alert(locationObj);
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
		type: ['restaurant'],
		minPriceLevel: priceChoice
		}, callback);
  	
  	
	function callback(results, status){
		if(status === google.maps.places.PlacesServiceStatus.OK) {
			
			var resultList = [];
			
			for (var i=0;i<4;i++) {
				var html = '<div class="card">';
				html += '<div class="restName">' + results[i].name + '</div>'+ '<br>';
				html += 'Rating: ' + results[i].rating + '<br>';
				html += results[i].vicinity + '</div>';
				
				resultList += '<div class="container">' + html + '</div>' + '<br>';
				document.getElementById('test').innerHTML = resultList;
				document.getElementById('pricecheck').innerHTML = priceChoice;
				document.getElementById('distancecheck').innerHTML = distanceChoice;
			}
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













