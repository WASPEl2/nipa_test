FROM node:lts

WORKDIR /app

RUN groupadd -r app && useradd -r -g app app-user

COPY package*.json ./

RUN yarn install --production

COPY . .

RUN yarn build

RUN yarn global add serve

CMD ["serve", "-s", "dist"]

