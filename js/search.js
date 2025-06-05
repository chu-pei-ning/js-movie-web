const searchOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZjlhMjRiNGI3MjkyN2Q3OTM5NzE5MzNhNTkwZTE5NSIsIm5iZiI6MTczMzE2NTk0My4yNjgsInN1YiI6IjY3NGUwMzc3ZDhhYzQ1NjczZDEzZjcxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PwyMvpZxBr8RwoIRIzuWROLSx2XZqUeBVCbtMH1iAJ0'
  }
}

// 用于从 URL 提取参数并发送 API 请求
document.addEventListener('DOMContentLoaded', function () {
  const params = new URLSearchParams(window.location.search)
  const query = params.get('query')
  
  if (query) {
    fetch(`https://api.themoviedb.org/3/search/multi?include_adult=false&language=en-US&page=1&query=${query}`, searchOptions)
      .then(res => res.json())
      .then(res => {
        const resultsContainer = document.getElementById('results-container')
        if (!res.results || res.results.length === 0) {
          resultsContainer.textContent = 'No results found.'
          return;
        }
        res.results.forEach(result => {
          const resultDiv = document.createElement('div')

          const imgEliment = document.createElement('img')
          imgEliment.classList.add('img')
          if (result.poster_path) {
            imgEliment.src = `https://image.tmdb.org/t/p/w200${result.poster_path}` || `https://image.tmdb.org/t/p/w200${result.poster_path}`          
          } else {
            imgEliment.src = '../img/unnamed.png'
          }
          resultDiv.appendChild(imgEliment)

          const pEliment = document.createElement('p')
          pEliment.classList.add('title')
          pEliment.textContent = result.title || result.name
          resultDiv.appendChild(pEliment)

          const dateEliment = document.createElement('p')
          dateEliment.textContent = result.release_date || result.first_air_date
          resultDiv.appendChild(dateEliment)

          resultsContainer.appendChild(resultDiv)
        })
      })
      .catch(err => console.error('Error fetching data:', err))
  }
});

// 用于处理 index.html 的搜索表单
document.getElementById('search').addEventListener('submit', function (event) {
  event.preventDefault() // 阻止表单提交的默认行为
  const query = document.querySelector('.search-query').value
  // 将搜索关键词附加到 URL 并跳转到 results.html
  window.location.href = `./results.html?query=${encodeURIComponent(query)}`
})

