# Azure VM deploy
We choosed an Azure VM to deploy the application instead of on a cluster of Kubernetes because it's easier and cheaper. If you are on a Debian system you can follow this steps, otherwise you can check
[this link](https://docs.microsoft.com/es-es/cli/azure/install-azure-cli?view=azure-cli-latest) with the official Azure docs.

```
    curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```
First we are going to create a resource group for the VM as we did before with the K8s cluster:

```
    az group create --name DockerGroup --location westeurope
```

Now we can create the VM. We are going to expose the port 80 of the VM, there we will deploy our node app.

```
    az vm create  --resource-group DockerGroup  --name FreeDayIV  --image       UbuntuLTS --admin-username victor --generate-ssh-keys --custom-data    cloud-init.txt\naz vm open-port --port 80 --resource-group         DockerGroup --name FreeDayIV
```

Once it's created you will receive an output with the VM info aswell as the public ip to ssh on it.

```
    ssh victor@51.136.32.89
```

In the machine we want to install the last version of docker-compose. Just follow this steps:

```
    sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

```
    sudo chmod +x /usr/local/bin/docker-compose
```

```
    sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

Now let's clone our project on the VM to deploy it:

```
    git clone https://github.com/VictorMorenoJimenez/IV.git
```

We have a little script to help us to start the docker containers:

```
    ./depoy-VM.sh
```

And that's all we can test that our app is running with POSTMAN:

![postmantest](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/images/postmanVMtest.png)