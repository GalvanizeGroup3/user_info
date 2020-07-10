FROM node:latest
##RUN mkdir -p /src/app
WORKDIR /src/app
COPY . . 
RUN npm i

EXPOSE 3000
CMD ["node", "server.js"]