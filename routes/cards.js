const router = require("express").Router(); // creating a router
const fsPromises = require("fs").promises;
const path = require("path");
const filepath = path.join(__dirname, "../data/cards.json");

router.get("/cards", (req, res) => {
  fsPromises
    .readFile(filepath, { encoding: "utf8" })
    .then((cards) => {
      res.status("200").send(JSON.parse(cards));
    })
    .catch(() => {
      res.status("500").send({ error: "An error has occurred on the server" });
    });
});

module.exports = router; // exporting the router
