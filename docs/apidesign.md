## API Design

First aproach to the API Design, only GET and POST methods for now.

# GET endpoints

**GET /country** - get the holidays from all countries. \
**GET /country/:name** - get the holidays from the country named :name. \

**GET /city/:state_name** - get the holidays from all the cities of the 
state state_name. \
**GET /city/:state_name/:city_name** - get the holidays from the city with name city\_name that belongs to state state\_name. \

**GET /state/:country_name** - get the holidays from all the states that belongs to 
the country named country\_name. \
**GET /state/:country_name/:state_name** - get the holidays from the state with name state\_name that belongs to country country\_name. \

# POST endpoints

**POST /country/new** - Create new country. \
**POST /country/:country_name** - Create new holiday for the country with name country\_name.\

**POST /state/new** - Create new state. \
**POST /state/:state_name** - Create new holiday for the state with name state\_name. \

**POST /city/new** - Create new city. \
**POST /city/:city_name** - Create new holiday for the city with name city\_name. \