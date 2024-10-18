// Creating the map object
let myMap = L.map("map", {
  center: [34.047352742728734, -118.28269335220195],
  zoom: 10
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Use this link to get the GeoJSON data.
let linkNeighborhood = "https://services5.arcgis.com/7nsPwEMP38bSkCjy/arcgis/rest/services/LA_Times_Neighborhoods/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";
let linkLAPDV = "https://services5.arcgis.com/7nsPwEMP38bSkCjy/arcgis/rest/services/LAPD_Division/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson";

// A function to determine the marker size based on the earthquake magnitude
// function markerSize(mag) {
//   return ((mag)+4)* 100 / 15;
// }

// The function that will determine the color of a neighborhood based on the borough that it belongs to
// function chooseColor(borough) {
//   if (borough == "Brooklyn") return "yellow";
//   else if (borough == "Bronx") return "red";
//   else if (borough == "Manhattan") return "orange";
//   else if (borough == "Queens") return "green";
//   else if (borough == "Staten Island") return "purple";
//   else return "black";
// }

d3.json(linkLAPDV).then(function(data) {
    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data, {
      // Styling each feature (in this case, a neighborhood)
       style: function(feature) {
            return {
                color: "black",
                weight: 1.5
            }
        }
    }).addTo(myMap);
})   

// Getting our GeoJSON data
d3.json(linkNeighborhood).then(function(data) {
  // Creating a GeoJSON layer with the retrieved data
  L.geoJson(data, {
    // Styling each feature (in this case, a neighborhood)
    style: function(feature) {
      return {
        color: "white",
        // Call the chooseColor() function to decide which color to color our neighborhood. (The color is based on the borough.)
        // fillColor: chooseColor(feature.properties.borough),
        fillColor: "purple",
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
    // This is called on each feature.
    onEachFeature: function(feature, layer) {
      // Set the mouse events to change the map styling.
      layer.on({
        // When a user's mouse cursor touches a map feature, the mouseover event calls this function, which makes that feature's opacity change to 90% so that it stands out.
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        // When the cursor no longer hovers over a map feature (that is, when the mouseout event occurs), the feature's opacity reverts back to 50%.
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
        // When a feature (neighborhood) is clicked, it enlarges to fit the screen.
        click: function(event) {
          myMap.fitBounds(event.target.getBounds());
        }
      });
      // Giving each feature a popup with information that's relevant to it
      layer.bindPopup("<h1>" + feature.properties.name + "</h1>");

    }
  }).addTo(myMap);
});
