const apiKey = '2d4dd11';

async function searchMovie() {
    try {
        const movieTitle = document.querySelector(".form-control").value;
        if (!movieTitle) {
            console.error('Movie title is required.');
            return;
        }

        const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${movieTitle}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
            console.error(`Error: ${response.status} - ${response.statusText}`);
            return;
        }

        const searchData = await response.json();

        if (searchData.Response === 'True' && searchData.Search) {
            const movieDataElement = document.getElementById('movieData');
            movieDataElement.innerHTML = '';
            console.log(searchData.Search);
            searchData.Search.forEach(movie => {
                movieDataElement.innerHTML += `
                    <div class="movies-box">
                        <img src="${movie.Poster}" alt="${movie.Title} Poster">
                        <h4>${movie.Title} (${movie.Year})</h4>
                    </div>
                `;
            });
        } else {
            console.error('Movies not found');
        }
    } catch (error) {
        console.error('Error in searchMovies:', error);
    }
}

////////////////////////////////////////
const topImg = document.getElementById("top-image");
topImg.innerHTML = `
<h2>John Wick: Chapter 4 (2023)</h2>
<img src="https://m.media-amazon.com/images/M/MV5BMDExZGMyOTMtMDgyYi00NGIwLWJhMTEtOTdkZGFjNmZiMTEwXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_SX300.jpg" class="img-fluid" alt="poster">
`;


///////////////////////////////////////////

async function searchMoviesData() {
    try {
        const movieIds = [
            "tt2911666", "tt5180504", "tt2442560", "tt2085059", "tt4574334",
            "tt6763664", "tt5290382", "tt7493974", "tt4052886", "tt8005374"
        ];

        const movieDataPromises = movieIds.map(async (movieId) => {
            const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`;
            const response = await fetch(apiUrl);

            if (!response.ok) {
                console.error(`Error: ${response.status} - ${response.statusText}`);
                return null;
            }

            const movieData = await response.json();
            return movieData;
        });

        const moviesData = await Promise.all(movieDataPromises);
        console.log(moviesData);

        const moviesContainer = document.getElementById('movies');
        moviesContainer.innerHTML = '';

        moviesData.forEach(movie => {
            if (movie && movie.Response === 'True') {
                const movieBox = document.createElement('div');
                movieBox.classList.add('movies-box');

                const movieImage = document.createElement('img');
                movieImage.src = movie.Poster;
                movieImage.alt = `${movie.Title} Poster`;

                movieImage.addEventListener('click', () => {
                    const myModal = new bootstrap.Modal(document.getElementById("myModal"));
                      myModal.show();
                      
                    movieImage.style.cursor = "pointer";
                    displayMovieDetailsModal(movie.Title);
                });

                movieBox.appendChild(movieImage);
                moviesContainer.appendChild(movieBox);
            } else {
                console.error(`Movie with ID ${movie.imdbID} not found`);
            }
        });
    } catch (error) {
        console.error('Error in searchMoviesData:', error);
    }
}


async function displayMovieDetailsModal(title) {
    try {
        // Film detaylarını fetch ile çek
        const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            console.error(`Error: ${response.status} - ${response.statusText}`);
            return;
        }

        const movieDetails = await response.json();
        console.log(movieDetails);

        const modalContent = document.createElement('div');
        modalContent.innerHTML = `
            <div class="modal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${movieDetails.Title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Year: ${movieDetails.Year}</p>
                            <p>Plot: ${movieDetails.Plot}</p>
                            <!-- Diğer detayları ekleyebilirsiniz -->
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" onclick="closeModal()">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modalContent);
    } catch (error) {
        console.error('Error in displayMovieDetailsModal:', error);
    }
}

function closeModal() {
    const modal = document.querySelector('.modal-content');
    document.body.removeChild(modal);
}

searchMoviesData();
