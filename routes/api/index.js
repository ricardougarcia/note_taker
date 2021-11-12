const router = require("express").Router();
const fs = require("fs");

// We are creating a GET route for notes (URL it will be listening on is /notes)
router.get("/notes", (req, res) => {
  const read = fs.readFileSync("db/db.json");
  const db = JSON.parse(read);
  res.json(db);
});

module.exports = router;
