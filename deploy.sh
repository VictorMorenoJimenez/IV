#!/bin/bash
sudo chown -R victor:victor data
docker build -t node_app .
docker-compose up