const express = require("express");
const cards = require("./routes/cards"); // importing router
const users = require("./routes/users"); // importing router

const app = express();
const { PORT = 3000 } = process.env;

app.use("/", cards); // starting cards router
app.use("/", users); // starting users router
app.get("*", function (req, res) {
  res.json({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
