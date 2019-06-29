FROM node:11

# Create app directory
RUN mkdir -p /usr/src/app/THECHANGER-FRONTEND-V1
WORKDIR /usr/src/app/THECHANGER-FRONTEND-V1

# Install app dependencies
COPY package.json /usr/src/app/THECHANGER-FRONTEND-V1
RUN npm install

# Set environment variables
ENV NODE_ENV production
ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT 7000

# Bundle app source
COPY . /usr/src/app/THECHANGER-FRONTEND-V1
RUN npm run build

EXPOSE 7000
CMD [ "npm", "start" ]