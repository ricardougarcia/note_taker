const express = require("express");
// does the same thing as ./routes
const routes = require("./routes/index.js");

const PORT = process.env.port || 3002;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// anytime someone visits the site they will have access to the public folder
app.use(express.static("public"));

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
