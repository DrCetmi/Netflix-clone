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
                    movieImage.style.cursor = 'pointer';
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
        const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            console.error(`Error: ${response.status} - ${response.statusText}`);
            return;
        }

        const movieDetails = await response.json();
        console.log(movieDetails);

        const modalContainer = document.createElement('div');
        modalContainer.className = 'modal';
        modalContainer.tabIndex = '-1';
        modalContainer.id = 'myModal';

        const modalDialog = document.createElement('div');
        modalDialog.className = 'modal-dialog modal-dialog-scrollable';

        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';

        const modalHeader = document.createElement('div');
        modalHeader.className = 'modal-header';

        // Create modal title
        const modalTitle = document.createElement('h5');
        modalTitle.className = 'modal-title';
        modalTitle.textContent = movieDetails.Title;

        // Create close button
        const closeButton = document.createElement('button');
        closeButton.type = 'button';
        closeButton.className = 'btn-close';
        closeButton.setAttribute('data-bs-dismiss', 'modal');
        closeButton.setAttribute('aria-label', 'Close');

        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeButton);

        const modalBody = document.createElement('div');
        modalBody.className = 'modal-body';
        modalBody.innerHTML = `
        <div class="modal-year">
        <p>Year: ${movieDetails.Year}<p/>
        <p>Genre: ${movieDetails.Genre}<p/>
        <p>IMDB: ${movieDetails.imdbRating}<p/>
        </div>
        <img src="${movieDetails.Poster}" alt="${movieDetails.title}"></img>
        <p>${movieDetails.Plot}<p/>
        <p>Actors: ${movieDetails.Actors}<p/>
        <p>Country: ${movieDetails.Country}<p/>
        <p>Language: ${movieDetails.Language}<p/>
        <p>Runtime: ${movieDetails.Runtime}<p/>
        `;

        // Yorumlar bölümü
        const commentsSection = document.createElement('div');
        commentsSection.className = 'comments-section';

        // Yorum ekleme alanı
        const commentInput = document.createElement('textarea');
        commentInput.placeholder = 'Yorumunuzu ekleyin...';

        // Yorum ekleme butonu
        const addCommentBtn = document.createElement('button');
        addCommentBtn.type = 'button';
        addCommentBtn.className = 'btn btn-danger';
        addCommentBtn.textContent = 'Yorum Ekle';
        addCommentBtn.addEventListener('click', () => {
            // Burada yorum eklemek için gerekli işlemleri yapabilirsiniz.
        });

        // Yorumları gösterme alanı
        const commentsDisplay = document.createElement('div');
        commentsDisplay.className = 'comments-display';

        // Likes & Dislikes bölümü
        const likesDislikesSection = document.createElement('div');
        likesDislikesSection.className = 'likes-dislikes-section';

        // Beğenme butonu
        const likeBtn = document.createElement('button');
        likeBtn.type = 'button';
        likeBtn.className = 'btn btn-success';
        likeBtn.textContent = "Like";
        likeBtn.addEventListener('click', () => {
            // Burada beğeni işlemlerini yapabilirsiniz.
        });

        // Beğenmeme butonu
        const dislikeBtn = document.createElement('button');
        dislikeBtn.type = 'button';
        dislikeBtn.className = 'btn btn-danger';
        dislikeBtn.textContent = "Dislike";
        dislikeBtn.addEventListener('click', () => {
            // Burada beğenmeme işlemlerini yapabilirsiniz.
        });

        // Beğeni sayısı gösterme alanı
        const likesDisplay = document.createElement('span');
        likesDisplay.textContent = '0 likes';

        // Dislike sayısı gösterme alanı
        const dislikesDisplay = document.createElement('span');
        dislikesDisplay.textContent = '0 dislikes';

        // Beğeni ve dislike sayılarını güncelleme fonksiyonu
        const updateLikesDislikesCount = () => {
            likesDisplay.textContent = `${likes} likes`;
            dislikesDisplay.textContent = `${dislikes} dislikes`;
        };

        // Likes ve Dislikes sayılarını tutmak için değişkenler
        let likes = 0;
        let dislikes = 0;

        const modalFooter = document.createElement('div');
        modalFooter.className = 'modal-footer';

        const closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.className = 'btn btn-secondary';
        closeBtn.setAttribute('data-bs-dismiss', 'modal');
        closeBtn.textContent = 'Close';

        const saveChangesBtn = document.createElement('button');
        saveChangesBtn.type = 'button';
        saveChangesBtn.className = 'btn btn-primary';
        saveChangesBtn.textContent = 'Save changes';



        // Append elements to likesDislikesSection
        likesDislikesSection.appendChild(likeBtn);
        likesDislikesSection.appendChild(dislikeBtn);
        likesDislikesSection.appendChild(likesDisplay);
        likesDislikesSection.appendChild(dislikesDisplay);

        // Append elements to commentsSection
        commentsSection.appendChild(commentInput);
        commentsSection.appendChild(addCommentBtn);
        commentsSection.appendChild(commentsDisplay);

        // Append header, body, and footer to content
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modalContent.appendChild(likesDislikesSection);
        modalContent.appendChild(commentsSection);
        modalContent.appendChild(modalFooter);
        modalFooter.appendChild(closeBtn);
        modalFooter.appendChild(saveChangesBtn);

        // Append content to dialog
        modalDialog.appendChild(modalContent);

        // Append dialog to container
        modalContainer.appendChild(modalDialog);

        // Append modal container to the body
        document.body.appendChild(modalContainer);

        const myModal = new bootstrap.Modal(modalContainer);
        myModal.show();
    } catch (error) {
        console.error('Error in displayMovieDetailsModal:', error);
    }
}


searchMoviesData();
