# Heroku deployment
In order to deploy on Heroku we have to install the heroku cli in our computer. If you have Debian system you can follow this steps otherwise check [here](https://devcenter.heroku.com/articles/heroku-cli).

In a terminal run:

```
    curl https://cli-assets.heroku.com/install-ubuntu.sh | sh
```

Now we can use the heroku cli.

To deploy our app on Heroku we have to make a few changes:

1. Heroku binds a random port from our app to port 80. So we have to change the port value when connecting with Node, using the process.env.port.
2. We have to change the mongoDB uri to an external mongo host. We can't deploy both containers.

On [mongo altas](https://www.mongodb.com/cloud/atlas) you can create a MongoDB database for free and connect to it with a simple uri. In our case we connect to that uri when the NODE_ENV is set to HEROKU. 

With this changes done, we can start creating an Heroku app, building the web image, pushing it to the Heroku container and releasing it to the internet.

In order to do that we have created an script that automates this process:

```
    #!/bin/bash
    echo "Log in the web browser"
    heroku login
    echo "Create Heroku app"
    heroku create freedayAPI
    echo "Log in the container of heroku"
    heroku container:login
    echo "@@@@@@@@@@@@@@@@@@@@@ Building image @@@@@@@@@@@@@@@@@@@"
    docker build -t web .
    echo "@@@@@@@@@@@@@@@@@@@@@ Pushing imageto heroku container @@@@@@@@@@@@@@@@@@@"
    heroku container:push web
    echo "@@@@@@@@@@@@@@@@@@@@@ Set node ENV @@@@@@@@@@@@@@@@@@@"
    heroku config:set NODE_ENV='HEROKU'
    echo "@@@@@@@@@@@@@@@@@@@@@ Release and Scale @@@@@@@@@@@@@@@@@@@"
    heroku container:release web
    heroku ps:scale web=1
    echo "@@@@@@@@@@@@@@@@@@@@@ Openning browser @@@@@@@@@@@@@@@@@@@"
    heroku open
```
This simple script builds our node app and deploys it to Heroku.

First you need to login via web to Heroku. A browser will open to login to Heroku.
Then we create the app with a random name, with heroku create.
After that the new web image is built and pushed to the repository just after logging in on the Heroku container.
Once the image is pushed we set the NODE_ENV to HEROKU and deploy the app.
With the ps scale we are telling Heroku to deploy 1 node of the web app.

Finally with heroku open a browser will open with the url of the project.

Here's an example of the deploy script:

![deploy_script](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/images/deployScript.png)


And here's a test of the /status route:

![deploy_script](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/images/herokutest.png)

You can access the heroku deployment by: 
https://freeday-test1.herokuapp.com/status



