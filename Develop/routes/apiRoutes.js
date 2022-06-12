const path = require("path");
const fs = require("fs");
const router = require("express").Router();
const { v4: uuidv4 } = require('uuid');

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

    fs.readFile(path.join(__dirname, "../db/db.json"), 'utf-8', (err, data)=>{
        if(err) throw err;

        const parsedNotes = JSON.parse(data)

        const notesToKeep= parsedNotes.filter((note)=> note.id !== req.params.id)

        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notesToKeep), (err)=>{
            
            if(err) throw err;
            console.log("Note deleted successfully!")
        })
    })
    res.sendFile(path.join(__dirname, "../db/db.json"))
})


module.exports = router;
