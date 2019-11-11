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

1. **GET /country** - get all countries. *Refer to User story 4 of Normal User*
2. **GET /country/:name** - get the holidays from the country named :name. 

3. **GET /city** - get all cities.*Refer to User story 4 of Normal User* 
4. **GET /city/:city_name** - get the holidays from the city with name city\_name. 

5. **GET /state** - get all the states. *Refer to User story 4 of Normal User* 
6. **GET /state/:state_name** - get the holidays from the state with name state\_name. 

# PUT endpoints

7. **PUT /country/new** - Create new country. *Refer to User story 2 of Normal User*
8. **PUT /country/:country_name** - Create new holiday for the country with name country\_name. *Refer to User story 1 of Normal User*

9. **PUT /state/new** - Create new state. *Refer to User story 2 of Normal User*
10. **PUT /state/:state_name** - Create new holiday for the state with name state\_name. *Refer to User story 1 of Normal User*

11. **PUT /city/new** - Create new city. *Refer to User story 2 of Normal User*
12. **PUT /city/:city_name** - Create new holiday for the city with name city\_name. *Refer to User story 1 of Normal User*

# DELETE endpoints
13. **DELETE /country/:name** - delete the holiday send in the body request from country named :name  *Refer to User story 2 of Admin User*
14. **DELETE /state/:name** - delete the holiday send in the body request from state named :name  *Refer to User story 2 of Admin User*
15. **DELETE /city/:name** - delete the holiday send in the body request from city named :name  *Refer to User story 2 of Admin User*