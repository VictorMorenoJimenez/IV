# Circle CI
As an additional continuous integration system, Circle CI has been chosen. 
This tool has been chosen given the simplicity with which it is integrated into any project with a simple configuration file.
Once registered on its official website, you simply have to link your github and add the project in question to follow up.
Then you have to add a .circleci directory with a config.yml file, which will use circle CI to launch the tests.

So, the file .circleci/config.yml:

```yml
version: 2
jobs:
  build:
    docker:
      - image: circleci/node:12.10
    working_directory: ~/IV
    steps:
      - checkout
      - run:
          name: Install package json dependencies
          command: npm install .
      - run:
          name: Run test
          command: npm test
```

We are telling Circle CI how to build and run our job.
Inside the jobs section, the docker section tells Circle CI wich image build for test.
The working_directory must have the name of the repository you added to circle CI.
Lastly, before running the test we install the node app with npm install, and finally,
we execute the test.

And that's it, we are running the tests configured inside the project everytime a push is done. Simple as that!