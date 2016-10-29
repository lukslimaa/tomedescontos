#!/bin/bash
echo "Initializing all the server resources ..."

echo -e "Starting MongoDB"
mongod &

echo -e "Starting Server Project by Nodemon:"
nodemon server.js

