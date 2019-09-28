[![Build Status](https://travis-ci.org/VictorMorenoJimenez/IV.svg?branch=master)](https://travis-ci.org/VictorMorenoJimenez/IV)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

# Job Finder and IT recruitment
The idea of this project is focused on the IT world, helping people to find a proper job and companys to hire developers and IT profesionals.
Specifically, this project consists on creating a microservice to manage job offers. As a developer you can insert a job profile
and as company you can post job offers.

## Objective
With the help of a micro framework, we will build a REST API to make easier the access and treatment of data.

## Why this project?
This project emerges as a personal challenge to develop a complete web service. This microservice will be part of a complete web service in which people linked to the IT world can look for work as well as promote themselves.

## Tool belt
* [Flask](https://palletsprojects.com/p/flask/): micro framework.
* [Python](https://www.python.org/):Flask is based on python.
* [MariaDB](https://mariadb.org/): Database. 
* [Fluentd](https://www.fluentd.org/): For logging.
* [Travis CI](https://travis-ci.org/): Continuous integration.
* [Heroku](https://www.heroku.com/): Deployment, Manage and Scale.

*Tools version coming soon*.

## Installation
*Coming soon*.

## Usage example
*Coming soon*.

## Development setup
### Flask install
First of all, we will install the python dependencies following the installation tips from [flask official website](https://flask.palletsprojects.com/en/1.1.x/installation/#installation).
Supossing you are using a debian based distro: (If you are using a differente Linux distro, check the link above).

```bash
	sudo apt-get install python3-venv	
```
When working with a python project, we use virtual environments to manage the dependencies. That way you can isolate projects with their own dependencies.

* Create an enviorment
```bash
	mkdir projectname
	cd projectname
	python3 -m venv venv
```

That will create a new folder venv on the root folder of your project. After that we can activate the virtualenv and install dependencies.
In this case, at the very first stage, we will install flask.

```bash
	pip install Flask
```

*Coming soon.*

## Release History

* 0.1
    * Description of the project. 
* 0.2
    * Description of the choosen framework and tools.

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

<!-- Markdown link & img dfn's -->
