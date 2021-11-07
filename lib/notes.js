const fs = require('fs');
const path = require('path');

function createNewNote(body, notesArray){
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notesArray, 2, null)
    )
    return note;
}

function validateNote(note){
    if(!note.title || typeof note.title !== 'string') {
        return false;
    }
    if(!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

function findNote(id, notesArray){
    const result = notesArray.filter(note => note.id === id);
    return result;
};

function deleteNote(body, notesArray){
    let note = body;
    notesArray.pop(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notesArray, 2, null)
    )
    return note;
}

module.exports = {
    createNewNote,
    validateNote,
    findNote,
    deleteNote
}