# Kibana
After deploying the app in containers as explained in the [docker section](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/docker.md), you can view the logs that kibana receives through its web interface.

That's pretty simple, just access in a web browser from the host to http://localhost:5601. Then we will have to add a new index to search for logs, in our case the index is **fluentd-\***. 
After creating the index, we will be able to click con Discover Kibana menu and view our logs from the containers:

![kibana logs](https://github.com/VictorMorenoJimenez/IV/blob/master/docs/images/kibanaui.png)

Kibana offers a grant of ways to view the logs, as well as many other useful tools, it is a great idea to navigate through its interface and learn the functions it has.