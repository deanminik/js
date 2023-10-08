const path = require('path');//From node;
const fs = require('fs');//From node -> to handle the files system;

class Ticket {

    constructor(number, desktop) {
        this.number = number;
        this.desktop = desktop;
    }
}


class TicketControl {
    constructor() {
        this.lastTicket = 0;
        this.todayIs = new Date().getDate();
        this.pendingTickets = [];
        this.lastFourTickets = [];

        this.init();

    }

    get toJSON() {
        return {
            lastTicket: this.lastTicket,
            todayIs: this.todayIs,
            pendingTickets: this.pendingTickets,
            lastFourTickets: this.lastFourTickets,
        }
    }

    init() {
        const { todayIs, lastTicket, pendingTickets, lastFourTickets } = require('../db/data.json'); // This is a JSON FILE -> data.json so immediately this const data = require -> convert in javascript object 
        // console.log(data);
        if (todayIs === this.todayIs) {
            //if this is true, means we are working in the same day | We do not stored here because the data is the same in data.json 
            this.pendingTickets = pendingTickets;
            this.lastTicket = lastTicket;
            this.lastFourTickets = lastFourTickets;
        } else {
            //Is another day | we save here because the content is different
            this.saveDB();
        }

    }
    saveDB() {
        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJSON)); //JSON.stringify -> converts an object  or a string into JSON
    }
    nextTicket() {
        this.lastTicket += 1;
        const ticket = new Ticket(this.lastTicket, null);
        this.pendingTickets.push(ticket);
        this.saveDB();

        return 'Ticket ' + ticket.number;
    }

    attendTicket(desktop) {
        //Have we have tickets ? 
        if (this.pendingTickets.length === 0) {
            return null;
        }

        const ticket = this.pendingTickets[0];

        this.pendingTickets.shift(ticket);//shift -> removes the first element from a array

        ticket.desktop = desktop;

        this.lastFourTickets.unshift(ticket)// unshift -> add a new element at the beginning of the array 

        if(this.lastFourTickets.length > 4){
            this.lastFourTickets.splice(-1,1);//(-1,1) -> -1 goes to the last element | 1 -> and cut it 
        }

        this.saveDB();

        return ticket;

    }
}

module.exports = TicketControl;
