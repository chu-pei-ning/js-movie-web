const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZjlhMjRiNGI3MjkyN2Q3OTM5NzE5MzNhNTkwZTE5NSIsIm5iZiI6MTczMzE2NTk0My4yNjgsInN1YiI6IjY3NGUwMzc3ZDhhYzQ1NjczZDEzZjcxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PwyMvpZxBr8RwoIRIzuWROLSx2XZqUeBVCbtMH1iAJ0'
  }
}
const movie = document.querySelector('.movie')
const movieItems = document.querySelector('.movie-items')
const movieTab = document.querySelector('.movie-tab')
const tv = document.querySelector('.tv')
const tvItems = document.querySelector('.tv-items')
const tvTab = document.querySelector('.tv-tab')

// Movies
function fetchMovie(page = 1) {
  fetch(`https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${page}`, options)
  .then(res => res.json())
  .then(res => {
    const movies = res.results // 獲取電影列表
    movieItems.innerHTML = ''
    movies.forEach(movie => {
      // 為每部電影創建單獨的容器
      const movieContainer = document.createElement('div')
      movieContainer.classList.add('movie-list')

      // 添加圖片
      const imgElement = document.createElement('img')
      imgElement.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`
      imgElement.alt = movie.title
      imgElement.classList.add('movie-img')
      imgElement.dataset.id = movie.id // 設定電影 ID 作為 data 屬性，以照片作為查找id
      movieContainer.appendChild(imgElement)

      // 添加標題
      const liElement = document.createElement('li')
      liElement.textContent = movie.title
      liElement.classList.add('movie-title')
      movieContainer.appendChild(liElement)

      // 添加上映時間
      const pEliment = document.createElement('p')
      pEliment.textContent = movie.release_date
      pEliment.classList.add('movie-date')
      movieContainer.appendChild(pEliment)

      movieItems.appendChild(movieContainer)

      // 綁定圖片點擊事件
      imgElement.addEventListener('click', function() {
        const movieId = this.dataset.id
        fetchMovieDetails(movieId) // 點擊後撈取電影詳細資料
      })
    })
  })
  .catch(err => console.error(err))
}

let currMovPage = 1;
const totalMovPages = 500;

document.getElementById("prev-movie").addEventListener("click", () => {
  if (currMovPage > 1) {
    currMovPage--;
    fetchMovie(currMovPage);
    updateMPageDisplay();
  }
})

document.getElementById("next-movie").addEventListener("click", () => {
  if (currMovPage < totalMovPages) {
    currMovPage++;
    fetchMovie(currMovPage);
    updateMPageDisplay();
  }
})

function updateMPageDisplay() {
  document.getElementById("curr-movie-page").textContent = currMovPage;
}

function fetchMovieDetails(movieId) {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
    .then(res => res.json())
    .then(data => {
      const dialogM = document.querySelector('#movie-dialog-content')
      dialogM.innerHTML = ''

      const h1Element = document.createElement('h1')
      h1Element.textContent = data.title
      h1Element.classList.add('m-title')
      dialogM.appendChild(h1Element)

      const h3Element = document.createElement('h3')
      h3Element.textContent = `${data.original_title}`
      h3Element.classList.add('m-orig-title')
      dialogM.appendChild(h3Element)

      const imgElement = document.createElement('img')
      imgElement.src = `https://image.tmdb.org/t/p/w200${data.backdrop_path}`
      imgElement.alt = data.title
      imgElement.classList.add('m-img')
      dialogM.appendChild(imgElement)

      const pElement = document.createElement('p')
      pElement.textContent = `Overview: ${data.overview}`
      pElement.classList.add('m-overview')
      dialogM.appendChild(pElement)

      const timeEliment = document.createElement('p')
      timeEliment.textContent = `Release date: ${data.release_date}`
      timeEliment.classList.add('m-date')
      dialogM.appendChild(timeEliment)

      // 顯示模態框
      const dialogMovie = document.getElementById('movie-dialog')
      dialogMovie.style.display = 'block'

      // 關閉模態框
      document.getElementById('leave-m-btn').onclick = function () {
        dialogMovie.style.display = 'none'
      }
    })
    .catch(err => console.error('Error fetching movie details:', err));
}

movieTab.addEventListener('click', () => {
  movie.classList.remove('dis-none')
  tv.classList.add('dis-none')
})

// TV shows
function fetchTV(page = 1) {
  fetch(`https://api.themoviedb.org/3/trending/tv/day?language=en-US&page=${page}`, options)
  .then(res => res.json())
  .then(res => {
    const tvShows = res.results 
    tvItems.innerHTML = ''
    tvShows.forEach(tv => {
      const tvContainer = document.createElement('div')
      tvContainer.classList.add('tv-list')

      const imgElement = document.createElement('img')
      imgElement.src = `https://image.tmdb.org/t/p/w200${tv.poster_path}`
      imgElement.alt = tv.name
      imgElement.classList.add('tv-img')
      imgElement.dataset.id = tv.id
      tvContainer.appendChild(imgElement)

      const liElement = document.createElement('li')
      liElement.textContent = tv.name
      liElement.classList.add('tv-title')
      tvContainer.appendChild(liElement)

      const pEliment = document.createElement('p')
      pEliment.textContent = tv.first_air_date
      pEliment.classList.add('tv-date')
      tvContainer.appendChild(pEliment)

      tvItems.appendChild(tvContainer)

      imgElement.addEventListener('click', function () {
        const tvId = this.dataset.id
        fetchTVDetails(tvId)
      })
    })
  })
  .catch(err => console.error(err))
}

let currTVPage = 1;
const totalTVPages = 500;

document.getElementById("prev-tv").addEventListener("click", () => {
  if (currTVPage > 1) {
    currTVPage--;
    fetchTV(currTVPage);
    updateTvPageDisplay();
  }
})

document.getElementById("next-tv").addEventListener("click", () => {
  if (currTVPage < totalTVPages) {
    currTVPage++;
    fetchTV(currTVPage);
    updateTvPageDisplay();
  }
})

function updateTvPageDisplay() {
  document.getElementById("curr-tv-page").textContent = currTVPage;
}

function fetchTVDetails(tvId) {
  fetch(`https://api.themoviedb.org/3/tv/${tvId}?language=en-US`, options)
    .then(res => res.json())
    .then(data => {
      const dialogT = document.querySelector('#tv-dialog-content')
      dialogT.innerHTML = ''

      const h1Element = document.createElement('h1')
      h1Element.textContent = data.name
      h1Element.classList.add('t-title')
      dialogT.appendChild(h1Element)

      const h3Element = document.createElement('h3')
      h3Element.textContent = `${data.original_name}`
      h3Element.classList.add('t-orig-title')
      dialogT.appendChild(h3Element)

      const imgElement = document.createElement('img')
      imgElement.src = `https://image.tmdb.org/t/p/w500${data.backdrop_path}`
      imgElement.alt = data.name
      imgElement.classList.add('t-img')
      dialogT.appendChild(imgElement)

      const pElement = document.createElement('p')
      pElement.textContent = `Overview: ${data.overview}`
      pElement.classList.add('t-overview')
      dialogT.appendChild(pElement)

      const timeEliment = document.createElement('p')
      timeEliment.textContent = `Release date: ${data.first_air_date}`
      timeEliment.classList.add('t-date')
      dialogT.appendChild(timeEliment)

      const dialogTV = document.getElementById('tv-dialog')
      dialogTV.style.display = 'block'

      document.getElementById('leave-tv-btn').onclick = function () {
        dialogTV.style.display = 'none'
      }
    })
    .catch(err => console.error('Error fetching movie details:', err));
}

tvTab.addEventListener('click', () => {
  tv.classList.remove('dis-none')
  movie.classList.add('dis-none')
})

fetchMovie()
fetchTV()
