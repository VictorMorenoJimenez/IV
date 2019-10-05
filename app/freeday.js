// Module for Freeday
class Freeday {
    constructor(id, description, date) {
        this.id = id;
        this.description = description;
        this.date = date;

        this.getID = function () {
            return this.id;
        }

        this.getDescripcion = function () {
            return this.description;
        }

        this.getDate = function () {
            return this.date;
        }

        this.getInfo = function () {
            return "Day " + this.date + " " + this.description;
        }
        
        this.toJson = function () {
            return JSON.stringify({
                'status': 'ok',
                'freeday': {
                    'date': this.date,
                    'description': this.description
                }
            })
        }
    }
}

export default Freeday;