# Travis CI
Travis CI it's a free and online service for testing github projects.
We choosed Travis CI as a suggestion of the IV teacher J.J.

First we need to create a .travis.yml on the root folder of directory.
We added one first and simple configuration for Node.js.

```JavaScript
    language: node_js
    node_js: 
    - "stable"
    - "6"
    - "8"
    - "10"
    services: mongodb
    cache:
    directories:
        - "node_modules"
    before_script:
    - mongo FreeDay --eval 'db.createUser({user:"iv", pwd:"test", roles:["readWrite"]});'
    before_install:
    - npm install .
    script:
    - npm test
```

As you can see travis will run npm test on each push to the repository.