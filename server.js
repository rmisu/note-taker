const fs = require('fs');
const path = require('path');
const express = require('express');
const { notes } = require('./develop/db/db.json')
const PORT = process.env.PORT || 3000
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./develop/public'));

function newNote (body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './develop/db/db.json'),
        JSON.stringify({ notes:notesArray}, null, 2)
    );
    return note;
}

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
};

app.get('/api/notes', (req, res) => {
    res.json(notes); 
});

//to homepage (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './develop/public/index.html'));
});

//to notes page
app.get('/notes', (req, res) => { 
    res.sendFile(path.join(__dirname, './develop/public/notes.html'));
});

//route for undefined to homepage
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './develop/public/index.html'));
});

app.listen(process.env.PORT || 3000, function() {
    console.log(`Server listening on port ${PORT}`);
});

app.post('/api/notes', (req, res) => {
     //set id based on what the next index of the array will be
     req.body.id = notes.length.toString();
     //if any data in req.body is incorrect, send 400 error back 
     if (!validateNote(req.body)) {
         res.status(400).send('The note is not properly formatted');
     } else {
     //add note to json file and notes array in this function
     const note = newNote(req.body, notes);
     res.json(note);
     }
});

