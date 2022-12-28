FROM node

EXPOSE 80
EXPOSE 5432


WORKDIR /app
COPY . .
RUN npm i

RUN npm run build
WORKDIR /app/dist

ENTRYPOINT [ "node", "main.js" ]