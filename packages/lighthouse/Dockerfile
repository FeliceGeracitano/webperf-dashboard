FROM node:11.3.0

RUN mkdir -p /usr/src/webperf-dashboard-lighthouse
WORKDIR /usr/src/webperf-dashboard-lighthouse

COPY . .

RUN npm install
RUN npm run build


# Install Google Chrome
RUN \
  wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
  sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
  apt-get update && \
  apt-get install -y google-chrome-stable

EXPOSE 3000

CMD ["npm", "run", "serve"]
