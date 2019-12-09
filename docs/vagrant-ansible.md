# Provision VM created with Vagrant

Vagrant is a tool for building and managing virtual machine environments in a single workflow. We are going to deploy our project to a VM managed by Vagrant and provisioned with Ansible. Let's find out how!

## Choose Vagrant VM image
First of all we have to choose wich VM image is going to run our VM. In order to choose we created a few VM's with different images and then ran apache benchmark with different number of requests. The fastest one is going to be our choosen image.

We made 3 benchmarks, 1000, 10000 and 100000 requests.
We have choosen the metric time per request and requests per second. With wich we are going to build our table.

### Benchmarking Apache Benchmark
This are the results of ab on debian10 image. We did the same with Ubuntu 18 and Ubuntu 19. Let's find out wich is the best one for us.

```
ab -n 1000 -c 10 http://localhost:8080/status

This is ApacheBench, Version 2.3 <$Revision: 1843412 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking localhost (be patient)
Completed 100 requests
Completed 200 requests
Completed 300 requests
Completed 400 requests
Completed 500 requests
Completed 600 requests
Completed 700 requests
Completed 800 requests
Completed 900 requests
Completed 1000 requests
Finished 1000 requests


Server Software:        
Server Hostname:        localhost
Server Port:            8080

Document Path:          /status
Document Length:        581 bytes

Concurrency Level:      10
Time taken for tests:   0.544 seconds
Complete requests:      1000
Failed requests:        0
Total transferred:      790000 bytes
HTML transferred:       581000 bytes
Requests per second:    1838.48 [#/sec] (mean)
Time per request:       5.439 [ms] (mean)
Time per request:       0.544 [ms] (mean, across all concurrent requests)
Transfer rate:          1418.36 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.0      0       0
Processing:     0    5   1.3      5      11
Waiting:        0    3   1.2      3      10
Total:          0    5   1.3      5      11

Percentage of the requests served within a certain time (ms)
  50%      5
  66%      6
  75%      6
  80%      6
  90%      7
  95%      7
  98%     10
  99%     11
 100%     11 (longest request)
```

```
ab -n 10000 -c 10 http://localhost:8080/status                     
This is ApacheBench, Version 2.3 <$Revision: 1843412 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking localhost (be patient)
Completed 1000 requests
Completed 2000 requests
Completed 3000 requests
Completed 4000 requests
Completed 5000 requests
Completed 6000 requests
Completed 7000 requests
Completed 8000 requests
Completed 9000 requests
Completed 10000 requests
Finished 10000 requests


Server Software:        
Server Hostname:        localhost
Server Port:            8080

Document Path:          /status
Document Length:        581 bytes

Concurrency Level:      10
Time taken for tests:   3.407 seconds
Complete requests:      10000
Failed requests:        0
Total transferred:      7900000 bytes
HTML transferred:       5810000 bytes
Requests per second:    2935.46 [#/sec] (mean)
Time per request:       3.407 [ms] (mean)
Time per request:       0.341 [ms] (mean, across all concurrent requests)
Transfer rate:          2264.66 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.0      0       0
Processing:     0    3   1.3      3      15
Waiting:        0    2   0.9      2      13
Total:          0    3   1.3      3      15

Percentage of the requests served within a certain time (ms)
  50%      3
  66%      4
  75%      4
  80%      4
  90%      5
  95%      6
  98%      7
  99%      8
 100%     15 (longest request)
```

```
ab -n 100000 -c 10 http://localhost:8080/status
This is ApacheBench, Version 2.3 <$Revision: 1843412 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking localhost (be patient)
Completed 10000 requests
Completed 20000 requests
Completed 30000 requests
Completed 40000 requests
Completed 50000 requests
Completed 60000 requests
Completed 70000 requests
Completed 80000 requests
Completed 90000 requests
Completed 100000 requests
Finished 100000 requests


Server Software:        
Server Hostname:        localhost
Server Port:            8080

Document Path:          /status
Document Length:        581 bytes

Concurrency Level:      10
Time taken for tests:   34.698 seconds
Complete requests:      100000
Failed requests:        0
Total transferred:      79000000 bytes
HTML transferred:       58100000 bytes
Requests per second:    2882.04 [#/sec] (mean)
Time per request:       3.470 [ms] (mean)
Time per request:       0.347 [ms] (mean, across all concurrent requests)
Transfer rate:          2223.45 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    0   0.0      0       1
Processing:     1    3   0.5      3      10
Waiting:        1    2   0.4      2       8
Total:          2    3   0.5      3      10

Percentage of the requests served within a certain time (ms)
  50%      3
  66%      4
  75%      4
  80%      4
  90%      4
  95%      4
  98%      5
  99%      5
 100%     10 (longest request)
```

### Result Table
We did the benchmarks to Ubuntu 18.04, Ubuntu 19.04 and Debian 10 and here are the results. Time per request on ms and Request per second on seconds.

1000 Requests with Concurrency 10:

| 1000 requests 	| Time per request 	| Requests per second 	|
|---------------	|------------------	|---------------------	|
| Debian 10     	|     5.439     	|      1838.94         	|
| Ubuntu 18.04  	|     5.339       	|      1873.17        	|
| Ubuntu 19.04  	|     5.024        	|      1990.57        	|

10000 Requests with Concurrency 10:

| 10000 requests 	| Time per request 	| Requests per second 	|
|---------------	|------------------	|---------------------	|
| Debian 10     	|     3.407        	|       2935.46       	|
| Ubuntu 18.04  	|     2.946       	|       3393.94       	|
| Ubuntu 19.04  	|     3.286       	|       3043.29        	|

100000 Requests with Concurrency 10:

| 100000 requests 	| Time per request 	| Requests per second 	|
|---------------	|------------------	|---------------------	|
| Debian 10     	|     3.470     	|       2882.04        	|
| Ubuntu 18.04  	|     2.238       	|       4467.90       	|
| Ubuntu 19.04  	|     2.591        	|       3860.15        	|


As you can see there is no big difference, but we can see that Ubuntu 18.04 seems to do a bit better. So we are going to use the image of Ubuntu 18.04 LTS. 

## Vagrantfile 

Once we have choosen our image we are going to create a Vagrantfile in order to help us to create VM's to host our project. All we need is a Vagrantfile, something like this:

```Ruby
  # -*- mode: ruby -*-
  # vi: set ft=ruby :

  Vagrant.configure("2") do |config|

    config.vm.box = "ubuntu/bionic64"

    config.vm.network "forwarded_port", guest: 8080, host: 8080

    config.vm.network "private_network", ip: "192.168.20.2"

    config.vm.provider "virtualbox" do |vb|
      vb.memory = "2048"
      vb.cpus = 2
      vb.name = "freeday"
    end

    config.vm.provision "ansible" do |ansible|
      ansible.playbook = "provisioning/playbook.yml"
      #ansible.inventory_path = "provisioning/inventory"
      ansible.groups = {
        "localvm" => ["default"] 
      }
      ansible.verbose  = "vvv"
    end
    
  end
```

Vagrantfile is a ruby file where we configure our VM.

1. **vm.box** tells Vagrant what vagrant cloud image to use in the creation of the vm.
2. **vm.network** "forwarded_port" this option will bind the VM port 8080 to the host port 8080, in order to access the app from host.
3. **vm.network** "private_network" just sets an ip for the guest.
4. **vm.provider** "virtualbox" we set some vars when the provider is virtualbox, such as RAM, CPU's or the virtual box name.
5. **vm.provision** "ansible". When the provisioning software is ansible we tell Vagrant where is the playbook file and we define the groups that we will use on our Ansible playbooks.

Once we have our Vagrantfile ready, all we need to do is run the command:
```
  vagrant up
```

Vagrant will deploy a new VM and provision it with Ansible. We will see a demo at the end of the doc.

## Provisioning Ansible

Ansible is an open source automation platform. It is very simple to set up and it can help us to configure, manage and deploy our project in to a VM, either on local or in the cloud.

Ansible needs a playbook.yml file where you tell him wich tasks to do. Our playbook.yml it's very simple:

```yml
---
- hosts: localvm 
  gather_facts: yes
  become: yes

  vars_files:
    - vars/main.yml

  pre_tasks:
    - name: Update packages
      apt:
        update_cache: yes
    - name: Create directory to clone project
      file:
        path: "{{ clone_path }}"
        state: directory

  tasks:     
    - name: Upgrade packages
      apt:
        name: "*"
        state: latest

    - name: Install npm
      apt:
        name: npm
        state: present
    
    - name: Install git
      apt:
        name: git
        state: present

    - name: Clone repository
      git:
        repo: "{{ repo_url }}"
        dest: "{{ clone_path }}"

    - name: Npm install based on package.json 
      npm:
        path: "{{ clone_path }}" 
        
    - name: Install pm2
      npm:
        name: pm2
        global: yes

    - name: Start stop 
      command: npm stop 
      args:
        chdir: "{{ clone_path }}"

    - name: Start app
      command: npm start
      args:
        chdir: "{{ clone_path }}"
```

1. **Hosts**, we tell Ansible in wich host group run the playbook. In this case works because we defined on Vagrantfile a group of hosts with the name localvm
2. **vars_files**. We are using some vars like repo_url and clone_path defined on vars/main.yml
3. **pre_tasks**. This tasks will run before tasks.
4. **tasks**. This are the steps that Ansible will run in order to complete the playbook. There's no need to explain since the names are self explanatory.

One important thing is that we have to tell Ansible in wich directory run the commands. 

Vagrant will use this playbook to provision the created VM when the command vagrant up launches. Here is a demo:

[![vagrantup](https://asciinema.org/a/XgQNg1RlFRMji9gAN6ZspIDRb.svg)](https://asciinema.org/a/XgQNg1RlFRMji9gAN6ZspIDRb)

We can see how all the steps on the ansible playbook are run and then we can access from the host to the node app via localhost:8080 since we binded the port on de Vagrantfile.

## Create Vagrant Box

Now that our VM is ready we can pack that new image with our changes in a Vagrant box and upload it to the Vagrant cloud.

On the same directory as the Vagrantfile just run:

```bash
  vagrant package --output freeday.box
```

## Upload Vagrant Box
## Bibliography

1. [Ansible](https://www.vagrantup.com/docs/provisioning/ansible_intro.html)
2. [Vagrantfile](https://medium.com/@Joachim8675309/vagrant-provisioning-with-ansible-6dba6bca6290)
3. [Ansible Vars](https://docs.ansible.com/ansible/latest/user_guide/playbooks_variables.html)
4. [Npm commands Ansible](https://docs.ansible.com/ansible/latest/modules/npm_module.html)
5. [Apt commands Ansible](https://docs.ansible.com/ansible/latest/modules/npm_module.html)
6. [Asciinema](https://asciinema.org/)
7. [Ansible Host Groups](https://www.vagrantup.com/docs/provisioning/ansible_intro.html)
8. [Problem with hosts Ansible](https://stackoverflow.com/questions/44801850/no-hosts-matched-vagrant-with-ansible)
9. [Apache Benchmark](https://www.petefreitag.com/item/689.cfm)
10. [Create Vagrant Box](https://scotch.io/tutorials/how-to-create-a-vagrant-base-box-from-an-existing-one)
11. [Upload Vagrant Box](https://blog.ycshao.com/2017/09/16/how-to-upload-vagrant-box-to-vagrant-cloud/)