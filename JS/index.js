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
            
            const iframeTop = document.getElementById("carouselExample");
            iframeTop.innerHTML= "";
            const moviesElements = document.getElementById("movies");
            moviesElements.innerHTML = "";
            const savedMovies = document.getElementById("saved");
            savedMovies.innerHTML = "";
        } else {
            console.error('Movies not found');
        }
    } catch (error) {
        console.error('Error in searchMovies:', error);
    }
}
async function searchMoviesData() {
    try {
        const movieIds = [
            "tt2911666", "tt5180504", "tt2442560", "tt2085059", "tt4574334","tt6763664", "tt5290382", "tt7493974", "tt4052886", "tt8005374", "tt6806448", "tt5246700", "tt8883486", "tt12361974",
            "tt4179452", "tt10919420","tt26340796","tt3371366","tt0903747","tt2707408","tt2872732","tt0803096", "tt5034838", "tt5519340","tt1375666","tt14176542","tt5090568","tt0480249",
            "tt0133093","tt1981115","tt0401855","tt7097896","tt8936646","tt1673434","tt12263384","tt7991608","tt0816711","tt10648342","tt1972591","tt1335975"
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
        const itemTitle = title;
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
        const modalTitle = document.createElement('h5');
        modalTitle.className = 'modal-title';
        modalTitle.textContent = movieDetails.Title;
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
            <p>YEAR: ${movieDetails.Year}<p/>
            <p>GENRE: ${movieDetails.Genre}<p/>
            <p>IMDB: ${movieDetails.imdbRating}<p/>
        </div>
        <img src="${movieDetails.Poster}" alt="${movieDetails.title}"></img>
        <p>${movieDetails.Plot}<p/>
        <p>ACTORS: ${movieDetails.Actors}<p/>
        <p>COUNTRY: ${movieDetails.Country}<p/>
        <p>LANGUAGE: ${movieDetails.Language}<p/>
        <p>RUNTIME: ${movieDetails.Runtime}<p/>
        `;

    const commentsSection = document.createElement('div');
    commentsSection.className = 'comments-section';
    const commentInput = document.createElement('textarea');
    commentInput.placeholder = 'Ihren Kommentar hinzufügen...';
    const addCommentBtn = document.createElement('button');
    addCommentBtn.type = 'button';
    addCommentBtn.className = 'btn btn-danger';
    addCommentBtn.textContent = 'Kommentar hinzufügen';
    
    addCommentBtn.addEventListener('click', () => {
    const newComment = commentInput.value.trim();
        if (newComment !== '') {
            const comments = JSON.parse(localStorage.getItem(`${itemTitle}_comments`)) || [];
            comments.push(newComment);
            localStorage.setItem(`${itemTitle}_comments`, JSON.stringify(comments));
            showComments();
        }
    });
    const commentsDisplay = document.createElement('div');
    commentsDisplay.className = 'comments-display';

    const showComments = () => {
    const comments = JSON.parse(localStorage.getItem(`${itemTitle}_comments`)) || [];
    commentsDisplay.innerHTML = "";
        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.innerHTML= `<img src="./assests/profil.png"></img>
            ${comment}`
            commentsDisplay.appendChild(commentElement);
        });
    };

    const likesDislikesSection = document.createElement('div');
    likesDislikesSection.className = 'likes-dislikes-section';

    let likes = parseInt(localStorage.getItem(`${itemTitle}_likes`)) || 0;
    let dislikes = parseInt(localStorage.getItem(`${itemTitle}_dislikes`)) || 0;
    let posterSave = parseInt(localStorage.getItem(`${itemTitle}_poster`)) || 0;

    const likesDisplay = document.createElement('span');
    likesDisplay.textContent = `${likes} likes`;

    const dislikesDisplay = document.createElement('span');
    dislikesDisplay.textContent = `${dislikes} dislikes`;

    const updateLikesDislikesCount = () => {
        likesDisplay.textContent = `${likes} likes`;
        dislikesDisplay.textContent = `${dislikes} dislikes`;
    };

    const likeBtn = document.createElement('button');
    likeBtn.type = 'button';
    likeBtn.className = 'btn btn-success';
    likeBtn.textContent = 'Like';

    likeBtn.addEventListener('click', () => {
        likes++;
        updateLikesDislikesCount();
        localStorage.setItem(`${itemTitle}_likes`, likes.toString());
    });

    const dislikeBtn = document.createElement('button');
    dislikeBtn.type = 'button';
    dislikeBtn.className = 'btn btn-danger';
    dislikeBtn.textContent = 'Dislike';

    dislikeBtn.addEventListener('click', () => {
    dislikes++;
    updateLikesDislikesCount();
    localStorage.setItem(`${itemTitle}_dislikes`, dislikes.toString());
    });

    updateLikesDislikesCount();
    showComments();

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
    saveChangesBtn.textContent = 'Save to the list';
    saveChangesBtn.addEventListener("click", () => {
        saveChangesBtn.className = "btn btn-success";
        const selectedMovie = {
            poster: movieDetails.Poster,
        };
        localStorage.setItem(`${selectedMovie.poster}_selectedMovie`, JSON.stringify(selectedMovie));
    });
    
    likesDislikesSection.appendChild(likeBtn);
    likesDislikesSection.appendChild(dislikeBtn);
    likesDislikesSection.appendChild(likesDisplay);
    likesDislikesSection.appendChild(dislikesDisplay);

    commentsSection.appendChild(commentInput);
    commentsSection.appendChild(addCommentBtn);
    commentsSection.appendChild(commentsDisplay);

    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(likesDislikesSection);
    modalContent.appendChild(commentsSection);
    modalContent.appendChild(modalFooter);
    modalFooter.appendChild(closeBtn);
    modalFooter.appendChild(saveChangesBtn);

    modalDialog.appendChild(modalContent);
    modalContainer.appendChild(modalDialog);
    document.body.appendChild(modalContainer);

    const myModal = new bootstrap.Modal(modalContainer);
    myModal.show();
    } catch (error) {
        console.error('Error in displayMovieDetailsModal:', error);
    }
}
searchMoviesData();


