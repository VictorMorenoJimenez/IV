import State from "./state";
import Freeday from "./freeday";

// Class Country.

class Country {
    constructor(id, name, holidays=[], states=[]) {
        this.id = id;
        this.name = name;
        this.holidays = holidays;
        this.states = states;

        this.getID = function () {
            return this.id;
        }

        this.getName = function () {
            return this.name;
        }
        
        this.getStates = function () {
            return this.states;
        }

        this.getHolidays = function () {
            return this.holidays;
        }

        this.addState = function (id, name, country, cities = [], holidays= []) {
             /*TODO
                Check that all the parameters are correct.
                No state with same id.
                Name is string.
                Cities is not empty.
            */
            var _state = new State(id, name, country, cities, holidays);

            this.states.push(_state);
        }

        this.addFreeday = function (id, description, date) {
            /*TODO
                Check that all the parameters are correct.
                No freeday with same id.
                Description no more than 256 chars.
                Date correct format..
            */
            var _freeday = new Freeday(id, description, date);
            this.holidays.push(_freeday);
        }

        this.toJson = function () {
            return JSON.stringify({
                'status': 'ok',
                'country': {
                    'id': this.id,
                    'name': this.name,
                    'states': this.states,
                    'holidays': this.holidays
                }
            })
        }
    }
}

export default Country;