// API URL for LA Crime
const LAcrimeUrl = `https://data.lacity.org/resource/2nrs-mtv8.json?$$app_token=cKFNajfV5dXE0VNv6LOpnAZqR&$limit=100000`;

// Fetch current information regarding LA Crime
d3.json(LAcrimeUrl).then(function(data) {
    console.log('Crime Information:', data);
}).catch(function(error) {
    console.error('Error fetching Crime data:', error);
});