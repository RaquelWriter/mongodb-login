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

Aggregation is a way to filter, sort, group, reshape, and analyze data without
changing any data in the collection.
Aggregation is used to answer questions or have insight about the collection.

Stages of the aggregation:

$match
$group
$sort
$limit
$project
$set
$count
$out

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

/*
The data:
{
  _id: ObjectId("62e2d811b1d5bc85b6e04013"),
  species_common: 'Northern Cardinal',
  species_scientific: 'Cardinalis Cardinalis',
  date: ISODate("2022-01-18T05:30:40.000Z"),
  location: { type: 'Point', coordinates: [ 41, -74 ] }
}
*/
/*
We want to use this data to find the birds that are sighted furthest North.
Use a $sort stage to sort the data from North to South. To do this,
use "location.latitude", where the highest latitude value is the furthest
North.

db.sightings.aggregate([
  {
    $sort: {'location.coordinates[1]': -1} // coordinates: [longitude, latitude] descending order
  },
  {$limit: 4}
]);
*/

/*
 *******************************
 ******* aggregate() ***********
 *******************************
 ********** $project ***********
 *******************************

 project can be used to create or change the value of fields,
 but it can also be used to specify which fields to show in the documents in the aggregation pipeline.
Determines output shape, similar to find, should be the last stage to format
the output
Can be inclusion (value 1) and exclusion (value 0)

{
  $project: {
    state:1, 
    zip:1,
    population:"$pop",
    _id:0
  }
}
// another example:
 db.sightings.aggregate(
  {
    $project:{date:1, species_common:1, _id:0}
  }
 )

// Another example:
 
Create a stage that finds matches where species_common
is "Eastern Bluebird" and where the date field is a value
between January 1, 2022 0:00, and January 1, 2023 0:00.
And count the results.

db.sightings.aggregate([
  {
    $match: {
      date: {
        $gt: ISODate('2022-01-01T00:00:00.0Z'),
        $lt: ISODate('2023-01-01T00:00:00.0Z'),
      },
      species_common: 'Eastern Bluebird',
    },
  },
  {$count: "sightings"}
]);

*/

/*
 *******************************
 ******* aggregate() ***********
 *******************************
 ************** $set ***********
 *******************************

 Adds of modifies fields in the pipeline
 outputs the documents with the new fields.
{
  $set: {
    place: {
        $concat:["$city",",","$state"]
    },
    pop:10000
  }
}

// Otro ejemplo:

db.birds.aggregate(
  {$set: {class: "bird"}}
)

 */

/*
 *******************************
 ******* aggregate() ***********
 *******************************
 ************ $count ***********
 *******************************

 Counts documents in the pipeline and returns the total document count.
 Output: A single document with one field that contains the value set
 to the number of documents at this stage in the aggregation pipeline.
{
  $count: "total_zips"
}
 // output: { total_zips: 3452 }

*/

/*
 *******************************
 ******* aggregate() ***********
 *******************************
 ************ $out *************
 *******************************

Writes the document that are returned by an aggregation pipeline
into a collection.
It has to be the last stage in the pipeline.
Creates a new collection if the collection doesn't exist, but
if the collection exists $out replaces the existing collection
with new data.

db.sightings.aggregate([
  {
    $match: {
      date: {
        $gte: ISODate('2022-01-01T00:00:00.0Z'),
        $lt: ISODate('2023-01-01T00:00:00.0Z'),
      },
    },
  },
  {$out: "sightings_2022"}
]);

 */

/*
 *******************************
 ************ INDEXES **********
 *******************************

They are special structures that store ordered small portion of the data
that allows an easy and efficient search (speed up queries, reduces disk I/O,
reduce resources required), but at the cost of write performance.
Indexes point to the document identity.
There is only one index by default in each collection: _id
Every query should use an index.
If we insert or update documents, we need to update the index data structure also.
If we have many indexes per collection, the performance degrade.
Be sure the indexes are used, and delete the unnecesary or redundant ones.

Types of indexes:
-single field
-compound field

Both can be multikey indexes, that it's an index on an array field

**** Single field index ****
A single field index is an index on a single
field of a document. MongoDB creates a single field index on the _id field
by default, but additional indexes may be needed for other fields as well.
A single field index can also be a multikey index if it operates on an array
field.

**** Compound index ****
MongoDB supports compound indexes,
where a single index structure holds references to multiple
fields within a collection's documents. A compound index is created
by specifying the fields that the index should reference,
followed by the order in which the fields should be sorted.
The order of the fields in the index is important because it determines
the order in which the documents are returned when querying the collection.
A compound index can also be a multikey index if one of the fields is an array.

*******************************
************ INDEXES **********
*******************************
****** createIndex() **********
*******************************

createIndex({fieldname: 1}) // 1 for ascending, returns fieldname_1
Use createIndex() to create a new index in a collection.
Within the parentheses of createIndex(), include an object that contains
the field and sort order.

db.customers.createIndex({
  birthdate: 1
})

Create a Unique Single Field Index
Add {unique:true} as a second, optional, parameter in createIndex()
to force uniqueness in the index field values. Once the unique index
is created, any inserts or updates including duplicated values in the
collection for the index field/s will fail.
MongoDB only creates the unique index if there is no duplication
in the field values for the index field/s.

db.customers.createIndex({
  email: 1
},
{
  unique:true
})

db.customers.insertOne({email: "james@gmail.com"}) // if it exists already
it will give a duplicate key error.

*******************************
************ INDEXES **********
*******************************
******* getIndexes() **********
*******************************

db.transfers.getIndexes() // return all the indexes
// example of return, return and array with only one index:
// every index will be in an array:

[ { v: 2, key: { _id: 1 }, name: '_id_' } ]

*******************************
************ INDEXES **********
*******************************
********** explain() **********
*******************************

To check if an index is used in a query and see the execution plan:
db.customers.explain().find({birthdate: {$gt: ISODate("1995-08-01")}})

Use explain() in a collection when running a query to see the Execution plan.
This plan provides the details of the execution stages:
(IXSCAN , COLLSCAN, FETCH, SORT, etc.).

** The IXSCAN stage indicates the query is using an index and what index is being selected.
** The COLLSCAN stage indicates a collection scan is perform, not using any indexes.
** The FETCH stage indicates documents are being read from the collection.
** The SORT stage indicates documents are being sorted in memory.

db.customers.explain().find({
  birthdate: {
    $gt:ISODate("1995-08-01")
    }
})

db.customers.explain().find({
  birthdate: {
    $gt:ISODate("1995-08-01")
    }
  }).sort({
    email:1
})

 */
