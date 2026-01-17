const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=a6822ddc5d3df5cc15742bb7dbf7508e&language=tr-TR`;
const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const SEARCH_URL =
  "https://api.themoviedb.org/3/search/movie?api_key=a6822ddc5d3df5cc15742bb7dbf7508e&language=tr-TR&query=";

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  console.log(data.results);
  showMovies(data.results);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_URL + searchTerm);

    search.value = "";
  } else {
    window.location.reload();
  }
});

function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
         <img
          src="${IMG_PATH + poster_path}"
          alt="${title}"
        />

        <div class="movie-info">
          <h3>${title}</h3>
          <span class="green">${vote_average}</span>
        </div>

        <div class="overview">
          <h3>${title} <small>overview</small></h3>
          <p>
            ${overview}
          </p>
        </div> `;

    main.appendChild(movieEl);
  });
}
