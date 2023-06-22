const axios = require('axios');

class Searches {
    history = ['Tegucigalpa', 'Madrid', 'San José'];

    constructor() {
        //TODO: Read if exists
    }

    async city(place = '') {
        
        try {
            //request http
            // console.log('City', place);
            const url = 'https://reqres.in/api/users?page=2';

            const answer = await axios.get(`${url}`, {
                headers: {
                    "accept-encoding": null
                }
            });
            // console.log(answer);
            console.log(answer.data);
            return []; //return the places that matches with "place" argument
        } catch (error) {
            // return [];
            console.log(error);

        }


    }

}


module.exports = Searches;

