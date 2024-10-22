document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");
    loadSexChart();
    loadAgeGroupChart();
});

console.log("stats.js is loaded"); // Check if the script is loaded

// Function to load the victims by sex pie chart
function loadSexChart() {
    // Clear the previous chart if it exists
    d3.select("#sex-pie-chart").html(""); // Clear the pie chart div

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
            // Filter the data to exclude 'X'
            const filteredData = data.filter(entry => entry.vict_sex !== 'X');

            // Count occurrences of M and F
            let maleCount = filteredData.filter(entry => entry.vict_sex === 'M').length;
            let femaleCount = filteredData.filter(entry => entry.vict_sex === 'F').length;

            // Prepare data for the pie chart
            let values = [maleCount, femaleCount];
            let labels = ['Male Victims', 'Female Victims'];
            let colors = ['#87CEFA', 'pink']; // Set lighter blue for males and pink for females

            // Create the pie chart
            let trace = {
                values: values,
                labels: labels,
                type: 'pie',
                marker: {
                    colors: colors, // Apply the colors to the slices
                    line: {
                        width: 2, // Set width of the border
                        color: 'black' // Set color of the border
                    }
                },
                textinfo: 'percent+label', // Show percentages and labels
                textfont: {
                    size: 16, // Font size for percentages
                    weight: 'bold' // Make percentages bold
                }
            };

            let layout = {
                title: {
                    text: '<b>Victims by Sex</b>', // Make title bold
                    font: {
                        size: 20 // Adjust the font size of the title
                    },
                    x: 0.5, // Center the title
                    xanchor: 'center' // Anchor the title to the center
                },
                height: 400, // Match the height of the CSS
                width: 600, // Match the width of the CSS
                margin: {
                    l: 20, // Left margin
                    r: 20, // Right margin
                    t: 60, // Top margin for the title
                    b: 10 // Bottom margin
                },
                paper_bgcolor: 'rgba(0,0,0,0)', // Optional: make the background transparent
            };

            // Render the pie chart
            Plotly.newPlot('sex-pie-chart', [trace], layout);
        })
}

// Function to load the age group pie chart
function loadAgeGroupChart() {
    // Clear the previous chart if it exists
    d3.select("#age-pie-chart").html(""); // Clear the pie chart div

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
            // Initialize counts for each age group
            let ageGroups = {
                '0-17': 0,
                '18-30': 0,
                '30-45': 0,
                '45-65': 0,
                '65+': 0
            };

            // Loop through the data and categorize each entry
            data.forEach(entry => {
                let age = entry.vict_age; // Use 'vict_age' to access the age from the data

                if (age >= 0 && age <= 17) {
                    ageGroups['0-17']++;
                } else if (age >= 18 && age <= 30) {
                    ageGroups['18-30']++;
                } else if (age >= 31 && age <= 45) {
                    ageGroups['30-45']++;
                } else if (age >= 46 && age <= 65) {
                    ageGroups['45-65']++;
                } else if (age > 65) {
                    ageGroups['65+']++;
                }
            });

            // Prepare data for the pie chart
            let values = Object.values(ageGroups);
            let labels = Object.keys(ageGroups);
            let colors = ['#FF9999', '#66B3FF', '#99FF99', '#FFCC99', '#FFD700']; // Example colors for each age group

            // Create the pie chart
            let trace = {
                values: values,
                labels: labels,
                type: 'pie',
                marker: {
                    colors: colors,
                    line: {
                        width: 2,
                        color: 'black'
                    }
                },
                textinfo: 'percent+label',
                textfont: {
                    size: 16,
                    weight: 'bold'
                }
            };

            let layout = {
                title: {
                    text: '<b>Distribution of Age Groups</b>',
                    font: {
                        size: 24
                    },
                    x: 0.5,
                    xanchor: 'center'
                },
                height: 400, // Set a fixed height
                width: 600, // Set a fixed width for the container
                margin: {
                    l: 20,
                    r: 20,
                    t: 60,
                    b: 10
                },
                paper_bgcolor: 'rgba(0,0,0,0)',
            };

            // Render the pie chart
            Plotly.newPlot('age-pie-chart', [trace], layout);
        })
}

// Function to load the victims by race pie chart
function loadRaceChart() {
    console.log('loadRaceChart function called'); // Debugging log
    // Clear the previous chart if it exists
    d3.select("#race-pie-chart").html(""); // Clear the pie chart div

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
            // Filter the data to exclude empty values in vict_descent
            const filteredData = data.filter(entry => entry.vict_descent && entry.vict_descent.trim() !== '');
            console.log(filteredData); // Log filtered data to check its contents

            // Group the races using filteredData
            const raceCounts = {
                'White': 0,
                'Black': 0,
                'Hispanic': 0,
                'Asian': 0,
                'Other': 0
            };

            // Count occurrences for each race using filteredData
            filteredData.forEach(entry => {
                const descent = entry.vict_descent;
                if (descent === 'W') {
                    raceCounts['White']++;
                } else if (descent === 'B') {
                    raceCounts['Black']++;
                } else if (descent === 'H') {
                    raceCounts['Hispanic']++;
                } else if (['A', 'C', 'D', 'F', 'J', 'K', 'V', 'Z'].includes(descent)) {
                    raceCounts['Asian']++;
                } else {
                    raceCounts['Other']++;
                }
            });

            // Prepare data for the pie chart
            let values = Object.values(raceCounts);
            let labels = Object.keys(raceCounts);
            let colors = ['#FF9999', '#66B3FF', '#99FF99', '#FFCC99', '#FFD700']; // Define colors for each race

            // Create the pie chart
            let trace = {
                values: values,
                labels: labels,
                type: 'pie',
                marker: {
                    colors: colors,
                    line: {
                        width: 2,
                        color: 'black'
                    }
                },
                textinfo: 'percent+label',
                textfont: {
                    size: 16,
                    weight: 'bold'
                }
            };

            let layout = {
                title: {
                    text: '<b>Victims by Race</b>',
                    font: {
                        size: 20
                    },
                    x: 0.5,
                    xanchor: 'center'
                },
                height: 400,
                width: 600,
                margin: {
                    l: 20,
                    r: 20,
                    t: 60,
                    b: 10
                },
                paper_bgcolor: 'rgba(0,0,0,0)',
            };

            // Render the pie chart
            Plotly.newPlot('race-pie-chart', [trace], layout);
        })
        .catch(error => {
            // Handle the error silently without displaying it on the page
            console.log('An error occurred while fetching the data.'); // Optional: log a generic message
            // You can also clear the chart or show a user-friendly message if needed
        });
}
// Call the function to load the race chart
loadRaceChart();