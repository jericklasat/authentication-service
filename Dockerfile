FROM node:14

RUN apt-get update \
	&& apt-get install -y openssl \
	&& rm -rf /var/lib/apt/lists/* \
	&& rm -rf /var/cache/apt/*

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./

RUN npm install

RUN npm install -g nodemon

COPY . .

EXPOSE 4001

CMD ["npm", "run", "dev"]