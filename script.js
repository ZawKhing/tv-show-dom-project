//You can edit ALL of the code here

const search = document.getElementById("search");
const totalEpisodes = document.getElementById("total-episodes");
const matchedEpisodes = document.getElementById("matching-ep")
const allEpisodes =  getAllEpisodes();

function setup() {
    displayEpisodes(allEpisodes);
    selectEpisodes(allEpisodes)
}


//display all episodes
function displayEpisodes(episodes){
  const container = document.querySelector(".container");
  container.innerHTML = "";
  totalEpisodes.textContent = allEpisodes.length; 

  for(let episode of episodes){
    const article = document.createElement("article");
  
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

//search episodes
search.addEventListener('keyup', e => {
  const matchingValue = e.target.value.toUpperCase();
  const matchingEpisodes = allEpisodes.filter((episode)=>{
       return episode.name.toUpperCase().includes(matchingValue) || episode.summary.toUpperCase().includes(matchingValue);
    })
  displayEpisodes(matchingEpisodes);
  matchedEpisodes.innerText = matchingEpisodes.length;
})

//select episodes
const select = document.getElementById("episode-list");
function selectEpisodes(episodes){
   for(let episode of episodes){
      const option = document.createElement("option");
      const formattedEpNumber = ((episode.number.toString()).padStart(2,"0"))// format number to two characters string
      const dropdownOption = `S0${episode.season}E${formattedEpNumber} - ${episode.name}`;
      option.value = dropdownOption;
      option.innerText = dropdownOption;
      
   select.appendChild(option);
  }
}

 //populate selected episode
 select.addEventListener('change', e => {
      const selectedEpisode = e.target.value.slice(9);
      const selectedEp = allEpisodes.filter((episode)=>{
           return episode.name === selectedEpisode;
      }); 
    displayEpisodes(selectedEp);
})     

window.onload = setup();
