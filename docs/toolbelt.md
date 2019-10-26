# Toolbelt

* [Node](https://nodejs.org/es/): Node.js has been choosen for this project because it's a perfect
solution for API development. With a big community behind and the perfect armony between simplicity and performance.
* [Express](http://expressjs.com/): Fast minimalist web framework for Node.js. Express for the backend has become the standart
server framework for node.js. Express makes very easy to develop and application which can be used to handle any type of HTTP request.
Fits perfectly with FreeDay.
* [MongoDB](https://www.mongodb.com/es): Database system NoSQL. It is document oriented and open source. Personally I choosed MongoDB because
I wanted to learn a NoSQL tool. Also MongoDB has a big community behind, and that's always a good sign when choosing a tool.
* [Fluentd](https://www.fluentd.org/): Nowadays a logging system is essential for any kind of application. Fluentd allows you 
to unify your data of your application. Every single service inside the application, logs to fluentd and fluentd manages and structures that data.
Fluentd is one part of the logging stack of the application. Fluentd is the responsible of receiving the data from the Node app and the MongoDB service,
and send them to Elasticsearch.
* [Elasticsearch](https://www.elastic.co/products/elastic-stack): Elasticsearch is a search engine. With Elasticsearch we will be able to easily find 
keywords on our logs. Elastic search is designed to handle a large amount of information. Essential if our application grows exponentially.
It's part of our EFK stack.
* [Kibana](https://www.elastic.co/products/kibana): Kibana is an open source data visualization plugin for Elasticsearch. It provides visualization capabilities on top of the content indexed on an Elasticsearch cluster. Users can create bar, line and scatter plots, or pie charts and maps on top of large volumes of data. Kibana will show us the logs data of our application in a pretty way.
* [Mocha](https://mochajs.org/): Testing JavaScript framework. Mocha is the most popular test tool for JavaScript. I`ve been trying some other alternatives like Jasmine but Mocha has proved to be simplest and more effective.
* [Chai](https://www.chaijs.com/): Assertion Library. Fits good with Mocha.
* [Docker](https://www.docker.com/): Docker is a set of platform as a service (PaaS) products that use OS level virtualization. Docker offers us the possibility of separating our application in different containers, ensuring modularization and isolating the different services from the application.
* [Kubernetes](https://kubernetes.io/): Kubernetes (K8s) is an open-source system for automating deployment, scaling, and management of containerized applications.
Kubernetes is a powerfull container management tool that automates the deployment and management of containers, K8s will help us to orchestrate, scale and provide
communication across the cluster. We choosed Kubernetes becuase our project is modularized in different containers and that will make easy the deploy on Kubernetes. Also Kubernetes is created by Google, which provides a great community and support in case of problems.
* [Azure](https://azure.microsoft.com/es-es/services/kubernetes-service/): We choosed Azure for cloud hosting because Azure provides a great integration with kubernetes. 
Azure has a great documentation for deploying a Kubernetes cluster to their cloud. Also Azure gives some credit to run apps on their platform if you are a student, so we will
have some free cloud computing to deploy our project.
* [Travis CI](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/travisci.md): Continuous integration. More information on link.
* [Circle CI](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/circleci.md). Continuous integration. More information on link.