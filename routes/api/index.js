const router = require("express").Router();
const fs = require("fs");
const uuidv4 = require("uuid/v4");

// middleware package that will allow express to extract incoming data of a POST request
// const bodyParser = require("body-parser");

// // middleware for body-parser
// router.use(bodyParser.urlencoded({extended: false}));
// router.use(bodyParser.json());

// We are creating a GET route for notes (URL it will be listening on is /notes)
router.get("/notes", (req, res) => {
  const read = fs.readFileSync("db/db.json");
  console.log("this is the read", read);
  const db = JSON.parse(read);
  console.log("this is the db", db);
  const resp = res.json(db);
  console.log("this is the resp", resp);
});

// router.post("/notes", (req, res) => {
//   // const sendtest = res.send("This is the send");
//   // console.log(sendtest);
//   // req.body;
//   console.log("this is the req.body", req.body);
//   const input = JSON.stringify(req.body);
//   console.log("This is the input", input);

//   fs.appendFileSync("db/db.json", input);

//   // (err) => {
//   //   if (err) {
//   //     console.log("error occured when writing your file");
//   //   }
//   // });
// });
const writeToFile = (file, content) =>
  fs.writeFile(file, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${file}`)
  );

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
    };

    readAndAppend(newNote, "db/db.json");
    res.json(`Tip added successfully 🚀`);
  } else {
    res.error("Error in adding note");
  }
});

module.exports = router;
