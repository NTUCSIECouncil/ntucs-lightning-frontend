FROM node:11

# Create app directory
RUN mkdir -p /usr/src/app/ntucs-lightning-frontend
WORKDIR /usr/src/app/ntucs-lightning-frontend

# Install app dependencies
COPY package.json /usr/src/app/ntucs-lightning-frontend
RUN npm install

# Set environment variables
ENV NODE_ENV production
ENV NUXT_HOST 0.0.0.0
ENV PORT 4000

# Bundle app source
COPY . /usr/src/app/ntucs-lightning-frontend
RUN npm run build

EXPOSE 4000
CMD [ "npm", "start" ]