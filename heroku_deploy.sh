#!/bin/bash
echo "Log in the web browser"
heroku login
echo "Create Heroku app"
heroku create freedayapi
echo "Log in the container of heroku"
heroku container:login
echo "@@@@@@@@@@@@@@@@@@@@@ Building image @@@@@@@@@@@@@@@@@@@"
docker build -t web .
echo "@@@@@@@@@@@@@@@@@@@@@ Pushing imageto heroku container @@@@@@@@@@@@@@@@@@@"
heroku container:push web
echo "@@@@@@@@@@@@@@@@@@@@@ Set node ENV @@@@@@@@@@@@@@@@@@@"
heroku config:set NODE_ENV='HEROKU'
echo "@@@@@@@@@@@@@@@@@@@@@ Release and Scale @@@@@@@@@@@@@@@@@@@"
heroku container:release web
heroku ps:scale web=1
echo "@@@@@@@@@@@@@@@@@@@@@ Openning browser @@@@@@@@@@@@@@@@@@@"
heroku open