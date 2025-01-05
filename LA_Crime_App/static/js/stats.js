document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");
    loadSexChart();
    loadAgeGroupChart();
});

console.log("stats.js is loaded");

// Function to load the victims by sex pie chart
function loadSexChart() {
    // Clear the previous chart if it exists
    d3.select("#sex-pie-chart").html(""); // Clear the pie chart div

    // Fetch the JSON data from the new endpoint
    fetch('/static/data/data.json')
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(`Network response was not ok: ${response.status} - ${text}`);
                });
            }
            return response.json();
        })
        .then(data => {
            // Count occurrences of M, F, and X
            let maleCount = data.filter(entry => entry.vict_sex === 'M').length;
            let femaleCount = data.filter(entry => entry.vict_sex === 'F').length;
            let otherCount = data.filter(entry => entry.vict_sex === 'X').length; // Count 'X' as Other

            // Prepare data for the pie chart
            let values = [maleCount, femaleCount, otherCount]; // Include otherCount
            let labels = ['Male Victims', 'Female Victims', 'Unknown'];
            let colors = ['#87CEFA', 'pink', '#FFD700']; // Add a color for 'Other'

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
                    text: '<b>Victims by Sex</b>',
                    font: {
                        size: 20
                    },
                    x: 0.5, // Center the title
                    xanchor: 'center' // Anchor the title to the center
                },
                height: 400,
                width: 600,
                margin: {
                    l: 20, // Left margin
                    r: 20, // Right margin
                    t: 60, // Top margin for the title
                    b: 10 // Bottom margin
                },
                paper_bgcolor: 'rgba(0,0,0,0)',
            };

            // Render the pie chart
            Plotly.newPlot('sex-pie-chart', [trace], layout);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Function to load the age group pie chart
function loadAgeGroupChart() {
    // Clear the previous chart if it exists
    d3.select("#age-pie-chart").html(""); // Clear the pie chart div

    // Fetch the JSON data from the new endpoint
    fetch('/static/data/data.json')
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
                let age = entry.vict_age;

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
                    text: '<b>Victims by Age</b>',
                    font: {
                        size: 20
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
    console.log('loadRaceChart function called');
    // Clear the previous chart if it exists
    d3.select("#race-pie-chart").html(""); // Clear the pie chart div

    // Fetch the JSON data from the new endpoint
    fetch('/static/data/data.json')
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
                'Unknown': 0
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
                    raceCounts['Unknown']++;
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
            console.log('An error occurred while fetching the data.');
            // You can also clear the chart or show a user-friendly message if needed
        });
}
// Call the function to load the race chart
loadRaceChart();

// Fetch the JSON data
fetch('/static/data/data.json')
.then(response => {
    if (!response.ok) {
        return response.text().then(text => {
            throw new Error(`Network response was not ok: ${response.status} - ${text}`);
        });
    }
    return response.json();
})
.then(data => {
    const frequency = processData(data);
    createStackedBarChart(frequency);
})
.catch(error => console.error('Error fetching data:', error));

// Function to process data
function processData(data) {
    const frequency = {};
    
    data.forEach(entry => {
        const monthNumber = parseInt(entry.day);
        const year = 2023;
        const date = new Date(year, monthNumber - 1);
        const month = date.toLocaleString('default', { month: 'long' });
        const crimeId = parseInt(entry.crime_id);
    
        // Determine the crime category based on the crime_id range
        let crimeCategory;
        if (crimeId >= 100 && crimeId < 300) {
            crimeCategory = 'Violent';
        } else if (crimeId >= 300 && crimeId < 500) {
            crimeCategory = 'Property';
        } else if (crimeId >= 500 && crimeId < 600) {
            crimeCategory = 'Stolen Vehicle';
        } else if (crimeId >= 600 && crimeId < 800) {
            crimeCategory = 'Other';
        } else if (crimeId >= 800 && crimeId < 900) {
            crimeCategory = 'Drug/Sex Crimes';
        } else if (crimeId >= 900 && crimeId < 1000) {
            crimeCategory = 'Other';
        }
    
        if (!frequency[month]) {
            frequency[month] = {};
        }
        if (!frequency[month][crimeCategory]) {
            frequency[month][crimeCategory] = 0;
        }
        frequency[month][crimeCategory]++;
    });

    console.log(frequency); // Check the frequency object
    return frequency;
}

// Create the stacked bar chart
function createStackedBarChart(frequency) {
    // Define the order of months
    const monthOrder = [
        'November', 'December', 'January', 'February', 
        'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October'
    ];

    const crimeCategories = [
        'Violent', 
        'Property', 
        'Stolen Vehicle',
        'Other',
        'Drug/Sex Crimes'
    ];
    
    const traces = crimeCategories.map(category => {
        const values = monthOrder.map(month => (frequency[month] && frequency[month][category]) || 0);
        return {
            x: monthOrder,
            y: values,
            name: category,
            type: 'bar',
        };
    });

    const layout = {
        title: {
            text: 'Crime Frequency by Month',
            font: {
                size: 24,
                family: 'Arial, sans-serif',
                color: 'black'
            }
        },
        xaxis: {
            title: {
                text: 'Months',
                font: {
                    size: 20, // Font size for the x-axis label
                    family: 'Arial, sans-serif',
                    color: 'black',
                    // 'weight' is not a valid property here; use 'bold' in the CSS style instead
                }
            },
            showgrid: true,
            zeroline: false
        },
        yaxis: {
            title: {
                text: 'Frequency (in thousands)',
                font: {
                    size: 20, // Font size for the y-axis label
                    family: 'Arial, sans-serif',
                    color: 'black',
                }
            },
            showgrid: true,
            zeroline: false
        },
        plot_bgcolor: 'rgba(240, 240, 240, 0.95)', // Light gray background
        margin: {
            l: 40,
            r: 40,
            t: 40,
            b: 40
        }
    };
    
    Plotly.newPlot('bar-chart', traces, layout);
} // Closing brace for the function