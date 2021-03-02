FROM node:alpine3.11
MAINTAINER TEAM_3

# Change working directory
WORKDIR /usr/src/app

# Install App Dependencies
COPY package*.json ./

COPY /backend/package*.json ./backend/

COPY /frontend/package*.json ./frontend/

# Copy App Source
COPY . .
#TODO Run any build scripts here

RUN npm install

EXPOSE 80
CMD [ "npm", "start" ]
