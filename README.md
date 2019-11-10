[![Build Status](https://travis-ci.org/VictorMorenoJimenez/IV.svg?branch=master)](https://travis-ci.org/VictorMorenoJimenez/IV)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![CircleCI](https://circleci.com/gh/VictorMorenoJimenez/IV.svg?style=svg)](https://circleci.com/gh/VictorMorenoJimenez/IV)

# Free day
Free day is a free software project that aims to create a microservice with which to know the holidays of different parts of the world.

## Objective
We will build a REST API to make easier to know if it's holidays in any part of the world.
The idea is that anyone can post the holidays day their country, state or city.

## Why this project?
I've been thinking and looking around and there's nothing like Free day. Let's say you are building a service that needs to know
if it's holiday on the country that it's running for some purpose. You don't need to hardcode the holidays, just use an API and get the holidays
of any part of the world: country, state or city. And the fact that anyone can contribute makes. Very usefull for the interational commerce.
Free day unique and with a great growing potential.

## How it works?
The main goal of this project is that you can easily get the holidays from a city, country or state. If you want to know the vacations of a specific city, upon request to the API you will be informed of the holidays of both the city and the state to which the city belongs and to the country of the city. In this way with a single query you can get all the holidays that affect a city.

## Install

To install this project in your server and run it you just have to follow this steps:

```git
    git clone git@github.com:VictorMorenoJimenez/IV.git
```

To install all dependencies on package.json run:

```JavaScript
    npm install
```

To run the server 

```JavaScript
    npm start
```

You can also run FreeDay in Docker containers!
More info [here](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/docker.md)

## Deploy
For deploying our project we choosed Azure because it gives you 100$ of free credits if you have a proper student license. We choosed to deploy our app on a Kubernetes cluster, the full process and explanation [here](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/kubernetes.md)

## Build 
buildtool: package.json

Build tool documentation can be found [here](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/dependencies.md)

## APi Design
Check your API endpoints [here](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/apidesign.md). and user stories [here](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/userstories.md).

## Test Framework
Check the test framework and library used for testing [here](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/testools.md).

## Tool belt
You can check the tools [here](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/toolbelt.md)

## Logging system
To handle the logs of the different containers of the application, we have chosen the EFK stack (Elasticsearch, Fluentd and Kibana). If you want to know how to view the logs with Kibana, [click_here](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/kibana.md)


## Usage example
*Coming soon*.

## Development setup
To set up a development envirorment and contribute you just have to follow the Install steps.

## Release History

* 0.1
    * Description of the project. 
* 0.2
    * Description of the choosen framework and tools.
* 0.3
    * First API Development and Tests developed functionalities.
* 0.4
    * Completed Documentation.
* 0.5
    * Completed API Rest, Dockerized App, Completed Endpoints Tests
* 0.6
    * Added pm2 and proper build tool configuration, modified some endpoints 

## Meta

Víctor Moreno Jiménez – victormoreno@correo.ugr.es

Distributed under the GNU General Public License v3.0 license. See ``LICENSE`` for more information.

[https://github.com/VictorMorenoJimenez/github-link](https://github.com/VictorMorenoJimenez/)

## Contributing

1. Fork it (<https://github.com/VictorMorenoJimenez/IV/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

