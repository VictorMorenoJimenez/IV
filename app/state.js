import Freeday from "./freeday";
import City from "./city";

class State {
    constructor(id, name, country, cities = [], holidays= []) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.cities = cities;
        this.holidays = holidays;

        this.getID = function () {
            return this.id;
        }

        this.getName = function () {
            return this.name;
        }

        this.getCountry = function () {
            return this.country;
        }

        this.addCity = function (id, name, holidays=[], state, country) {
            /*TODO
                Check that all the parameters are correct.
                No city with the same id.
                country exists
                name is a string.
            */
            var city = new City(id, name, holidays, state, country);
            this.cities.push(city);
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
                'state': {
                    'id': this.id,
                    'name': this.name,
                    'country': this.getCountry,
                    'cities': this.cities,
                    'holidays': this.holidays
                }
            })
        }
    }
}

export default State;