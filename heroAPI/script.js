const SUPERHERO_TOKEN = '6546155338737079'
const BASE_URL = `https://www.superheroapi.com/api.php/${SUPERHERO_TOKEN}`

const btnNewImage = document.getElementById('btnNewImage')
const imgContainer = document.getElementById('imgContainer')

const searchButton = document.getElementById('searchButton')
const searchInput = document.getElementById('searchInput')

const getSuperHero = (id, name) => {

    fetch(`${BASE_URL}/${id}`)
        .then(response => response.json())
        .then(json => {
          showHeroInfo(json)
        })
}

const statToEmoji = {
    intelligence: '🧠',
    strength: '💪',
    speed: '🦿',
    durability: '🫁',
    power: '⚡',
    combat: '☄'
}

const showHeroInfo = (character) => {
    const name = `<h2>${character.name}</h2>`
    const img = `<img src="${character.image.url}" width="200" height="200" />`

    const stats = Object.keys(character.powerstats).map(stat => {
        return `<p>${statToEmoji[stat]} ${stat.toUpperCase()}: ${character.powerstats[stat]}</p>`
    }).join('')//join('') -> convert the all result into a big string with al values
  
    imgContainer.innerHTML = `${name}${img}${stats} `
    console.log(stats)// return an array 
   
}

const getSearchSuperHero = (name) => {
    fetch(`${BASE_URL}/search/${name}`)
        .then(response => response.json())
        .then(json => {
            // console.log(json)
            const hero = json.results[0]
            showHeroInfo(hero)
         
        })
}


const randomHero = () => {
    const numberOfHeroes = 731
    return Math.floor(Math.random() * numberOfHeroes) + 1

}


btnNewImage.onclick = () => {
    getSuperHero(randomHero())
}


searchButton.onclick = () => {
    //see list of heroes names https://superheroapi.com/ids.html
    getSearchSuperHero(searchInput.value)
}