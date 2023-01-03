FROM node

EXPOSE 9009



WORKDIR /app
COPY . .
RUN npm i

RUN npm run build
WORKDIR /app
RUN ls -la
WORKDIR /app/dist

ENTRYPOINT [ "node", "main.js" ]