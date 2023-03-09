const { MongoClient } = require('mongodb'); // import the MongoClient
const uri = require('./atlas_uri'); // import the url string for the connection

console.log(uri);

// Using the MongoClient to initiate the mongo connection to the DB

const client = new MongoClient(uri);

const dbname = 'myAtlasClusterEDU';

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log(`Connected to the ${dbname} database`);
  } catch (err) {
    console.error(`Error connecting to the database ${dbname}: ${err} `);
  }
};
connectToDatabase();
