## API Design

First aproach to the API Design, only GET and POST methods for now.

# GET

**GET /country** - get the holidays from all countries
**GET /country/:name** - get the holidays from the country named :name.

**GET /city/:state_name** - get the holidays from all the cities of the 
state state_name.
**GET /city/:state_name/:city_name** - get the holidays from the city with name city_name that belongs to state state_name.

**GET /state/:country_name** - get the holidays from all the states that belongs to 
the country named country_name.
**GET /state/:country_name/:state_name** - get the holidays from the state with name state_name that belongs to country country_name.

# POST

**POST /country/new** - Create new country.
**POST /country/:country_name** - Create new holiday for the country with name country_name.

**POST /state/new** - Create new state.
**POST /state/:state_name** - Create new holiday for the state with name state_name.

**POST /city/new** - Create new city.
**POST /city/:city_name** - Create new holiday for the city with name city_name.