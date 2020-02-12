require("dotenv").config({});
const environment = process.env.NODE_ENV;
console.log("environment", environment);
const config = require("./knexfile")[environment];

const connection = require("knex")(config);

module.exports = {
  getBookMarks: getBookMarks,
  getBookMarkById,
  updateBookmark: updateBookmark,
  insertBookMark: insertBookMark
};

function getBookMarks(db = connection) {
  return db("bookmarks").select();
}

function getBookMarkById(id, db = connection) {
  return db("bookmarks").where({ id });
}

function insertBookMark(url, db = connection) {
  return db("bookmarks").insert({ url: url });
}

function updateBookmark({ id, url }, db = connection) {
  return db("bookmarks")
    .where("id", id)
    .update({ url: url });
}
