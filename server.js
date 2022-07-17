const fs = require('fs');
const path = require('path');
const express = require('express');
const { notes } = require('./develop/db/db.json')
const PORT = process.env.PORT || 3001
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


//to homepage (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//to notes page
app.get('/notes', (req, res) => { 
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

//route for undefined to homepage
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
