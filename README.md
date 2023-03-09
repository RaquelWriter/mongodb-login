# MONGODB Database connection with Node.js

Simple sample of connection with the MongoDB with Node.js

## Installation instructions

- Download the project.

- Install dependencies: `npm install` or `yarn install`.

## Change code

- Change the string url in atlas_uri.js with your string url. Check the instructions here:
  [Connection String URI Format](https://www.mongodb.com/docs/manual/reference/connection-string/)

- Change the dbname const variable in app.js for the name of the database you want to connect in your MongoDB cluster.

```javascript
const dbname = 'myAtlasClusterEDU';
```

## Run instructions

In your terminal run:
`node app.js`
