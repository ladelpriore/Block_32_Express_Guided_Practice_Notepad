// TODO: this file :)

const express = require("express");     //Create a new Express Router and export it.
const router = express.Router();
module.exports = router;

const notes = require("../data/notes"); //Move from server.js and import here instead

router.get("/", (req, res) => {     //Move the 3 /notes middleware from server.js into api/notes.js, and use the ruter vairable instead of app. 
  res.json(notes);      
});

router.get("/:id", (req, res, next) => {            //The handlers for GET /notes/:id and POST /notes directly send an error response when the request fails.
  const { id } = req.params;
  const note = notes.find((n) => n.id === +id);
  if (note) {
    res.json(note);
  } else {
    next({ status: 404, message: `Note with id ${id} does not exist.` });
  }
});

router.post("/", (req, res, next) => {
  const { text } = req.body;
  if (text) {
    notes.push({ id: notes.length + 1, text });
    res.status(201).json(notes.at(-1));
  } else {
    next({ status: 400, message: "New note must have text." });
  }
});