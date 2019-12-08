#!/bin/bash
sudo chown -R `whoami`:`whoami` data
docker build -t node_app .
docker-compose -c docker-compose-no-logs.yml up