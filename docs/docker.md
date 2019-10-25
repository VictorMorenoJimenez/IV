# Docker
Docker is a tool designed to make it easier to create, deploy, and run applications by using containers.
Thanks to Docker we can encapsulate the different parts of our application in independent containers, ensuring the minimum coupling between the parts. Docker creates independent containers using host resources. Unlike the virtualization of the Docker hardware does not significantly affect the performance of the host. This and the independence it brings makes Docker a very interesting option for any project.

You can download the latest Docker and docker-compose from [official Docker website](https://docs.docker.com/install/).

Docker containers are created from an image, so first of all we must create our image for the node application. 
This is done using a Dockerfile like the one shown below.

```Dockerfile
FROM node:12

# Create app directory
WORKDIR /usr/src/iv

COPY package*.json ./
#Install all dependencies

RUN npm install

# Copy all code
COPY . .

# EXpose port and start application
EXPOSE 8080

CMD ["npm", "start"]
```

We are telling to Docker to use the official image from node version 12.
The nexts steps are for creating the app's directory, copying the package.json and package-lock.json
and install de dependencies. After that we copy all the app's code in to the WORKDIR and we expose
the port 8080 to the host, that way we can access the app from the host.
Last command CMD, it's the command that will run the image when run in to a container.
So it will start the node app.

Once we define our Dockerfile we have to build the image. We open a terminal in the same directory than Dockerfile and type:

```bash
    docker build -t node_app .
```

We are telling docker to build . with a tag node_app. Docker will look for a Dockerfile and build the image with the tag node_app.

We can check that it worked by typing:

```bash
    > docker image ls

    REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
    node_app            latest              19eaad191243        26 minutes ago      966MB
```

Now we have created our Docker image, but we have no container running.

Also we have a Dockerfile for fluentd, because we have to install a custom plugin for elasticsearch. 
Fluentd configuration is on ./fluentd, here is the Dockerfile to build the image

```Dockerfile
  # fluentd/Dockerfile
  FROM fluent/fluentd:v1.6-debian-1
  USER root
  RUN ["gem", "install", "fluent-plugin-elasticsearch", "--no-document", "--version", "3.5.5"]
  USER fluent
```

From the official image of fluentd we install on the container the fluent-plugin-elasticsearch to connect with elasticsearch.
Fluentd container will run when we execute the docker-compose up script.

We choosed to run the containers with a docker-compose file. 
In the docker-compose file we define some services and docker-compose will launch them for us.

```Dockerfile
version: "3.7"
services:
  nodeapp:
    image: node_app
    ports:
      - "8080:8080"
    links:
      - fluentd
    depends_on:
      - mongodb
      - fluentd
    logging:
      driver: "fluentd"
      options:
        fluentd-address: localhost:24224
        tag: node_app

  mongodb:
    image: mongo
    volumes:
      - ./data:/data/db
    ports:
    - "27017:27017"
    links:
      - fluentd
    depends_on:
      - fluentd
    logging:
      driver: "fluentd"
      options:
        fluentd-address: localhost:24224
        tag: mongo_app

  fluentd:
    build: ./fluentd
    volumes:
      - ./fluentd/conf:/fluentd/etc
    links:
      - "elasticsearch"
    ports:
      - "24224:24224"
      - "24224:24224/udp"

  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.4.1
    environment:
      - "discovery.type=single-node"
    volumes:
      - ./elasticsearch/data:/usr/share/elasticsearch/data
    expose:
      - "9200"
    ports:
      - "9200:9200"

  kibana:
    image: kibana:7.4.1
    links:
      - "elasticsearch"
    ports:
      - "5601:5601"
```

We defined 5 services, nodeapp, mongodb, fluentd, elasticsearch and kibana. 

Let's explain the docker-compose file step by step:

### Nodeapp
This container holds our node app. The image directive tells Docker to find locally the image node_app that we have built before.
Depends on mongodb container and fluentd, if this two doesn't deploy properly nodeapp won't start.
Also we defined the logging directive to send logs to fluentd.

### Mongodb
This container will hold the database. We have created a persistent storage for the DB on the host, in this case 
the folder ./data will match with the folder inside the container /data/db where MongoDB stores all the information.
MongoDB binds the default port of MongoDB on the host aswell, so we can access mongoDB from outside.
The logging directive it's exactly the same as the nodeapp, we want MontoDB to send logs to fluentd.

### Fluentd
As we told before the Fluentd container builds from the local image created before.
The fluentd container also has persistent storage, in this case we link the host ./fluentd/conf to the container /fluentd/etc.
It's linked to elasticsearch. We map both tcp and udp the defaults fluentd ports. 

### Elasticsearch
From the official elasticsearch Docker image we build the container, using persistent data.
We expose de port 9200, that's needed for elasticsearch to work properly.

### Kibana
Kibana container it simple, just binds the ports from container to host to access the web interface from host.
Also built from the official kibana Docker image.


Before running the docker-compose up script, we have to change the permisson of the folder elasticsearch, run the following command on a terminal:

```bash
	chown -R `whoami`:`whoami` elasticsearch	
```

Also we have to check if any of the used ports in the docker-compose file, are in use by the host.

We can check that with the command:

```bash
  sudo netstat -tulpn
```

Check that all the ports on the docker-compose file are free or the docker-compose up script won't work.

So now we have everything setup we just have to open a terminal and run:

```
    docker-compose up
```

Once the script is over, we have the 5 containers running. We can check that with the command docker ps:

![running_containers](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/images/containers_running.png)
Remember that if we change something on the node app, we will have to build again the node_app image.





