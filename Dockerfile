# Install the app dependencies in a full Node docker image
FROM registry.access.redhat.com/ubi8/nodejs-18:latest
USER root
WORKDIR ./server
EXPOSE 3000/tcp
EXPOSE 27017/tcp
# Copy package.json, and optionally package-lock.json if it exists
COPY ./server/package.json ./
COPY ./server/package-lock.json* ./

# Install app dependencies
RUN npm install

COPY ./server ./ 
RUN ls
RUN pwd
RUN npm run build
CMD ["npm", "start"]