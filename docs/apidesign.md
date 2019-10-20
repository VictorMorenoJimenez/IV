# API Design

First aproach to the API Design, GET,PUT and DELETE methods for now.

For an prettier view of the API Design you can run the app and access the open-api interface:

After cloning it, run:
```
    npm install
```

```
    npm start
```

Once the app is running you can access the API docs via this url:
```
    http://localhost:8080/api-docs
```

# GET endpoints

**GET /country** - get all countries \
**GET /country/:name** - get the holidays from the country named :name. \

**GET /city** - get all cities \
**GET /city/:city_name** - get the holidays from the city with name city\_name. \

**GET /state** - get all the states. \
**GET /state/:state_name** - get the holidays from the state with name state\_name. \

# PUT endpoints

**PUT /country/new** - Create new country. \
**PUT /country/:country_name** - Create new holiday for the country with name country\_name.\

**PUT /state/new** - Create new state. \
**PUT /state/:state_name** - Create new holiday for the state with name state\_name. \

**PUT /city/new** - Create new city. \
**PUT /city/:city_name** - Create new holiday for the city with name city\_name. \

# DELETE endpoints
**DELETE /country/:name** - delete the holiday send in the body request from country named :name  \
**DELETE /state/:name** - delete the holiday send in the body request from state named :name  \
**DELETE /city/:name** - delete the holiday send in the body request from city named :name  \