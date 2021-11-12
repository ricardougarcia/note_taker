const router = require("express").Router();
const path = require("path");
const apiRoutes = require("./api");

// Middlkeware
router.use("/api", apiRoutes);

// GET Route for homepage
router.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/index.html"))
);
// // RG GET Route for wildcard 404 page
// router.get("*", (req, res) =>
//   res.sendFile(path.join(__dirname, "/public/404.html"))
// );

// GET Route for feedback page
router.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/notes.html"))
);

// Make sure it avail
module.exports = router;
