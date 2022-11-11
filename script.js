//You can edit ALL of the code here
const container = document.querySelector(".container");
const search = document.getElementById("search");
const totalEpisodes = document.getElementById("total-episodes");
const matchedEpisodes = document.getElementById("matching-ep");
const showSelector = document.getElementById("show-list");
const select = document.getElementById("episode-list");
let allEpisodes;

function setup() {
  // fetch(url)
  //   .then(response => response.json())
  //   .then(result => {
  //       //console.log(result)
  //       allEpisodes = result;
  //       displayEpisodes(result);
  //       selectEpisodes(result);
  //   })  
  const allShows = getAllShows();
  console.log(allShows)
  showList(allShows);
}

//select shows list
function showList(shows){
  for(let show of shows){
     const option = document.createElement("option");
      option.value = show.id;
      option.innerText = show.name;

     showSelector.appendChild(option);
  }
}

showSelector.addEventListener('change', e => {
      const selectedShowId = e.target.value;
      const url = `https://api.tvmaze.com/shows/${selectedShowId}/episodes`;
      fetch(url)
      .then(response => response.json())
      .then(result => {
        //console.log(result)
        allEpisodes = result;
        displayEpisodes(result);
        selectEpisodes(result);
    })  
}) 

//display all episodes
function displayEpisodes(episodes){
  
  totalEpisodes.textContent = allEpisodes.length; 
  container.innerHTML = "";

  for(let episode of episodes){
    const article = document.createElement("article");
  
    const title = document.createElement("h2");
    const formattedSeasonNumber = ((episode.season.toString()).padStart(2,"0"))
    const formattedEpisodeNumber = ((episode.number.toString()).padStart(2,"0"))// format number to two characters string
    title.textContent = `${episode.name} - S${formattedSeasonNumber}E${formattedEpisodeNumber}`;
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

//select episodes list
function selectEpisodes(episodes){
  select.innerHTML= "";

   for(let episode of episodes){
      const option = document.createElement("option");
      const formattedSeasonNumber = ((episode.season.toString()).padStart(2,"0"))
      const formattedEpisodeNumber = ((episode.number.toString()).padStart(2,"0"))// format number to two characters string
      const dropdownOption = `S${formattedSeasonNumber}E${formattedEpisodeNumber} - ${episode.name}`;
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
