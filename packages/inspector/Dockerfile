FROM node:11.3.0

RUN mkdir -p /usr/src/inspector
WORKDIR /usr/src/inspector

COPY . .

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "serve"]
