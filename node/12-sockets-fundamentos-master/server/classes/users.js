class Users {
    constructor() {
        this.persons = [];
    }

    addPerson(id, name) {

        let person = { id, name };

        this.persons.push(person);

        return this.persons;

    }

    getPerson(id) {

        let person = this.persons.filter(person => {

            return person.id === id

        })[0];// -> [0] return a unique register


        return person;  //If there isn't an id return a undefine
    }


    getAllPersons() {
        return this.persons;
    }

    getPersonsByRoom(room) {
        //...
    }

    deletePerson(id) {

        let deletedPerson = this.getPerson(id);

        this.persons = this.persons.filter(person => person.id != id); // ->Return a new array without the id indicated

        return deletedPerson;
    }
}


module.exports = {
    Users
}