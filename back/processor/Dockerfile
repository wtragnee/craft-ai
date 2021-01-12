FROM node:15.5.1
LABEL maintainer="w.tragnee@gmail.com"
LABEL name="node"

WORKDIR /usr/src/app

COPY src ./src
COPY package.json package-lock.json tsconfig.json ./

RUN npm install
RUN npm run build

CMD ["npm","run", "run"]
