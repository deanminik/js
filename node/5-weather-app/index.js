const {
    inquireMenu,
    pause,
    readInput,
    listedTaskDelete,
    confirm,
    showListedCheckList
} = require('./helpers/inquirer.js');
const Searches = require('./models/searches.js');


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
                console.log(place);

                //Search places

                //select a place

                //Show results
                console.log('\nData from the city\n'.green);
                console.log('City:', );
                console.log('Lat:', );
                console.log('Long:', );
                console.log('Temperature:', );
                console.log('Min:', );
                console.log('Max:', );
                break;
        }

        if (opt !== 0) await pause();

    } while (opt !== 0);
}

main();