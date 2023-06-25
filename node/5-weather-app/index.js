require('dotenv').config()

const {
    inquireMenu,
    pause,
    readInput,
    listPlaces,
    confirm,
    showListedCheckList
} = require('./helpers/inquirer.js');
const Searches = require('./models/searches.js');

// console.log(process.env);
// console.log(process.env.MAPBOX_KEY);

const main = async () => {
    const searches = new Searches();

    let opt;

    do {
        opt = await inquireMenu();
        // console.log({ opt });
        switch (opt) {
            case 1:
                //show message
                const place = await readInput('City: ');
                // console.log(place);


                //Search places
                const places = await searches.city(place);
                // console.log(places);


                //select a place
                const id = await listPlaces(places);
                // console.log({ id });
                const placeSelected = places.find(place => place.id === id);
                // console.log(placeSelected);

                //weather
                const weather = await searches.placeWeather(placeSelected.lat, placeSelected.lng)


                //Show results
                console.clear();
                console.log('\nData from the city\n'.green);
                console.log('City:', placeSelected.name);
                console.log('Lat:', placeSelected.lat);
                console.log('Long:', placeSelected.lng);
                console.log('Temperature:', weather.temp);
                console.log('Min:', weather.min);
                console.log('Max:', weather.max);
                console.log('Description:', weather.desc.blue);
                break;
        }

        if (opt !== 0) await pause();

    } while (opt !== 0);
}

main();