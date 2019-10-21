# MongoDB Documents
Mongoose is an Object Data Modeling library for MongoDB and Node.js.
It manages relationships between data and provides schema validation.
On MongoDB you can store JSON documents in it, and the structure of these documents can vary as it is not enforced like SQL databases. This speeds up application and development.

## First of all
First of all we are going to clarify some concepts of MongoDB to understand what is being done.

## MongoDB Database
A MongoDB database can be defined as a group of collections that store documents.

## MongoDB Collections
A Collection is the way that MongoDB stores documents together. Collections are analogous to tables in relational databases. 

## MongoDB Documents
MongoDB stores data as BSON documents, a binary representation of JSON documents. But BSON can store more data types than JSON. Anyways a Document in MongoDB can be a JSON. Let's say that each record in a MongoDB Collection is a Document. For example, you have the collection Country, and on that Collection you store different JSON for each country, so you can define a JSON file and store it as a Document in the collection Country.

## This project
In this project we will have a Mongodb database. Within this database we will define 3 different collections in which save JSON as MongoDB documents.

## Our Collections
We have defined 3 Collections, Country, City and State. Each one with different information. We can define the Collection on the node.js code thanks to the node library mongoose. 
We have defined our 3 models on the folder models. So here's an example of how to define a Schema of MongoDB using mongoose.

```JavaScript
    const CountrySchema = mongoose.Schema({
        name: { type: String, required: true },
        holidays: 
            [
                {
                    day: {type: Number, required: true},
                    month: {type: Number, required: true},
                    description: { type: String, required: true }
                },
            ],
        states: { type: [String], required: true }
    });
```

Here is an example of each Collection as a JSON, remember that the examples below would be the MongoDB Documents and each one belongs to a collection. Country, State and City respectively.

### Country
```JavaScript
{
	"name": "France",
	"holidays": [
		{
			"day": 1,
			"month": 1,
			"description": "New year"
		},
	],
    "states": [ 
        "Burgundy", 
        "Franche-Comté", 
        "Aquitaine", 
        "Limousin", 
        "Poitou-Charentes", 
        "Lower Normandy", 
        "Upper Normandy", 
        "Aisace", 
        "Champagne-Ardenne", 
        "Lorraine", 
        "Languedoc-Roussillon", 
        "Midi-Pyrénées", 
        "Nord-Pas-De-Calais", 
        "Picardy", 
        "Auvergne", 
        "Rhone-Alpes"
		]
}
```

As you can see it's just a JSON that will be stored as a BSON inside the Collection Country.

### State
```JavaScript
{
	"name": "Islas Baleares",
	"holidays": [
		{
			"day": 1,
			"month": 3,
			"description": "Dia de les Illes Balears"
		},
	],
	"country": "Spain",
	"cities": [
		 "Ibiza",
		 "Mallorca",
		 "Maon",
		 "San Antonio"
		]
}
```

### City
```JavaScript
{
  "name": "City"
  "holidays": [
    {
      "day": 1,
      "month": 1,
      "description": "Test"
    }
  ],
  "state": "StateTEst",
  "country": "Country Test"
}
```

MongoDB allows us to store Documents that doesn't fit exactly with de Schema, anyways we can set some [schema validation](https://docs.mongodb.com/manual/core/schema-validation/) properties when creating the schema 



## Bibliography
[Mongoose](https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/)
[Collections](https://docs.mongodb.com/manual/core/databases-and-collections/)
[Documents](https://docs.mongodb.com/manual/core/document/)
