FROM node:7
RUN mkdir /practice_docker
ADD . /src/app
WORKDIR /src/app
RUN npm i

EXPOSE 3000
CMD ["npm", "start"]


## RUN ./user_datafrontend/npm i