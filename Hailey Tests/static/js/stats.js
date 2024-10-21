document.addEventListener("DOMContentLoaded", function() {
    loadHomePage(); 
});

console.log("stats.js is loaded"); // Check if the script is loaded

// Function to load the homepage content
function loadHomePage() {
    const contentDiv = d3.select("#content");

    // Check if content has already been added
    if (contentDiv.select("h1").empty()) {
        // Create a heading
        contentDiv.append("h1").text("LA Crime Information");

        // Create a paragraph
        contentDiv.append("p").text("This application provides insights into crime statistics in Los Angeles. This information can help advise decisions on travel, relocation, school selection, and more.");

        // Create a subheading
        contentDiv.append("h2").text("Please use the links below to explore different visualizations of the data:");

        // Create a list of links
        const ul = contentDiv.append("ul");

        ul.append("li").append("a")
            .attr("href", "/map")
            .attr("target", "_blank")
            .text("Map View");

        ul.append("li").append("a")
            .attr("href", "/table")
            .attr("target", "_blank")
            .text("Table View");
    }
}

// Call the function to load the homepage content after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", loadHomePage);