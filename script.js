// ==========================================================================
// 1. Film Database API Logic (Connecting Form to API)
// ==========================================================================

let movieSearchForm = document.getElementById("movie-search-form");
let searchQueryInput = document.getElementById("search-query");
let movieResultsContainer = document.getElementById("movie-results");

if (movieSearchForm) {
    movieSearchForm.addEventListener("submit", function(event) {
        event.preventDefault(); 
        
        // encodeURIComponent fixes spaces and special characters in the search
        let query = encodeURIComponent(searchQueryInput.value.trim());
        movieResultsContainer.innerHTML = '<div class="col-12 text-center"><p class="text-primary fw-bold">Searching database...</p></div>';

        // Fetch data from the 3rd Party API
        fetch("https://freetestapi.com/api/v1/movies?search=" + query)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error("Server returned status code: " + response.status);
                }
                return response.json(); 
            })
            .then(function(movieData) {
                movieResultsContainer.innerHTML = ""; 
                
                if (!movieData || movieData.length === 0) {
                    movieResultsContainer.innerHTML = '<div class="col-12 text-center"><p class="text-danger">No films found matching your search. Please try another title.</p></div>';
                    return;
                }

                for (let i = 0; i < movieData.length; i++) {
                    let movie = movieData[i];
                    
                    // Fallback to "Unknown" if the API is missing genre or rating data
                    let movieGenre = movie.genre ? movie.genre.join(', ') : "Unknown";
                    let movieRating = movie.rating ? movie.rating : "N/A";
                    
                    let movieCardHTML = `
                        <div class="col-md-6 col-lg-4">
                            <div class="card h-100 shadow-sm movie-card">
                                <div class="card-body">
                                    <h4 class="card-title fw-bold text-primary">${movie.title} (${movie.year})</h4>
                                    <h6 class="card-subtitle mb-2 text-muted">Genre: ${movieGenre}</h6>
                                    <p class="card-text">${movie.plot}</p>
                                </div>
                                <div class="card-footer bg-white border-0">
                                    <span class="badge bg-success">Rating: ${movieRating}/10</span>
                                </div>
                            </div>
                        </div>
                    `;
                    
                    movieResultsContainer.innerHTML += movieCardHTML;
                }
            })
            .catch(function(error) {
                console.error("Error fetching movies:", error);
                // This will print the exact technical error directly to your webpage
                movieResultsContainer.innerHTML = '<div class="col-12 text-center"><p class="text-danger fw-bold">Error: ' + error.message + '</p><p class="text-secondary">If this says "Failed to fetch", the FreeTestAPI server is currently offline or blocking local files.</p></div>';
            });
    });
}
