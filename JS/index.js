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
            // Tüm sonuçları listeleyerek HTML'e ekleme
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