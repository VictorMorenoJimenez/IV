#Endpoints
GET */country*  get holidays from all countries. Dangerous if the DB grows a lot.
GET */country/<string:name>* get holidays from country with name name. (Country names are unique)
GET */country/<string:name>/state* get holidays from all states from a country called name
GET */country/<string:name>/<int:state_id>* get the holidays from the state state\_id of the country with name name. 
GET */country/<string:name>/<int:state_id>/cities* get holidays from all cities of state with id state\_id.
GET */country/<string:name>/<int:state_id>/<int:city_id>* get the holidays from the city with id city\_id from the state with id state\_id.

POST */country/<string:name>* create if not exists the holiday from the request in the country with name name.
POST */country/<string:name>/<int:state_id>* create if not exist the holiday from the request in the state with id state\_id.
POST */country/<string:name>/<int:state_id>/<int:city_id>* create if not exist the holiday from the request in the city with id city\_id.

DELETE */country/<string:name>/<int:holiday_id>* 
DELETE */country/<string:name>/<int:state_id>/<int:holiday_id>* 
DELETE */country/<string:name>/<int:state_id>/<int:city_id>/<int:holiday_id>* 
