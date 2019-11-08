# Build tool
The package.json is the heart of a Node.js project. Package.json file holds the project metadata and how the project it's build.

# Npm Scripts
Npm has a run command that can run scripts defined in the scripts property in the package.json. We can concat commands to build our project, in our case the scripts section of package.json is very simple, using **pm2** as process manager.

```
  "scripts": {
    "start": "pm2 start app/app.js",
    "test": "mocha --exit",
    "stop": "pm2 stop app/app.js",
    "restart": "pm2 restart  app/app.js"
  },
```

As we can see we use pm2 to manage the start, stop and restart the application.


# Package.json Dependencies

```
  "dependencies": {
    "body-parser": "^1.19.0",
    "dotenv": "^8.1.0",
    "express": "^4.17.1",
    "joi": "^14.3.1",
    "mongoose": "^5.7.3",
    "saslprep": "^1.0.3",
    "swagger-ui-express": "^4.1.2"
  }
```

1. **Body-parser**: To handle HTTP POST request in Express. Body-parser extract the entire body portion of an incoming request and exposes it on req.body. We choosed body-parser becuase it's the most popular parser for npm.
2. **Dotenv**: Dotenv allows us to load variables from a .env file using process.env. You can store on the .env file secret configuration or passwords.
3. **Express**: Light-weight web aplication framework for the server side. Express helps us to manage requests and views. It's the most popular framework for Node.
4. **Joi**: Joi is an npm package that helps us to validate JSON objects incoming on HTTP body requests. We can easily validate that JSON objects creating our owns schemas.
Joi has been choosen for simplicity when validating JSON objects, creating schemas and validating them against these.
5. **Mongoose**: Mongoose is an Object Document Mapper. It's basically a javascript layer on top of MongoDB and it adds some extra methods to make interaction with MongoDB
easier. Overall this package helps us with MongoDB stuff. We have choosen Mongoose because of it's abstraction over pure MongoDB.
7. **Swagger-ui-express**: This package helps us to auto generate API docs hosted via a server route. It's the most popular package for Swagger docs.

# Package.json DevDependencies
```
  "devDependencies": {
    "chai": "^4.2.0",
    "chai-http": "^4.3.0",
    "mocha": "^6.2.1"
  }
  ```
8. **Chai**: Assertion Library. Fits good with Mocha.
9. **Chai-http**: Chai HTTP provides an interface for live integration testing via superagent. Helps us to construct a request to an application or url.
10. **Mocha**: Testing JavaScript framework. Mocha is the most popular test tool for JavaScript. I`ve been trying some other alternatives like Jasmine but Mocha has proved to be simplest and more effective.
