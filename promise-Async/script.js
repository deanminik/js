//Asynchronous Programming

//your order 🍵 tomato soup -> first code running
//Meanwhile you continue your combo with a friend -> secod code runnig 
//RESOLVED - Your server brings you soup 🍵
// Or REJECTED No soup  today ❌

// const waitingForSoup = () => console.log('1- soup 🍵')

// console.log('2- You start the combo with your friend 👦')
// setTimeout(waitingForSoup, 2000)//this will be the last outout
// console.log('3- Still speaking 😆')

const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    isReady = true
    isReady ? resolve('Soup is ready 🍵') : reject('No Soup ❌')
  }, 2000)
})


// promise1
//   .then(success => console.log(success))//resolved
//   .catch(error => console.log(error))//rejected


const getSoup = async () => {
  const data ={rating: 0, tip:0, pay:0, review:0}
  try {
    //RESOLVE
    const soup = await promise1
    console.log(soup)
    data.rating = 5
    data.tip = .2
    data.pay = 10
    data.review = 5
    return data
  } catch (error) {
    //REJECTED
    console.log(error)
    data.rating = 1
    data.tip = 0
    data.pay = 0
    data.review = 1
    return data
  }
}
getSoup().then(value => console.log(value))



const getDog = async () => {
  const url = 'https://dog.ceo/api/breeds/image/random'
  const response = await fetch(url)
  const data = await response.json()
  console.log(data)
}
// getDog()