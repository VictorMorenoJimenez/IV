import Freeday from "./freeday";

// Module for city

class City{
    constructor(id, name, holidays=[], state, country) {
        this.id = id;
        this.name = name;
        this.holidays = holidays;
        this.state = state;
        this.country = country;

        this.getID = function () {
            return this.id;
        }

        this.getName = function () {
            return this.name;
        }

        this.getHolidays = function () {
            return this.holidays;
        }

        this.getState = function () {
            return this.state;
        }

        this.addFreeday = function (id, date, description) {
            /*TODO
                Check that all the parameters are correct.
                No freeday with the same id.
                Date needs the correct format.
                Description string, no more than 256 chars.
            */

            var freeday = new Freeday(id,description,date);
            this.holidays.push(freeday)
        }

        this.toJson = function () {
            return JSON.stringify({
                'status': 'ok',
                'city': {
                    'id': this.id,
                    'name': this.name,
                    'holidays': this.holidays,
                    'state': this.state,
                    'country': this.country
                }
            })
        }
    }
}

export default City;