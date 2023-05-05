/**
 * Weather App
 * TODO: Complete getWeatherData() to return json response Promise
 * TODO: Complete searchCity() to get user input and get data using getWeatherData()
 * TODO: Complete showWeatherData() to set the data in the the html file from response
 */

/* DIV ID's you'll need access to 👇

/**
 * Retrieve weather data from openweathermap
 * HINT: Use fetch()
 * HINT: URL should look like this: 
 * https://api.openweathermap.org/data/2.5/weather?q=detroit&appid=a8e71c9932b20c4ceb0aed183e6a83bb&units=imperial
 */

const cityName = document.getElementById('city-name')
const temporal = document.getElementById('temp')
const weatherType = document.getElementById('weather-type')
const minTemp = document.getElementById('min-temp')
const maxTemp = document.getElementById('max-temp')


const getWeatherData = (city) => {
  //HINT: Use template literals to create a url with input and an API key

  //CODE GOES HERE
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'c9cab0867dmsh371fc99a2707436p10de1fjsn3ca7812huhubuububa559c',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };
  const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`;

  const test = async () => {

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      
      showWeatherData(result)

    } catch (error) {
      console.error(error);
      showDefault()
      
    }
  }
  test()
}


/**
 * Retrieve city input and get the weather data
 * HINT: Use the promise returned from getWeatherData()
 */
const searchCity = async () => {
  const city = document.getElementById('city-input').value;
  // CODE GOES HERE
  console.log(city)
  getWeatherData(city)


}

/**
 * Show the weather data in HTML
 * HINT: make sure to console log the weatherData to see how the data looks like
 */
const showWeatherData = (weatherData) => {

  cityName.innerText = weatherData.location.name
  temporal.innerText = weatherData.current.temp_c
  weatherType.innerText = weatherData.current.condition.text
  minTemp.innerText = weatherData.current.pressure_in
  maxTemp.innerText = weatherData.current.pressure_mb
  
}

const showDefault = () => {

  cityName.innerText = 'No found'
  temporal.innerText = 'No found'
  weatherType.innerText = 'No found'
  minTemp.innerText = 'No found'
  maxTemp.innerText = 'No found'
  
}

