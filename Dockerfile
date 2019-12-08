FROM node:12

# Create app directory
WORKDIR /usr/src/iv

COPY package*.json ./
# Install all dependencies
RUN npm install

# Install pm2 process manager
RUN npm install pm2 -g

# Docker env
ENV NODE_ENV=DOCKER

# Copy all code
COPY . .

# EXpose port and start application
EXPOSE 8080

CMD ["npm", "start"]
