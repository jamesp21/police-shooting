// Function to draw your map
var drawMap = function() {
  /* example fromleafletjs.com
  var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();
    */
  // Create map and set view
  var map = L.map('container').setView([38.75, -121.46], 4);

  // Create a tile layer variable using the appropriate url
  var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');

  // Add the layer to your map
  layer.addTo(map);
  L.marker([38.75, -121.46]).addTo(map)
    .bindPopup('Officers responded to a report of a vehicle prowler. Subject was shot and fataly wounded after officers arrived on the scene. Report states that subject had a gun in his possession. (link)')
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
      data = dat
    }, 
   dataType:"json"
}); 

  // When your request is successful, call your customBuild function
  customBuild();
};

// Loop through your data and add the appropriate layers and points
var customBuild = function() {
	// Be sure to add each layer to the map
	var index;
	var layerName = new L.LayerGroup([circles]);
	for(index = 0; index < getData().length; ++index){
		var info = getData[index];
		var circle = new L.circleMarker([info.lat, info.lng]);
        circle.addTo(cities);
        circle.bindPopup(info.summary);
	}
	/*var layerName = new L.LayerGroup([]));
    var circle = new L.circleMarker([latitude, longitude], options));
    circle.addTo(layer));
    circle.bindPopup(text));

	// Once layers are on the map, add a leaflet controller that shows/hides layers
    L.control.layers(null,layers).addTo(map);*/
    L.control.cities(null,cities).addTo(map);
};


