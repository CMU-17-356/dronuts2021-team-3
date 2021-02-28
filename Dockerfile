FROM node:alpine3.11
MAINTAINER TEAM_3

# Change working directory
WORKDIR /usr/src/app

# Install App Dependencies
COPY package*.json ./

# Copy App Source
COPY . .
#TODO Run any build scripts here

RUN npm install

EXPOSE 80
CMD [ "npm", "start" ]
