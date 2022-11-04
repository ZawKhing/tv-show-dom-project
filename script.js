//You can edit ALL of the code here
const search = document.getElementById("search");
const totalEpisodes = document.getElementById("total-episodes");
const matchEpisodes = document.getElementById("matching-ep")

let allEpisodes =  getAllEpisodes();

function setup() {
     showAllEpisodes(allEpisodes);
}

// function makePageForEpisodes(episodeList) {
//   const rootElem = document.getElementById("root");
//   rootElem.textContent = `Got ${episodeList.length} episode(s)`;
// }

function showAllEpisodes(episodes){
  const container = document.querySelector(".container");
  container.innerHTML = "";
  totalEpisodes.innerText = allEpisodes.length; 

  for(let episode of episodes){
    const article = document.createElement("Article");
  
    const title = document.createElement("h2");
    const formattedEpNumber = ((episode.number.toString()).padStart(2,"0"))// format number to two characters string
    title.textContent = `${episode.name} - S0${episode.season}E${formattedEpNumber}`;
    article.appendChild(title);
    
    const image = document.createElement("img");
    image.src = episode.image.medium;
    article.appendChild(image);

    const p = document.createElement("p");
    p.innerHTML = `${episode.summary}`;
    article.appendChild(p);

    container.appendChild(article);
  }
}

search.addEventListener('keyup', e => {
  const value = e.target.value.toUpperCase();
  const matchingEpisodes = allEpisodes.filter((episode)=>{
        return episode.name.toUpperCase().includes(value) || episode.summary.toUpperCase().includes(value);
    })

  matchEpisodes.innerText = matchingEpisodes.length;
  showAllEpisodes(matchingEpisodes);
})

window.onload = setup;