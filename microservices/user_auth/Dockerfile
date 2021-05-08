FROM node:12.18.1
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN ./node_modules/tsc/bin/tsc -p ./tsconfig.json 
CMD ["npm", "start"]
