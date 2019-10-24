FROM node:12

# Create app directory
WORKDIR /usr/src/iv

RUN mkdir /mnt/mongodb

COPY package*.json ./
#Install all dependencies

RUN npm install

# Copy all code
COPY . .

# EXpose port and start application
EXPOSE 8080

CMD ["npm", "start"]
