# Azure deploy on Kubernetes cluster
## Install azure cli on your system
First of all we should install the azure cli to manage our cluster and resources.

If you are on a Debian system you can follow this steps, otherwise you can check
[this link](https://docs.microsoft.com/es-es/cli/azure/install-azure-cli?view=azure-cli-latest) with the official Azure docs.

In our case we follow the Debian steps and we can do it with only one command.
```
    curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```

Now we have to login, we need a proper microsoft account with Azure credits.
We type on terminal
```
    az login
```

And a browser will open where you can login with your Azure credentials.

![azlogged](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/images/azlogin.png)

## Create resource group for the cluster
Once we are logged in on the az client, we can manage our services from  the terminal. First we are going to create the resource group needed for our cluster. Our resource group will hold things like VM scalation, virutal networks and managed disks.

In our case we choosed the name resource-iv2 on Europe West location.

```
    az group create --name resource-iv2 --location westeurope
```
Now we can use the resource group to create the cluster.

## Create K8s cluster
The next step will take a while, we are going to create the K8s cluster with 2 nodes. Azure cli will do everything for us.
```
az aks create --resource-group resource-iv2 --name FreeDayIV2 --node-count 2 --enable-addons monitoring --generate-ssh-keys
```

Then a Running will prompt on your terminal, this will take between 5 and 10 minutes.

![servicek8](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/images/createservicek8.png)

Finally you will get prompt with the info of your new cluster:

```
{
  "aadProfile": null,
  "addonProfiles": {
    "omsagent": {
      "config": {
        "logAnalyticsWorkspaceResourceID": "/subscriptions/58bb8f58-9efd-455b-bab1-9fa8f27db8fc/resourcegroups/defaultresourcegroup-wus2/providers/microsoft.operationalinsights/workspaces/defaultworkspace-58bb8f58-9efd-455b-bab1-9fa8f27db8fc-wus2"
      },
      "enabled": true
    }
  },
  "agentPoolProfiles": [
    {
      "availabilityZones": null,
      "count": 2,
      "enableAutoScaling": null,
      "enableNodePublicIp": null,
      "maxCount": null,
      "maxPods": 110,
      "minCount": null,
      "name": "nodepool1",
      "nodeTaints": null,
      "orchestratorVersion": "1.13.12",
      "osDiskSizeGb": 100,
      "osType": "Linux",
      "provisioningState": "Succeeded",
      "scaleSetEvictionPolicy": null,
      "scaleSetPriority": null,
      "type": "VirtualMachineScaleSets",
      "vmSize": "Standard_DS2_v2",
      "vnetSubnetId": null
    }
  ],
  "apiServerAccessProfile": null,
  "dnsPrefix": "FreeDayIV2-resource-iv2-58bb8f",
  "enablePodSecurityPolicy": null,
  "enableRbac": true,
  "fqdn": "freedayiv2-resource-iv2-58bb8f-55be4f22.hcp.westus2.azmk8s.io",
  "id": "/subscriptions/58bb8f58-9efd-455b-bab1-9fa8f27db8fc/resourcegroups/resource-iv2/providers/Microsoft.ContainerService/managedClusters/FreeDayIV2",
  "identity": null,
  "kubernetesVersion": "1.13.12",
  "linuxProfile": {
    "adminUsername": "azureuser",
    "ssh": {
      "publicKeys": [
        {
          "keyData": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC5liKT9O3q57tx8MQC6GKvs7tP4hV+9cJSYAyLavBEHbz3nxDf+k2vdTXAuUXK7d4xgHQOmXDzf/NjTJ2fFUcbSKfwppyRMfrN/8x0TYWVirefhn4WWg6j7lfXVoGOEBBAzLxp4ZrGTBX6LKyKXyznE/3WgN9ooxnKHudKSdtgpsOn/1bcGpqzzzBvjL9TzCb3rTmQzKclKLHnAqUFrxvNO6pSkIZOzEjUk0ltXKF579NxhGXUfTBKAgO5hzghlV8bCTJ/PiTVJ+NMsHO3jYgtxw3wp5m09RmZT1JZuuVxihnf/pSA3erJ9r6cAmZYrzhN/ObL7wjh9Gyjqkks7vJ9 victor@home\n"
        }
      ]
    }
  },
  "location": "westus2",
  "maxAgentPools": 8,
  "name": "FreeDayIV2",
  "networkProfile": {
    "dnsServiceIp": "10.0.0.10",
    "dockerBridgeCidr": "172.17.0.1/16",
    "loadBalancerProfile": {
      "effectiveOutboundIps": [
        {
          "id": "/subscriptions/58bb8f58-9efd-455b-bab1-9fa8f27db8fc/resourceGroups/MC_resource-iv2_FreeDayIV2_westus2/providers/Microsoft.Network/publicIPAddresses/6553612d-c18b-4a2d-9cd3-4dcb15db3051",
          "resourceGroup": "MC_resource-iv2_FreeDayIV2_westus2"
        }
      ],
      "managedOutboundIps": {
        "count": 1
      },
      "outboundIpPrefixes": null,
      "outboundIps": null
    },
    "loadBalancerSku": "Standard",
    "networkPlugin": "kubenet",
    "networkPolicy": null,
    "podCidr": "10.244.0.0/16",
    "serviceCidr": "10.0.0.0/16"
  },
  "nodeResourceGroup": "MC_resource-iv2_FreeDayIV2_westus2",
  "provisioningState": "Succeeded",
  "resourceGroup": "resource-iv2",
  "servicePrincipalProfile": {
    "clientId": "3f616d77-6ead-4413-86e0-60348d07e8d5",
    "secret": null
  },
  "tags": null,
  "type": "Microsoft.ContainerService/ManagedClusters",
  "windowsProfile": null
}
```

## Create private registry and login
We will need a private registry for hold our custom container images. So the kubernetes cluster will create containers with that images on our private registry. We can create the registry from the WUI very easy but we are going to create it with the az cli. We can do this while the K8s cluster is being created.

We can do it with like this:

```
    az acr create --resource-group resource-iv2 --name freedaycontainer2 --sku Basic
```

After a few seconds we will get an output like this:

![createRegistry](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/images/createdRegistry.png)

Once it's created we need to login in order to push custom images, you won't be prompted with any passwords because it uses the credentials from the previous **az login**.

But first of all we need to enable the admin access:

```
    az acr update -n freedaycontainer2 --admin-enabled true
```

```
    az acr login --name freedaycontainer2
```

You will be prompted with username and password, that you can find on your Azure panel -> Container Registries -> Access Keys. 

![loggedRegistry](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/images/loggedOK.png)

## Upload images to private registry
Assuming that you have a proper image of the app built on your system, if not you can check our [docker docs](https://github.com/VictorMorenoJimenez/IV/blob/master/docs//docker.md). If you folowed the steps, you will have an image on your system named node_app. Now we will tag it properly and push it to the Azure private registry.

First let's tag the image:

```
    docker tag node_app freedaycontainer2.azurecr.io/images/node_app
```

We don't need to upload the mongoDB image because we are using the official one.

Once you tagged the image, you can simply push the image to the private registry.

## Deployments
Now that we have our cluster created with the resource group and our private 

### Node app

### MongoDB

## Deploy Project on K8s cluster