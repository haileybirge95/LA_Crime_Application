document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");
    loadHomePage();
});

console.log("homepage.js is loaded");

// Function to load the homepage content
function loadHomePage() {
    const contentDiv = d3.select("#content");

    // Check if content has already been added
    if (contentDiv.select("h1").empty()) {
        // Create a heading
        contentDiv.append("h1").text("L.A. Crime: Types, Demographics, and Annual Overview");

        // Paragraph
        contentDiv.append("p").text("This application provides insights into crime statistics in Los Angeles. This information can help advise decisions on travel, relocation, school selection, and more.");

        // Subheading
        contentDiv.append("h2").text("Please use the links below to explore statistical conclusions and view the map:");

        // List of links
        const ul = contentDiv.append("ul");

        ul.append("li").append("a")
        .attr("href", "/stats")
        .attr("target", "_blank")
        .attr("class", "button blue")
        .text("Statistics");

        ul.append("li").append("a")
            .attr("href", "/map")
            .attr("target", "_blank")
            .attr("class", "button green")
            .text("Map View");

    }
}