// Get DOM elements
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

// Initialize variables
let keyword = "";
let page = 1;
const clientId = "DcKqvEowB4wCJwxK4Zj4W_hmSy46Z5BxX20g7saCsQk";

// Function to fetch and display images from Unsplash API
async function searchImages() {
    // Get search keyword from input box
    keyword = searchBox.value;
    // Construct API endpoint URL with pagination and client ID
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${clientId}`;

    // Fetch data from the API
    const response = await fetch(url);
    const data = await response.json();

    // Clear previous search results if it's the first page
    if (page === 1) {
        searchResult.innerHTML = "";
    }

    // Extract image results from API response
    const results = data.results;

    // Iterate over image results and create image elements with links
    results.forEach((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    });

    // Display the "Show More" button
    showMoreBtn.style.display = "block";
}

// Event listener for the search form submission
searchForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    page = 1; // Reset page to 1 when a new search is initiated
    searchResult.innerHTML = ""; // Clear previous search results
    searchImages(); // Call the searchImages function to fetch and display images
});

// Event listener for the "Show More" button click
showMoreBtn.addEventListener("click", () => {
    page++; // Increment page number for pagination
    searchImages(); // Call the searchImages function to fetch and display more images
});
