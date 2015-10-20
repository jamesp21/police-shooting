var data;
var map;
var whiteMen = 0;
var otherWhites = 0;
var nonWhiteMen = 0;
var otherNonWhites = 0;

// Function to draw your map
var drawMap = function() {
  // Create map and set view
   map = L.map('container').setView([38.69, -81.56], 4);

  // Create a tile layer variable using the appropriate url
  var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');

  // Add the layer to your map
  layer.addTo(map);
  L.marker([45.75, -60.46]).addTo(map)
    .bindPopup('This map contains the following race: Unknown, White, Black or African American, Asian American, Indian or Alaska Native, Native Hawaiian or Other Pacific islander')
    .openPopup();
  // Execute your function to get data
 getData();
};

// Function for getting data
var getData = function() {

  // Execute an AJAX request to get the data in data/response.js
  $.ajax({
    url:'data/response.json',
    type: "get",
    success:function(dat) {
      data = dat;
      customBuild();
    }, 
   dataType:"json"
}); 

  // When your request is successful, call your customBuild function
};

// Loop through your data and add the appropriate layers and points
var customBuild = function() {
	// Be sure to add each layer to the map
	var totalMen = 0;
	var totalPeople = data.length;
	var layerName = new L.LayerGroup([]);
	for(i = 0; i < totalPeople; i++){
		var info = data[i];
		if (info["Hit or Killed?"] == 'Killed') {
		var circle = new L.circleMarker([info.lat, info.lng], {color: "red"});
		}else {
		var circle = new L.circleMarker([info.lat, info.lng], {color: "black"});
		}
        circle.addTo(layerName);
        circle.bindPopup(info.Summary + " " + info["Source Link"]);
        if (info["Victim's Gender"] == "Male") {
        	totalMen++;
        	if (info["Race"] == "White") {
        		whiteMen++;
        	}
        }else {
        	if (info["Race"] == "White") {
        		otherWhites++;
        	}
        }
	}
	layerName.addTo(map);
	nonWhiteMen = totalMen - whiteMen;
	otherNonWhites = totalPeople - (totalMen + otherWhites);
	// Once layers are on the map, add a leaflet controller that shows/hides layers
	document.getElementById("p1").innerHTML = whiteMen;
	document.getElementById("p2").innerHTML = otherWhites;
	document.getElementById("p3").innerHTML = nonWhiteMen;
	document.getElementById("p4").innerHTML = otherNonWhites;
};
