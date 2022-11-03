//You can edit ALL of the code here
function setup() {
  // const allEpisodes = getAllEpisodes();
  // makePageForEpisodes(allEpisodes);

  const allEpisodes = getAllEpisodes();
  showAllEpisodes(allEpisodes)
}
window.onload = setup;

// function makePageForEpisodes(episodeList) {
//   const rootElem = document.getElementById("root");
//   rootElem.textContent = `Got ${episodeList.length} episode(s)`;
// }

function showAllEpisodes(episodes){
  const container = document.querySelector(".container");

  for(let episode of episodes){
    const divArticle = document.createElement("Article");

    const title = document.createElement("h1");
    title.style.border = "solid grey";
    title.style.padding = "10px"
    title.textContent = `${episode.name} - S0${episode.season}E0${episode.number}`;
    
    divArticle.appendChild(title);
    
    const image = document.createElement("img");
    image.src = episode.image.medium;
    image.style.width = "auto"
    divArticle.appendChild(image);

    const p = document.createElement("p");
    p.innerHTML = `${episode.summary}`;
    divArticle.appendChild(p);

    container.appendChild(divArticle);
  }
}

function searchEpisode(episodes){
  const div = document.createElement("div")

  for(let episode of episodes){
    const search = document.createComment("input")

    search.appendChild(div)
  }
}

