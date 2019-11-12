# Heroku deployment from github with CI
Heroku has been chosen as PaaS for the ease it grants when deploying an application in the cloud. It is a free and very valid option to test applications at low cost. The great strength of Heroku is the ease with which applications are deployed, both from its online heroku-cli client and from its web interface. Below are the steps to deploy an application from github to Heroku by passing the tests implemented in travis CI.

## Deploy
Once installed the Heroku cli we just have to follow this steps:

First login on heroku.

```
    heroku login
```

Then create a new Heroku app, with the name desired:

```
    heroku create freeday-iv-2
```

After this we will receive a git url on the command line output.

To push our project to heroku lets add our ap to git remote:

```
    heroku git::remote -a freeday-iv-2
```

And finally let's push the project to heroku

```
    git push heroku master
```

Now we can check the url and see our app running!

```
    https://freeday-iv-2.herokuapp.com/
```

After this we want to add CI with github so we need to access the web interface from heroku. We tried to do it via the cli, but didn't find anything about that.

![heroku-git](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/images/herokuAddGithub.png)

Easy as that! Click on connect to github, and tick the check box for waiting the CI tools to pass the test, so Heroku will wait Travis and Circle CI to pass the tests before deploying!

We can check our repository on environments to confirm that the deploy was successfull:

![heroku-deploy](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/images/heroku-deploy.png)