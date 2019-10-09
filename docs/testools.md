# Test Framework

## Mocha
Mocha is a JavaScript test framework for Node.
We choosed Mocha for testing because makes Testing really use and and simple.
Also it's one of the most popular testing frameworks for Node.js so I has a lot of 
support.

## Chai
Chai, asertion library for testing. It integrates perfectly with Mocha.

## Integrate Mocha with our project.
Integrating Mocha in our Node.js project is really simple. 
We just have to add the dependencies on the package.json file.
On devdependencies we add:

```JavaScript
  "devDependencies": {
    "chai": "^4.2.0",
    "chai-http": "^4.3.0",
    "mocha": "^6.2.1"
  },
  ...
```

And we add a script for running the tests in an easy way:
```JavaScript
  "scripts": {
    "start": "node app/app.js",
    "test": "mocha --exit"
  },
  ...
```

This packages will be installed when running npm install.
After the dependencies are installed we can run our tests on console with:

```JavaScript
    npm test
```


