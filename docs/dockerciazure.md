# Deploy app on Azure as a single container
To make things easier, we are going to deploy our app in a single container.
We will discuss how to deploy the app with multiple containers later.
First we will create the resources that our app needs, then create the app and finally sert up the Pipelines to easy deploy from github.

## Create resources 
First log in azure registry:

![azlogin](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/images/azlogin2.png)

Now we create the resource group and the registry.
We will use the resource group to manage all the resources in one group. To not mess things up. The registry of azure will hold our Docker image wich we will use to deploy the app.

![crearRGroup](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/images/crearRGroup.png)

![crearRegistryPrivado](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/images/crearRegistryPrivado.png)

Now let's build the docker image and push it to our private registry that we just created.

## Build and push image and login
Our app needs a Docker image to run, so let's build the image and push it to our registry. First we need to tag the image with the name of the registry, then log in in to the registry and finally push the image.

So let's login on our registry. First of all, we have to get the credentials

![obtenerCredencialesRegistry](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/images/obtenerCredencialesRegistry.png)

Now we can login.

![loginDockerRegistry](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/images/loginDockerRegistry.png)

Finally let's build and push our app.

![buildAndPushImagetoRegistry](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/images/buildAndPushImagetoRegistry.png)


## Create App
First we will create a service plan service where we will create the app.

![createServicePlan](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/images/createServicePlan.png)

Now create the app inside the app plan service.

![createDockerContainerApp](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/images/createDockerContainerApp.png)

We are almost done. Our app will try to download the container from our private registry but it has no access to it. In order to let the app to download our image, we have to give it access:

![setCredentialsToApp](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/images/setCredentialsToApp.png)

Now the Web App will be able to download the image and deploy it to the cloud.

Just a minutes later, our app is up and running! We can check that by accessing the UI on portal.azure.com.

![apprunning1](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/images/apprunning1.png)

![urlrunning](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/images/urlrunning.png)


## Set up Azure Pipelines

Now we have the application running in the cloud but we have not integrated the github pushes with the application. To do this, we will use the UI offered by Azure at portal.azure.com. We have to follow a few steps to configure a proper pipeline. Just follow the steps shown below.

First on Deployment Center choose Github.

![CIgithub1](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/images/CIgithub1.png)

After that, choose the repository.

![CIgithub2](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/images/CIgithub2.png)

Check that your Dockerfile is correct.

![CIgithub3](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/images/CIgithub3.png)

Create a DevOps project to hold the pipeline. Use the registry we created before.

![CIgithub4](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/images/CIgithub4.png)

Now the pipeline it's created. Now we just have to wait for the build.

![CIgithub5](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/images/CIgithub5.png)

As you can see, the last commit "Full script to deploy Azure VM a docker container" is being built.

![CIgithub6](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/images/CIgithub6.png)

We just wait a few moments and the deploys just roll out.

![CIgithub7](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/images/CIgithub7.png)

Here is the result of the last deploy. You can see the steps that he pipeline makes in order to push the new image to the cloud.

![CIgithub8](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/images/CIgithub8.png)

We made a small change on the '/' route to prove that the container it's re deployed when a change is made. And we can confirm that 'Azure funciona'.

![AzureFunciona](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/images/AzureFunciona.png)

Now, everytime we change the code on github, a new build will be triggered, and a new version of our app deployed to the cloud!