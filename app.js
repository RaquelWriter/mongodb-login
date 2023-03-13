const { MongoClient } = require('mongodb'); // import the MongoClient
const uri = require('./.atlas_uri'); // import the url string for the connection
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

/* SAMPLE FOR findMany()

const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const safeURI = `${uri.slice(0, 14)}****${uri.slice(30, 31)}****${uri.slice(
  47
)}`;

const client = new MongoClient(uri);

const dbname = 'bank';
const collection_name = 'accounts';

const accountsCollection = client.db(dbname).collection(collection_name);

// Connect to the database
const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log(
      `Connected to the ${dbname} database 🌍 \nFull connection string: ${safeURI}`
    );
  } catch (err) {
    console.error(`Error connecting to the database: ${err}`);
  }
};

const documentsToFind = { balance: { $gt: 4700 } };

const main = async () => {
  try {
    await connectToDatabase();
    // TODO: Run a method on the accounts collection and assign it to a variable, `result`
    let result = await accountsCollection.findMany(documentsToFind);
    let docCount = accountsCollection.countDocuments(documentsToFind);
    await result.forEach((doc) => console.log(doc));
    console.log(`Found ${await docCount} documents`);
  } catch (err) {
    console.error(`Error finding documents: ${err}`);
  } finally {
    await client.close();
  }
};

main();
*/

/* SAMPLE FOR updateOne()

// Require MongoDB language driver
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;
const safeURI = `${uri.slice(0, 14)}****${uri.slice(30, 31)}****${uri.slice(47)}`

const client = new MongoClient(uri);

const dbname = "bank";
const collection_name = "accounts";

const accountsCollection = client.db(dbname).collection(collection_name);

// Connect to the database
const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log(
      `Connected to the ${dbname} database 🌍 \nFull connection string: ${safeURI}`
    );
  } catch (err) {
    console.error(`Error connecting to the database: ${err}`);
  }
}

// Filter used to find the document to update
const documentToUpdate = { _id: ObjectId("62d6e04ecab6d8e130497482") };

// Operation(s) to perform on the document.
const update = { $inc: { balance: 100 } };

const main = async () => {
  try {
    await connectToDatabase();
    // TODO: Run the method on the accounts collection and assign it to a variable, `result`
    let result = await accountsCollection.updateOne(documentToUpdate, update)
    result.modifiedCount === 1
      ? console.log("Updated one document")
      : console.log("No documents updated");
  } catch (err) {
    console.error(`Error updating document: ${err}`);
  } finally {
    await client.close();
  }
}

main()

*/
