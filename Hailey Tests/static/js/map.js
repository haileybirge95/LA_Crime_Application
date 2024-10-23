document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM fully loaded and parsed");
});

console.log("map.js is loaded"); // Check if the script is loaded

function createMap(map) {
  // Create the tile layer that will be the background of our map.
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);;

  // Initialize all the LayerGroups that we'll use.
  let layers = {
  ALL_NEIGBORHOODS: new L.LayerGroup(),
  ALL_LAPD: new L.LayerGroup(),
  GROUP_CRIME_DATA: new L.LayerGroup(),
  };
  // Create the map with our layers.
  L.map("map-id", {
    center: [34.047352742728734, -118.28269335220195],
    zoom: 12,
    layers: [
      layers.ALL_NEIGBORHOODS,
      layers.ALL_LAPD,
      layers.GROUP_CRIME_DATA,
    ]
  });
  // Create an overlays object to add to the layer control.
  let overlays = {
    "LA Neighborhoods": layers.ALL_NEIGBORHOODS,
    "LAPD Divisions": layers.ALL_LAPD,
    "LA Crime Data by Divisions": layers.GROUP_CRIME_DATA,
  };

  // Create a control for our layers, and add our overlays to it.
  L.control.layers(null, overlays).addTo(map);
}


// Store our API endpoint 
let linknhd = "https://services5.arcgis.com/7nsPwEMP38bSkCjy/arcgis/rest/services/LA_Times_Neighborhoods/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";
// Perform a GET request to the query URL/
d3.json(linknhd).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeaturesOne(data.features);
});

function createFeaturesOne(nhoodsData) {
  let neighborhoods = L.geoJSON(nhoodsData, {
    style: function(feature) {
      return {
        color: "white",
        dashArray: '3',
        weight: 1.0,
        fillColor: "purple"
      };
    },
    onEachFeature(feature, layer) {
      layer.bindPopup(`<h1>${feature.properties.name}</h1>`);
      console.log(t)
    },
  
  }).addTo(map);
  
  // Calculate and add centroids
  data.features.forEach(function(feature) {
    var centroid = turf.centroid(feature);
      L.marker([centroid.geometry.coordinates[1], centroid.geometry.coordinates[0]])
        .addTo(map)
        .bindPopup(`<h1>${feature.properties.name}</h1>`);
  });
  // Send the LAPD divisions layer to the createMap function
  createMap(neighborhoods);
};

// Use this link to get the LAPD Divisions GeoJSON data.
let linklapd = "https://services5.arcgis.com/7nsPwEMP38bSkCjy/arcgis/rest/services/LAPD_Division/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";

// Perform a GET request to the query URL/
d3.json(linklapd).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeaturesTwo(data.features);
  createFeaturesThree(data.features);
});

function createFeaturesTwo(divData) {
  let divisions = L.geoJSON(divData, {
    style: function(feature) {
      return {
        color: "black",
        weight: 1.5,
        fillColor: "purple",
        fillOpacity: 0.5
      };
    },
    onEachFeature(feature, layer) {
      layer.bindPopup(`<h1>${feature.properties.name}</h1>`);
    },
  }).addTo(map);
  // Calculate and add centroids
  data.features.forEach(function(feature) {
    var centroid = turf.centroid(feature);
      L.marker([centroid.geometry.coordinates[1], centroid.geometry.coordinates[0]])
        .addTo(map)
        .bindPopup(`<h1>${feature.properties.name}</h1>`);
  });
  // Send the LAPD divisions layer to the createMap function
  createMap(divisions);
};

function createInput(sortedpairs) {
  // Fetch the JSON data from the new endpoint
  fetch('/data')
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {
            throw new Error(`Network response was not ok: ${response.status} - ${text}`);
        });
      }
    return response.json();
  })
  .then(data => {
    let names = data.map(entry => entry.div_name);
    let uniqueNames = [... new Set(names)]
    let nameCounts = [];
    // Loop through the data and categorize each entry
    for (var i = 0; i < uniqueNames.length; i++) {  
      let j = 0
      data.forEach(entry => {
        if (entry.div_name === uniqueNames[i]) {
          j ++
        }
      });   
      nameCounts[i] = j
    }
    console.log(uniqueNames);
    console.log(nameCounts);
  })
  .catch(error => console.error('There was a problem with the fetch operation:', error));
  
  let pairs = nameCounts.map((item, index) => [item, uniqueNames[index]])
  const sortedPairs = pairs.sort((a, b) => a.nameCounts - b.nameCounts);
  return sortedpairs;
}

function chooseColor(d) {
  for (var i = 0; i < sortedpairs.length; i++) {  
    data.forEach(entry => {
      if (entry.div_name === sortedpairs[i]) {
        if (i > 15) return '#d73027';
        else if (i > 10) return '#fee08b';
        else if (i > 5) return '#d9ef8b';
        else if (i > 0) return '#91cf60';
        else if (i === 0) return '#1a9850';
        else return '#f0f0f0';
      }
    });
  }
}    

function createFeatures3(crimeData) {
    L.geoJSON(crimeData, {
    style: function(feature) {
      return {
        color: "black",
        weight: 1.5,
        fillColor: chooseColor(feature.properties.name),
        fillOpacity: 0.9
      };
    },
    onEachFeature(feature, layer) {
      layer.bindPopup(`<h1>${feature.properties.name}</h1>`);
    },
  }).addTo(map);
  // Calculate and add centroids
  data.features.forEach(function(feature) {
    var centroid = turf.centroid(feature);
      L.marker([centroid.geometry.coordinates[1], centroid.geometry.coordinates[0]])
        .addTo(map)
        .bindPopup(`<h3>${feature.properties.name}</h3><hr><p>${"Reported Crimes : " + sortedpairs.nameCounts}</p>`);
  });
  // Send the LAPD divisions layer to the createMap function
  createMap(GROUP_CRIME_DATA);
};
 


