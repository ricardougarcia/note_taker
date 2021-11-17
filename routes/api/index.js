const router = require("express").Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
// const uid = uuidv4();

function uidGenerator() {
  const userid = uuidv4();
  console.log(userid);
  return userid;
}
// var uid = uidGenerator();

// We are creating a GET route for notes (URL it will be listening on is /notes)
router.get("/notes", (req, res) => {
  const read = fs.readFileSync("db/db.json");
  // console.log("this is the read", read);
  const db = JSON.parse(read);
  // console.log("this is the db", db);
  const resp = res.json(db);
  // console.log("this is the resp", resp);
  return;
});

const writeToFile = (file, content, id) => {
  fs.writeFile(file, JSON.stringify(content, null, 4), id, (err) =>
    err ? console.error(err) : console.info(`\nData written to ${file}`)
  );
};

const readAndAppend = (newNote, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(newNote);
      writeToFile(file, parsedData);
    }
  });
};

router.post("/notes", (req, res) => {
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uidGenerator(),
    };

    readAndAppend(newNote, "db/db.json");
    res.json(`note added successfully 🚀`);
  } else {
    res.error("Error in adding note");
  }
});

module.exports = router;
