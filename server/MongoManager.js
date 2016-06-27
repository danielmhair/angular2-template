/**
 * This script inserts into mongo the contents of all the .json files in the /seeds directory.
 *
 * The name of the file is the collection that the contents of that file will be inserted into.
 *      Example: This script will insert all the records in cohort.json into the collection "cohort"
 *
 * Usage: $ node seed
 *
 * @author Tom Caflisch
 */

var Q       = require('q');
var mongo   = require('mongodb').MongoClient;
var config  = require("./config");
var dir     = './server/seeds';
var fse      = require('fs-extra'); // Used to get all the files in a directory
var util    = require('util');
var _       = require('lodash');
var errno   = require('errno');
var path    = require('path');

/**
 * Reads the .json files from the ./seeds folder and inserts them into mongo
 */
module.exports.seed = function() {

  var listOfFiles = null;

  load_files().then(function(list) {
    listOfFiles = list;
    console.log("Files in seeds folder", list);
    return getConnection();
  }).then(function(db) {
    return seed_db(db, listOfFiles);
  }).then(function () {
    console.log('----------------------');
    console.log('All done. Go play!');
  }).fail(function(err) {
    console.error(err);
  }).done();
};


/*************************
 * Private
 ************************/


/**
 * Loads all the json files from the ./seeds folder
 */
function load_files() {

  return Q.promise(function(resolve, reject, notify) {

    // Read all the files in the ./seeds folder
    fse.readdir(dir, function(err, files) {

      if(err || _.isUndefined(files)) {
        return reject('Error reading /seeds folder');
      } else {
        // Filter out everything except the .json files
        files = files.filter(function(file) {
          return path.extname(file) === '.json';
        });

        return resolve(files);
      }
    });
  });
}


/**
 * Loops through all the .json files in ./seeds and removes all the records
 *
 * @param db    - The mongo object to run queries against
 * @param list  - An array of all the .json files from the seeds folder
 */
function seed_db(db, list) {

  console.log('Seeding files from directory ' + path.resolve(dir));
  console.log('----------------------');

  return Q.promise(function(resolve, reject, notify) {

    var operations = [];

    // Loop through every file in the list
    list.forEach(function (file) {

      // Set the filename without the extension to the variable collection_name
      var collection_name = file.split(".")[0];
      var contents = null;

      // True if the current file has contents, false if it's empty
      var hasContents = fse.statSync(path.resolve(dir + '/' + file)).size > 0;

      console.log('Seeding collection ' + collection_name);

      try {
        // If the file has contents, load them
        if(hasContents) {

            contents = fse.readJsonSync(dir + '/' + file);

          // If the seed file is NOT an array
          if (!util.isArray(contents)) {
            return reject(new Error('Seed file ' + collection_name + ' does not start with an Array'));
          }
        }

        // The chain of operations to occur for each file. Drop the existing collection if it exists, create it, insert data into it
        console.log("Attempting to drop collection");
        var chain = dropCollection(db, collection_name)
        .then(function() {
          console.log("Creating collection " + collection_name);
          return createCollection(db, collection_name);
        }).then(function() {
          console.log("Checking if there is data to insert for " + collection_name + ".");
          if(contents) {
            console.log("There is data! Inserting data into mongoDB");
            return insert(db, collection_name, contents)
          }
        }).fail(function(err) {
          return reject(errmsg(err));
        });

        // Push the chain for each file to an array of promises
        operations.push(chain);

      } catch(err) {
        console.error("Failed to read: " + dir + '/' + file);
        console.error(err);
      }
    });

    // When all the drop/create/inserts are complete, we're finished
    Q.allSettled(operations)
    .then(function() {
      return resolve();
    }).fail(function(err) {
      return reject(err);
    }).fin(function() {
      db.close();
    });
  });
}


/**
 * Gets a connection to mongo
 *
 * @returns {promise|*|Q.promise}
 */
function getConnection() {

  return Q.promise(function(resolve, reject, notify) {

    var connectionString = null;

    // If mongo seed location is set and there is no key in seed.json matching, throw an error
    if(!config.mongo || !config.mongo.seed) {
      config.mongo = config.mongo ? config.mongo : {};
      console.error("No DB Name. Default DB Name is 'putYourDBNameHere'");
      config.mongo.seed = config.mongo.seed ? config.mongo.seed : "putYourDBNameHere"
    }

    // If the connection string does not start with "mongodb://", add it
    if(_.startsWith(config.mongo.seed, "mongodb://")) {
      connectionString = config.mongo.seed;
    } else {
      connectionString = 'mongodb://' + config.mongo.seed;
    }

    console.log("Connecting to mongo using: " + connectionString);

    mongo.connect(connectionString, function(err, db) {

      if(err) {
        return reject(err);
      }

      return resolve(db);
    });
  });
}


/**
 * Creates a collection in mongo
 *
 * @param collection
 * @returns {*}
 */
function createCollection(db, name) {

  return Q.promise(function(resolve, reject, notify) {

    db.createCollection(name, function(err, collection) {

      if(err) {
        console.error("An error occurred while creating " + name + " collection", err);
        return reject(err);
      }

      console.log(name + " collection created!");
      return resolve();
    });
  });
}


/**
 * Drops a collection from mongo if it exists
 *
 * @param collection  - The collection to drop
 * @returns {*}
 */
function dropCollection(db, name) {

  return Q.promise(function(resolve, reject, notify) {

    // Check if the collection exists, else don't do anything
    collectionExist(db, name)
    .then(function(exists) {
      // If the collection exists, drop it
      if(exists) {
        console.log("Dropping collection...");
        db.dropCollection(name, function(err, reply) {

          if(err) {
            console.log("An error occurred while trying to drop collection...");
            return reject(err);
          }

          console.log(name + " collection dropped.");
          return resolve();
        });
      } else {
        console.log("Collection does not exist, no need to drop.");
        return resolve();
      }
    })
    .catch(function(err) {
      console.error(err);
      console.log("An error occurred while dropping collection...");
      return reject(err);
    });
  });
}


/**
 * Checks if a collection exists
 *
 * @param db    - The db to check if a collection exists in
 * @param name  - The name of the collection we want to see if exists
 * @returns {promise|*|Q.promise}
 */
function collectionExist(db, name) {

  return Q.promise(function(resolve, reject, notify) {
    console.log("Checking if " + name + " collection exists.");
    db.collection(name, function(err, collections) {
      if(err) {
        console.error("An error occurred while checking if the (" + name + ") collection exists...");
        return reject(err);
      }

      // If the collection exists in the mongo db
      if(collections && collections.length > 0) {
        console.log(name + " collection exists...");
        return resolve(true);
      } else {
        console.log(name + " collection does not exist...");
        return resolve(false);
      }
    });
  });
}

/**
 * Inserts an array of objects into mongo
 *
 * @param db              - The db to insert into
 * @param collection_name - The collection to insert into
 * @param contents        - The contents to be inserted
 * @returns {*}
 */
function insert(db, collection_name, contents) {

  return Q.promise(function(resolve, reject, notify) {

    // If it's an empty array, there's nothing to insert
    if(contents.length !== 0) {

      return db.collection(collection_name)
      .insert(contents, function(err, result) {

        if(err) {
          console.error("An error occurred while inserting contents");
          console.error(err);
          return reject(err);
        }

        console.log("Inserted " + contents.length + " items for " + collection_name);
        return resolve(result);
      });
    }
    else {
      console.log("There is no data to insert.");
      return resolve();
    }
  });
}


/**
 * Formats error messages to display the actual error message instead of all the errno codes and what not.
 *
 * @param err         - The error object that may or may not contain an errno code
 * @returns {string}  - A simple message
 */
function errmsg(err) {

  var str = 'Error: ';
  // if it's a libuv error then get the description from errno
  if (errno.errno[err.errno]) {
    str += errno.errno[err.errno].description
  } else {
    str += err.message
  }

  // if it's a `fs` error then it'll have a 'path' property
  if (err.path) {
    str += ' [' + err.path + ']'
  }
  return str
}
