//You can edit ALL of the code here
 
let allEpisodes = [];

function setup() {
  // const allEpisodes = getAllEpisodes();
  // makePageForEpisodes(allEpisodes);
  allEpisodes = getAllEpisodes();
  showAllEpisodes(allEpisodes);
  //searchEpisode(allEpisodes);
}
window.onload = setup;

// function makePageForEpisodes(episodeList) {
//   const rootElem = document.getElementById("root");
//   rootElem.textContent = `Got ${episodeList.length} episode(s)`;
// }

function showAllEpisodes(episodes){
  const container = document.querySelector(".container");
  //console.log(container)
  for(let episode of episodes){
    const divArticle = document.createElement("Article");

    const title = document.createElement("h1");
    const formattedEpNumber = ((episode.number.toString()).padStart(2,"0"))// format number to two characters string
    title.textContent = `${episode.name} - S0${episode.season}E${formattedEpNumber}`;
    divArticle.appendChild(title);
    
    const image = document.createElement("img");
    image.src = episode.image.medium;
    divArticle.appendChild(image);

    const p = document.createElement("p");
    p.innerHTML = `${episode.summary}`;
    divArticle.appendChild(p);

    container.appendChild(divArticle);
  }
}



const search = document.getElementById("search");
  
  //console.log(search)
 
  search.addEventListener('keyup', e => {
  const value = e.target.value;
  const matchingEpisodes = allEpisodes.filter((episode)=>{
       const isVisible = episode.name.includes(value) || episode.summary.includes(value)
       return isVisible;
       //episode.element.classList.toggle("hide",!isVisible)
     })
     showAllEpisodes(matchingEpisodes);
  })
// function searchEpisode(episodes){
  
//  })

//   //divElem.appendChild(search);
  
// }

// for(let episode of episodes){
  //    search.textContent = `${episode.name}`
  // }
  // const search = document.createElement("input");
  // search.setAttribute("type","search");



