//You can edit ALL of the code here
const search = document.getElementById("search");
const totalEpisodes = document.getElementById("total-episodes");
const matchEpisodes = document.getElementById("matching-ep")

const allEpisodes =  getAllEpisodes();

function setup() {
    showAllEpisodes(allEpisodes);
    populateSelectEpisode(allEpisodes)
}

// function makePageForEpisodes(episodeList) {
//   const rootElem = document.getElementById("root");
//   rootElem.textContent = `Got ${episodeList.length} episode(s)`;
// }

function showAllEpisodes(episodes){
  const container = document.querySelector(".container");
  container.innerHTML = "";
  totalEpisodes.textContent = allEpisodes.length; 

  for(let episode of episodes){
    const article = document.createElement("Article");
  
    const title = document.createElement("h2");
    let formattedEpNumber = ((episode.number.toString()).padStart(2,"0"))// format number to two characters string
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
  const matchingValue = e.target.value.toUpperCase();
  const matchingEpisodes = allEpisodes.filter((episode)=>{
        return episode.name.toUpperCase().includes(matchingValue) || episode.summary.toUpperCase().includes(matchingValue);
    })

  matchEpisodes.innerText = matchingEpisodes.length;
  showAllEpisodes(matchingEpisodes);
})


function populateSelectEpisode(episodes){
 const select = document.getElementById("episode-list");

 for(let episode of episodes){
  const option = document.createElement("option");
  option.setAttribute("value",episode.id);
  let formattedEpNumber = ((episode.number.toString()).padStart(2,"0"))// format number to two characters string
  option.innerText = `S0${episode.season}E${formattedEpNumber} - ${episode.name}`;
  
  select.appendChild(option);
 }
}

// select.addEventListener('keyup', e=>{
//   const selectEpisode = e.target.value;
//   const selectEp = allEpisodes.filter((episode)=>{
//         return episode.name;
//   })
//   showAllEpisodes(selectEp)
// })
window.onload = setup;