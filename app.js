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

/* SAMPLE Of updateMany()

// Require MongoDB language driver
const { MongoClient } = require("mongodb")
require("dotenv").config()

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri)
const safeURI = `${uri.slice(0, 14)}****${uri.slice(30, 31)}****${uri.slice(47)}`;

const dbname = "bank"
const collection_name = "accounts"

const accountsCollection = client.db(dbname).collection(collection_name)

// Connect to the database
const connectToDatabase = async () => {
  try {
    await client.connect()
    console.log(`Connected to the ${dbname} database 🌍 \nFull connection string: ${safeURI}`)
  } catch (err) {
    console.error(`Error connecting to the database: ${err}`)
  }
}

const documentsToUpdate = { account_type: "checking" }
const update = { $push: { transfers_complete: "TR413308000" } }


const main = async () => {
  try {
    await connectToDatabase();
    // TODO: Run the method on the accounts collection and assign it to a variable, `result`
    let result = await accountsCollection.updateMany(documentsToUpdate, update)
    result.modifiedCount > 0
      ? console.log(`Updated ${result.modifiedCount} documents`)
      : console.log("No documents updated");
  } catch (err) {
    console.error(`Error updating documents: ${err}`)
  } finally {
    await client.close()
  }
}

main()

*/

/* SAMPLE of deleteOne()

Using deleteOne()
To delete a single document from a collection, use the deleteOne() method on a collection object. This method accepts a query filter that matches the document that you want to delete. If you do not specify a filter, MongoDB matches and deletes the first document in the collection. Here's an example:

const dbname = "bank"
const collection_name = "accounts"

const accountsCollection = client.db(dbname).collection(collection_name)

const documentToDelete = { _id: ObjectId("62d6e04ecab6d8e13049749c") }

const main = async () => {
  try {
    await connectToDatabase()
    let result = await accountsCollection.deleteOne(documentToDelete)
    result.deletedCount === 1
      ? console.log("Deleted one document")
      : console.log("No documents deleted")
  } catch (err) {
    console.error(`Error deleting documents: ${err}`)
  } finally {
    await client.close()
  }
}

main()

Using deleteMany()
You can delete multiple documents from a collection in a single operation by calling the deleteMany() method on a collection object. To specify which documents to delete, pass a query filter that matches the documents that you want to delete. If you provide an empty document, MongoDB matches all documents in the collection and deletes them. In the following example, we delete all accounts with a balance of less than 500 by using a query filter. Then, we print the total number of deleted documents.

const dbname = "bank"
const collection_name = "accounts"

const accountsCollection = client.db(dbname).collection(collection_name)

const documentsToDelete = { balance: { $lt: 500 } }

const main = async () => {
 try {
   await connectToDatabase()
   let result = await accountsCollection.deleteMany(documentsToDelete)
   result.deletedCount > 0
     ? console.log(`Deleted ${result.deletedCount} documents`)
     : console.log("No documents deleted")
 } catch (err) {
   console.error(`Error deleting documents: ${err}`)
 } finally {
   await client.close()
 }
}
 
main()

*/

/* Sample of deleteMany()
// Be careful deleteMany() will delete ALL documents

Using deleteOne()
To delete a single document from a collection, use the deleteOne() method on a collection object. This method accepts a query filter that matches the document that you want to delete. If you do not specify a filter, MongoDB matches and deletes the first document in the collection. Here's an example:

const dbname = "bank"
const collection_name = "accounts"

const accountsCollection = client.db(dbname).collection(collection_name)

const documentToDelete = { _id: ObjectId("62d6e04ecab6d8e13049749c") }

const main = async () => {
  try {
    await connectToDatabase()
    let result = await accountsCollection.deleteOne(documentToDelete)
    result.deletedCount === 1
      ? console.log("Deleted one document")
      : console.log("No documents deleted")
  } catch (err) {
    console.error(`Error deleting documents: ${err}`)
  } finally {
    await client.close()
  }
}

main()

Using deleteMany()
You can delete multiple documents from a collection in a single operation by calling the deleteMany() method on a collection object. To specify which documents to delete, pass a query filter that matches the documents that you want to delete. If you provide an empty document, MongoDB matches all documents in the collection and deletes them. In the following example, we delete all accounts with a balance of less than 500 by using a query filter. Then, we print the total number of deleted documents.

const dbname = "bank"
const collection_name = "accounts"

const accountsCollection = client.db(dbname).collection(collection_name)

const documentsToDelete = { balance: { $lt: 500 } }

const main = async () => {
 try {
   await connectToDatabase()
   let result = await accountsCollection.deleteMany(documentsToDelete)
   result.deletedCount > 0
     ? console.log(`Deleted ${result.deletedCount} documents`)
     : console.log("No documents deleted")
 } catch (err) {
   console.error(`Error deleting documents: ${err}`)
 } finally {
   await client.close()
 }
}
 
main()
*/
