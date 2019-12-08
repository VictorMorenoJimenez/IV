#!/bin/bash

# Some constants
resourcegroup='freedayIV_rGroup'
appname='FreeDayIV'
adminUser='freedayiv'
installAzUrl='https://aka.ms/InstallAzureCLIDeb'
port=80

# Check if Azure cli installed and install it if not.

if [[ $(command -v az ) ]]; then
    echo "Azure client detected, not installing..."
else
    echo "Azure client not detected, installing..."
    curl -sL  $installAzUrl | sudo bash
fi

# Create resource Group

az group create --name $resourcegroup --location westeurope

# Create VM
set -e
ip=`az vm create \
   --resource-group $resourcegroup \
   --name $appname \
   --image UbuntuLTS \
   --admin-username $adminUser \
   --generate-ssh-keys \
   --custom-data cloud-init.txt | grep publicIpAddress | cut -d" " -f4 | sed 's/[^0-9.]*//g'`
set -e

# Open port 80
az vm open-port --port 80 \
   --resource-group $resourcegroup \
   --name $appname

echo "Private ip is $ip"
echo "Executing some commands on remote VM..."

# Primero updateamos paquetes en el host

ssh -o "StrictHostKeyChecking no" $adminUser'@'$ip 'sudo apt-get update'
ssh -o "StrictHostKeyChecking no" $adminUser'@'$ip '/bin/bash' <<- 'EOF'
    sudo su
    sleep 20
    echo "Downloading docker-compose"
    sudo apt-get update
    sleep 30
    sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
    echo "Cloning IV repo"
    git clone https://github.com/VictorMorenoJimenez/IV.git
    mkdir IV/data
    sudo chown -R $adminUser:$adminUser IV/data
    echo "Install az cli to log in on registry"
    sudo curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
    sleep 120
    echo "Log in into Azure Registry"
    sudo az acr login --name freedayregistry --username freedayregistry --password bWAMnliT1L9E/KOxBpSdXmiVDhigNLtA
    sleep 20
    echo "Deploying stack"
    sudo docker-compose -f IV/docker-compose-no-logs.yml up -d
EOF

# Open the web 
if [[ $(command -v firefox) ]]; then
    echo "Redirecting to the web on firefox..."
    firefox "$ip/status"
elif [[ $(command -v google-chrome) ]]
    echo "Redirecting to the web on google chrome..."
    google-chrome "$ip/status"
else
    echo "No google chrome or firefox detected, paste $ip/status on a browser"
fi