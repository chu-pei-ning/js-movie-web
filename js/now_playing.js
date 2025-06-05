const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZjlhMjRiNGI3MjkyN2Q3OTM5NzE5MzNhNTkwZTE5NSIsIm5iZiI6MTczMzE2NTk0My4yNjgsInN1YiI6IjY3NGUwMzc3ZDhhYzQ1NjczZDEzZjcxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PwyMvpZxBr8RwoIRIzuWROLSx2XZqUeBVCbtMH1iAJ0'
  }
}

// now playing movies
fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
  .then(res => res.json())
  .then(res => {
    const movieContainer = document.querySelector('.movie-container');
    const movies = res.results;

    movies.forEach(movie => {
      const movieContent = document.createElement('div');
      movieContent.classList.add('movie-content');

      const imgElement = document.createElement('img');
      imgElement.src = movie.poster_path
        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
        : 'path/to/default-image.jpg';
      imgElement.alt = movie.title;
      imgElement.classList.add('now-movie-img');
      movieContent.appendChild(imgElement);

      movieContainer.appendChild(movieContent);
    });

    initializeCarousel();
  })
  .catch(err => console.error(err));

function initializeCarousel() {
  const containers = document.querySelectorAll('.movie-content');
  let currentIndex = 0;

  function showNextImage() {
    containers[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % containers.length;
    containers[currentIndex].classList.add('active');
    containers[currentIndex].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest'});
  }

  if (containers.length > 0) {
    containers[currentIndex].classList.add('active');
    setInterval(showNextImage, 3000);
  }
}