
const axios = require('axios');

class Searches {
    history = ['Tegucigalpa', 'Madrid', 'San José'];

    constructor() {
        //TODO: Read if exists
    }

    get paramsMapbox() {
        // process.env.MAPBOX_KEY -> this came from .env file, this file wasn't updated to github because contains a token from an API
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'en'
        }
    }

    get paramsWeather() {
        return {

            appid: process.env.OPENWEATHER_KEY,
            units: 'metric'
        }
    }

    async city(place = '') {

        try {
            //request http
            // console.log('City', place);
            // const url = 'https://reqres.in/api/users?page=2';


            /*********option 1 ********/

            // const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/Madrid.json?limit=5&language=en&access_token=${token}`;
            // const answer = await axios.get(`${url}`, {
            //     headers: {
            //         "accept-encoding": null
            //     }
            // });
            // console.log(answer.data);


            /*********option 2 this is better ********/
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.paramsMapbox
            });

            const resp = await instance.get();

            // console.log(resp.data);
            // if want to return an object use ({}) inside the map function that returns an array 
            return resp.data.features.map(place => ({
                id: place.id,
                name: place.place_name_en,
                lng: place.center[0],
                lat: place.center[1]
            }));
        } catch (error) {
            // return [];
            console.log(error);

        }


    }

    async placeWeather(lat, lon) {
        try {
            //instance axios.create()
            const instance = axios.create({
                // baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_KEY}&units=metric`,
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { lat, lon, ...this.paramsWeather }

            });

            //resp.data 
            const resp = await instance.get();
            // console.log(resp.data.weather[0].description);
            // console.log(resp.data.main.temp_min);
            // console.log(resp.data.main.temp_max);
            // console.log(resp.data.main.temp);

            // return {
            //     desc: resp.data.weather[0].description,
            //     min: resp.data.main.temp_min,
            //     max: resp.data.main.temp_max,
            //     temp: resp.data.main.temp
            // };

            //In this case it is better to use destructuring, less code
            const { weather, main } = resp.data;
            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            };

        } catch (error) {
            console.log(error);
        }
    }

}


module.exports = Searches;

