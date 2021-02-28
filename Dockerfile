FROM node:alpine3.11
MAINTAINER TEAM_3

# Change working directory
WORKDIR /usr/src/app

# Copy App Source
COPY . .
#TODO Run any build scripts here

# Install App Dependencies
COPY package*.json ./
RUN npm install
