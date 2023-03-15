/*
 *******************************
 *********** Samples ***********
 *******************************
 */

/*
 *******************************
 ******* insertOne() ***********
 *******************************

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

main();
*/

/*
 *******************************
 ******* findMany() ***********
 *******************************

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

/*
 *******************************
 ******* updateOne() ***********
 *******************************

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

/*
 *******************************
 ******* updateMany() **********
 *******************************


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

/*
 *******************************
 ******* deleteOne() ***********
 *******************************


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

*/

/*
 *******************************
 ******* deleteMany() **********
 *******************************

Using deleteMany()
// Be careful deleteMany() will delete ALL documents
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

/*
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
*/

/*
 *******************************
 ******* TRANSACTIONS **********
 *******************************

 // In MongoDB, a transaction is an operation
 that groups a set of read and write operations into a single atomic unit
 of work. This means that a transaction is either executed completely
 or not at all. If any of the operations within the transaction fails,
 all operations within the transaction are rolled back and the state
 is restored to the state prior to the transaction.

Transactions are commonly used to ensure that complex database operations
are completed successfully. For example, in a banking application,
a transaction can be used to ensure that funds transfer from one account
to another is completed successfully, otherwise, all operations performed
are rolled back.

************************************************************
******* 1 - Create variables used in the transaction *******
************************************************************

// Collections
const accounts = client.db("bank").collection("accounts")
const transfers = client.db("bank").collection("transfers")

// Account information
let account_id_sender = "MDB574189300"
let account_id_receiver = "MDB343652528"
let transaction_amount = 100

************************************************************
******* 2 - Start a new session ********************+*******
************************************************************

const session = client.startSession()

************************************************************
******* 3 - Begin a transaction with the WithTransaction() *
******* method on the session.  ********************+*******
************************************************************

const transactionResults = await session.withTransaction(async () => {
  // Operations will go here
}

************************************************************
4 - Update the balance field of the sender’s account
by decrementing the transaction_amount from the balance field.
************************************************************

const senderUpdate = await accounts.updateOne(
  { account_id: account_id_sender },
  { $inc: { balance: -transaction_amount } },
  { session }
)
************************************************************
5 - Update the balance field of the receiver’s account by
incrementing the transaction_amount to the balance field.
************************************************************

const receiverUpdate = await accounts.updateOne(
  { account_id: account_id_receiver },
  { $inc: { balance: transaction_amount } },
  { session }
)
************************************************************
6 - Create a transfer document and insert it into the 
transfers collection.
************************************************************

const transfer = {
  transfer_id: "TR21872187",
  amount: 100,
  from_account: account_id_sender,
  to_account: account_id_receiver,
}

const insertTransferResults = await transfers.insertOne(transfer, { session })

************************************************************
7 - Update the transfers_complete array of the sender’s
account by adding the transfer_id to the array.
************************************************************

const updateSenderTransferResults = await accounts.updateOne(
  { account_id: account_id_sender },
  { $push: { transfers_complete: transfer.transfer_id } },
  { session }
)
************************************************************
8 - Update the transfers_complete  array of the receiver’s
account by adding the transfer_id  to the array.
************************************************************

const updateReceiverTransferResults = await accounts.updateOne(
  { account_id: account_id_receiver },
  { $push: { transfers_complete: transfer.transfer_id } },
  { session }
)

*********************************************************************
9 - Log a message regarding the success or failure of the transaction
*********************************************************************

if (transactionResults) {
  console.log("Transaction completed successfully.")
} else {
  console.log("Transaction failed.")
}


*********************************************************************
10 - Catch any errors and close the session
*********************************************************************

/*
 *******************************
 ******* insertOne() ***********
 *******************************

} catch (err) {
  console.error(`Transaction aborted: ${err}`)
  process.exit(1)
} finally {
  await session.endSession()
  await client.close()
}

The following aggregation pipeline finds the documents with a field named "state" that matches a value "CA" and then groups those documents by the group key "$city" and shows the total number of zip codes in the state of California.
db.zips.aggregate([
{   
   $match: { 
      state: "CA"
    }
},
{
   $group: {
      _id: "$city",
      totalZips: { $count : { } }
   }
}
])
*/
/*
 *******************************
 ******* aggregate() ***********
 *******************************

db.sightings.aggregate([
  {
    $match: {
      species_common: 'Eastern Bluebird',
    },
  },
  {
    $group: {
      _id: '$location.coordinates',
      number_of_sightings: { $count: {} },
    },
  },
]);

// The following aggregation pipeline sorts the documents in descending order, so the documents with the greatest 
// pop value appear first, and limits the output to only the first five documents after sorting.

/*
db.zips.aggregate([
  {
    $sort: {
      pop: -1,
    },
  },
  {
    $limit: 5,
  },
]);
*/
