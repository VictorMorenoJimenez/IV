# Azure deployment from github with CI
Azure is one of the most used PaaS in the IT world. Together with AWS Azure dominates the cloud computing market. We have chosen Azure as a great alternative to AWS with a more affordable price. Also one of the great reasons that azure has been chosen is for its students pack, where you are offered 100 dollars of credit to try with their services. Now we will deploy freeday project to Azure, directly from github after passing the travis CI tests.

## Deploy
Azure it's a bit more complex than Heroku so it will take a few more steps.
First we have to create the resources and the App plan service in order to create a web app.

Well, first of all let's log in 

```
    az login
```

Now let's create an user that will be able to push to the git repository set on Azure.

```
    az webapp deployment user set --user-name $user --password $password
```

Now we create the resource group that we are going to use as well as the webapp plan service. In our case we alredy created the resource group on the [Azure deployment VM](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/azureVMdeploy.md) and [Azure with Kubernetes](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/kubernetes.md). Feel free to have a look.

So our resource group is resource-iv. And we create the plan service.

```
    az appservice plan create --name freedayServiceApp --resource-grup resource-iv --sku FREE
```

The --sku tells Azure to use the free tier. Now that we have the appservice plan, we can create our app. We tell the app to create with the --deployment-local-git to push from our local repo the project to the git repo on Azure.

```
    az webapp create --name freedayivapp --resource-group resource-iv --plan freedayServiceApp --deployment-local-git
```

Now, in order to configure the git local to the webapp, we have to run:

```
    az webapp deployment source config-local-git --name freedayivapp --resource-group resource-iv
```

We are almost ready, we just need to add the remote Azure github repo.

```
    git remote add azure https://$user@freedayivapp.scm.azurewebsites/net/freedayivapp.git
```

The git url is given from the commands above. When you create the webapp.

Now we are ready to push from our local repository to the Azure repo. After that we just need to configure Travis CI to auto-deploy to Azure when a push is done.
First let's push the app:

```
    git push azure master
```

This command push the master branch to the azure remote repository. Once it's finished, we can see our app running on the cloud! Just access the url given, something like:

```
    https://<appname>.azurewebsites.net
```

In our case:

```
    http://freedayivapp.azurewebsites.net/
```

Finally, following [this docs](https://docs.travis-ci.com/user/deployment/azure-web-apps/) from Travis CI we configured Travis to auto deploy. Here is the new configuration file. Be aware that we defined the $VARIABLE on Travis CI in order to protect sensible data. So we have to add the env vars to Travis CI.

```
.
.
.

deploy:
  provider: azure_web_apps
  on: master
  verbose: true
  username: $AZURE_USER
  password: $AZURE_PASSWORD
  site: $AZURE_SITE
```

We set the user and password added before when creating the user, and the site var is just the name of the app.

So now, everytime that we make a push to our repository, Travis will deploy the new version to the app to the Azure app service!

We can check that, our app is running on the given ip address:

![azure-url](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/images/azurelast.png)


