FROM node:12.18.1
WORKDIR /app
#COPY package*.json ./
RUN npm install -g serve
COPY . .
CMD serve -s dist
