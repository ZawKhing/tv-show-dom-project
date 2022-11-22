//You can edit ALL of the code here
const container = document.querySelector(".container");
const search = document.getElementById("search");
const showSelector = document.getElementById("show-list");
const allShows = getAllShows();
let displayEpisodes = [];
let currentFilterSearch = "";
let seriesMode = true;

// setup function to load
function setup() {
  displayShows(allShows);
  showList(allShows);
  showsListing(allShows);
}

//to display all shows
function displayShows(shows) {
  container.replaceChildren();

  const sortedShow = shows.sort((a, b) => (a.name > b.name ? 1 : -1));

  for (let show of sortedShow) {
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

//to select shows lists
function showList(shows) {
  for (let show of shows) {
    const option = document.createElement("option");
    option.value = show.id;
    option.textContent = show.name;
    showSelector.appendChild(option);
  }
}

//to display all episodes for individual show
function showEpisodes(episodes) {
  container.replaceChildren();

  const episodeGrid = document.createElement("div");
  episodeGrid.classList.add("episode-grid");

  for (let episode of episodes) {
    const article = document.createElement("article");
    article.classList.add("episode-card");

    const title = document.createElement("h2");
    const formattedSeasonNumber = episode.season.toString().padStart(2, "0"); // format season number to two characters string
    const formattedEpisodeNumber = episode.number.toString().padStart(2, "0"); // format episode number to two characters string
    title.textContent = `${episode.name} - S${formattedSeasonNumber}E${formattedEpisodeNumber}`;
    article.appendChild(title);

    const image = document.createElement("img");
    if (episode.image) {
      image.src = episode.image.medium;
    } else {
      image.src = "";
    }
    article.appendChild(image);

    const summary = document.createElement("p");
    summary.innerHTML = `${episode.summary}`;
    article.appendChild(summary);

    episodeGrid.appendChild(article);
  }
  container.appendChild(episodeGrid);
}

//to get episode for show
function getEpisodeForShow(showId) {
  const url = `https://api.tvmaze.com/shows/${showId}/episodes`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      displayEpisodes = result;
      showEpisodes(result);
    });
}

//to display selected shows
showSelector.addEventListener("change", (e) => {
  const selectedShowId = e.target.value;
  seriesMode = false;
  getEpisodeForShow(selectedShowId);
});

//to search shows
search.addEventListener("input", (e) => {
  const currentText = e.target.value.toLowerCase();

  if (seriesMode) {
    displayShows(
      allShows.filter((show) => {
        return (
          show.name.toLowerCase().includes(currentText) ||
          show.summary.toLowerCase().includes(currentText) ||
          show.genres.map((genre) => genre.toLowerCase()).includes(currentText)
        );
      })
    );
  } else {
    showEpisodes(
      displayEpisodes.filter((episode) => {
        return (
          episode.name.toLowerCase().includes(currentText) ||
          episode.summary.toLowerCase().includes(currentText)
        );
      })
    );
  }
});

// create shows listing
function showsListing() {
  const switchShows = document.querySelector(".switch-show");
  const shows = document.createElement("a");
  const showsBtn = document.createElement("button");
  showsBtn.textContent = "Back To Shows";

  switchShows.addEventListener("click", (e) => {
    seriesMode = true;
    displayShows(allShows);
  });

  switchShows.appendChild(showsBtn);
}

window.onload = setup();
