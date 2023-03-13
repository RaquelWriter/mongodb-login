const { MongoClient } = require('mongodb'); // import the MongoClient
const uri = require('./atlas_uri'); // import the url string for the connection
/*
 atlas_uri will contain:
 change <myDBUser> and <password> for your dbUser and DB password
module.exports = uri =
  'mongodb+srv://<myDBUser>:<password>@myatlasclusteredu.waapigk.mongodb.net/?retryWrites=true&w=majority';
*/
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

/* 
SAMPLE FOR insertOne()

const dbname = 'bank';
const collection_name = 'accounts';

const accountsCollection = client.db(dbname).collection(collection_name);

const sampleAccount = {
  account_holder: 'Linus Torvalds',
  account_id: 'MDB829001337',
  account_type: 'checking',
  balance: 50352434,
};

const main = async () => {
  try {
    await connectToDatabase();
    // insertOne method is used here to insert the sampleAccount document
    let result = await accountsCollection.insertOne(sampleAccount);
    console.log(`Inserted document: ${result.insertedId}`);
  } catch (err) {
    console.error(`Error inserting document: ${err}`);
  } finally {
    await client.close();
  }
};

main(); */
