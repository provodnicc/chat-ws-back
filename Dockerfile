FROM node

EXPOSE 9009



WORKDIR /app
COPY . .
RUN npm i

RUN npm run build
WORKDIR /app/dist
RUN ls -la

ENTRYPOINT [ "node", "main.js" ]