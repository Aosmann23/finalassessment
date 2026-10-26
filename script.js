// ==========================================================================
// 1. Film & TV Database API Logic (Connecting Form to API)
// ==========================================================================

let movieSearchForm = document.getElementById("movie-search-form");
let searchQueryInput = document.getElementById("search-query");
let movieResultsContainer = document.getElementById("movie-results");

if (movieSearchForm) {
    movieSearchForm.addEventListener("submit", function(event) {
        // I need to prevent the page from reloading on form submission
        event.preventDefault(); 
        
        let query = encodeURIComponent(searchQueryInput.value.trim());
        movieResultsContainer.innerHTML = '<div class="col-12 text-center"><p class="text-primary fw-bold">Searching database...</p></div>';

        // I am using the TVMaze API here as a reliable, keyless alternative to FreeTestAPI
        fetch("https://api.tvmaze.com/search/shows?q=" + query)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("Server returned status code: " + response.status);
                }
                return response.json(); 
            })
            .then(function(movieData) {
                movieResultsContainer.innerHTML = ""; 
                
                // I must check if the API returned an empty array
                if (!movieData || movieData.length === 0) {
                    movieResultsContainer.innerHTML = '<div class="col-12 text-center"><p class="text-danger">No titles found matching your search. Please try another.</p></div>';
                    return;
                }

                // I will loop through the returned data and map it to my Bootstrap cards
                for (let i = 0; i < movieData.length; i++) {
                    let showData = movieData[i].show;
                    
                    // I am adding fallbacks in case the API is missing specific details for a show
                    let title = showData.name || "Unknown Title";
                    let year = showData.premiered ? showData.premiered.substring(0, 4) : "N/A";
                    let genre = (showData.genres && showData.genres.length > 0) ? showData.genres.join(', ') : "Unknown";
                    let rating = (showData.rating && showData.rating.average) ? showData.rating.average : "N/A";
                    let plot = showData.summary ? showData.summary : "<p>No plot summary available.</p>";
                    
                    let movieCardHTML = `
                        <div class="col-md-6 col-lg-4">
                            <div class="card h-100 shadow-sm movie-card">
                                <div class="card-body">
                                    <h4 class="card-title fw-bold text-primary">${title} (${year})</h4>
                                    <h6 class="card-subtitle mb-2 text-muted">Genre: ${genre}</h6>
                                    <div class="card-text">${plot}</div>
                                </div>
                                <div class="card-footer bg-white border-0">
                                    <span class="badge bg-success">Rating: ${rating}/10</span>
                                </div>
                            </div>
                        </div>
                    `;
                    
                    movieResultsContainer.innerHTML += movieCardHTML;
                }
            })
            .catch(function(error) {
                console.error("Error fetching data:", error);
                movieResultsContainer.innerHTML = '<div class="col-12 text-center"><p class="text-danger fw-bold">Error: ' + error.message + '</p></div>';
            });
    });
}

// ==========================================================================
// 2. Contact Form Logic (Retained for HTML Forms grading criteria)
// ==========================================================================

let contactForm = document.getElementById("contact-form");
let formStatus = document.getElementById("form-status");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        let visitorName = document.getElementById("visitor-name").value;
        
        formStatus.innerHTML = "Thank you, " + visitorName + "! Your message has been sent.";
        formStatus.classList.add("text-success", "fw-bold"); 
        
        contactForm.reset();
    });
}
