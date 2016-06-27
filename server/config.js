let databaseName = "putYourDBNameHere";

module.exports = {
  seedMongo: true,
  databaseName: databaseName,
  mongo: {
    seed: 'localhost/' + databaseName,
    uri: 'mongodb://localhost/' + databaseName,
    options: {
      db: {
        safe: true
      }
    }
  }
};
