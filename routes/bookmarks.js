import { Router } from "express";
import { unfurl } from "unfurl.js";

const router = Router();
const db = require("../db");

const unfurlUrl = ({ id, url }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await unfurl(url);

      resolve({ id, data: result });
    } catch (e) {
      reject(e);
    }
  });
};

router.get("/", (req, res) => {
  db.getBookMarks()
    .then(async bookmarks => {
      console.log("bookmarks", bookmarks);
      const data = await Promise.all(
        bookmarks.map(bookmark =>
          unfurlUrl({ id: bookmark.id, url: bookmark.url })
        )
      );

      res.render("index", { bookmarks: data });
    })
    .catch(err => {
      res.status(500).send("DATABASE ERROR: " + err.message);
    });
});

router.post("/insert", (req, res) => {
  const url = req.body.url;
  console.log("url", url);
  db.insertBookMark(url)
    .then(bookmark => {
      db.getBookMarks().then(async bookmarks => {
        const data = await Promise.all(
          bookmarks.map(bookmark =>
            unfurlUrl({ id: bookmark.id, url: bookmark.url })
          )
        );
        res.render("index", { bookmarks: data });
      });
    })
    .catch(err => {
      res.status(500).send("DATABASE ERROR" + err.message);
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.getBookMarkById(id)
    .then(bookmark => {
      console.log("bookmark", bookmark[0].url);
      res.render("update", { id: bookmark[0].id, url: bookmark[0].url });
    })
    .catch(err => {
      res.status(500).send("DATABASE ERROR" + err.message);
    });
});

router.post("/:id", (req, res) => {
  const id = req.body.id;
  const url = req.body.url;
  db.updateBookmark({ id, url })
    .then(res.redirect("/bookmark"))
    .catch(err => {
      res.status(500).send("DATABASE ERROR" + err.message);
    });
});

export default router;
