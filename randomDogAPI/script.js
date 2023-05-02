const dogImageDiv = document.getElementById('dogImage')

const dogButton = document.getElementById('dogButton')


dogButton.onclick = () => {
  fetch('https://dog.ceo/api/breeds/image/random')
  .then(response => response.json())
  .then(json => {
    console.log(json.message)
    dogImageDiv.innerHTML = `<img src="${json.message}"/>`
  })
}