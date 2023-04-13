const sqliteConnection = require("../index");
const createUsers = require("./createUsers");
const createProducts = require("./createProducts");
const createTags = require("./createTags");

async function migrationsRun() {
  const schemas = [
    createUsers,
    createProducts,
    createTags
  ].join('');

  sqliteConnection().then(db => db.exec(schemas)).catch(error => console.error(error));
}

module.exports = migrationsRun;