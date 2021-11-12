const express = require("express");
// does the same thing as ./routes
const routes = require("./routes/index.js");

const PORT = process.env.port || 3001;

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

// The following HTML routes should be created:

// - `GET /notes` should return the `notes.html` file.

// - `GET *` should return the `index.html` file.

// The following API routes should be created:

// - `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.

// - `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
