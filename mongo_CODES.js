// Go to a db:
/* use dbName */

/*
 *******************************
 *********** FIND **************
 *******************************
 */

/*
db.youtubers.find() // find all documents in the youtubers collection
*/

/*
db.zips.find({ state: “AZ” }) // finds all the documents with the state field with the value “AZ”
db.<colletion>.find({
	<field>: { $in: 
		[<value>, <value>, …]
	}
})
*/

db.zips.findOne();
// Display only one document. To have a look to the structure of a document.

// Find all documents where the field city is PHOENIX or CHICAGO.
db.zips.find({
  city: { $in: ['PHOENIX', 'CHICAGO'] },
});
// Find the document with this id (ObjectId is unique)
db.zips.find({ _id: ObjectId('5c8eccc1caa187d17ca6ed16') });

// find and Modify:

db.podcasts.findAndModify({
  query: { _id: ObjectId('6261a92dfee1ff300dc80bf1') },
  update: { $inc: { subscribers: 1 } },
  new: true, // the document will be returned.
});

db.birds.findAndModify({
  query: { common_name: 'Blue Jay' },
  update: { $inc: { sightings_count: -2 } },
  new: true,
});

/*
 *******************************
 *********** OPERATORS *********
 *******************************
 */

/*
$gt (greater than)
$lt (less than)
$lte (less than equal to)
$gte (greater than or equal to)
*/

// Find in the collection sales all documents where the subdocument items
// the field price is greater than 50.
// when there is a subdocument, it has to have '' like here: 'items.price'
db.sales.find({ 'items.price': { $gt: 50 } });
/*
{
  '_id': { '$oid': '5bd761dcae323e45a93ccfe8' },
  'saleDate': { '$date': { '$numberLong': '1427144809506' } },
  'items': [
    {
      'name': 'printer paper',
      'tags': ['office', 'stationary'],
      'price': { '$numberDecimal': '40.01' },
      'quantity': { '$numberInt': '2' }
    }
  ],
  'storeLocation': 'Denver',
  'customer': {
    'gender': 'M',
    'age': { '$numberInt': '42' },
    'email': 'cauho@witwuta.sv',
    'satisfaction': { '$numberInt': '4' }
  },
  'couponUsed': true,
  'purchaseMethod': 'Online'
}
*/

// To find specific elements in ARRAYS that match an specific criteria:
// $elemMatch

db.account.find({
  products: {
    $elemMatch: { $eq: 'InvestmentStock' },
  },
});

// Multiple criteria. Return all documents that match all values:

db.transactions.find({
  transactions: {
    $elemMatch: { amount: { $lte: 4500 }, transaction_code: 'sell' },
  },
});

db.sales.find({ $or: [{ 'items.name': 'pen', 'items.tags': 'writing' }] });

/*
 *******************************
 *********** INSERT ************
 *******************************
 */

/*
db.<collection>.insertOne()
db.<collection>.insertMany([])
*/

/*
 *******************************
 ************* UPDATE **********
 *******************************
 */
// $set`, `$push`, `$pop`, `$unset`, or `$inc`

db.birds.updateOne(
  { _id: ObjectId('6268413c613e55b82d7065d2') },
  { $set: { tags: ['geese', 'herbivors', 'migration'] } }
);

db.birds.updateOne(
  { common_name: 'Canada Goose' },
  { $set: { tags: ['geese', 'herbivore', 'migration'] } }
);

db.podcasts.updateOne(
  { _id: ObjectId('5e8f8f8f8f8f8f8f8f8f8f8') },
  {
    $set: {
      subscribers: 98562,
    },
  }
);
// When you want to push to an array, and keep the previous elements.
db.birds.updateOne(
  { _id: ObjectId('6268471e613e55b82d7065d7') },
  {
    $push: {
      diet: { $each: ['newts', 'opossum', 'skunks', 'squirrels'] },
    },
  }
);

// RESULT:
/*
{
  _id: ObjectId("6268471e613e55b82d7065d7"),
  common_name: 'Great Horned Owl',
  scientific_name: 'Bubo virginianus',
  wingspan_cm: 111.76,
  habitat: [ 'grasslands', 'farmland', 'tall forest' ],
  diet: [
    'mice',
    'small mammals',
    'rabbits',
    'shrews',
    'newts',
    'opossum',
    'skunks',
    'squirrels'
  ],
  last_seen: ISODate("2022-05-19T20:20:44.083Z")
}
*/
/*
 *******************************
 ******** OPTIONS **************
 *******************************
 */
// upsert: true
// Insert a document with provided information if matching documents don’t exist.

db.podcasts.updateOne(
  { title: 'The Developer Hub' },
  { $set: { topics: ['databases', 'MongoDB'] } },
  { upsert: true }
);
db.birds.updateOne(
  { common_name: 'Robin Redbreast' },
  { $inc: { sightings: +1 }, $set: { last_updated: 'newDate()' } },
  { upsert: true }
);

// updateMany()
// Updates all the documents that match the criteria.
// also accepts a third options object argument (not required).

db.books.updateMany(
  { publishedDate: { $lt: new Date('2019-01-01') } },
  { $set: { status: 'LEGACY' } }
);
db.birds.updateMany(
  { $or: [{ common_name: 'Blue Jay', common_name: 'Grackle' }] },
  { $set: { last_seen: new Date('2022-01-01') } }
);

/*
 *******************************
 ************ DELETE ***********
 *******************************
 */

// also accepts an options object

db.podcasts.deleteOne({ _id: Objectid('6282c9862acb966e76bbf20a') });
// output: { acknowledged: true, deletedCount: 1 }
db.podcasts.deleteMany({ category: 'crime' });
db.birds.deleteMany({ sightings_count: { $lte: 10 } });
// output: { acknowledged: true, deletedCount: 3 }

/*
 *******************************
 **** SORTING & LIMITING *******
 *******************************
 */

// A cursor is a pointer to the result of a query
// find returns a cursor a points to the document that match that query
// cursor methods perform actions on the result set before returning the desired data

cursor.sort(); // 1 ascending, -1 descending
cursor.limit(); // number of docs we want

// Return data on all music companies, sorted alphabetically from A to Z.
db.companies.find({ category_code: 'music' }).sort({ name: 1 });

// Return data on all music companies, sorted alphabetically from A to Z. To ensure documents are returned in a consistent order, include a field that contains unique values in the sort. An easy way to do this is to include the
// _id field in the sort.
db.companies.find({ category_code: 'music' }).sort({ name: 1, _id: 1 });

// Return the three music companies with the highest number of employees. Ensure consistent sort order.
db.companies
  .find({ category_code: 'music' })
  .sort({ number_of_employees: -1, _id: 1 })
  .limit(3);

// Note that sort orders first words that start with uppercase, and then
// words that start with lowercase.
//To give only the result with the names. In this case it will give only one name of each document:

db.companies
  .find({ category_code: 'music' }, { name: 1 })
  .sort({ name: 1, _id: 1 });

//Return the data on all sales,
//ordered by date from oldest to newest.
// saleDate: ISODate("2015-03-23T21:06:49.506Z"),

db.sales.find().sort({ saleDate: -1 });

// Return the data on all sales made online using a coupon,
// ordered by date from the most recent to the oldest

db.sales.find({ couponUsed: true }).sort({ saleDate: 1 });

// Return the data on the three most recent sales
// made from the London store that included one or more
// of the following items: a laptop, a backpack or printer paper.

db.sales
  .find({
    $and: [{ storeLocation: 'London' }],
    $or: [
      {
        'items.name': 'laptop',
        'items.name': 'backpack',
        'items.name': 'printer paper',
      },
    ],
  })
  .sort({ saleDate: 1 })
  .limit(3);

/*
 *******************************
 ******** PROJECTIONS **********
 *******************************
 */
// it's selecting fields to return to our result.
// We can only include (1) or exclude (0). With the exception of _id.

// Return all restaurant inspections -
// business name, result, and _id fields only (_id is included by default)
db.inspections.find(
  { sector: 'Restaurant - 818' },
  { business_name: 1, result: 1 }
);
// Return all inspections with result of "Pass" or "Warning" -
// exclude date and zip code (zip is inside the address subdocument)
db.inspections.find(
  { result: { $in: ['Pass', 'Warning'] } },
  { date: 0, 'address.zip': 0 }
);
// Return all restaurant inspections -
// business name and result fields only
db.inspections.find(
  { sector: 'Restaurant - 818' },
  { business_name: 1, result: 1, _id: 0 }
);
// Query for all sales at the Denver store.
// Return only the sale date, store location, purchase method and _id fields.

db.sales.find(
  { storeLocation: 'Denver' },
  { saleDate: 1, storeLocation: 1, purchaseMethod: 1 }
);
// Find the data on sales to customers less than 30 years old in
// which the customer satisfaction rating was greater than three.
// Return only the customer's age and satisfaction rating, the sale date
// and store location. Do not include the _id field.

db.sales.find(
  {
    $and: [
      { 'customer.age': { $lt: 30 } },
      { 'customer.satisfaction': { $gt: 3 } },
    ],
  },
  {
    'customer.age': 1,
    'customer.satisfaction': 1,
    saleDate: 1,
    storeLocation: 1,
    _id: 0,
  }
);

/* Find data on all sales from the Seattle and New York stores.
Return all data except the purchase method, customer information,
and whether a coupon was used.
*/
db.sales.find(
  { storeLocation: { $in: ['Seattle', 'New York'] } },
  { couponUsed: 0, purchaseMethod: 0, customer: 0 }
);

/*
 *******************************
 ******** COUNT DOCUMENTS ******
 *******************************
 */
// that match the query
// db.collection.countDocuments(<query>, <options>)
// db.collection.countDocument() // count all the documents

// Count number of trips over 120 minutes by subscribers
db.trips.countDocuments({ tripduration: { $gt: 120 }, usertype: 'Subscriber' });
db.sales.countDocuments();
// output 1000
// Find the number of sales made using a coupon at the Denver location.
db.sales.countDocuments({ couponUsed: true, storeLocation: 'Denver' });
// output 157
// Find the number of sales that included a laptop that cost less that $600.
db.sales.countDocuments({
  'items.name': 'laptop',
  'items.price': { $lt: 600 },
});
