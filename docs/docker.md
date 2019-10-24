# Docker
Docker is a tool designed to make it easier to create, deploy, and run applications by using containers.
Thanks to Docker we can encapsulate the different parts of our application in independent containers, ensuring the minimum coupling between the parts. Docker creates independent containers using host resources. Unlike the virtualization of the Docker hardware does not significantly affect the performance of the host. This and the independence it brings makes Docker a very interesting option for any project.

You can download the latest Docker and docker-compose from [official Docker website](https://docs.docker.com/install/).

Docker containers are created from an image, so first of all we must create our image for the node application. 
This is done using a Dockerfile like the one shown below.

```
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

```
    docker build -t node_app .
```

We are telling docker to build . with a tag node_app. Docker will look for a Dockerfile and build the image with the tag node_app.

We can check that it worked by typing:

```
    > docker image ls

    REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
    node_app            latest              19eaad191243        26 minutes ago      966MB
```

Now we have created our Docker image, but we have no container running.

We choosed to run the containers with a docker-compose file. 
In the docker-compose file we define some services ( in our case web app and database ) and docker-compose will launch them for us.

```
version: "3.7"
services:
  web:
    image: node_app
    ports:
      - "8080:8080"
    depends_on:
      - mongodb
  mongodb:
    image: mongo
    ports:
    - "27017:27017"
```

We defined two services, web and mongodb. 
As we can see the web service depends on the mongodb.

We are telling Docker to create the service web from the recently created node_app image. Binding the container port 8080 to the host port 8080
so we can access from the host.

The service mongodb will use the official mongo image and will bind the default mongodb port from container to host.
So now we have everything setup we just have to open a terminal and run:

```
    docker-compose up
```

And we have our app running on containers!



