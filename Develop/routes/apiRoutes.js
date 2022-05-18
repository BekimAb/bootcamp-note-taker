const path = require("path");
const fs = require("fs");
const router = require("express").Router();
const { v4: uuidv4 } = require('uuid');
const { parse } = require("path");

// /api/notes
router.get("/notes", (req, res)=>{
    res.sendFile(path.join(__dirname, "../db/db.json"))
})

router.post('/notes', (req, res)=>{

    //console.log("information that the user typed in", req.body.title)

    const newNote = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text,
    }

    // console.log("new note that we want to push to our DB", newNote)

    fs.readFile(path.join(__dirname, "../db/db.json"), 'utf-8', (err, data)=>{
        console.log("data from db/db.json", data)
        const parsedNotes = JSON.parse(data)
        console.log("PARSED NOTES", parsedNotes)
        parsedNotes.push(newNote)
        console.log("PARSED NOTES WITH NEW NOTE ADDED", parsedNotes)

        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(parsedNotes), (err)=>{
            console.log("Newly updated parsedNotes parsed back to JSON format", JSON.stringify(parsedNotes))
            if(err) throw err;
            console.log("Note saved to db successfully!")
        })
    })
    res.sendFile(path.join(__dirname, "../db/db.json"))

});

router.delete("/notes/:id", (req, res)=>{

    // perform the fs.readfile method to get the db.json and read it.
    // parse the notes to javascript format so you can manipulate them.
    // loop through the parsedNotes and compare the id that was clicked to be deleted matches an id in parsedNotes
    // remove that note index from parsedNotes (look up .splice() method on w3 schools)
    // parse newly updated parsedNotes BACK TO JSON format hint** JSON.stringify(parsedNotes)
    // fs.writefile so it updates the db.json file
    // run your get again to give most updated version of db hint hint ***res.sendFile(path.join(__dirname, "../db/db.json"))
    fs.readFile(path.join(__dirname, "../db/db.json"), 'utf-8', (err, data)=>{
        console.log("data from db/db.json", data)
        const parsedNotes = JSON.parse(data)
        console.log("PARSED NOTES", parsedNotes)
        //parsedNotes.push(newNote) needs to be changed with .splice()
        console.log("PARSED NOTES WITH NEW NOTE ADDED", parsedNotes)

        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(parsedNotes), (err)=>{
            console.log("Newly updated parsedNotes parsed back to JSON format", JSON.stringify(parsedNotes))
            if(err) throw err;
            console.log("Note saved to db successfully!")
        })
    })
    res.sendFile(path.join(__dirname, "../db/db.json"))
})


module.exports = router;
