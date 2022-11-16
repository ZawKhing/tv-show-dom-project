//You can edit ALL of the code here
const container = document.querySelector(".container");
const search = document.getElementById("search");
const showSelector = document.getElementById("show-list");
const allShows = getAllShows();
let displayEpisodes = [];
let currentFilterSearch = "";
let seriesMode = true;

function setup() {
  displayShows(allShows);
  showList(allShows);
}

//display all shows
function displayShows(shows) {
  container.replaceChildren();

  for (let show of shows) {
    const article = document.createElement("article");
    article.classList.add("show-card");

    const leftCard = document.createElement("div");
    const middleCard = document.createElement("div");
    middleCard.classList.add("middle-card");
    const rightCard = document.createElement("div");
    const titleBar = document.createElement("div");
    titleBar.classList.add("title-bar");
    const contentBar = document.createElement("div");
    contentBar.classList.add("content-bar");

    const title = document.createElement("h2");
    title.textContent = `${show.name}`;
    titleBar.appendChild(title);

    const image = document.createElement("img");
    if (show.image) {
      image.src = show.image.medium;
    } else {
      image.src = "";
    }
    leftCard.appendChild(image);

    const summary = document.createElement("p");
    summary.innerHTML = `${show.summary}`;
    summary.classList.add("show-summary");
    middleCard.appendChild(summary);

    if (show.genres) {
      const genres = document.createElement("p");
      genres.textContent = `Genres: ${show.genres}`;
      rightCard.appendChild(genres);
    }

    if (show.status) {
      const status = document.createElement("p");
      status.textContent = `Status: ${show.status}`;
      rightCard.appendChild(status);
    }

    const rating = document.createElement("p");
    rating.textContent = `Rating: ${show.rating.average}`;
    rightCard.appendChild(rating);

    const runtime = document.createElement("p");
    runtime.textContent = `Runtime: ${show.runtime}`;
    rightCard.appendChild(runtime);

    article.appendChild(titleBar);
    contentBar.appendChild(leftCard);
    contentBar.appendChild(middleCard);
    contentBar.appendChild(rightCard);
    article.appendChild(contentBar);
    container.appendChild(article);
  }
}

//select shows lists
function showList(shows) {
  for (let show of shows) {
    const option = document.createElement("option");
    option.value = show.id;
    option.textContent = show.name;
    showSelector.appendChild(option);
  }
}

function getEpisodeForShow(showId) {
  const url = `https://api.tvmaze.com/shows/${showId}/episodes`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      displayEpisodes = result;
      displayShows(result);
    });
}

//display selected shows
showSelector.addEventListener("change", (e) => {
  const selectedShowId = e.target.value;
  seriesMode = false;
  getEpisodeForShow(selectedShowId);
});

search.addEventListener("input", (e) => {
  const currentText = e.target.value;
  if (seriesMode) {
    displayShows(
      allShows.filter((show) => {
        return show.name.toLowerCase().includes(currentText);
      })
    );
  } else {
    displayShows(
      displayEpisodes.filter((episode) => {
        return episode.name.toLowerCase().includes(currentText);
      })
    );
  };
});

window.onload = setup();
